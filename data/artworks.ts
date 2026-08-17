import type { Artwork } from "./types";

// NOTE: placeholder content — replace with real artworks later.
export const artworks: Artwork[] = [
  {
    id: "obra-01",
    title: "Umbral",
    year: 2024,
    medium: "Óleo sobre lienzo",
    dimensions: "120 × 90 cm",
    image: "/images/placeholder-artwork-01.svg",
    seriesId: "serie-interiores",
    status: "available",
  },
  {
    id: "obra-02",
    title: "Sombra doméstica",
    year: 2024,
    medium: "Óleo y collage sobre lienzo",
    dimensions: "100 × 100 cm",
    image: "/images/placeholder-artwork-02.svg",
    seriesId: "serie-interiores",
    status: "sold",
  },
  {
    id: "obra-03",
    title: "Ventana sur",
    year: 2023,
    medium: "Acrílico sobre tabla",
    dimensions: "80 × 60 cm",
    image: "/images/placeholder-artwork-03.svg",
    seriesId: "serie-interiores",
    status: "inquire",
  },
  {
    id: "obra-04",
    title: "Deriva I",
    year: 2023,
    medium: "Óleo sobre lienzo",
    dimensions: "150 × 110 cm",
    image: "/images/placeholder-artwork-04.svg",
    seriesId: "serie-paisajes",
    status: "available",
  },
  {
    id: "obra-05",
    title: "Deriva II",
    year: 2023,
    medium: "Óleo sobre lienzo",
    dimensions: "150 × 110 cm",
    image: "/images/placeholder-artwork-05.svg",
    seriesId: "serie-paisajes",
    status: "available",
  },
  {
    id: "obra-06",
    title: "Horizonte cortado",
    year: 2022,
    medium: "Técnica mixta sobre papel",
    dimensions: "70 × 50 cm",
    image: "/images/placeholder-artwork-06.svg",
    seriesId: "serie-paisajes",
    status: "sold",
  },
  // Obras reales del artista (serie Aviario) — título, año y ficha técnica
  // son provisionales: el año se leyó de la firma visible en cada pieza
  // ("2do" + año abreviado); dimensiones pendientes de confirmar con el artista.
  // criticReviews: placeholder — texto plausible atribuido a un rol
  // genérico (nunca a un nombre o publicación real), a reemplazar cuando
  // haya citas reales de críticos.
  {
    id: "obra-07",
    title: "Guardián del jardín",
    year: 2018,
    medium: "Técnica mixta sobre tabla",
    dimensions: "Dimensiones por confirmar",
    image: "/images/obra-guardian-del-jardin.jpg",
    seriesId: "serie-aviario",
    status: "inquire",
    criticReviews: [
      {
        critic: "Por confirmar",
        role: "Crítica de arte independiente",
        quote:
          "Una composición que hace convivir la ternura de la infancia con la ferocidad silenciosa del ave que la vigila — el gesto protector queda ambiguo a propósito.",
      },
    ],
  },
  {
    id: "obra-08",
    title: "El encuentro",
    year: 2018,
    medium: "Técnica mixta sobre tabla",
    dimensions: "Dimensiones por confirmar",
    image: "/images/obra-el-encuentro.jpg",
    seriesId: "serie-aviario",
    status: "inquire",
    criticReviews: [
      {
        critic: "Por confirmar",
        role: "Curador independiente",
        quote:
          "La paleta cálida y la geometría casi decorativa del fondo funcionan como un umbral: dos figuras infantiles cruzándolo, ajenas a la carga simbólica que las rodea.",
      },
    ],
  },
  {
    id: "obra-09",
    title: "Aves nocturnas",
    year: 2018,
    medium: "Técnica mixta sobre tabla",
    dimensions: "Dimensiones por confirmar",
    image: "/images/obra-aves-nocturnas.jpg",
    seriesId: "serie-aviario",
    status: "inquire",
    criticReviews: [
      {
        critic: "Por confirmar",
        role: "Revista de arte contemporáneo",
        quote:
          "El fondo oscuro no resta color, lo concentra: cada ave parece iluminada desde dentro, como si la noche fuera solo un recurso compositivo.",
      },
    ],
  },
  {
    id: "obra-10",
    title: "Jardín estelar",
    year: 2019,
    medium: "Técnica mixta sobre tabla",
    dimensions: "Dimensiones por confirmar",
    image: "/images/obra-jardin-estelar.jpg",
    seriesId: "serie-aviario",
    status: "inquire",
    criticReviews: [
      {
        critic: "Por confirmar",
        role: "Crítica de arte independiente",
        quote:
          "Hay algo de bestiario heráldico en cómo se disponen las aves alrededor de ese eje central — la composición pide ser leída como un mapa, no solo como una escena.",
      },
    ],
  },
  {
    id: "obra-11",
    title: "Colibríes de cristal",
    year: 2018,
    medium: "Técnica mixta sobre tabla",
    dimensions: "Dimensiones por confirmar",
    image: "/images/obra-colibries-de-cristal.jpg",
    seriesId: "serie-aviario",
    status: "inquire",
    criticReviews: [
      {
        critic: "Por confirmar",
        role: "Curador independiente",
        quote:
          "El motivo floral repetido no decora, estructura: organiza el ritmo visual con la precisión de un textil, aunque el tema siga siendo profundamente pictórico.",
      },
    ],
  },
  {
    id: "obra-12",
    title: "Atardecer alado",
    year: 2018,
    medium: "Técnica mixta sobre tabla",
    dimensions: "Dimensiones por confirmar",
    image: "/images/obra-atardecer-alado.jpg",
    seriesId: "serie-aviario",
    status: "inquire",
    criticReviews: [
      {
        critic: "Por confirmar",
        role: "Revista de arte contemporáneo",
        quote:
          "Una variación cromática sobre una misma escena que revela cuánto trabaja este artista la atmósfera antes que la narrativa.",
      },
    ],
  },
];
