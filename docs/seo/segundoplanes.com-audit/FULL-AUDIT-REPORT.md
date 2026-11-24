# Auditoría SEO completa — segundoplanes.com (2026-11-24)

Herramienta: claude-seo v2.6.2 (scripts deterministas `page_checks`, `transport_check`, `sitemap_discovery`,
`render_page`, `commoncrawl_graph`) + `geo-optimizer` 4.28 + búsqueda web. Datos crudos en `raw/`.
Sin credenciales de Google: no hay datos de Search Console, GA4 ni CrUX. PageSpeed sin API key devolvió
"rate limit" dos veces: rendimiento **no medido**.

## Resumen ejecutivo

**SEO Health Score: ~70/100** (rendimiento estimado, no medido). Tipo de negocio: sitio oficial de artista
visual (portafolio + venta de obra por consulta), bilingüe es/en.

| Categoría | Peso | Puntaje |
|---|---|---|
| SEO técnico | 22 % | 85 |
| Calidad de contenido | 23 % | 50 |
| On-page | 20 % | 72 |
| Schema | 10 % | 75 |
| Rendimiento (CWV) | 10 % | 70 (estimado) |
| Preparación para búsqueda IA | 10 % | 75 |
| Imágenes | 5 % | 60 |

**Top 5 problemas**
1. El sitio no aparece al buscar el nombre del artista; ese espacio lo ocupan perfiles de terceros.
2. Autoridad casi nula: el dominio no está en Common Crawl; no hay enlaces conocidos hacia él.
3. 248 fichas de obra con ~40 palabras visibles (contenido delgado); 0 de 124 descripciones aprobadas.
4. Sin datos de Search Console: no se sabe cuántas URLs están indexadas ni qué consultas traen impresiones.
5. Páginas de sección delgadas: Exposiciones 151, Performance 179, Prensa 181, Contacto 99 palabras.

**Top 5 victorias rápidas**
1. Reenviar sitemap y solicitar indexación de 6 páginas clave en Search Console.
2. Pedir enlace "sitio oficial" a cubanartresources, askART, MOCA Americas, artspawn y Fondo Editorial NL.
3. Corregir `og:url` (apunta a la portada en todas las subpáginas).
4. Títulos más descriptivos en Biografía, Exposiciones, Performance y Biography.
5. Sitemap de imágenes para las 124 obras.

## SEO técnico (85)
**Funciona:** HTTPS TLS 1.3, certificado válido 71 días, `www` → raíz, HSTS; robots.txt abierto con `Sitemap:`;
sitemap válido de 292 URLs sin duplicados ni URLs inválidas; todas las páginas 200, indexables, canonical propio,
`lang`, viewport, hreflang es/en; catálogo ya prerenderizado (arreglo del 2026-11-24).
**Hallazgos:**
- Bajo — `lastmod` idéntico (2026-11-20) en las 292 URLs: Google ignora `lastmod` si no refleja cambios reales.
- Bajo — faltan CSP, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`; HSTS sin `includeSubDomains`.
- Bajo — nodo con 230 hijos directos en la portada (layout lento).

## Calidad de contenido (50)
**Funciona:** portada (2 120 palabras), Biografía (1 212), artículos `/arte-cubano-generacion-80` (596) y
`/como-adquirir-obra` (530); datos verificables (fechas, museos, colecciones), FAQ en Biografía.
**Hallazgos:**
- Alto — fichas de obra: 40–44 palabras visibles; 124 × 2 idiomas = 85 % de las URLs del sitio.
- Medio — Exposiciones, Performance, Prensa, Contacto por debajo de 200 palabras.
- Medio — E-E-A-T: falta presencia externa que confirme la entidad (Wikidata, enlaces de instituciones).

## On-page (72)
**Funciona:** un H1 por página, meta descriptions en rango en la mayoría, alt en todas las imágenes, anchors descriptivos.
**Hallazgos:**
- Medio — títulos cortos: `/sobre-mi` 26, `/en/about` 26, `/performance` 28, `/exposiciones` 29 car.; `/en` 61 (largo).
- Medio — meta description corta en `/exposiciones` (42) y `/performance` (31), `/contacto` (90), ficha (95).
- Medio — `og:url` = portada en todas las subpáginas; ausente en la ficha de obra.
- Bajo — enlace "Read more" genérico en `/en`; salto de nivel de encabezado en `/obra`.

## Schema (75)
Person + WebSite en todo el sitio; ProfilePage + FAQPage en Biografía; VisualArtwork + BreadcrumbList en fichas;
CollectionPage en Prensa; FAQPage en Cómo adquirir. 0 bloques inválidos.
Faltan: `ImageObject` con datos de licencia, `dateModified`/`author`, `ExhibitionEvent` en Exposiciones, Wikidata en `sameAs`.

## Rendimiento (no medido)
PageSpeed sin API key: cuota agotada. Señales indirectas: portada de 222 KB de HTML con 240 imágenes;
primera imagen con `loading="lazy"` en `/obra`, `/exposiciones` y `/performance` (retrasa LCP).

## Imágenes (60)
Alt presente en el 100 %. Sin sitemap de imágenes; nombres de archivo no descriptivos (`/images/obras/001.jpg`);
todas sin `width`/`height` en HTML (posible falso positivo si usan `fill` con `aspect-ratio`).

## Preparación para búsqueda IA (75)
Ver `docs/seo/AUDITORIA-GEO-2026-11-24.md`: geo-optimizer 73–81/100; robots abierto, llms.txt válido,
contenido accesible sin JS. Falta entidad en Knowledge Graph (Wikidata) y fechas/autoría.

## Visibilidad en búsqueda (búsqueda web, no Google)
Consulta "Segundo Planes artista cubano": cubanartresources.org, askART, artspawn, MOCA Americas, PDF del Fondo
Editorial NL, Google Arts & Culture. El sitio oficial no aparece. askART indica residencia en EE. UU. (dato inconsistente).

Plan priorizado: `ACTION-PLAN.md`.
