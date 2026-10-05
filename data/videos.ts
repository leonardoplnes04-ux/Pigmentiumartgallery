import type { ExhibitionVideo } from "./types";

// Array order = display order on /videos. Kept sorted by `date` descending
// (most recent first), same convention as data/exhibitions.ts.
export const videos: ExhibitionVideo[] = [
  {
    id: "video-03",
    // Walkthrough of the show (phone video sent by the user, 2026-10-04).
    title: {
      es: "Recorrido — Algoritmo, arquetipos frustrados",
      en: "Walkthrough — Algoritmo, arquetipos frustrados",
    },
    venue: "Galería Estereo, Monterrey, México",
    date: "2024",
    src: "/videos/algoritmo-arquetipos-frustrados-recorrido-2024-sin-audio.mp4",
    poster: "/images/videos/algoritmo-arquetipos-frustrados-recorrido-2024-sin-audio.jpg",
    duration: "2:12",
    exhibitionId: "exp-11",
    vertical: true,
  },
  {
    id: "video-01",
    title: {
      es: "Inauguración — Ecua-error catatónica",
      en: "Opening night — Ecua-error catatónica",
    },
    venue: "Centro Cultural Plaza Fátima, San Pedro, México",
    date: "2015",
    src: "/videos/ecua-error-catatonica-inauguracion-2015.mp4",
    poster: "/images/videos/ecua-error-catatonica-inauguracion-2015.jpg",
    duration: "3:39",
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
    poster: "/images/videos/sueno-tallado-en-espuma-inauguracion-2011.jpg",
    duration: "2:52",
    exhibitionId: "exp-06",
  },
];
