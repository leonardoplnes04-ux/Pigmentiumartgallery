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
  // Source folder (#952-1000, 2003) came pre-organized by the artist under
  // its own "EXPO. MEMORIAS DEL CIRCO..." folder — no mixing with other
  // shows this time. Three files were exact duplicates of an already-
  // numbered image ("955 - copia - copia", "963 - copia", "1000 - copia")
  // and were dropped rather than kept as repeats. Piece titles here are
  // long, invented/poetic phrases (same register as exp-06's "Sueño
  // tallado en espuma"), so — same reasoning as that exhibition — they're
  // kept untranslated rather than force an English gloss that would lose
  // the wordplay. A handful of captions were too overlapped by the
  // artwork itself or too faint to transcribe with confidence; those are
  // "Sin título" rather than a guessed reading.
  "exp-08": [
    { src: "/images/exposiciones/memorias-del-circo/01.jpg", alt: { es: "Vista de la entrada, con el cartel de la exposición", en: "View of the entrance, with the exhibition's title signage" } },
    { src: "/images/exposiciones/memorias-del-circo/02.jpg", alt: { es: "Vista general de la exposición", en: "General view of the exhibition" } },
    { src: "/images/exposiciones/memorias-del-circo/03.jpg", alt: { es: "El eclipse", en: "El eclipse" } },
    { src: "/images/exposiciones/memorias-del-circo/04.jpg", alt: { es: "El vigía, elemento filo-lógico", en: "El vigía, elemento filo-lógico" } },
    { src: "/images/exposiciones/memorias-del-circo/05.jpg", alt: { es: "Tres colores y el registro", en: "Tres colores y el registro" } },
    { src: "/images/exposiciones/memorias-del-circo/06.jpg", alt: { es: "Mujer rara y una rara y violeta e y griega", en: "Mujer rara y una rara y violeta e y griega" } },
    { src: "/images/exposiciones/memorias-del-circo/07.jpg", alt: { es: "Muy alto y oscuro", en: "Muy alto y oscuro" } },
    { src: "/images/exposiciones/memorias-del-circo/08.jpg", alt: { es: "Dios y el diablo en un cuento", en: "Dios y el diablo en un cuento" } },
    { src: "/images/exposiciones/memorias-del-circo/09.jpg", alt: { es: "Sin permiso te semáforo", en: "Sin permiso te semáforo" } },
    { src: "/images/exposiciones/memorias-del-circo/10.jpg", alt: { es: "Búcaros vacíos", en: "Búcaros vacíos" } },
    { src: "/images/exposiciones/memorias-del-circo/11.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/memorias-del-circo/12.jpg", alt: { es: "La reina y el rey", en: "La reina y el rey" } },
    { src: "/images/exposiciones/memorias-del-circo/13.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/memorias-del-circo/14.jpg", alt: { es: "La reina y el pastel", en: "La reina y el pastel" } },
    { src: "/images/exposiciones/memorias-del-circo/15.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/memorias-del-circo/16.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/memorias-del-circo/17.jpg", alt: { es: "Mujer preñada de su deseo", en: "Mujer preñada de su deseo" } },
    { src: "/images/exposiciones/memorias-del-circo/18.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/memorias-del-circo/19.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/memorias-del-circo/20.jpg", alt: { es: "Las tres cosas", en: "Las tres cosas" } },
    { src: "/images/exposiciones/memorias-del-circo/21.jpg", alt: { es: "Las sombras y el hueso de agua", en: "Las sombras y el hueso de agua" } },
    { src: "/images/exposiciones/memorias-del-circo/22.jpg", alt: { es: "Dueña del sol negro", en: "Dueña del sol negro" } },
    { src: "/images/exposiciones/memorias-del-circo/23.jpg", alt: { es: "La ameba lupa y la sombra de la estrella", en: "La ameba lupa y la sombra de la estrella" } },
    { src: "/images/exposiciones/memorias-del-circo/24.jpg", alt: { es: "Hombre de ojos rojo", en: "Hombre de ojos rojo" } },
    { src: "/images/exposiciones/memorias-del-circo/25.jpg", alt: { es: "Espíritu del sol, el árbol de hielo y la tela de araña", en: "Espíritu del sol, el árbol de hielo y la tela de araña" } },
    { src: "/images/exposiciones/memorias-del-circo/26.jpg", alt: { es: "Encanto del futuro (fuego)", en: "Encanto del futuro (fuego)" } },
    { src: "/images/exposiciones/memorias-del-circo/27.jpg", alt: { es: "Solo hay luz en los muertos", en: "Solo hay luz en los muertos" } },
    { src: "/images/exposiciones/memorias-del-circo/28.jpg", alt: { es: "Vista fugada a la luz y el amo del sentimiento", en: "Vista fugada a la luz y el amo del sentimiento" } },
    { src: "/images/exposiciones/memorias-del-circo/29.jpg", alt: { es: "Cazador de mariposa", en: "Cazador de mariposa" } },
    { src: "/images/exposiciones/memorias-del-circo/30.jpg", alt: { es: "Criador de pollo", en: "Criador de pollo" } },
    { src: "/images/exposiciones/memorias-del-circo/31.jpg", alt: { es: "Réquiem del paramecio", en: "Réquiem del paramecio" } },
    { src: "/images/exposiciones/memorias-del-circo/32.jpg", alt: { es: "Espíritu de invierno", en: "Espíritu de invierno" } },
    { src: "/images/exposiciones/memorias-del-circo/33.jpg", alt: { es: "Lejos del silencio", en: "Lejos del silencio" } },
    { src: "/images/exposiciones/memorias-del-circo/34.jpg", alt: { es: "La araña", en: "La araña" } },
    { src: "/images/exposiciones/memorias-del-circo/35.jpg", alt: { es: "Congelados en la esperanza", en: "Congelados en la esperanza" } },
    { src: "/images/exposiciones/memorias-del-circo/36.jpg", alt: { es: "Vigilantes transparentes del continente europeo", en: "Vigilantes transparentes del continente europeo" } },
    { src: "/images/exposiciones/memorias-del-circo/37.jpg", alt: { es: "El eclipse", en: "El eclipse" } },
    { src: "/images/exposiciones/memorias-del-circo/38.jpg", alt: { es: "Nacimiento de Venus", en: "Nacimiento de Venus" } },
    { src: "/images/exposiciones/memorias-del-circo/39.jpg", alt: { es: "Según lo que consideres feo", en: "Según lo que consideres feo" } },
    { src: "/images/exposiciones/memorias-del-circo/40.jpg", alt: { es: "No me mires", en: "No me mires" } },
    { src: "/images/exposiciones/memorias-del-circo/41.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/memorias-del-circo/42.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/memorias-del-circo/43.jpg", alt: { es: "Tú de topo observas la contraseña", en: "Tú de topo observas la contraseña" } },
    { src: "/images/exposiciones/memorias-del-circo/44.jpg", alt: { es: "Mujer de hielo", en: "Mujer de hielo" } },
    { src: "/images/exposiciones/memorias-del-circo/45.jpg", alt: { es: "El cielo está de huelga", en: "El cielo está de huelga" } },
    { src: "/images/exposiciones/memorias-del-circo/46.jpg", alt: { es: "Me retiro un instante, ya volví, ya me voy otra vez", en: "Me retiro un instante, ya volví, ya me voy otra vez" } },
    { src: "/images/exposiciones/memorias-del-circo/47.jpg", alt: { es: "Recordando el recuerdo", en: "Recordando el recuerdo" } },
    { src: "/images/exposiciones/memorias-del-circo/48.jpg", alt: { es: "La morsa es un balsero con frío. El avestruz no sé que sea", en: "La morsa es un balsero con frío. El avestruz no sé que sea" } },
    { src: "/images/exposiciones/memorias-del-circo/49.jpg", alt: { es: "Sin título", en: "Untitled" } },
  ],
  // Source folder ("5-EXPO.PLIEGUES DE LA VEJEZ") is the user-organized
  // version of the #878-927 batch flagged as "sin cargar" in a previous
  // pending note — resolved now that it has its own named folder, same
  // resolution path as "Memorias del circo" (exp-08). 36 files, #877-930,
  // numbered with no gaps but two repeated numbers (900, 902 — each has
  // two distinct files, kept as separate adjacent pieces rather than
  // dropped as duplicates, since their dimensions/media differ). Almost
  // none of the filenames carried a piece title — just dimensions and
  // medium — so most are "Sin título"/"Untitled"; four installation shots
  // (#878, #905, #909, #912) only said "INSTALACION" with no other data,
  // captioned as untitled installation pieces rather than room views (the
  // one genuine room view, #877, said "VISTA GENERAL" explicitly). Three
  // pieces did carry a title (#920, #922, #923); two were translated
  // ("Gota de rocío" / "Sombra proyectando su cuerpo" — plain descriptive
  // phrasing) but #920 ("Horizonte orientalmente huérfano") was left
  // untranslated because "orientalmente" is genuinely ambiguous (facing
  // east vs. "in an oriental style") and guessing risks misreading the
  // artist's intent. **Flag for the artist:** three files in this folder
  // don't match the exhibition's 2008 date — #902 (second file) and #903
  // say 2009, #928-930 say 2010 — kept in since the user curated this
  // folder deliberately (same trust extended to exp-08's folder), but
  // worth confirming whether they truly belong to this show or were
  // archived here by mistake.
  "exp-09": [
    { src: "/images/exposiciones/pliegues-de-la-vejez/01.jpg", alt: { es: "Vista general de la exposición", en: "General view of the exhibition" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/02.jpg", alt: { es: "Sin título (instalación)", en: "Untitled (installation)" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/03.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/04.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/05.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/06.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/07.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/08.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/09.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/10.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/11.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/12.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/13.jpg", alt: { es: "Sin título (instalación)", en: "Untitled (installation)" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/14.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/15.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/16.jpg", alt: { es: "Sin título (instalación)", en: "Untitled (installation)" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/17.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/18.jpg", alt: { es: "Sin título (instalación)", en: "Untitled (installation)" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/19.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/20.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/21.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/22.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/23.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/24.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/25.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/26.jpg", alt: { es: "Horizonte orientalmente huérfano", en: "Horizonte orientalmente huérfano" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/27.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/28.jpg", alt: { es: "Gota de rocío", en: "Dewdrop" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/29.jpg", alt: { es: "Sombra proyectando su cuerpo", en: "Shadow Casting Its Body" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/30.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/31.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/32.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/33.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/34.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/35.jpg", alt: { es: "Sin título", en: "Untitled" } },
    { src: "/images/exposiciones/pliegues-de-la-vejez/36.jpg", alt: { es: "Sin título", en: "Untitled" } },
  ],
};
