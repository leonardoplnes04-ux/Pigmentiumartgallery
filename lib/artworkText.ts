import { artworkDescriptions } from "@/data/artworkDescriptions";
import type { Artwork, Language } from "@/data/types";
import { IS_DEV, SEO_PREVIEW } from "@/lib/seoPreview";

// Text derived from an artwork's data for search engines and screen readers:
// alt text, meta description and the approved visual description. Only
// confirmed facts are used — a "por confirmar" field is left out, never shown
// as a fact. Safe to import from client and server components.

const ARTIST = "Segundo Planes";

// Many catalogue pieces still carry the placeholder "Técnica por confirmar" /
// "por confirmar" (see PROYECTO.md). An unconfirmed field is simply left out.
export const isConfirmed = (text: string) => !/por confirmar|to be confirmed/i.test(text);

export interface UsableDescription {
  text: string;
  // true when shown only because of the local preview (not yet approved).
  draft: boolean;
}

// The artwork's visual description, if it may be used. In production only
// approved ones; in `next dev` with the preview flag on, drafts too (marked
// as such) so the owner can review them in context.
export function artworkDescription(artwork: Artwork, lang: Language): UsableDescription | null {
  const entry = artworkDescriptions[artwork.id];
  if (!entry) return null;
  if (entry.approved) return { text: entry[lang], draft: false };
  if (SEO_PREVIEW && IS_DEV) return { text: entry[lang], draft: true };
  return null;
}

// "Nebulosa — Segundo Planes, Acrílico y óleo sobre lienzo, 2009"
// or the approved visual description when there is one.
export function artworkAlt(artwork: Artwork, lang: Language): string {
  const description = artworkDescription(artwork, lang);
  if (description) return description.text;
  const parts = [`${artwork.title[lang]} — ${ARTIST}`];
  if (isConfirmed(artwork.medium[lang])) parts.push(artwork.medium[lang]);
  if (artwork.year) parts.push(String(artwork.year));
  return parts.join(", ");
}

const MAX_DESCRIPTION = 160;

// Meta description of an artwork page, from confirmed data only:
// "Nebulosa (2009), Acrílico y óleo sobre lienzo, 400 × 530 cm. Obra del
// artista cubano Segundo Planes, de la generación de los 80. Solicita…"
// Sentences are dropped from the end until it fits in 160 characters.
export function artworkMetaDescription(artwork: Artwork, lang: Language): string {
  const description = artworkDescription(artwork, lang);
  if (description && description.text.length <= MAX_DESCRIPTION) return description.text;

  const head = artwork.year ? `${artwork.title[lang]} (${artwork.year})` : artwork.title[lang];
  const facts = [head];
  if (isConfirmed(artwork.medium[lang])) facts.push(artwork.medium[lang]);
  if (isConfirmed(artwork.dimensions[lang])) facts.push(artwork.dimensions[lang]);

  const sentences =
    lang === "es"
      ? [
          `${facts.join(", ")}.`,
          `Obra del artista cubano ${ARTIST}, de la generación de los 80.`,
          "Solicita información para adquirirla.",
        ]
      : [
          `${facts.join(", ")}.`,
          `Artwork by Cuban artist ${ARTIST}, of the 1980s generation.`,
          "Request information to acquire it.",
        ];

  while (sentences.length > 1 && sentences.join(" ").length > MAX_DESCRIPTION) sentences.pop();
  const text = sentences.join(" ");
  if (text.length <= MAX_DESCRIPTION) return text;
  // A single sentence still too long (very long title): cut at a word.
  return `${text.slice(0, MAX_DESCRIPTION - 1).replace(/\s+\S*$/, "")}…`;
}
