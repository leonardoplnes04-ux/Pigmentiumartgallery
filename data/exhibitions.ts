import type { Exhibition } from "./types";

// exp-04 (Ecua-error catatónica) is the first real exhibition entry.
// exp-01..03 (placeholders "Umbral"/"Derivas"/"Entrevista en Revista
// Lienzo") were removed 2026-08-23 — invented examples that never
// corresponded to the actual project, not real exhibitions to replace
// later. If a future non-gallery entry (interview, press mention) is
// needed again, add it as a real one instead of reviving these ids.
//
// Array order = display order on both `/exposiciones` and the home page's
// exhibitions section (neither sorts at render time — see PROYECTO.md
// bitácora, 2026-08-23). Entries are kept sorted by `date` descending
// (most recent first); `id` reflects the order each one was *added*, not
// its year, so a newly added exhibition won't necessarily go at the end
// of the array — slot it into its chronological position instead.
export const exhibitions: Exhibition[] = [
  {
    id: "exp-11",
    // Title kept untranslated: poetic/conceptual pairing, not a plain
    // descriptive phrase — same reasoning as exp-04/05/06.
    title: { es: "Algoritmo, arquetipos frustrados", en: "Algoritmo, arquetipos frustrados" },
    venue: "Galería Estereo, Monterrey, México",
    date: "2024",
    description: {
      es: "Exposición de Segundo Planes en Galería Estereo.",
      en: "Exhibition by Segundo Planes at Galería Estereo.",
    },
    image: "/images/expo-algoritmo-arquetipos-frustrados.jpg",
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
    id: "exp-09",
    // Plain descriptive metaphor, not wordplay/an invented term — same
    // reasoning as "Memorias del circo" → "Memories of the Circus" (exp-08),
    // so it's translated.
    title: { es: "Pliegues de la vejez", en: "Folds of Old Age" },
    venue: "GE Galería, Monterrey, México",
    date: "2008",
    description: {
      es: "Exposición de Segundo Planes en GE Galería.",
      en: "Exhibition by Segundo Planes at GE Galería.",
    },
    image: "/images/expo-pliegues-de-la-vejez.jpg",
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
  {
    id: "exp-08",
    // "Memorias del circo" is a plain descriptive phrase (not a wordplay/
    // invented term like exp-04/05/06's titles), so it's translated —
    // same reasoning as "Insomnio" → "Insomnia" for exp-07.
    title: { es: "Memorias del circo", en: "Memories of the Circus" },
    venue: "Instituto de América, Santa Fe, Granada, España",
    date: "2003",
    description: {
      es: "Exposición de Segundo Planes en el Instituto de América, Colección Santa Fe.",
      en: "Exhibition by Segundo Planes at the Instituto de América, Colección Santa Fe.",
    },
    image: "/images/expo-memorias-del-circo.jpg",
    artistId: "segundo-planes",
  },
  {
    id: "exp-10",
    // Plain statement, not wordplay — translated, same reasoning as
    // exp-07/exp-08.
    title: { es: "Soy un estúpido", en: "I Am a Fool" },
    venue: "Castillo de la Fuerza, La Habana, Cuba",
    date: "1989",
    description: {
      es: "Exposición de Segundo Planes en el Castillo de la Fuerza.",
      en: "Exhibition by Segundo Planes at Castillo de la Fuerza.",
    },
    image: "/images/expo-soy-un-estupido.jpg",
    artistId: "segundo-planes",
  },
];
