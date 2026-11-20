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
    // sha256(IP + IP_SALT) de las solicitudes de imagen (/api/imagen-obra),
    // solo para limitar abusos; nunca se guarda la IP.
    ipHash: v.optional(v.string()),
  })
    .index("by_email", ["email"])
    .index("by_ipHash", ["ipHash"]),

  // Correos del boletín (pie de página). Uno por correo, sin duplicados.
  subscribers: defineTable({
    email: v.string(),
    lang: v.string(),
  }).index("by_email", ["email"]),
});
