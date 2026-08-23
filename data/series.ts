import type { Series } from "./types";

// NOTE: placeholder content — replace with real series later.
export const seriesList: Series[] = [
  {
    id: "serie-interiores",
    name: { es: "Interiores", en: "Interiors" },
    description: {
      es: "Una investigación pictórica sobre los espacios domésticos y su carga emocional.",
      en: "A pictorial investigation into domestic spaces and their emotional weight.",
    },
    coverImage: "/images/placeholder-artwork-01.svg",
  },
  {
    id: "serie-paisajes",
    name: { es: "Derivas", en: "Drifts" },
    description: {
      es: "Paisajes fragmentados que registran el movimiento y la memoria del territorio.",
      en: "Fragmented landscapes that record the movement and memory of the land.",
    },
    coverImage: "/images/placeholder-artwork-04.svg",
  },
  {
    id: "serie-aviario",
    name: { es: "Aviario", en: "Aviary" },
    description: {
      es: "Un bestiario pictórico donde aves, flora y figuras infantiles conviven en composiciones densas y multicapa.",
      en: "A pictorial bestiary where birds, flora, and child figures coexist in dense, multilayered compositions.",
    },
    coverImage: "/images/obra-guardian-del-jardin.jpg",
  },
  // Catch-all bucket for the 2026-08-23 bulk import from
  // E:\Expos-2015-2012-2011-2008-\OBRAS (134 works, 2008-2015) — the
  // source folder has no thematic grouping of its own (unlike Aviario),
  // so these aren't sorted into a named series yet. See PROYECTO.md.
  {
    id: "serie-obras-2008-2015",
    name: { es: "Obras 2008–2015", en: "Works 2008–2015" },
    description: {
      es: "Piezas del artista de este periodo, pendientes de agrupar en series temáticas definitivas.",
      en: "Pieces by the artist from this period, pending grouping into definitive thematic series.",
    },
    coverImage: "/images/obras/001.jpg",
  },
];
