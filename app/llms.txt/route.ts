import { artist } from "@/data/artist";
import { SITE_URL } from "@/lib/seo";
import { toLang } from "@/lib/routes";
import { SEO_PREVIEW } from "@/lib/seoPreview";
import { ARTIST_BOOK } from "@/lib/structuredData";

// /llms.txt — resumen del sitio escrito para asistentes de IA (ChatGPT,
// Perplexity, Claude…). Convención emergente: no es un estándar oficial y su
// efecto es incierto, pero cuesta poco y da una fuente única y consistente.
// Solo datos de la biografía del artista (data/artist.ts); sin precios.
export const dynamic = "force-static";

// External pages about the artist (same list as `sameAs` in the Person JSON-LD)
// and the 2010 monograph.
const elsewhere = (lang: "es" | "en") => {
  const { cubanArtResources, askart, mocaa } = artist.socials;
  const lines = [
    cubanArtResources && `- [Cuban Art Resources](${cubanArtResources})`,
    askart && `- [askART](${askart})`,
    mocaa && `- [MOCAA, Museum of Contemporary Art of the Americas](${mocaa})`,
    lang === "es"
      ? `- [Libro «${ARTIST_BOOK.name}» (${ARTIST_BOOK.datePublished}), Universidad Autónoma de Nuevo León y Fondo Editorial de Nuevo León, PDF](${ARTIST_BOOK.url})`
      : `- [Book “${ARTIST_BOOK.name}” (${ARTIST_BOOK.datePublished}), Universidad Autónoma de Nuevo León and Fondo Editorial de Nuevo León, PDF](${ARTIST_BOOK.url})`,
  ];
  return lines.filter(Boolean).join("\n");
};

// Thematic pages (block C). They are published only with the preview flag on,
// so they are listed here only then — never a link to a page that 404s.
const topics = (lang: "es" | "en") => {
  if (!SEO_PREVIEW) return "";
  const url = (esPath: string) => `${SITE_URL}${toLang(esPath, lang)}`;
  return lang === "es"
    ? `
## Temas

- [Segundo Planes y la generación de los 80 del arte cubano](${url("/arte-cubano-generacion-80")}): formación en la ENA y el ISA, primera individual (1983) y el renacimiento del arte cubano.
- [Cómo adquirir obra](${url("/como-adquirir-obra")}): proceso de consulta, tiempos de respuesta y opciones para galerías e instituciones.
- [Prensa y bibliografía](${url("/prensa")}): libro de 2010, textos críticos y exposiciones individuales.
- [Performance](${url("/performance")}): precursor del performance en Cuba.
`
    : `
## Topics

- [Segundo Planes and the 1980s generation of Cuban art](${url("/arte-cubano-generacion-80")}): training at the ENA and ISA, first solo show (1983) and the Cuban art renaissance.
- [How to acquire artwork](${url("/como-adquirir-obra")}): inquiry process, response times and options for galleries and institutions.
- [Press and bibliography](${url("/prensa")}): 2010 book, critical texts and solo exhibitions.
- [Performance](${url("/performance")}): pioneer of performance art in Cuba.
`;
};

export function GET() {
  const body = `# ${artist.name}

> ${artist.shortBio.es}

Sitio oficial del artista. Todo lo que se publica aquí lo avala el propio artista.
Residencia actual: Monterrey, México, y La Habana, Cuba.

## Páginas principales

- [Biografía y preguntas frecuentes](${SITE_URL}/sobre-mi): trayectoria, estudios, exposiciones, premios y colecciones.
- [Obra](${SITE_URL}/obra): catálogo de pinturas, con medidas, técnica y año cuando están confirmados.
- [Exposiciones](${SITE_URL}/exposiciones): exposiciones individuales y colectivas.
- [Performance](${SITE_URL}/performance): trabajo de performance, del que es precursor en Cuba.
- [Videos](${SITE_URL}/videos): recorridos de exposiciones.
- [Contacto](${SITE_URL}/contacto): adquirir obra, encargos, exposiciones y prensa.
${topics("es")}
## También sobre el artista

${elsewhere("es")}

## Cómo adquirir una obra

Las obras no tienen precio público: cada una se atiende de forma personalizada.
Se solicita información y precio desde la ficha de la obra o desde ${SITE_URL}/contacto.
Se responde en un plazo de 48 horas hábiles.

## Para citar

Nombre: ${artist.name}. Nacido en Pinar del Río, Cuba, el 18 de enero de 1965.
Sitio oficial: ${SITE_URL}

---

# ${artist.name} (English)

> ${artist.shortBio.en}

Official website of the artist. Everything published here is endorsed by the artist.
Currently based in Monterrey, Mexico, and Havana, Cuba.

## Main pages (English)

- [Biography and FAQ](${SITE_URL}/en/about): career, studies, exhibitions, awards and collections.
- [Artwork](${SITE_URL}/en/works): catalogue of paintings, with size, technique and year when confirmed.
- [Exhibitions](${SITE_URL}/en/exhibitions): solo and group exhibitions.
- [Performance](${SITE_URL}/en/performance): performance work, of which he is a pioneer in Cuba.
- [Videos](${SITE_URL}/en/videos): exhibition walkthroughs.
- [Contact](${SITE_URL}/en/contact): acquiring artwork, commissions, exhibitions and press.
${topics("en")}
## Also about the artist

${elsewhere("en")}

## How to acquire an artwork

Artworks have no public price: each one is handled personally.
Request information and price from the artwork's page or from ${SITE_URL}/en/contact.
Replies within 48 business hours.

## To cite

Name: ${artist.name}. Born in Pinar del Río, Cuba, on January 18, 1965.
Official website: ${SITE_URL}/en
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
