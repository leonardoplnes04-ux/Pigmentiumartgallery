import type { LocalizedText } from "./types";

// Editorial pages added by the SEO/AI work (block C), published only with the
// preview flag on (lib/seoPreview.ts). Every fact comes from data/artist.ts
// (the artist's own biography, biografia/*.docx) or from how the site already
// works (contact form, 48-hour reply, no public prices, wall simulator) —
// nothing else. Links inside paragraphs use [text](/spanish-path) and are
// localized when rendered (components/TopicPage.tsx).

export type TopicKey = "cubanArt" | "acquire" | "press";

export interface TopicSection {
  heading?: LocalizedText;
  paragraphs?: LocalizedText[];
  // Numbered steps (rendered as <ol>).
  steps?: LocalizedText[];
}

export interface TopicFaq {
  q: LocalizedText;
  a: LocalizedText;
}

export interface TopicPageContent {
  esPath: string;
  eyebrow: LocalizedText;
  h1: LocalizedText;
  lead: LocalizedText;
  sections: TopicSection[];
  // Artworks linked from the page (ids with a detail page).
  works?: { heading: LocalizedText; ids: string[] };
  // Visible questions and answers; mirrored 1:1 in the FAQPage JSON-LD.
  faq?: { heading: LocalizedText; items: TopicFaq[] };
}

export const topicPages: Record<"cubanArt" | "acquire", TopicPageContent> = {
  cubanArt: {
    esPath: "/arte-cubano-generacion-80",
    eyebrow: { es: "Arte cubano", en: "Cuban art" },
    h1: {
      es: "Segundo Planes y la generación de los 80 del arte cubano",
      en: "Segundo Planes and the 1980s generation of Cuban art",
    },
    lead: {
      es: "Segundo Planes (Pinar del Río, Cuba, 1965) pertenece a la generación de los 80 de la plástica cubana, la del llamado renacimiento del arte cubano. Es, además, precursor del performance en la isla. Su trayectoria suma 43 años de trabajo entre Cuba, México, Europa y Estados Unidos.",
      en: "Segundo Planes (Pinar del Río, Cuba, 1965) belongs to the 1980s generation of Cuban visual art, the one known as the Cuban art renaissance. He is also a pioneer of performance art on the island. His career spans 43 years of work between Cuba, Mexico, Europe and the United States.",
    },
    sections: [
      {
        heading: { es: "Formación: de Pinar del Río a La Habana", en: "Training: from Pinar del Río to Havana" },
        paragraphs: [
          {
            es: "Nació el 18 de enero de 1965 en Pinar del Río. En 1975 ingresó en la Escuela Provincial de Arte de su ciudad y en 1979 se trasladó a La Habana, donde continuó sus estudios en la Escuela Nacional de Arte (ENA) y en el Instituto Superior de Arte (ISA).",
            en: "He was born on January 18, 1965, in Pinar del Río. In 1975 he entered his city's Escuela Provincial de Arte, and in 1979 he moved to Havana, where he continued his studies at the Escuela Nacional de Arte (ENA) and the Instituto Superior de Arte (ISA).",
          },
          {
            es: "Se graduó del ISA en 1989. Su trabajo de tesis fue un performance: «La vida es una mierda y el mundo está loco».",
            en: "He graduated from the ISA in 1989. His thesis work was a performance: “La vida es una mierda y el mundo está loco.”",
          },
        ],
      },
      {
        heading: { es: "Primera individual, 1983", en: "First solo show, 1983" },
        paragraphs: [
          {
            es: "Su primera exposición individual, «Sobre los aborígenes», tuvo lugar en 1983 en la Escuela Nacional de Arte, en La Habana, durante sus años de estudio en esa ciudad.",
            en: "His first solo exhibition, “Sobre los aborígenes,” took place in 1983 at the Escuela Nacional de Arte in Havana, during his years of study in that city.",
          },
          {
            es: "Ese mismo año realizó los performances «Ensayos sobre el sueño (asesinando lo onírico)», «Experimentando con soles negros» y «Sobre el tiempo, el movimiento y el espacio». En 1984 presentó «Una caja de cristal encima del cielo» en la I Bienal de La Habana. Es precursor del performance en Cuba; la documentación de esas acciones está en [Performance](/performance).",
            en: "That same year he made the performances “Ensayos sobre el sueño (asesinando lo onírico),” “Experimentando con soles negros” and “Sobre el tiempo, el movimiento y el espacio.” In 1984 he presented “Una caja de cristal encima del cielo” at the 1st Havana Biennial. He is a pioneer of performance art in Cuba; the documentation of those actions is under [Performance](/performance).",
          },
        ],
      },
      {
        heading: { es: "Los años ochenta en Cuba", en: "The 1980s in Cuba" },
        paragraphs: [
          {
            es: "En Pinar del Río expuso «Homenaje a los becados 1 y 2» en 1985 y 1986, y de 1985 a 1989 obtuvo el Primer Premio del Salón Provincial. En 1989 presentó «Soy un estúpido» en el Castillo de la Fuerza (Museo Nacional de Bellas Artes), en La Habana, y en 1990 «No soy yo, ni el otro; ni alguno ni ninguno» en Galería Habana.",
            en: "In Pinar del Río he showed “Homenaje a los becados 1 y 2” in 1985 and 1986, and from 1985 to 1989 he won First Prize at the Provincial Salon. In 1989 he presented “Soy un estúpido” at the Castillo de la Fuerza (Museo Nacional de Bellas Artes) in Havana, and in 1990 “No soy yo, ni el otro; ni alguno ni ninguno” at Galería Habana.",
          },
          {
            es: "En esos años recibió el Primer Premio en el IV Salón Nacional de Premiados y, en el V Salón Nacional de Premiados, el Primer Premio, el Premio de la Asociación Internacional de Críticos de Arte (AICA) y un Premio de Adquisición, ambos en el Museo Nacional de Bellas Artes de La Habana. También obtuvo el Primer Premio en el I Salón de Pintura Contemporánea Juan Francisco Elso Padilla y un premio en el I Festival de la Creación y la Investigación Artística del ISA.",
            en: "In those years he received First Prize at the 4th National Salon of Prizewinners and, at the 5th National Salon of Prizewinners, First Prize, the International Association of Art Critics (AICA) Prize and an Acquisition Prize, both at the Museo Nacional de Bellas Artes in Havana. He also won First Prize at the 1st Juan Francisco Elso Padilla Salon of Contemporary Painting and a prize at the 1st Festival of Artistic Creation and Research of the ISA.",
          },
        ],
      },
      {
        heading: { es: "Después de los 80: México y el mundo", en: "After the 1980s: Mexico and beyond" },
        paragraphs: [
          {
            es: "Desde los años noventa buena parte de sus exposiciones individuales han tenido lugar en México. En Monterrey expuso en la Galería Ramis Barquet (1993 y 1995), en el museo MARCO y en el Museo Metropolitano (2001), en el Centro de las Artes de Nuevo León (2006), en la Galería GE (2011 y 2012) y en la Galería Estereo (2024). Participó en el I, II y III Premio MARCO, en la VIII Bienal de Pintura Rufino Tamayo y en la III Bienal Monterrey FEMSA.",
            en: "Since the 1990s many of his solo exhibitions have taken place in Mexico. In Monterrey he exhibited at Galería Ramis Barquet (1993 and 1995), the MARCO museum and the Museo Metropolitano (2001), the Centro de las Artes de Nuevo León (2006), Galería GE (2011 and 2012) and Galería Estereo (2024). He took part in the 1st, 2nd and 3rd MARCO Prize, the 8th Rufino Tamayo Painting Biennial and the 3rd FEMSA Monterrey Biennial.",
          },
          {
            es: "Fuera de México ha expuesto en Miami, Granada, Cuenca (Ecuador) y Rennes (Francia), entre otras ciudades, y en las ferias Art Miami, MACO y ARCO. Su obra está en las colecciones del Museo Nacional de Bellas Artes de La Habana, el museo MARCO, la Fundación Cisneros Fontanals (CIFO), el MEIAC de Badajoz y la colección CEMEX, entre otras. Hoy reparte su residencia entre Monterrey y La Habana. La trayectoria completa está en la [biografía](/sobre-mi).",
            en: "Outside Mexico he has exhibited in Miami, Granada, Cuenca (Ecuador) and Rennes (France), among other cities, and at the Art Miami, MACO and ARCO fairs. His work is in the collections of the Museo Nacional de Bellas Artes in Havana, the MARCO museum, the Cisneros Fontanals Art Foundation (CIFO), the MEIAC in Badajoz and the CEMEX collection, among others. He now divides his time between Monterrey and Havana. His full career is in the [biography](/sobre-mi).",
          },
        ],
      },
    ],
    works: {
      heading: { es: "Obras en el catálogo", en: "Works in the catalogue" },
      ids: ["obra-13", "obra-14", "obra-16", "obra-104", "obra-113"],
    },
  },

  acquire: {
    esPath: "/como-adquirir-obra",
    eyebrow: { es: "Adquirir obra", en: "Acquiring artwork" },
    h1: {
      es: "Cómo adquirir obra de Segundo Planes",
      en: "How to acquire artwork by Segundo Planes",
    },
    lead: {
      es: "Las obras de Segundo Planes, artista cubano de la generación de los 80, no tienen precio público: cada pieza se atiende de forma personalizada. Así funciona el proceso, para coleccionistas, galerías e instituciones.",
      en: "The works of Segundo Planes, a Cuban artist of the 1980s generation, have no public price: each piece is handled personally. This is how the process works, for collectors, galleries and institutions.",
    },
    sections: [
      {
        heading: { es: "Paso a paso", en: "Step by step" },
        steps: [
          {
            es: "Elige la obra en el [catálogo](/obra). Cada ficha muestra la técnica, las medidas y el año cuando están confirmados, además de su estado.",
            en: "Choose the work in the [catalogue](/obra). Each page shows the technique, dimensions and year when confirmed, as well as its status.",
          },
          {
            es: "En la ficha, pulsa «Solicitar información y precio». Se abre el formulario de [contacto](/contacto) con la obra ya cargada, para que no tengas que describirla. También puedes escribir directamente desde la página de contacto.",
            en: "On the artwork page, press “Request information and price.” The [contact](/contacto) form opens with the work already filled in, so you don't have to describe it. You can also write directly from the contact page.",
          },
          {
            es: "Recibirás respuesta en un plazo de 48 horas hábiles, con el precio y la disponibilidad de la obra.",
            en: "You will receive a reply within 48 business hours, with the price and availability of the work.",
          },
        ],
        paragraphs: [
          {
            es: "Si la ficha tiene medidas confirmadas, el enlace «Ver en tu pared» te permite subir una foto de tu espacio para ver cómo se vería la obra ahí, antes de escribir.",
            en: "If the page has confirmed dimensions, the “View on your wall” link lets you upload a photo of your space to see how the work would look there, before writing.",
          },
        ],
      },
      {
        heading: { es: "Qué muestra cada ficha", en: "What each artwork page shows" },
        paragraphs: [
          {
            es: "Cada ficha reúne título, año, técnica y medidas cuando están confirmados; si un dato falta, se indica «por confirmar» en lugar de suponerlo. También indica el estado de la obra y que el precio se da a solicitud. Puedes ampliar la imagen a pantalla completa para ver la pintura con detalle.",
            en: "Each page brings together title, year, technique and dimensions when confirmed; if a detail is missing, it says “to be confirmed” instead of guessing. It also shows the status of the work and that the price is given on request. You can enlarge the image to full screen to look at the painting in detail.",
          },
        ],
      },
      {
        heading: { es: "Sobre el artista", en: "About the artist" },
        paragraphs: [
          {
            es: "Segundo Planes nació en Pinar del Río, Cuba, en 1965, se formó en la Escuela Nacional de Arte y el Instituto Superior de Arte de La Habana y es precursor del performance en Cuba. Lleva 43 años de producción entre Cuba, México, Europa y Estados Unidos. Más contexto en [la generación de los 80](/arte-cubano-generacion-80) y en su [biografía](/sobre-mi).",
            en: "Segundo Planes was born in Pinar del Río, Cuba, in 1965, trained at the Escuela Nacional de Arte and the Instituto Superior de Arte in Havana, and is a pioneer of performance art in Cuba. He has 43 years of work between Cuba, Mexico, Europe and the United States. More context in [the 1980s generation](/arte-cubano-generacion-80) and in his [biography](/sobre-mi).",
          },
        ],
      },
      {
        heading: { es: "Quién puede adquirir", en: "Who can acquire" },
        paragraphs: [
          {
            es: "Coleccionistas particulares, galerías e instituciones. La obra de Segundo Planes forma parte de colecciones como las del Museo Nacional de Bellas Artes de La Habana, el museo MARCO de Monterrey, la Fundación Cisneros Fontanals para las Artes (CIFO) de Miami, el Museo de Arte Moderno de Cuenca y la colección CEMEX, y de colecciones privadas en Puerto Rico, Panamá, Italia, México, Estados Unidos y España, entre otros países.",
            en: "Private collectors, galleries and institutions. The work of Segundo Planes is part of collections such as those of the Museo Nacional de Bellas Artes in Havana, the MARCO museum in Monterrey, the Cisneros Fontanals Art Foundation (CIFO) in Miami, the Museo de Arte Moderno de Cuenca and the CEMEX collection, as well as private collections in Puerto Rico, Panama, Italy, Mexico, the United States and Spain, among other countries.",
          },
        ],
      },
      {
        heading: { es: "Para galerías e instituciones", en: "For galleries and institutions" },
        paragraphs: [
          {
            es: "Además de la adquisición de obra, el formulario de contacto permite proponer una exposición o colaboración, plantear un encargo o hacer una solicitud de prensa. Basta con elegir el motivo del mensaje. Algunas de sus exposiciones anteriores están documentadas en [Exposiciones](/exposiciones), y el material de referencia sobre el artista, en [Prensa](/prensa).",
            en: "Besides acquiring work, the contact form lets you propose an exhibition or collaboration, discuss a commission or make a press request. Just choose the reason for your message. Some of his past exhibitions are documented under [Exhibitions](/exposiciones), and reference material on the artist under [Press](/prensa).",
          },
        ],
      },
    ],
    works: {
      heading: { es: "Algunas obras del catálogo", en: "Some works from the catalogue" },
      ids: ["obra-15", "obra-17", "obra-44", "obra-111", "obra-115"],
    },
    faq: {
      heading: { es: "Preguntas frecuentes", en: "Frequently asked questions" },
      items: [
        {
          q: { es: "¿Las obras tienen precio público?", en: "Do the works have a public price?" },
          a: {
            es: "No. Cada pieza se atiende de forma personalizada: el precio y la disponibilidad se envían al responder tu consulta.",
            en: "No. Each piece is handled personally: price and availability are sent when we reply to your inquiry.",
          },
        },
        {
          q: { es: "¿Cuánto tardan en responder?", en: "How long does a reply take?" },
          a: {
            es: "Respondemos en un plazo de 48 horas hábiles.",
            en: "We reply within 48 business hours.",
          },
        },
        {
          q: {
            es: "¿Una galería o institución puede proponer una exposición?",
            en: "Can a gallery or institution propose an exhibition?",
          },
          a: {
            es: "Sí. En la página de contacto elige el motivo «Exposición o colaboración» y cuéntanos tu propuesta.",
            en: "Yes. On the contact page choose “Exhibition or collaboration” and tell us about your proposal.",
          },
        },
        {
          q: { es: "¿Se pueden hacer encargos?", en: "Are commissions possible?" },
          a: {
            es: "Puedes plantear un encargo desde la página de contacto eligiendo el motivo «Encargo».",
            en: "You can discuss a commission from the contact page by choosing “Commission.”",
          },
        },
      ],
    },
  },
};

// /prensa — press kit: the 2010 book, external references and the solo shows
// documented on this site (data/exhibitions.ts).
export const pressPage = {
  esPath: "/prensa",
  eyebrow: { es: "Prensa", en: "Press" },
  h1: { es: "Prensa y bibliografía de Segundo Planes", en: "Press and bibliography of Segundo Planes" },
  lead: {
    es: "Material de referencia sobre el artista cubano Segundo Planes (Pinar del Río, 1965): el libro publicado en 2010, otras fuentes sobre su obra y las exposiciones individuales documentadas en este sitio. Para entrevistas o materiales de prensa, escribe desde [Contacto](/contacto).",
    en: "Reference material on the Cuban artist Segundo Planes (Pinar del Río, 1965): the book published in 2010, other sources on his work and the solo exhibitions documented on this site. For interviews or press materials, write from [Contact](/contacto).",
  },
  bookHeading: { es: "Libro", en: "Book" },
  bookText: {
    es: "«Segundo Planes». Universidad Autónoma de Nuevo León y Fondo Editorial de Nuevo León, 2010.",
    en: "“Segundo Planes.” Universidad Autónoma de Nuevo León and Fondo Editorial de Nuevo León, 2010.",
  },
  bookLink: { es: "Leer el libro (PDF)", en: "Read the book (PDF)" },
  sourcesHeading: { es: "Otras fuentes sobre el artista", en: "Other sources on the artist" },
  exhibitionsHeading: { es: "Exposiciones individuales", en: "Solo exhibitions" },
  exhibitionsNote: {
    es: "Exposiciones documentadas con fotografías en este sitio. La lista completa, desde 1983, está en la [biografía](/sobre-mi).",
    en: "Exhibitions documented with photographs on this site. The full list, since 1983, is in the [biography](/sobre-mi).",
  },
} satisfies Record<string, LocalizedText | string>;

// Intro of /performance (C2): 2–3 paragraphs, from the biography only.
export const performanceIntro: LocalizedText[] = [
  {
    es: "Segundo Planes es precursor del performance en Cuba. En 1983, mientras estudiaba en La Habana, realizó «Ensayos sobre el sueño (asesinando lo onírico)», «Experimentando con soles negros» y «Sobre el tiempo, el movimiento y el espacio».",
    en: "Segundo Planes is a pioneer of performance art in Cuba. In 1983, while studying in Havana, he made “Ensayos sobre el sueño (asesinando lo onírico),” “Experimentando con soles negros” and “Sobre el tiempo, el movimiento y el espacio.”",
  },
  {
    es: "En 1984 presentó «Una caja de cristal encima del cielo» en la I Bienal de La Habana, y en 1989 su trabajo de tesis en el Instituto Superior de Arte fue el performance «La vida es una mierda y el mundo está loco».",
    en: "In 1984 he presented “Una caja de cristal encima del cielo” at the 1st Havana Biennial, and in 1989 his thesis work at the Instituto Superior de Arte was the performance “La vida es una mierda y el mundo está loco.”",
  },
  {
    es: "Aquí se reúnen las acciones documentadas en este sitio, con fotografías cuando existen. Su contexto, dentro de la generación de los 80, está en [Arte cubano de los 80](/arte-cubano-generacion-80).",
    en: "Below are the actions documented on this site, with photographs where they exist. Their context, within the 1980s generation, is in [Cuban art of the 1980s](/arte-cubano-generacion-80).",
  },
];
