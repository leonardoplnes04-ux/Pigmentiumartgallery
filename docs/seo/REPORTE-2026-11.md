# Reporte SEO / IA — 2026-11-20

Rama `seo-ia-2026-11` (5 commits sobre `main`, **sin push, merge ni deploy**). Con la bandera apagada, el sitio se ve igual que hoy: verificado comparando el HTML visible contra `main` en `/`, `/obra`, dos fichas, `/sobre-mi`, `/en`, `/en/about`, `/en/works/obra-14`, `/performance` y `/contacto`. Solo cambian los `alt`.

## Qué se hizo

**Bloque A — base invisible (sin bandera)**
- `sameAs` del `Person` con Cuban Art Resources, askART y MOCAA (`data/artist.ts`; ningún componente recorre `socials`) y `subjectOf` con el libro de 2010.
- JSON-LD `WebSite` en todo el sitio y `ProfilePage` en `/sobre-mi` y `/en/about`.
- Meta description de cada obra con datos confirmados y ≤ 160 caracteres (`lib/artworkText.ts`).
- `alt` de ficha y tarjeta: «Título — Segundo Planes, técnica, año» (o la descripción aprobada).
- Titles y descriptions de home, obra y biografía reescritos; **todas** las páginas indexables quedan en title ≤ 65 y description ≤ 160 (antes había 12 titles de obra demasiado largos y la descripción de la home medía unos 290 caracteres).
- Sitemap con `lastModified` fijo (`CONTENT_UPDATED` en `data/site.ts`).
- Simuladores: `noindex, follow` + canonical a su ficha; no están en el sitemap.
- IndexNow: llave en `public/b258796ccdb00091b51b6cf8339b3a6b.txt` y `npm run indexnow` (no se ejecutó).
- Etiquetas de verificación de Google/Bing desde variables de entorno (sin valor no se publica nada).
- `generate_lead` ya existía en el formulario de contacto; se le añadieron `method: "contact_form"` y `artwork_id`.
- `llms.txt`: secciones «También sobre el artista» y «Temas» (esta solo con la bandera encendida).

**Bloque B — descripciones de obra (pendientes de tu aprobación)**
- 124 borradores (es/en, de 40 a 70 palabras) en `data/artworkDescriptions.ts`, todos con `approved: false`.
- Se usan solo los aprobados: en el alt, en la meta description, en el JSON-LD (solo si también se ven en la página) y en el párrafo visible «Sobre la obra» (con la bandera encendida). En `npm run dev` con la bandera encendida aparecen todos, marcados como «BORRADOR».

**Bloque C — contenido nuevo (detrás de la bandera; con la bandera apagada esas URLs devuelven 404)**
- `/prensa` (`/en/press`): el libro con enlace al PDF, otras fuentes externas y las exposiciones individuales. JSON-LD `CollectionPage`.
- `/arte-cubano-generacion-80` (unas 545 palabras) y `/como-adquirir-obra` (unas 467 palabras, con `FAQPage`). Cada una tiene un solo H1 y enlaces a 5 obras y a contacto.
- Introducción de 3 párrafos en `/performance` y de 2 frases en `/obra`; enlaces nuevos en el footer.
- Todo está en `ES_TO_EN`, `npm test` pasa (7/7) y el sitemap incluye las 6 URLs nuevas solo cuando la bandera está encendida.

**Bloque D — imagen con marca de agua por correo (detrás de la bandera)**
- Botón «Recibir imagen por correo» en la ficha, con formulario de nombre y correo y un campo trampa contra bots.
- `POST /api/imagen-obra`: genera la imagen con `sharp` (1600 px, mosaico diagonal + franja con nombre y fecha, fuente Inter con licencia OFL en `assets/fonts/`) y la envía con Resend.
- Convex: `leads:requestImage`, con límites de 3 por correo cada 24 h y 10 por IP (guardada como hash) cada hora. Se añadieron el interés `image_request`, el campo `ipHash` y el índice `by_ipHash`.

## Verificación hecha
- `npm run typecheck`, `npm test` y `npm run build`: sin errores, tanto con la bandera apagada como encendida.
- JSON-LD: JSON válido; sin «por confirmar», `undefined` ni precios.
- `/robots.txt`, `/llms.txt`, `/sitemap.xml` y la llave de IndexNow responden 200.
- POST de prueba: honeypot lleno → 200 sin generar imagen; obra inexistente → 400; correo inválido → 400; envíos válidos 1 a 3 → 200 con la imagen en `.verify/imagen-obra-ultima.jpg`; cuarto envío → 429. La imagen se revisó: las dos marcas de agua y el texto se leen bien, acentos incluidos.

## Cómo verlo
1. Agrega `NEXT_PUBLIC_SEO_PREVIEW=1` a `.env.local` y corre `npm run dev`.
2. Revisa:
   - http://localhost:3000/obra/obra-14 (párrafo «Sobre la obra» con «BORRADOR» y botón «Recibir imagen por correo»)
   - http://localhost:3000/obra (intro)
   - http://localhost:3000/performance (intro)
   - http://localhost:3000/prensa · http://localhost:3000/en/press
   - http://localhost:3000/arte-cubano-generacion-80 · http://localhost:3000/en/cuban-art-1980s-generation
   - http://localhost:3000/como-adquirir-obra · http://localhost:3000/en/how-to-acquire-artwork
   - el footer de cualquier página (3 enlaces nuevos)
3. Sin `RESEND_API_KEY` en local, el botón no envía correo: guarda la imagen en `.verify/imagen-obra-ultima.jpg`.

## Cómo aprobar descripciones
Abre `docs/seo/revision-descripciones.md` (tabla con miniatura y texto). Para aprobar una, en `data/artworkDescriptions.ts` cambia `d("…", "…")` por `d("…", "…", true)`. Revisa con atención las fotos con una persona delante de la obra o con varias piezas en una sola foto.

## Variables de entorno
- **Vercel:**
  - `RESEND_API_KEY`, `NOTIFY_FROM`, `NOTIFY_TO` (los mismos valores que ya están en Convex).
  - `IP_SALT`: cualquier texto aleatorio largo.
  - `NEXT_PUBLIC_GSC_VERIFICATION` y `NEXT_PUBLIC_BING_VERIFICATION`: opcionales.
  - `NEXT_PUBLIC_SEO_PREVIEW=1`: solo cuando quieras publicar los bloques C y D.
- **Convex:** sin variables nuevas (ya usa `RESEND_API_KEY`, `NOTIFY_FROM`, `NOTIFY_TO`, `SITE_URL`).
- Plantilla sin valores: `.env.example`.

## Pasos para publicar
1. Revisar en localhost; aprobar las descripciones que quieras.
2. Desplegar las funciones de Convex: `npx convex deploy` (producción) y `npx convex dev` (dev). **No se hizo:** sin este paso, `requestImage` no existe y la ruta responde 500 en Vercel.
3. Merge a `main`, crear las variables de entorno y deploy (`npx vercel deploy --prod --scope enciro-arquitectos-projects`).
4. Con el sitio ya publicado: `npm run indexnow`, y reenviar el sitemap en Search Console y Bing.

## Pendientes y dudas
- **Citas críticas:** las 6 `criticReviews` existentes tienen el autor «Por confirmar», sin publicación ni año. Por la regla 4 no se publicó ninguna en `/prensa`. Además se ven redactadas como texto de muestra, y hoy se muestran en las fichas `obra-07` a `obra-12`: conviene confirmarlas o quitarlas.
- **Title de la home:** el pedido («…Artista plástico cubano | Arte contemporáneo cubano») mide 68 caracteres, más que el límite de 65. Quedó «Segundo Planes — Artista cubano | Arte contemporáneo cubano» (59), que conserva la búsqueda «artista cubano».
- **Títulos de obra muy largos** (obra-35, 38, 40, 62, 88, perf-03): el `<title>` omite « — Segundo Planes» o se corta con «…».
- **Límites en local:** como la función de Convex no está desplegada, en local la ruta aplica los mismos límites en memoria (solo fuera de Vercel). Los límites reales de Convex no se probaron.
- **`/api/imagen-obra`** solo incluye en la función de Vercel `public/images/obras/**` y las imágenes sueltas de `public/images/` (unos 22 MB), no la carpeta completa de unos 147 MB. Si no encuentra el archivo, lo descarga del propio sitio.
- **Marca de agua:** el mosaico diagonal es tenue sobre pinturas rojas o naranjas (opacidad baja, a propósito). Se puede subir en `lib/watermarkImage.ts` (`alpha="60%"`).
- Algunos borradores mencionan a la persona que aparece en la foto (obra-14, obra-132) o describen fotos de sala; decide si quieres esas fichas así.
- `biografia/` sigue sin estar en git (no se agregó).
