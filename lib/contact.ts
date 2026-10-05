// Validation + email composition for the /contacto lead form. Leads are
// delivered with no third-party service: submitting opens the visitor's own
// email app (mailto:) addressed to the artist, with every field pre-written.
import { SITE_URL } from "@/lib/seo";

export const CONTACT_INTERESTS = ["purchase", "commission", "exhibition", "press", "other"] as const;
export type ContactInterest = (typeof CONTACT_INTERESTS)[number];

export interface ContactLead {
  name: string;
  email: string;
  phone: string;
  interest: ContactInterest | "";
  artwork: string;
  // Public path of the artwork photo when the visitor arrived from a
  // "Consultar" button (/contacto?obra=…&img=/images/…). Shown as a
  // thumbnail in the form and in the lead email.
  artworkImage: string;
  message: string;
  // Honeypot: hidden from people, filled in by naive bots.
  website: string;
}

export type ContactField = "name" | "email" | "message" | "interest";
export type ContactErrors = Partial<Record<ContactField, true>>;

export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 2000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateLead(lead: ContactLead): ContactErrors {
  const errors: ContactErrors = {};
  if (lead.name.trim().length < 2) errors.name = true;
  if (!EMAIL_RE.test(lead.email.trim())) errors.email = true;
  if (!CONTACT_INTERESTS.includes(lead.interest as ContactInterest)) errors.interest = true;
  const message = lead.message.trim();
  if (message.length < MESSAGE_MIN || message.length > MESSAGE_MAX) errors.message = true;
  return errors;
}

// Only our own artwork photos are accepted as a reference image.
export function isArtworkImagePath(value: string): boolean {
  return /^\/images\/[\w\-./%]+\.(jpe?g|png|webp)$/i.test(value) && !value.includes("..");
}

// Labels for the artist's inbox — always Spanish, whatever the UI language.
const INTEREST_LABELS_ES: Record<ContactInterest, string> = {
  purchase: "Adquirir una obra",
  commission: "Encargo",
  exhibition: "Exposición o colaboración",
  press: "Prensa",
  other: "Otro",
};

export function buildLeadEmail(lead: ContactLead, siteName: string) {
  const interest = INTEREST_LABELS_ES[lead.interest as ContactInterest] ?? "Contacto";
  const subject = `${interest} — ${lead.name.trim()} · ${siteName}`;
  const lines = [
    `Nombre: ${lead.name.trim()}`,
    `Correo: ${lead.email.trim()}`,
    `Teléfono / WhatsApp: ${lead.phone.trim() || "—"}`,
    `Interés: ${interest}`,
    `Obra de interés: ${lead.artwork.trim() || "—"}`,
  ];
  if (isArtworkImagePath(lead.artworkImage)) lines.push(`Imagen de la obra: ${SITE_URL}${lead.artworkImage}`);
  const body = `${lines.join("\n")}\n\nMensaje:\n${lead.message.trim()}\n\n— Enviado desde el formulario de ${SITE_URL}/contacto`;
  return { subject, body };
}

export function mailtoUrl(to: string, subject: string, body: string) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
