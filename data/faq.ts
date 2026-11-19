import type { LocalizedText } from "./types";

// Preguntas frecuentes de /sobre-mi. Cada respuesta se arma SOLO con datos de
// la biografía del artista (data/artist.ts, de biografia_segundo_planes.docx)
// y de la página de contacto. No agregar datos de terceros: varias fuentes
// externas se contradicen (residencia, fechas de estudios) y la fuente oficial
// es la del artista. Son respuestas cortas y directas a propósito: es el
// formato que buscadores y asistentes de IA citan.
export interface FaqItem {
  q: LocalizedText;
  a: LocalizedText;
}

export const faqHeading: LocalizedText = {
  es: "Preguntas frecuentes",
  en: "Frequently asked questions",
};

export const faq: FaqItem[] = [
  {
    q: {
      es: "¿Quién es Segundo Planes?",
      en: "Who is Segundo Planes?",
    },
    a: {
      es: "Segundo Planes (Pinar del Río, Cuba, 1965) es un artista perteneciente a la generación de los 80s de la plástica cubana y precursor del performance en la isla, con una trayectoria de 43 años entre Cuba, México, Europa y Estados Unidos.",
      en: "Segundo Planes (Pinar del Río, Cuba, 1965) is an artist of the 1980s generation of Cuban visual art and a pioneer of performance art on the island, with a 43-year career spanning Cuba, Mexico, Europe, and the United States.",
    },
  },
  {
    q: {
      es: "¿Dónde estudió Segundo Planes?",
      en: "Where did Segundo Planes study?",
    },
    a: {
      es: "Inició sus estudios de arte en 1975 en la Escuela Provincial de Arte de Pinar del Río. En 1979 se trasladó a La Habana, donde continuó en la Escuela Nacional de Arte y en el Instituto Superior de Arte, graduándose en 1989.",
      en: "He began his art studies in 1975 at the Escuela Provincial de Arte in Pinar del Río. In 1979 he moved to Havana, where he continued at the Escuela Nacional de Arte and the Instituto Superior de Arte, graduating in 1989.",
    },
  },
  {
    q: {
      es: "¿Dónde vive y trabaja actualmente?",
      en: "Where does he live and work today?",
    },
    a: {
      es: "Actualmente combina su residencia entre Monterrey, México, y La Habana, Cuba.",
      en: "He currently divides his time between Monterrey, Mexico, and Havana, Cuba.",
    },
  },
  {
    q: {
      es: "¿Qué performances realizó Segundo Planes en Cuba?",
      en: "What performances did Segundo Planes create in Cuba?",
    },
    a: {
      es: "En 1983 realizó «Ensayos sobre el sueño (asesinando lo onírico)», «Experimentando con soles negros» y «Sobre el tiempo, el movimiento y el espacio». En 1984 presentó «Una caja de cristal encima del cielo» en la I Bienal de La Habana.",
      en: "In 1983 he created “Ensayos sobre el sueño (asesinando lo onírico),” “Experimentando con soles negros,” and “Sobre el tiempo, el movimiento y el espacio.” In 1984 he presented “Una caja de cristal encima del cielo” at the 1st Havana Biennial.",
    },
  },
  {
    q: {
      es: "¿Dónde ha expuesto Segundo Planes recientemente?",
      en: "Where has Segundo Planes exhibited recently?",
    },
    a: {
      es: "Entre sus exposiciones individuales más recientes están «Algoritmo, arquetipos frustrados» en la Galería Estereo, Monterrey (2024); «Estructura ósea del cero, Segundo Planes» en 40mcube centre d’art contemporain, Rennes, Francia (2022-2023); y «UNO» en la Galería Afrime, Ciudad de México.",
      en: "His most recent solo exhibitions include “Algoritmo, arquetipos frustrados” at Galería Estereo, Monterrey (2024); “Estructura ósea del cero, Segundo Planes” at 40mcube centre d’art contemporain, Rennes, France (2022–2023); and “UNO” at Galería Afrime, Mexico City.",
    },
  },
  {
    q: {
      es: "¿En qué museos y colecciones se encuentra su obra?",
      en: "Which museums and collections hold his work?",
    },
    a: {
      es: "Su obra está en el Museo Nacional de Bellas Artes de La Habana, el museo MARCO de Monterrey, la Fundación Cisneros Fontanals (CIFO) de Miami, el Museo de Arte Moderno de Cuenca, el MEIAC de Badajoz, el Museo de Arte del Condado de Nassau, la Fundación Shelley y Donald Rubin y la Colección Farber de Nueva York, y la colección CEMEX de Monterrey, entre otras.",
      en: "His work is held by the Museo Nacional de Bellas Artes in Havana, the MARCO museum in Monterrey, the Cisneros Fontanals Art Foundation (CIFO) in Miami, the Museo de Arte Moderno de Cuenca, the MEIAC in Badajoz, the Nassau County Museum of Art, the Shelley and Donald Rubin Foundation and the Farber Collection in New York, and the CEMEX collection in Monterrey, among others.",
    },
  },
  {
    q: {
      es: "¿Cómo puedo adquirir una obra de Segundo Planes?",
      en: "How can I acquire a work by Segundo Planes?",
    },
    a: {
      es: "Cada pieza se atiende de forma personalizada. Pulsa «Solicitar información y precio» en la ficha de la obra, o escribe desde la página de contacto, y te responderemos en un plazo de 48 horas hábiles.",
      en: "Every piece is handled personally. Press “Request information and price” on the artwork page, or write from the contact page, and we will reply within 48 business hours.",
    },
  },
  {
    q: {
      es: "¿Puedo proponer una exposición, un encargo o una entrevista?",
      en: "Can I propose an exhibition, a commission or an interview?",
    },
    a: {
      es: "Sí. En la página de contacto puedes elegir el motivo de tu mensaje: adquirir una obra, encargo, exposición o colaboración, o prensa.",
      en: "Yes. On the contact page you can choose the reason for your message: acquiring a work, a commission, an exhibition or collaboration, or press.",
    },
  },
];
