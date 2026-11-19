import { artist } from "@/data/artist";
import { SITE_URL } from "@/lib/seo";

// /llms.txt — resumen del sitio escrito para asistentes de IA (ChatGPT,
// Perplexity, Claude…). Convención emergente: no es un estándar oficial y su
// efecto es incierto, pero cuesta poco y da una fuente única y consistente.
// Solo datos de la biografía del artista (data/artist.ts); sin precios.
export const dynamic = "force-static";

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

## Cómo adquirir una obra

Las obras no tienen precio público: cada una se atiende de forma personalizada.
Se solicita información y precio desde la ficha de la obra o desde ${SITE_URL}/contacto.
Se responde en un plazo de 48 horas hábiles.

## Para citar

Nombre: ${artist.name}. Nacido en Pinar del Río, Cuba, el 18 de enero de 1965.
Sitio oficial: ${SITE_URL}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
