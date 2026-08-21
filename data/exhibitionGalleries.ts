import type { ExhibitionGalleryImage } from "./types";

// Full photo set for an exhibition's detail page, keyed by Exhibition.id.
// Only exhibitions with an entry here get a clickable detail page — see
// lib/exhibitions.ts. Images are numbered 01..NN in the order the artist
// himself numbered the source files in the exhibition's folder; two files
// didn't fit that numbering (a stray un-prefixed "19.jpg" duplicate of
// 019, and a generic camera file "IMG_0183.JPG" with no title info) and
// were placed right after their nearest numbered neighbor / at the end,
// respectively. Most works past #24 had no descriptive text in the
// original filename (just dimensions or nothing), so they're "Sin
// título"/"Untitled" — not a placeholder, that's genuinely all the source
// folder recorded for them.
export const exhibitionGalleries: Record<string, ExhibitionGalleryImage[]> = {
  "exp-04": [
    { src: "/images/exposiciones/ecua-error-catatonica/01.jpg", alt: { es: "Vista general de una de las salas de la exposición", en: "General view of one of the exhibition's rooms" } },
    { src: "/images/exposiciones/ecua-error-catatonica/02.jpg", alt: { es: "Ecua-error (políptico)", en: "Ecua-error (polyptych)" } },
    { src: "/images/exposiciones/ecua-error-catatonica/03.jpg", alt: { es: "Ecua-error", en: "Ecua-error" } },
    { src: "/images/exposiciones/ecua-error-catatonica/04.jpg", alt: { es: "Estrellas verdes", en: "Green Stars" } },
    { src: "/images/exposiciones/ecua-error-catatonica/05.jpg", alt: { es: "Ecua-error", en: "Ecua-error" } },
    { src: "/images/exposiciones/ecua-error-catatonica/06.jpg", alt: { es: "Cardinales suicidas", en: "Suicidal Cardinals" } },
    { src: "/images/exposiciones/ecua-error-catatonica/07.jpg", alt: { es: "Estrellas maduras", en: "Mature Stars" } },
    { src: "/images/exposiciones/ecua-error-catatonica/08.jpg", alt: { es: "Daltónico", en: "Colorblind" } },
    { src: "/images/exposiciones/ecua-error-catatonica/09.jpg", alt: { es: "Daltónico 1 (detalle)", en: "Colorblind 1 (detail)" } },
    { src: "/images/exposiciones/ecua-error-catatonica/10.jpg", alt: { es: "Daltónico 2", en: "Colorblind 2" } },
    { src: "/images/exposiciones/ecua-error-catatonica/11.jpg", alt: { es: "Daltónico 3", en: "Colorblind 3" } },
    { src: "/images/exposiciones/ecua-error-catatonica/12.jpg", alt: { es: "Daltónico 4", en: "Colorblind 4" } },
    { src: "/images/exposiciones/ecua-error-catatonica/13.jpg", alt: { es: "Daltónico 5 y 6", en: "Colorblind 5 and 6" } },
    { src: "/images/exposiciones/ecua-error-catatonica/14.jpg", alt: { es: "Perla bomba", en: "Pearl Bomb" } },
    { src: "/images/exposiciones/ecua-error-catatonica/15.jpg", alt: { es: "Ecos", en: "Echoes" } },
    { src: "/images/exposiciones/ecua-error-catatonica/16.jpg", alt: { es: "Ecos (detalle)", en: "Echoes (detail)" } },
    { src: "/images/exposiciones/ecua-error-catatonica/17.jpg", alt: { es: "El viaje", en: "The Journey" } },
    { src: "/images/exposiciones/ecua-error-catatonica/18.jpg", alt: { es: "El viaje", en: "The Journey" } },
    { src: "/images/exposiciones/ecua-error-catatonica/19.jpg", alt: { es: "Cazador de estrellas", en: "Star Hunter" } },
    { src: "/images/exposiciones/ecua-error-catatonica/20.jpg", alt: { es: "Cazador de estrellas", en: "Star Hunter" } },
    { src: "/images/exposiciones/ecua-error-catatonica/21.jpg", alt: { es: "Invierno", en: "Winter" } },
    { src: "/images/exposiciones/ecua-error-catatonica/22.jpg", alt: { es: "Nostalgia", en: "Nostalgia" } },
    { src: "/images/exposiciones/ecua-error-catatonica/23.jpg", alt: { es: "Vista general de sala #1", en: "General view of room #1" } },
    { src: "/images/exposiciones/ecua-error-catatonica/24.jpg", alt: { es: "Vista general", en: "General view" } },
    { src: "/images/exposiciones/ecua-error-catatonica/25.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/ecua-error-catatonica/26.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/ecua-error-catatonica/27.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/ecua-error-catatonica/28.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/ecua-error-catatonica/29.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/ecua-error-catatonica/30.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/ecua-error-catatonica/31.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/ecua-error-catatonica/32.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/ecua-error-catatonica/33.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/ecua-error-catatonica/34.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/ecua-error-catatonica/35.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/ecua-error-catatonica/36.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/ecua-error-catatonica/37.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/ecua-error-catatonica/38.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/ecua-error-catatonica/39.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/ecua-error-catatonica/40.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/ecua-error-catatonica/41.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/ecua-error-catatonica/42.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/ecua-error-catatonica/43.jpg", alt: { es: "Sin título", en: "Untitled" } },
  ],
  // Source folder here numbered every file 1..34 with no gaps or
  // duplicates, so sorting was unambiguous — no leftover files like exp-04.
  "exp-05": [
    { src: "/images/exposiciones/lemas-himnos-mutilados/01.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/02.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/03.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/04.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/05.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/06.jpg", alt: { es: "Entre el día y la noche", en: "Between Day and Night" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/07.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/08.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/09.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/10.jpg", alt: { es: "Constelaciones", en: "Constellations" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/11.jpg", alt: { es: "Constelaciones", en: "Constellations" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/12.jpg", alt: { es: "Constelaciones", en: "Constellations" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/13.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/14.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/15.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/16.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/17.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/18.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/19.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/20.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/21.jpg", alt: { es: "Perla bomba", en: "Pearl Bomb" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/22.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/23.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/24.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/25.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/26.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/27.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/28.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/29.jpg", alt: { es: "Constelaciones", en: "Constellations" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/30.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/31.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/32.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/33.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/lemas-himnos-mutilados/34.jpg", alt: { es: "Sin título", en: "Untitled" } },
  ],
  // Source folder for this one ("3-Nueva carpeta") wasn't a clean
  // per-exhibition folder like exp-04/05 — it mixed files #837-877 (this
  // 2011 show, confirmed by "GE GALERIA.MONTERREY" in #866's filename)
  // with unrelated older material (works dated 2008-2010 filed right
  // after #877, and #952-954 which are explicitly a *different* show,
  // "Memorias del circo" in Granada, Spain, plus an unlabeled batch
  // #955-1001 and a stray .doc). Only #837-877 is included here; the
  // rest was left out rather than risk misattributing another
  // exhibition's photos to this one. Piece titles are kept untranslated
  // in English (poetic/invented Spanish phrases, same reasoning as the
  // exhibition title itself) — only the generic install-view/untitled
  // captions are translated.
  "exp-06": [
    { src: "/images/exposiciones/sueno-tallado-en-espuma/01.png", alt: { es: "Vista general de la exposición", en: "General view of the exhibition" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/02.png", alt: { es: "Vista general de la exposición", en: "General view of the exhibition" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/03.png", alt: { es: "Vista general de la exposición", en: "General view of the exhibition" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/04.png", alt: { es: "Vista general de la exposición", en: "General view of the exhibition" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/05.jpg", alt: { es: "Vista de la exposición", en: "View of the exhibition" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/06.jpg", alt: { es: "Vista de la exposición", en: "View of the exhibition" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/07.jpg", alt: { es: "Vista de la exposición", en: "View of the exhibition" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/08.jpg", alt: { es: "Vista de la exposición", en: "View of the exhibition" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/09.jpg", alt: { es: "Vista de la exposición", en: "View of the exhibition" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/10.jpg", alt: { es: "Nietzsche y Rimbaud diletando sobre muñecas", en: "Nietzsche y Rimbaud diletando sobre muñecas" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/11.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/12.jpg", alt: { es: "Vista de la exposición", en: "View of the exhibition" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/13.jpg", alt: { es: "Pérdida de vista, camelia de luz blanda", en: "Pérdida de vista, camelia de luz blanda" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/14.jpg", alt: { es: "Entorno al aliento", en: "Entorno al aliento" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/15.jpg", alt: { es: "Vista de la exposición", en: "View of the exhibition" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/16.jpg", alt: { es: "Profundo sostén de las sombras", en: "Profundo sostén de las sombras" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/17.jpg", alt: { es: "Legendario colmillo de tiempo, en mi sueño tu venir", en: "Legendario colmillo de tiempo, en mi sueño tu venir" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/18.jpg", alt: { es: "Siendo de la memoria el cielo", en: "Siendo de la memoria el cielo" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/19.jpg", alt: { es: "Naufra-go", en: "Naufra-go" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/20.jpg", alt: { es: "Cada espuela en el tiempo, evoca la palabra olvido del decir", en: "Cada espuela en el tiempo, evoca la palabra olvido del decir" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/21.jpg", alt: { es: "Por los mares de sangre", en: "Por los mares de sangre" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/22.jpg", alt: { es: "Salvación del tiempo tallado en espuma", en: "Salvación del tiempo tallado en espuma" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/23.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/24.jpg", alt: { es: "Plenamente helado, en tanto un hedor a cordura y ansiedad son los colores limpios y brillantes del recuerdo", en: "Plenamente helado, en tanto un hedor a cordura y ansiedad son los colores limpios y brillantes del recuerdo" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/25.jpg", alt: { es: "Vista de la exposición", en: "View of the exhibition" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/26.jpg", alt: { es: "Vista de la exposición", en: "View of the exhibition" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/27.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/28.jpg", alt: { es: "Aliento infinito # 1", en: "Aliento infinito # 1" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/29.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/30.jpg", alt: { es: "Aliento infinito #2", en: "Aliento infinito #2" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/31.jpg", alt: { es: "Vista de la exposición", en: "View of the exhibition" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/32.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/33.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/34.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/35.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/36.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/37.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/38.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/39.jpg", alt: { es: "En mi estudio", en: "In my studio" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/40.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/sueno-tallado-en-espuma/41.jpg", alt: { es: "Sin título", en: "Untitled" } },
  ],
  // Clean folder again: 24 files numbered #928-951, all dated 2006, no
  // stray/unrelated material. None of the individual pieces carried a
  // title in the filename this time — just "EXPO INSOMNIO" (install
  // views, several misspellings of "insomnio" in the source names) or
  // bare dimensions — so it's install views plus "Sin título"/"Untitled".
  "exp-07": [
    { src: "/images/exposiciones/insomnio/01.jpg", alt: { es: "Vista de la exposición", en: "View of the exhibition" } },
    { src: "/images/exposiciones/insomnio/02.jpg", alt: { es: "Vista de la exposición", en: "View of the exhibition" } },
    { src: "/images/exposiciones/insomnio/03.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/insomnio/04.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/insomnio/05.jpg", alt: { es: "Vista de la exposición", en: "View of the exhibition" } },
    { src: "/images/exposiciones/insomnio/06.jpg", alt: { es: "Vista de la exposición", en: "View of the exhibition" } },
    { src: "/images/exposiciones/insomnio/07.jpg", alt: { es: "Vista de la exposición", en: "View of the exhibition" } },
    { src: "/images/exposiciones/insomnio/08.jpg", alt: { es: "Vista de la exposición", en: "View of the exhibition" } },
    { src: "/images/exposiciones/insomnio/09.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/insomnio/10.jpg", alt: { es: "Vista de la exposición", en: "View of the exhibition" } },
    { src: "/images/exposiciones/insomnio/11.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/insomnio/12.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/insomnio/13.jpg", alt: { es: "Vista de la exposición", en: "View of the exhibition" } },
    { src: "/images/exposiciones/insomnio/14.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/insomnio/15.jpg", alt: { es: "Vista de la exposición", en: "View of the exhibition" } },
    { src: "/images/exposiciones/insomnio/16.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/insomnio/17.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/insomnio/18.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/insomnio/19.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/insomnio/20.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/insomnio/21.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/insomnio/22.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/insomnio/23.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/insomnio/24.jpg", alt: { es: "Sin título", en: "Untitled" } },
  ],
};
