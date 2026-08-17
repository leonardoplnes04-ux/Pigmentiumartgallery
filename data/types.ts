export type ArtworkStatus = "available" | "sold" | "inquire";

export interface Artwork {
  id: string;
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  image: string;
  seriesId: string;
  status: ArtworkStatus;
}

export interface Series {
  id: string;
  name: string;
  description: string;
  coverImage: string;
}

export interface Exhibition {
  id: string;
  title: string;
  venue: string;
  date: string;
  description: string;
  link?: string;
}

export interface Artist {
  name: string;
  tagline: string;
  shortBio: string;
  longBio: string;
  portraitImage: string;
  email: string;
  socials: {
    instagram?: string;
    twitter?: string;
  };
}
