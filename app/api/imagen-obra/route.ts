import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { ConvexHttpClient } from "convex/browser";
import { ConvexError } from "convex/values";
import { api } from "@/convex/_generated/api";
import { findRealArtwork } from "@/lib/artworks";
import { isConfirmed } from "@/lib/artworkText";
import { toLang } from "@/lib/routes";
import { SITE_URL } from "@/lib/seo";
import { SEO_PREVIEW } from "@/lib/seoPreview";
import { cleanName, watermarkArtwork } from "@/lib/watermarkImage";

// POST /api/imagen-obra — "Recibir imagen por correo" on an artwork page.
// Validates, rate-limits through Convex (leads:requestImage, which also tells
// the artist), builds a personalised watermarked JPEG and emails it to the
// visitor with Resend. The artwork is resolved ONLY from its id: no image URL
// from the client is ever used.
//
// Env (Vercel): RESEND_API_KEY, NOTIFY_FROM, NOTIFY_TO, IP_SALT, plus the
// existing NEXT_PUBLIC_CONVEX_URL. Locally (not on Vercel), without
// RESEND_API_KEY the image is written to .verify/imagen-obra-ultima.jpg
// instead of being emailed.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const IS_LOCAL = !process.env.VERCEL;

const json = (body: unknown, status = 200) => Response.json(body, { status });

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const slug = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "obra";

// Local-only stand-in for the Convex limits, used when the Convex function is
// not deployed yet (e.g. trying the branch before `npx convex deploy`). Same
// rules: 3 per email / 24 h, 10 per ipHash / hour. Never used on Vercel.
const localLog: { email: string; ipHash: string; at: number }[] = [];
function localRateLimit(email: string, ipHash: string): boolean {
  const now = Date.now();
  const perEmail = localLog.filter((e) => e.email === email && now - e.at < 24 * 3600 * 1000).length;
  const perIp = localLog.filter((e) => e.ipHash === ipHash && now - e.at < 3600 * 1000).length;
  if (perEmail >= 3 || perIp >= 10) return false;
  localLog.push({ email, ipHash, at: now });
  return true;
}

async function loadImage(imagePath: string, requestUrl: string): Promise<Buffer> {
  // Only paths inside public/images, as stored in data/artworks.ts.
  const safe = path.posix.normalize(imagePath);
  if (!safe.startsWith("/images/")) throw new Error("bad_image_path");
  try {
    return await readFile(path.join(process.cwd(), "public", safe));
  } catch {
    const res = await fetch(new URL(safe, requestUrl));
    if (!res.ok) throw new Error(`image_fetch_${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  }
}

export async function POST(request: Request) {
  // Part of the preview: off unless NEXT_PUBLIC_SEO_PREVIEW=1.
  if (!SEO_PREVIEW) return json({ ok: false }, 404);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false }, 400);
  }
  const str = (key: string) => (typeof body[key] === "string" ? (body[key] as string) : "");

  // Honeypot filled: pretend it worked, do nothing.
  if (str("website").trim()) return json({ ok: true });

  const name = cleanName(str("name"));
  const email = str("email").trim().toLowerCase();
  const lang = str("lang") === "en" ? "en" : "es";
  const artwork = findRealArtwork(str("artworkId"));
  if (
    name.length < 2 ||
    !EMAIL_RE.test(email) ||
    email.length > 200 ||
    !artwork ||
    artwork.noDetailPage ||
    artwork.featuredOnly
  ) {
    return json({ ok: false }, 400);
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  const salt = process.env.IP_SALT ?? "";
  if (!salt && !IS_LOCAL) console.error("imagen-obra: falta IP_SALT");
  const ipHash = createHash("sha256").update(ip + salt).digest("hex");

  // 1) Rate limit + lead for the artist (Convex).
  try {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!convexUrl) throw new Error("convex_not_configured");
    const convex = new ConvexHttpClient(convexUrl);
    await convex.mutation(api.leads.requestImage, {
      name,
      email,
      artworkId: artwork.id,
      artworkTitle: artwork.title.es,
      artworkImage: artwork.image,
      lang,
      ipHash,
    });
  } catch (error) {
    if (error instanceof ConvexError) {
      if (error.data === "rate_limited") return json({ ok: false, error: "rate_limited" }, 429);
      return json({ ok: false }, 400);
    }
    if (!IS_LOCAL) {
      console.error("imagen-obra: Convex", error);
      return json({ ok: false }, 500);
    }
    // Local only: the function isn't deployed to Convex yet — apply the same
    // limits in memory so the flow can be tried end to end.
    console.warn("imagen-obra: Convex no disponible en local, se usa el límite en memoria.");
    if (!localRateLimit(email, ipHash)) return json({ ok: false, error: "rate_limited" }, 429);
  }

  try {
    // 2) Watermarked image.
    const source = await loadImage(artwork.image, request.url);
    const jpeg = await watermarkArtwork(source, name, lang);
    const title = artwork.title[lang];
    const filename = `${slug(title)}-segundo-planes.jpg`;

    const key = process.env.RESEND_API_KEY;
    if (!key) {
      if (!IS_LOCAL) {
        console.error("imagen-obra: falta RESEND_API_KEY");
        return json({ ok: false }, 500);
      }
      const dir = path.join(process.cwd(), ".verify");
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, "imagen-obra-ultima.jpg"), jpeg);
      return json({ ok: true });
    }

    // 3) Email to the visitor.
    const from = process.env.NOTIFY_FROM;
    const replyTo = process.env.NOTIFY_TO;
    if (!from || !replyTo) {
      console.error("imagen-obra: faltan NOTIFY_FROM / NOTIFY_TO");
      return json({ ok: false }, 500);
    }
    const facts = [
      isConfirmed(artwork.medium[lang]) ? artwork.medium[lang] : null,
      artwork.year ? String(artwork.year) : null,
    ].filter(Boolean) as string[];
    const url = `${SITE_URL}${toLang(`/obra/${artwork.id}`, lang)}`;
    const es = lang === "es";
    const subject = es
      ? `«${title}» — imagen para ${name} · Segundo Planes`
      : `“${title}” — image for ${name} · Segundo Planes`;
    const lines = es
      ? [
          `Hola, ${name}:`,
          "",
          `Te enviamos la imagen de «${title}»${facts.length ? ` (${facts.join(", ")})` : ""}, preparada para ti.`,
          `Ficha de la obra: ${url}`,
          "",
          "Responde este correo para conocer precio y disponibilidad.",
          "",
          "Estudio Segundo Planes",
        ]
      : [
          `Hello ${name},`,
          "",
          `Here is the image of “${title}”${facts.length ? ` (${facts.join(", ")})` : ""}, prepared for you.`,
          `Artwork page: ${url}`,
          "",
          "Reply to this email to learn about price and availability.",
          "",
          "Studio Segundo Planes",
        ];
    const text = lines.join("\n");
    const html = `<div style="font-family:Georgia,serif;font-size:16px;line-height:1.6;color:#1a1a1a">${lines
      .map((line) =>
        line === ""
          ? "<br>"
          : line.includes(url)
            ? `<p style="margin:0">${escapeHtml(line.replace(url, ""))}<a href="${url}">${escapeHtml(url)}</a></p>`
            : `<p style="margin:0">${escapeHtml(line)}</p>`
      )
      .join("")}</div>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [email],
        reply_to: replyTo,
        subject,
        text,
        html,
        attachments: [{ filename, content: jpeg.toString("base64") }],
      }),
    });
    if (!res.ok) {
      console.error("imagen-obra: Resend respondió", res.status, await res.text());
      return json({ ok: false }, 500);
    }
    return json({ ok: true });
  } catch (error) {
    console.error("imagen-obra:", error);
    return json({ ok: false }, 500);
  }
}
