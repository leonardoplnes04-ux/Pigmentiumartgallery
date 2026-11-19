import type { LocalizedText } from "./types";
import { artist } from "./artist";
import { site } from "./site";

// Titles and descriptions of the section pages, per language. The Spanish
// strings are the ones the site already published; the English ones mirror
// them. `X` below is always the artist's name.

export type SectionKey =
  | "home"
  | "works"
  | "about"
  | "exhibitions"
  | "performance"
  | "videos"
  | "contact";

const X = artist.name;

export const seoText: Record<SectionKey, { title: LocalizedText; description: LocalizedText }> = {
  home: {
    title: { es: `${X} — Artista plástico cubano`, en: `${X} — Cuban visual artist` },
    description: {
      es: `${artist.shortBio.es} ${artist.tagline.es}.`,
      en: `${artist.shortBio.en} ${artist.tagline.en}.`,
    },
  },
  works: {
    title: {
      es: `Obra de ${X} — Pintura cubana contemporánea`,
      en: `Artwork by ${X} — Contemporary Cuban painting`,
    },
    description: {
      es: `Catálogo de obra de ${X}: pinturas y piezas disponibles.`,
      en: `Catalogue of artwork by ${X}: paintings and available pieces.`,
    },
  },
  about: {
    title: { es: `Biografía — ${X}`, en: `Biography — ${X}` },
    description: { es: artist.shortBio.es, en: artist.shortBio.en },
  },
  exhibitions: {
    title: { es: `Exposiciones — ${X}`, en: `Exhibitions — ${X}` },
    description: {
      es: `Exposiciones y muestras de ${X}.`,
      en: `Exhibitions and shows by ${X}.`,
    },
  },
  performance: {
    title: { es: `Performance — ${X}`, en: `Performance — ${X}` },
    description: { es: `Performances de ${X}.`, en: `Performances by ${X}.` },
  },
  videos: {
    title: { es: `Videos — ${X}`, en: `Videos — ${X}` },
    description: {
      es: `Videos de exposiciones e inauguraciones de ${X}.`,
      en: `Videos of exhibitions and openings by ${X}.`,
    },
  },
  contact: {
    title: {
      es: `Contacto y adquisición de obra — ${X}`,
      en: `Contact and artwork acquisition — ${X}`,
    },
    description: {
      es: `Adquirir obra, encargos, exposiciones y prensa: contacta a ${X}, ${site.name}.`,
      en: `Acquire artwork, commissions, exhibitions and press: contact ${X}, ${site.name}.`,
    },
  },
};

// Names used in the breadcrumb trails (BreadcrumbList JSON-LD).
export const crumbs = {
  home: { es: "Inicio", en: "Home" },
  works: { es: "Obra", en: "Works" },
  exhibitions: { es: "Exposiciones", en: "Exhibitions" },
} satisfies Record<string, LocalizedText>;
