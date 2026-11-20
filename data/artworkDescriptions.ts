// Visual descriptions of each artwork (what can be seen: figures, palette,
// composition, material), drafted from the photographs and PENDING the
// owner's review. Only entries with `approved: true` are ever published
// (alt text, meta description, JSON-LD and, with the preview flag, a visible
// "Sobre la obra" paragraph). To approve one, change `approved` to `true`.
// Review list: docs/seo/revision-descripciones.md.

export interface ArtworkDescription {
  es: string;
  en: string;
  approved: boolean;
}

export const artworkDescriptions: Record<string, ArtworkDescription> = {};
