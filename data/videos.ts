import type { ExhibitionVideo } from "./types";

// Array order = display order on /videos. Kept sorted by `date` descending
// (most recent first), same convention as data/exhibitions.ts.
export const videos: ExhibitionVideo[] = [
  {
    id: "video-01",
    title: {
      es: "Inauguración — Ecua-error catatónica",
      en: "Opening night — Ecua-error catatónica",
    },
    venue: "Centro Cultural Plaza Fátima, San Pedro, México",
    date: "2015",
    src: "/videos/ecua-error-catatonica-inauguracion-2015.mp4",
    exhibitionId: "exp-04",
  },
  {
    id: "video-02",
    title: {
      es: "Inauguración — Sueño tallado en espuma",
      en: "Opening night — Sueño tallado en espuma",
    },
    venue: "Monterrey, México",
    date: "2011",
    src: "/videos/sueno-tallado-en-espuma-inauguracion-2011.mp4",
    exhibitionId: "exp-06",
  },
];
