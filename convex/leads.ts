import { ConvexError, v } from "convex/values";
import { internal } from "./_generated/api";
import { internalAction, internalMutation, internalQuery, mutation } from "./_generated/server";

const INTERESTS = ["purchase", "commission", "exhibition", "press", "other", "image_request"];
const INTEREST_LABELS_ES: Record<string, string> = {
  purchase: "Adquirir una obra",
  commission: "Encargo",
  exhibition: "Exposición o colaboración",
  press: "Prensa",
  other: "Otro",
  image_request: "Solicitó imagen de obra",
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_PER_HOUR = 5;

// Mismas reglas que lib/contact.ts, repetidas aquí porque el navegador no es de fiar.
export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    interest: v.string(),
    artwork: v.string(),
    artworkImage: v.string(),
    message: v.string(),
    lang: v.string(),
  },
  handler: async (ctx, a) => {
    const name = a.name.trim();
    const email = a.email.trim().toLowerCase();
    const message = a.message.trim();
    if (name.length < 2 || name.length > 120) throw new Error("invalid_name");
    if (!EMAIL_RE.test(email) || email.length > 200) throw new Error("invalid_email");
    // image_request only comes from requestImage, never from the contact form.
    if (!INTERESTS.includes(a.interest) || a.interest === "image_request") throw new Error("invalid_interest");
    if (message.length < 10 || message.length > 2000) throw new Error("invalid_message");

    const hourAgo = Date.now() - 60 * 60 * 1000;
    const recent = await ctx.db
      .query("leads")
      .withIndex("by_email", (q) => q.eq("email", email))
      .filter((q) => q.gt(q.field("_creationTime"), hourAgo))
      .collect();
    if (recent.length >= MAX_PER_HOUR) throw new Error("rate_limited");

    const id = await ctx.db.insert("leads", {
      name,
      email,
      phone: a.phone.trim().slice(0, 60),
      interest: a.interest,
      artwork: a.artwork.trim().slice(0, 200),
      artworkImage: a.artworkImage.trim().slice(0, 300),
      message,
      lang: a.lang === "en" ? "en" : "es",
      notified: false,
    });
    await ctx.scheduler.runAfter(0, internal.leads.notifyArtist, { id });
    return id;
  },
});

const IMAGE_MAX_PER_EMAIL_DAY = 3;
const IMAGE_MAX_PER_IP_HOUR = 10;

// "Recibir imagen por correo" (ficha de obra). La llama solo la ruta
// app/api/imagen-obra/route.ts, que ya resolvió la obra por su id. Mismas
// validaciones de nombre y correo que `submit`; límites: 3 por correo cada
// 24 h y 10 por ipHash cada hora. El artista recibe el aviso como un lead más.
// ConvexError (no Error) para que "rate_limited" llegue intacto a la ruta
// también en producción, donde Convex oculta los mensajes de Error.
export const requestImage = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    artworkId: v.string(),
    artworkTitle: v.string(),
    artworkImage: v.string(),
    lang: v.string(),
    ipHash: v.string(),
  },
  handler: async (ctx, a) => {
    const name = a.name.trim();
    const email = a.email.trim().toLowerCase();
    if (name.length < 2 || name.length > 120) throw new ConvexError("invalid_name");
    if (!EMAIL_RE.test(email) || email.length > 200) throw new ConvexError("invalid_email");
    if (!a.artworkId.trim() || !a.ipHash.trim()) throw new ConvexError("invalid_request");

    const now = Date.now();
    const dayAgo = now - 24 * 60 * 60 * 1000;
    const byEmail = await ctx.db
      .query("leads")
      .withIndex("by_email", (q) => q.eq("email", email))
      .filter((q) =>
        q.and(q.gt(q.field("_creationTime"), dayAgo), q.eq(q.field("interest"), "image_request"))
      )
      .collect();
    if (byEmail.length >= IMAGE_MAX_PER_EMAIL_DAY) throw new ConvexError("rate_limited");

    const hourAgo = now - 60 * 60 * 1000;
    const byIp = await ctx.db
      .query("leads")
      .withIndex("by_ipHash", (q) => q.eq("ipHash", a.ipHash))
      .filter((q) => q.gt(q.field("_creationTime"), hourAgo))
      .collect();
    if (byIp.length >= IMAGE_MAX_PER_IP_HOUR) throw new ConvexError("rate_limited");

    const title = a.artworkTitle.trim().slice(0, 160);
    const id = await ctx.db.insert("leads", {
      name: name.slice(0, 120),
      email,
      phone: "",
      interest: "image_request",
      artwork: `${title} · ref. ${a.artworkId.trim().slice(0, 40)}`,
      artworkImage: a.artworkImage.trim().slice(0, 300),
      message: `Solicitó la imagen de «${title}» desde la ficha de la obra.`,
      lang: a.lang === "en" ? "en" : "es",
      notified: false,
      ipHash: a.ipHash.slice(0, 128),
    });
    await ctx.scheduler.runAfter(0, internal.leads.notifyArtist, { id });
    return { ok: true as const };
  },
});

export const getForNotify = internalQuery({
  args: { id: v.id("leads") },
  handler: async (ctx, { id }) => ctx.db.get(id),
});

export const markNotified = internalMutation({
  args: { id: v.id("leads") },
  handler: async (ctx, { id }) => {
    await ctx.db.patch(id, { notified: true });
  },
});

// Aviso por correo (Resend). Las llaves viven en las variables de entorno del
// deployment de Convex: RESEND_API_KEY, NOTIFY_FROM, NOTIFY_TO, SITE_URL.
export const notifyArtist = internalAction({
  args: { id: v.id("leads") },
  handler: async (ctx, { id }) => {
    const key = process.env.RESEND_API_KEY;
    const from = process.env.NOTIFY_FROM;
    const to = process.env.NOTIFY_TO;
    if (!key || !from || !to) {
      console.error("notifyArtist: faltan RESEND_API_KEY / NOTIFY_FROM / NOTIFY_TO");
      return;
    }
    const lead = await ctx.runQuery(internal.leads.getForNotify, { id });
    if (!lead) return;

    const siteUrl = process.env.SITE_URL ?? "";
    const interest = INTEREST_LABELS_ES[lead.interest] ?? "Contacto";
    const lines = [
      `Nombre: ${lead.name}`,
      `Correo: ${lead.email}`,
      `Teléfono / WhatsApp: ${lead.phone || "—"}`,
      `Interés: ${interest}`,
      `Obra de interés: ${lead.artwork || "—"}`,
    ];
    if (lead.artworkImage && siteUrl) lines.push(`Imagen de la obra: ${siteUrl}${lead.artworkImage}`);
    const origin =
      lead.interest === "image_request"
        ? `«Recibir imagen por correo» en la ficha de la obra (${siteUrl})`
        : `el formulario de ${siteUrl}/contacto`;
    const text = `${lines.join("\n")}\n\nMensaje:\n${lead.message}\n\n— Enviado desde ${origin}`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: lead.email,
        subject: `${interest} — ${lead.name} · Segundo Planes`,
        text,
      }),
    });
    if (!res.ok) {
      console.error("notifyArtist: Resend respondió", res.status, await res.text());
      return;
    }
    await ctx.runMutation(internal.leads.markNotified, { id });
  },
});
