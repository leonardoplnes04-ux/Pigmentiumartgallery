import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Mensajes del formulario de /contacto (incluye las consultas desde "Consultar").
  leads: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    interest: v.string(),
    artwork: v.string(),
    artworkImage: v.string(),
    message: v.string(),
    lang: v.string(),
    // true cuando el aviso por correo al artista salió bien.
    notified: v.boolean(),
  }).index("by_email", ["email"]),

  // Correos del boletín (pie de página). Uno por correo, sin duplicados.
  subscribers: defineTable({
    email: v.string(),
    lang: v.string(),
  }).index("by_email", ["email"]),
});
