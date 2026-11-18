import { v } from "convex/values";
import { internal } from "./_generated/api";
import { internalAction, internalMutation, internalQuery, mutation } from "./_generated/server";

const INTERESTS = ["purchase", "commission", "exhibition", "press", "other"];
const INTEREST_LABELS_ES: Record<string, string> = {
  purchase: "Adquirir una obra",
  commission: "Encargo",
  exhibition: "Exposición o colaboración",
  press: "Prensa",
  other: "Otro",
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
    if (!INTERESTS.includes(a.interest)) throw new Error("invalid_interest");
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
    const text = `${lines.join("\n")}\n\nMensaje:\n${lead.message}\n\n— Enviado desde el formulario de ${siteUrl}/contacto`;

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
