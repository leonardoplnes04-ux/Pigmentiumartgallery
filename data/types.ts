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

export interface Artwork {
  id: string;
  title: LocalizedText;
  year: number;
  medium: LocalizedText;
  dimensions: LocalizedText;
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
