# Auditoría GEO — segundoplanes.com (2026-11-24)

Herramienta: `geo-optimizer` 4.28.0 (`geo audit --no-plugins --format json`), rúbrica v5, sobre el sitio en producción.
Bandas: 0–35 crítico · 36–67 base · 68–85 bueno · 86–100 excelente.

## Puntaje por página

| Página | Puntaje | Contenido (/14) | Marca (/12) |
|---|---|---|---|
| `/en` | 81 | 14 | 7 |
| `/` | 79 | 14 | 5 |
| `/sobre-mi` | 78 | 9 | 8 |
| `/en/about` | 78 | 9 | 8 |
| `/como-adquirir-obra` | 78 | 11 | 6 |
| `/arte-cubano-generacion-80` | 76 | 11 | 5 |
| `/exposiciones` | 74 | 10 | 4 |
| `/performance` | 74 | 10 | 4 |
| `/prensa` | 73 | 10 | 5 |
| `/obra/obra-13` | 71 | 6 | 5 |
| `/obra` | **67** | **3** | 4 |

Iguales en todas: robots 14/14, meta 11/11, Google AI 18/20, llms.txt 5/6, señales 3/6, AI discovery 0/3.

## Lo que ya está bien
- robots.txt abierto a todos los bots y con `Sitemap:`; indexable, sin restricciones de snippet, canonical correcto, viewport, enlaces rastreables.
- llms.txt válido (H1, descripción, 10 secciones, 28 enlaces).
- JSON-LD: Person + WebSite en todo el sitio; ProfilePage/FAQPage en Sobre mí; VisualArtwork + BreadcrumbList en fichas; FAQPage en Cómo adquirir.
- `sameAs` del Person ya enlaza Instagram, Cuban Art Resources, askART y MOCA Americas.
- hreflang es/en, contenido accesible sin JS (salvo /obra), sin inyección de prompts.

## Hallazgos, por prioridad

### 1. `/obra` y `/en/works` llegan vacías a los rastreadores (alta)
El HTML crudo trae `BAILOUT_TO_CLIENT_SIDE_RENDERING`: 0 encabezados, sin H1, 71 palabras, ningún enlace `/obra/obra-N`.
Causa: `components/pages/CatalogPage.tsx:142` usa `useSearchParams()`, lo que manda toda la página a render en cliente.
Los bots de IA (y Google en la primera pasada) no ven el catálogo. Arreglo: leer los parámetros con `hooks/useLocationSearch.ts`
(ya existe para evitar justo esto) o aislar solo la parte que depende de `?disponibles=1` en un componente cliente dentro de `<Suspense>`,
de modo que la rejilla con títulos y enlaces se renderice en servidor.

**Hecho 2026-11-24 (local, sin commit):** `CatalogPage.tsx` lee la query con `useSyncExternalStore` (servidor = "" → catálogo
completo prerenderizado) y un `SearchChangeWatcher` vacío dentro de su propio `<Suspense>` es el único que usa `useSearchParams`,
para captar navegaciones suaves (menú "Obra" desde `?disponibles=1`, atrás/adelante). Verificado contra `next start`:
`/obra` y `/en/works` traen H1 y 124 enlaces a fichas en el HTML; disponibles, orden=1, botón del Hero, menú, atrás/adelante
y cambio de idioma funcionan en Chrome; `tsc` limpio, `npm test` 13/13.

### 2. Fichas de obra delgadas (media)
`/obra/obra-13`: 111 palabras, un solo encabezado. Depende de aprobar `data/artworkDescriptions.ts` (pendiente desde 2026-11-20).

### 3. Fechas (media, todas las páginas — G-DATES)
Sin `dateModified`/`datePublished` ni fecha visible. Añadir `dateModified` al JSON-LD de WebPage/ProfilePage y una línea visible
("Actualizado: noviembre 2026") en Sobre mí, Exposiciones y Prensa.

### 4. Autoría (baja — G-BYLINE)
Añadir `author` → el Person (`@id`) en WebPage/VisualArtwork y enlazar a `/sobre-mi`.

### 5. Entidad / Knowledge Graph (media)
`kg_pillar_count = 0`: no hay Wikidata ni Wikipedia en `sameAs`. Si existe un ítem de Wikidata para Segundo Planes, agregarlo;
si no, crearlo es la acción de mayor peso para que los motores desambigüen al artista. (Requiere fuentes; tarea del dueño.)

### 6. Exposiciones y Performance sin schema propio (baja)
Solo Person + WebSite. Opciones: `CollectionPage` + `ItemList` de `ExhibitionEvent` con fechas y lugares.

### 7. Extras de bajo valor (opcional)
- AI discovery 0/3: `/.well-known/ai.txt`, `/ai/summary.json`, `/ai/faq.json`. Convenciones propuestas, poca adopción real.
- RSS: sin feed; solo valdría si hay noticias/exposiciones nuevas con frecuencia.
- `llms-full.txt` (1 punto).
- Seguridad: faltan cabeceras CSP y X-Frame-Options (afectan el "trust stack", no el puntaje).

## Falsos positivos (no actuar)
- "Keyword stuffing" en México, Habana, Monterrey, galería, arte, obra: son nombres de lugares y temas del artista, densidad 2.6–5.5 %.
- Portada "consultar" 9.1 % y `/en` "inquire" 10.5 %: vienen de los botones repetidos en las tarjetas. Leve; se podría variar el texto.
- "Sin enlace /about" y "falta Organization schema" en la portada: el sitio es de una persona; Person es el tipo correcto y Sobre mí sí está en el menú.
