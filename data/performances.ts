import type { Performance } from "./types";

// Array order = display order on /performance. Kept sorted chronologically
// (earliest first) since these are early-career pieces (1983-1989) — the
// opposite convention from data/exhibitions.ts (which sorts newest first).
export const performances: Performance[] = [
  {
    id: "perf-01",
    title: "Ensayo sobre el sueño (asesinando lo onírico)",
    year: "1983",
    venue: "Instituto Superior del Arte (ISA), La Habana, Cuba",
    description: {
      es: "Performance de Segundo Planes.",
      en: "Performance by Segundo Planes.",
    },
  },
  {
    id: "perf-02",
    title: "Una caja de cristal encima del cielo",
    year: "1984",
    venue: "Galería L, La Habana, Cuba",
    description: {
      es: "Performance de Segundo Planes.",
      en: "Performance by Segundo Planes.",
    },
  },
  {
    id: "perf-03",
    title: "La vida es una mierda y el mundo está loco (Anti-tesis)",
    year: "1989",
    venue: "Instituto Superior del Arte, La Habana, Cuba",
    description: {
      es: "Performance realizada como tesis de graduación del Instituto Superior del Arte.",
      en: "Performance staged as the artist's graduation thesis at the Instituto Superior del Arte.",
    },
  },
];
