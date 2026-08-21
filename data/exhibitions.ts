import type { Exhibition } from "./types";

// NOTE: exp-01..03 below are still placeholder content — replace with real
// exhibitions/press later. exp-04 (Ecua-error catatónica) is the first real
// exhibition entry.
export const exhibitions: Exhibition[] = [
  {
    id: "exp-01",
    title: { es: "Umbral — Muestra individual", en: "Threshold — Solo Show" },
    venue: "Galería Sur, Ciudad de México",
    date: "2026-03",
    description: {
      es: "Primera exhibición individual de la serie Interiores.",
      en: "First solo exhibition of the Interiors series.",
    },
    artistId: "segundo-planes",
  },
  {
    id: "exp-02",
    title: { es: "Derivas — Muestra colectiva", en: "Drifts — Group Show" },
    venue: "Espacio Traspatio",
    date: "2025-09",
    description: {
      es: "Selección de obras de la serie Derivas en una muestra colectiva de paisaje contemporáneo.",
      en: "A selection of works from the Drifts series in a group exhibition of contemporary landscape.",
    },
    artistId: "segundo-planes",
  },
  {
    id: "exp-03",
    title: { es: "Entrevista en Revista Lienzo", en: "Interview in Revista Lienzo" },
    venue: "Revista Lienzo",
    date: "2025-06",
    description: {
      es: "Conversación sobre memoria, color y proceso pictórico.",
      en: "A conversation about memory, color, and pictorial process.",
    },
    link: "https://example.com/entrevista-lienzo",
    artistId: "segundo-planes",
  },
  {
    id: "exp-04",
    // Title kept untranslated: it's a wordplay/invented term ("ecuación" +
    // "error"), not a descriptive phrase — translating it would lose the pun.
    title: { es: "Ecua-error catatónica", en: "Ecua-error catatónica" },
    venue: "Centro Cultural Plaza Fátima, Monterrey, México",
    date: "2015",
    description: {
      es: "Exposición de Segundo Planes en el Centro Cultural Plaza Fátima.",
      en: "Exhibition by Segundo Planes at Centro Cultural Plaza Fátima.",
    },
    image: "/images/expo-ecua-error-catatonica.jpg",
    artistId: "segundo-planes",
  },
  {
    id: "exp-05",
    // Title kept untranslated for the same reason as exp-04: it's the
    // exhibition's own poetic title, not a plain descriptive phrase.
    title: { es: "Lemas e himnos mutilados", en: "Lemas e himnos mutilados" },
    venue: "GE Galería, Monterrey, México",
    date: "2012",
    description: {
      es: "Exposición de Segundo Planes en GE Galería.",
      en: "Exhibition by Segundo Planes at GE Galería.",
    },
    image: "/images/expo-lemas-himnos-mutilados.jpg",
    artistId: "segundo-planes",
  },
  {
    id: "exp-06",
    // Title kept untranslated, same reasoning as exp-04/exp-05.
    title: { es: "Sueño tallado en espuma", en: "Sueño tallado en espuma" },
    venue: "GE Galería, Monterrey, México",
    date: "2011",
    description: {
      es: "Exposición de Segundo Planes en GE Galería.",
      en: "Exhibition by Segundo Planes at GE Galería.",
    },
    image: "/images/expo-sueno-tallado-en-espuma.jpg",
    artistId: "segundo-planes",
  },
  {
    id: "exp-07",
    title: { es: "Insomnio", en: "Insomnia" },
    venue: "Centro de las Artes Fundidora, Monterrey, México",
    date: "2006",
    description: {
      es: "Exposición de Segundo Planes en el Centro de las Artes Fundidora.",
      en: "Exhibition by Segundo Planes at Centro de las Artes Fundidora.",
    },
    image: "/images/expo-insomnio.jpg",
    artistId: "segundo-planes",
  },
];
