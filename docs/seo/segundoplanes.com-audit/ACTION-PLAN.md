# Plan de acción SEO — segundoplanes.com (2026-11-24)

Objetivo: crecer tráfico, clics e impresiones lo antes posible.
Orden = impacto esperado ÷ esfuerzo. "Dueño" = solo lo puede hacer el artista o quien administra sus cuentas.

## Contexto que manda sobre todo lo demás

- El sitio es nuevo: no aparece en Common Crawl (corte ago–oct 2026) y, en una búsqueda web del nombre
  "Segundo Planes artista cubano", los resultados son cubanartresources.org, askART, MOCA Americas, artspawn
  y un PDF del Fondo Editorial NL — **segundoplanes.com no aparece**.
- Técnicamente el sitio está sano (indexable, canonical, sitemap de 292 URLs válido, hreflang, HTTPS, JSON-LD).
  El freno no es técnico: es **autoridad (enlaces) + contenido delgado en las fichas + falta de medición**.
- Sin Search Console conectado no hay datos reales de clics/impresiones; todo lo de abajo es diagnóstico externo.

## Semana 1 — Crítico (lo que más mueve la aguja)

1. **Search Console: confirmar indexación y medir** (Dueño, 20 min)
   - Reenviar `sitemap.xml`; "Inspeccionar URL" + "Solicitar indexación" para `/`, `/sobre-mi`, `/obra`,
     `/en`, `/arte-cubano-generacion-80`, `/como-adquirir-obra`.
   - Revisar el informe "Páginas": cuántas de las 292 están indexadas y por qué no las demás.
   - Conectar Search Console a claude-seo (`/seo google setup`) para traer consultas, clics, impresiones y CTR reales.
2. **Enlaces desde los sitios que hoy ocupan su nombre en Google** (Dueño, correos)
   - Pedir a cubanartresources.org, askART, MOCA Americas, artspawn, Fondo Editorial NL, MARCO y galerías con
     las que ha expuesto que enlacen a `https://segundoplanes.com` como "sitio oficial".
   - Enlace en la bio de Instagram y en cualquier perfil propio (Facebook, LinkedIn, YouTube si existe).
   - De paso: askART dice que reside en EE. UU.; pedir que corrijan a Monterrey / La Habana (coherencia de entidad).
   - Es la palanca n.º 1 para que el sitio suba en la búsqueda de su propio nombre.
3. **Corregir `og:url`** (código, 10 min)
   - En todas las subpáginas `og:url` apunta a la portada; en la ficha de obra falta. Al compartir en redes
     se atribuye todo a la home. Debe ser igual al canonical de cada página.

## Semanas 2–3 — Alto impacto

4. **Aprobar las descripciones de obra** (Dueño revisa, `data/artworkDescriptions.ts`, 0 de 124 aprobadas)
   - Las 248 fichas (es+en) tienen ~40 palabras visibles: Google las trata como delgadas y puede no indexarlas.
     Las descripciones ya redactadas las llevan a ~100–150 palabras y mejoran alt, meta description y JSON-LD.
   - Lista con miniaturas: `docs/seo/revision-descripciones.md`.
5. **Google Imágenes** (código) — para un artista es la fuente de tráfico más subestimada.
   - Añadir `<image:image>` al sitemap (hoy 0) para las 124 obras.
   - En el JSON-LD `VisualArtwork`, dar `image` como `ImageObject` con `creator`, `creditText`,
     `copyrightNotice` y `acquireLicensePage` → `/como-adquirir-obra` (insignia "Licenciable" en Imágenes).
6. **Títulos cortos con palabras que la gente busca** (código, 15 min)
   - `/sobre-mi` "Biografía — Segundo Planes" (26 car.) → p. ej. "Biografía de Segundo Planes, pintor cubano de la generación de los 80".
   - `/exposiciones` (29) y `/performance` (28) igual; `/en/about` (26) en inglés. `/en` tiene 61 car. → recortar 1–2.
7. **Engordar páginas delgadas** (contenido)
   - `/exposiciones` 151 palabras, `/performance` 179, `/prensa` 181, `/contacto` 99.
   - Exposiciones: listado completo con año, sede y ciudad (texto, no solo imágenes) — capta búsquedas
     "exposición Segundo Planes MARCO", "Segundo Planes Museo Nacional de Bellas Artes", etc.

## Mes 2 — Contenido y autoridad

8. **Wikidata** (Dueño o con fuentes): crear/completar el ítem del artista y añadirlo a `sameAs`.
9. **Páginas por exposición y por performance** (una URL por cada una con fecha, sede, texto curatorial,
   fotos): cada una es una puerta de entrada para búsquedas largas y citas de prensa.
10. **Fechas y autor en JSON-LD** (`dateModified`, `author` → Person) — pendiente de la auditoría GEO.
11. **Notas de prensa / entrevistas** enlazando al sitio (medios de Monterrey, revistas de arte cubano).

## Continuo — Medición y técnica menor

12. Medir Core Web Vitals con API key de PageSpeed (hoy la cuota pública estaba agotada) o CrUX.
13. Quitar `loading="lazy"` a la primera imagen en `/obra`, `/exposiciones`, `/performance` (LCP).
14. Revisar las 240 imágenes sin `width/height` en la portada: si son `next/image` con `fill` dentro de
    contenedores con `aspect-ratio`, no hay CLS real (probable falso positivo); confirmar con Lighthouse.
15. Cabeceras de seguridad (CSP, nosniff, X-Frame-Options, Referrer-Policy) — no afectan ranking, sí confianza.
16. `npm run indexnow` tras cada cambio grande (Bing/Copilot).
