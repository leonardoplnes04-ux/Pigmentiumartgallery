export type ArtworkStatus = "available" | "sold" | "inquire";

export type Language = "es" | "en";

// Editorial text that exists in both languages. Non-linguistic fields
// (ids, numbers, image paths, proper names) stay plain strings — see
// docs/specs/2026-08-17-language-toggle-design.md for the full split.
export interface LocalizedText {
  es: string;
  en: string;
}

export interface CriticReview {
  critic: LocalizedText;
  role: LocalizedText;
  quote: LocalizedText;
}

// One photo in an exhibition's full gallery (see data/exhibitionGalleries.ts).
// `alt` doubles as a caption where the source filename carried a piece
// title; "Sin título"/"Untitled" where it didn't.
export interface ExhibitionGalleryImage {
  src: string;
  alt: LocalizedText;
}

export interface Artwork {
  id: string;
  title: LocalizedText;
  year: number;
  medium: LocalizedText;
  dimensions: LocalizedText;
  // Structured, machine-usable measurements — presence gates the wall
  // simulator (see docs/specs/2026-08-17-wall-simulator-design.md). Kept
  // separate from `dimensions` (free display text, handles "por
  // confirmar" placeholders) since it must always be real numbers.
  realDimensionsCm?: { width: number; height: number };
  image: string;
  additionalImages?: string[];
  seriesId: string;
  status: ArtworkStatus;
  criticReviews?: CriticReview[];
}

export interface Series {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  coverImage: string;
}

export interface Exhibition {
  id: string;
  title: LocalizedText;
  venue: string;
  date: string;
  description: LocalizedText;
  link?: string;
  // Optional identifying photo (install shot, poster, etc.), shown to the
  // right of the entry when present.
  image?: string;
  // Which gallery artist this exhibition belongs to — see data/galleryArtists.ts.
  artistId: string;
}

// One photo in a performance's full gallery (see data/performanceGalleries.ts).
// Same shape as ExhibitionGalleryImage, kept as its own type for domain
// clarity (mirrors the Exhibition/Performance split).
export interface PerformanceGalleryImage {
  src: string;
  alt: LocalizedText;
}

export interface Performance {
  id: string;
  // Kept untranslated, same reasoning as Exhibition.title: these are the
  // artist's own poetic/conceptual titles, not descriptive phrases.
  title: string;
  year: string;
  venue?: string;
  description: LocalizedText;
}

// A video documenting an exhibition (inauguration night, walkthrough,
// etc.), shown on /videos. `exhibitionId` is optional — links back to the
// matching entry in data/exhibitions.ts when one exists, so the video card
// can deep-link to that exhibition's page.
export interface ExhibitionVideo {
  id: string;
  title: LocalizedText;
  venue: string;
  date: string;
  src: string;
  exhibitionId?: string;
}

// A minimal entity for grouping exhibitions by artist on /exposiciones.
// Intentionally NOT the same as `Artist` below (the single-artist profile
// used by Hero/Sobre mí/etc.) — this is scoped to the exhibitions page only,
// so the gallery can list more artists there without restructuring the rest
// of the site. See docs/specs decision in PROYECTO.md bitácora, 2026-08-17.
export interface GalleryArtist {
  id: string;
  name: string;
}

export interface Artist {
  name: string;
  tagline: LocalizedText;
  shortBio: LocalizedText;
  longBio: LocalizedText;
  portraitImage: string;
  heroImage: string;
  heroVideo: string;
  email: string;
  socials: {
    instagram?: string;
    twitter?: string;
  };
}
