import type { Exhibition } from "./types";

// NOTE: placeholder content — replace with real exhibitions/press later.
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
];
