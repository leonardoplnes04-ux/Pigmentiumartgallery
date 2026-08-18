import type { Artwork } from "./types";

// NOTE: placeholder content — replace with real artworks later.
export const artworks: Artwork[] = [
  {
    id: "obra-01",
    title: { es: "Umbral", en: "Threshold" },
    year: 2024,
    medium: { es: "Óleo sobre lienzo", en: "Oil on canvas" },
    dimensions: { es: "120 × 90 cm", en: "120 × 90 cm" },
    image: "/images/placeholder-artwork-01.svg",
    seriesId: "serie-interiores",
    status: "available",
  },
  {
    id: "obra-02",
    title: { es: "Sombra doméstica", en: "Domestic Shadow" },
    year: 2024,
    medium: { es: "Óleo y collage sobre lienzo", en: "Oil and collage on canvas" },
    dimensions: { es: "100 × 100 cm", en: "100 × 100 cm" },
    image: "/images/placeholder-artwork-02.svg",
    seriesId: "serie-interiores",
    status: "sold",
  },
  {
    id: "obra-03",
    title: { es: "Ventana sur", en: "South Window" },
    year: 2023,
    medium: { es: "Acrílico sobre tabla", en: "Acrylic on panel" },
    dimensions: { es: "80 × 60 cm", en: "80 × 60 cm" },
    image: "/images/placeholder-artwork-03.svg",
    seriesId: "serie-interiores",
    status: "inquire",
  },
  {
    id: "obra-04",
    title: { es: "Deriva I", en: "Drift I" },
    year: 2023,
    medium: { es: "Óleo sobre lienzo", en: "Oil on canvas" },
    dimensions: { es: "150 × 110 cm", en: "150 × 110 cm" },
    image: "/images/placeholder-artwork-04.svg",
    seriesId: "serie-paisajes",
    status: "available",
  },
  {
    id: "obra-05",
    title: { es: "Deriva II", en: "Drift II" },
    year: 2023,
    medium: { es: "Óleo sobre lienzo", en: "Oil on canvas" },
    dimensions: { es: "150 × 110 cm", en: "150 × 110 cm" },
    image: "/images/placeholder-artwork-05.svg",
    seriesId: "serie-paisajes",
    status: "available",
  },
  {
    id: "obra-06",
    title: { es: "Horizonte cortado", en: "Cut Horizon" },
    year: 2022,
    medium: { es: "Técnica mixta sobre papel", en: "Mixed media on paper" },
    dimensions: { es: "70 × 50 cm", en: "70 × 50 cm" },
    image: "/images/placeholder-artwork-06.svg",
    seriesId: "serie-paisajes",
    status: "sold",
  },
  // Obras reales del artista (serie Aviario) — título, año y ficha técnica
  // son provisionales: el año se leyó de la firma visible en cada pieza
  // ("2do" + año abreviado); dimensiones pendientes de confirmar con el
  // artista. criticReviews: placeholder — texto plausible atribuido a un
  // rol genérico (nunca a un nombre o publicación real), a reemplazar
  // cuando haya citas reales de críticos. Ambos idiomas se actualizan a
  // la vez cuando llegue el contenido real.
  {
    id: "obra-07",
    title: { es: "Guardián del jardín", en: "Guardian of the Garden" },
    year: 2018,
    medium: { es: "Técnica mixta sobre tabla", en: "Mixed media on panel" },
    dimensions: { es: "500 × 150 cm", en: "500 × 150 cm" },
    realDimensionsCm: { width: 500, height: 150 },
    image: "/images/obra-guardian-del-jardin.jpg",
    seriesId: "serie-aviario",
    status: "inquire",
    criticReviews: [
      {
        critic: { es: "Por confirmar", en: "To be confirmed" },
        role: { es: "Crítica de arte independiente", en: "Independent art critic" },
        quote: {
          es: "Una composición que hace convivir la ternura de la infancia con la ferocidad silenciosa del ave que la vigila — el gesto protector queda ambiguo a propósito.",
          en: "A composition that lets the tenderness of childhood coexist with the silent ferocity of the bird watching over it — the protective gesture is left deliberately ambiguous.",
        },
      },
    ],
  },
  {
    id: "obra-08",
    title: { es: "El encuentro", en: "The Encounter" },
    year: 2018,
    medium: { es: "Técnica mixta sobre tabla", en: "Mixed media on panel" },
    dimensions: { es: "Dimensiones por confirmar", en: "Dimensions to be confirmed" },
    image: "/images/obra-el-encuentro.jpg",
    seriesId: "serie-aviario",
    status: "inquire",
    criticReviews: [
      {
        critic: { es: "Por confirmar", en: "To be confirmed" },
        role: { es: "Curador independiente", en: "Independent curator" },
        quote: {
          es: "La paleta cálida y la geometría casi decorativa del fondo funcionan como un umbral: dos figuras infantiles cruzándolo, ajenas a la carga simbólica que las rodea.",
          en: "The warm palette and the almost decorative geometry of the background function as a threshold: two child figures crossing it, unaware of the symbolic weight surrounding them.",
        },
      },
    ],
  },
  {
    id: "obra-09",
    title: { es: "Aves nocturnas", en: "Night Birds" },
    year: 2018,
    medium: { es: "Técnica mixta sobre tabla", en: "Mixed media on panel" },
    dimensions: { es: "Dimensiones por confirmar", en: "Dimensions to be confirmed" },
    image: "/images/obra-aves-nocturnas.jpg",
    seriesId: "serie-aviario",
    status: "inquire",
    criticReviews: [
      {
        critic: { es: "Por confirmar", en: "To be confirmed" },
        role: { es: "Revista de arte contemporáneo", en: "Contemporary art magazine" },
        quote: {
          es: "El fondo oscuro no resta color, lo concentra: cada ave parece iluminada desde dentro, como si la noche fuera solo un recurso compositivo.",
          en: "The dark background doesn't diminish color, it concentrates it: each bird seems lit from within, as if night were only a compositional device.",
        },
      },
    ],
  },
  {
    id: "obra-10",
    title: { es: "Jardín estelar", en: "Stellar Garden" },
    year: 2019,
    medium: { es: "Técnica mixta sobre tabla", en: "Mixed media on panel" },
    dimensions: { es: "Dimensiones por confirmar", en: "Dimensions to be confirmed" },
    image: "/images/obra-jardin-estelar.jpg",
    seriesId: "serie-aviario",
    status: "inquire",
    criticReviews: [
      {
        critic: { es: "Por confirmar", en: "To be confirmed" },
        role: { es: "Crítica de arte independiente", en: "Independent art critic" },
        quote: {
          es: "Hay algo de bestiario heráldico en cómo se disponen las aves alrededor de ese eje central — la composición pide ser leída como un mapa, no solo como una escena.",
          en: "There's something of a heraldic bestiary in how the birds are arranged around that central axis — the composition asks to be read as a map, not only as a scene.",
        },
      },
    ],
  },
  {
    id: "obra-11",
    title: { es: "Colibríes de cristal", en: "Crystal Hummingbirds" },
    year: 2018,
    medium: { es: "Técnica mixta sobre tabla", en: "Mixed media on panel" },
    dimensions: { es: "Dimensiones por confirmar", en: "Dimensions to be confirmed" },
    image: "/images/obra-colibries-de-cristal.jpg",
    seriesId: "serie-aviario",
    status: "inquire",
    criticReviews: [
      {
        critic: { es: "Por confirmar", en: "To be confirmed" },
        role: { es: "Curador independiente", en: "Independent curator" },
        quote: {
          es: "El motivo floral repetido no decora, estructura: organiza el ritmo visual con la precisión de un textil, aunque el tema siga siendo profundamente pictórico.",
          en: "The repeated floral motif doesn't decorate, it structures: it organizes the visual rhythm with the precision of a textile, even as the subject remains deeply pictorial.",
        },
      },
    ],
  },
  {
    id: "obra-12",
    title: { es: "Atardecer alado", en: "Winged Sunset" },
    year: 2018,
    medium: { es: "Técnica mixta sobre tabla", en: "Mixed media on panel" },
    dimensions: { es: "Dimensiones por confirmar", en: "Dimensions to be confirmed" },
    image: "/images/obra-atardecer-alado.jpg",
    seriesId: "serie-aviario",
    status: "inquire",
    criticReviews: [
      {
        critic: { es: "Por confirmar", en: "To be confirmed" },
        role: { es: "Revista de arte contemporáneo", en: "Contemporary art magazine" },
        quote: {
          es: "Una variación cromática sobre una misma escena que revela cuánto trabaja este artista la atmósfera antes que la narrativa.",
          en: "A chromatic variation on a single scene that reveals how much this artist works atmosphere before narrative.",
        },
      },
    ],
  },
];
