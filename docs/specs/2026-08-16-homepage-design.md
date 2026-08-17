# DARTGALLERY — Homepage Design Spec

**Status:** Approved for implementation
**Date:** 2026-08-16
**Scope:** Homepage only (`app/page.tsx`). Subpages (Obra, Sobre el artista, Contacto) are stubbed as placeholder routes so navigation links resolve, but their content is out of scope here.

## Context

Galería digital para un artista plástico contemporáneo. El artista y el contenido real aún no están definidos — este proyecto se construye con **contenido placeholder** que se sustituirá después por datos reales, sin tener que tocar la estructura del código.

El usuario proporcionó como referencia visual el HTML renderizado de la home de **Art Blocks** (galería de arte generativo). Se toma su lenguaje de diseño como punto de partida — minimalista, editorial, mucho espacio en blanco — pero **no se copia literalmente**: Art Blocks está diseñado para cientos de artistas y colecciones rotativas; este sitio es para **un solo artista**, así que se simplifica en consecuencia (sin carrusel de colecciones, sin buscador global, sin grid de "artistas destacados").

## Purpose

Exhibición curada de la obra del artista **con un camino claro hacia la consulta/venta** (no e-commerce con carrito — el modelo es "consultar disponibilidad y precio").

## Tech stack

- **Next.js** (App Router) + **TypeScript** + **Tailwind CSS**
- Target de despliegue: Vercel
- Contenido en archivos de datos tipados (`data/artist.ts`, `data/artworks.ts`, `data/series.ts`, `data/exhibitions.ts`) — separar contenido de estructura para que reemplazar el placeholder por datos reales no requiera tocar componentes

## Visual direction

- **Paleta:** fondo off-white (`#F9F9F9`), texto casi-negro (`#1E1E1E`), bordes finos 1px (`#E0E0E0`)
- **Tipografía:** serif editorial para títulos (Fraunces o Newsreader — carácter de galería, no de tech), sans-serif limpia para cuerpo/labels (Inter). Labels pequeños en mayúsculas con letter-spacing amplio, heredado de la referencia
- **Espaciado:** generoso, negative space como recurso de jerarquía
- **Sin carrusel rotativo** — hero estático o con 3–4 obras destacadas como mucho

## Page structure (top to bottom)

1. **Header sticky** — nombre/logo del artista, nav (Obra · Sobre mí · Exposiciones · Contacto), botón de contacto
2. **Hero** a pantalla completa — obra destacada a sangre, nombre del artista, tagline corta, CTA "Ver obra"
3. **Grid de obras destacadas** — 3–6 piezas grandes, título/medio/año revelado al hover
4. **Extracto de declaración de artista** — retrato + texto corto + link "Leer más"
5. **Series/colecciones agrupadas** — tarjetas por cuerpo de obra
6. **Exposiciones y prensa** — lista tipo journal (título, lugar/medio, fecha)
7. **Banda de contacto/consulta** — "¿Te interesa una pieza? Escríbeme"
8. **Footer** — info del artista, nav, redes, newsletter, copyright

## Content model (placeholder data)

- **Artist:** name, tagline, bio corta, bio larga, foto de retrato
- **Artwork:** title, year, medium, dimensions, image, series, status (`available` / `sold` / `inquire`)
- **Series:** name, description, cover image, lista de obras
- **Exhibition/Press:** title, venue/outlet, date, description, link opcional

## Out of scope (for this spec)

- Subpáginas completas (Obra, Sobre mí, Contacto) — solo stubs de ruta
- Formulario de contacto funcional (backend/email) — el CTA puede apuntar a un `mailto:` placeholder por ahora
- Autenticación, panel de administración, CMS
- Contenido real del artista (nombre, obra, bio) — se sustituye después

## Open questions / assumptions to revisit

- Nombre del proyecto/dominio aún no definido
- Confirmar más adelante si se integra un CMS headless para que el artista pueda actualizar obra sin tocar código
