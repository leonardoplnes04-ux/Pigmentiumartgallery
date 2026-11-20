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
  // Titles ≤ 65 characters and descriptions ≤ 160 (checked by
  // scripts/seo-lengths.mjs). Facts come from data/artist.ts.
  home: {
    title: {
      es: `${X} — Artista cubano | Arte contemporáneo cubano`,
      en: `${X} — Cuban visual artist | Contemporary Cuban art`,
    },
    description: {
      es: `Sitio oficial de ${X} (Pinar del Río, Cuba, 1965), artista de la generación de los 80 y precursor del performance en Cuba. ${artist.tagline.es}.`,
      en: `Official site of ${X} (Pinar del Río, Cuba, 1965), artist of the 1980s generation and pioneer of performance art in Cuba. ${artist.tagline.en}.`,
    },
  },
  works: {
    title: {
      es: `Obra de ${X} — Pintura contemporánea cubana`,
      en: `Artwork by ${X} — Contemporary Cuban painting`,
    },
    description: {
      es: `Catálogo de pintura de ${X}, artista cubano de la generación de los 80: obras disponibles, técnica, medidas y año.`,
      en: `Painting catalogue of ${X}, Cuban artist of the 1980s generation: available works, technique, dimensions and year.`,
    },
  },
  about: {
    title: { es: `Biografía — ${X}`, en: `Biography — ${X}` },
    description: {
      es: `Biografía de ${X} (Pinar del Río, Cuba, 1965): formación en la ENA y el ISA, exposiciones, bienales, premios y colecciones.`,
      en: `Biography of ${X} (Pinar del Río, Cuba, 1965): training at the ENA and ISA, exhibitions, biennials, awards and collections.`,
    },
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
