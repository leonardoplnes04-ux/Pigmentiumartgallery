# Galería Digital — PIGMENTIUM ART GALLERY (Segundo Planes)

## Resumen para retomar (actualizado 2026-08-17)

**Vista en tu pared:** simulador de escala v1 en `/obra/[id]/simulador`
— el cliente sube una foto de su espacio y ubica la obra a ojo (sin
calibración). Solo aparece para obras con `realDimensionsCm` cargado en
`data/artworks.ts`; **hoy ninguna lo tiene**, así que el botón "Ver en
tu pared" está invisible en todo el sitio hasta que se confirmen
medidas reales. Detalle en "Bitácora" y en
`docs/specs/2026-08-17-wall-simulator-design.md`.

**Idioma:** el sitio tiene selector ES/EN (botón en el Header), estado
"es" por defecto, se guarda en `localStorage`. Contenido editorial
(`data/*.ts`) y textos de interfaz (`data/translations.ts`) están
duplicados en ambos idiomas — ver detalle en "Bitácora" y en
`docs/specs/2026-08-17-language-toggle-design.md`.

**Qué es:** galería digital para el artista plástico contemporáneo Segundo
Planes, marca del sitio "PIGMENTIUM ART GALLERY". Home construida y
funcional; subpáginas (`/obra`, `/sobre-mi`, `/exposiciones`, `/contacto`)
son stubs "Próximamente" (`components/ComingSoonPage.tsx`).

**Cómo levantarlo:**
```
cd C:\Users\leona\DARTGALLERY
npm run dev
```
→ `http://localhost:3000`. `npx tsc --noEmit` para chequear tipos antes de
dar por cerrado cualquier cambio.

**Stack:** Next.js 15 (App Router) + TypeScript + Tailwind CSS 3 +
Framer Motion (carrusel). Componentes de servidor por defecto; `"use client"`
solo donde hay estado/interactividad (`Header`, `Footer`, `Hero`,
`FeaturedCarousel`).

**Repo remoto:** https://github.com/leonardoplnes04-ux/Pigmentiumartgallery
(rama `main`). Pusheado y al día — listo para importar en Vercel
(vercel.com/new), Next.js se detecta automático, sin config extra.
**Todavía no se hizo el deploy a Vercel.**

**Estructura de datos (`data/*.ts`)** — todo el contenido vive separado de
los componentes para poder reemplazarlo sin tocar código:
- `data/site.ts` → marca del sitio ("PIGMENTIUM ART GALLERY").
- `data/artist.ts` / `data/types.ts` → identidad del artista (nombre, bio,
  tagline, `heroImage`, `heroVideo`, email, redes). Bio/tagline **siguen
  siendo placeholder**, pendientes de redacción real.
- `data/artworks.ts` → 12 obras: `obra-01..06` son placeholders (SVG de
  colores, series "Interiores"/"Derivas", **no reales, sin usar en la home**)
  y `obra-07..12` son las 6 obras reales del artista (serie **Aviario**,
  imágenes en `public/images/obra-*.jpg`). Ficha técnica de las reales
  (año/medio/dimensiones) es **provisional**: año leído de la firma en cada
  pieza, dimensiones y títulos definitivos pendientes de confirmar con el
  artista.
- `data/series.ts` → 3 series: "Interiores", "Derivas" (placeholder),
  "Aviario" (real).
- `data/exhibitions.ts` → 3 entradas placeholder, sin tocar.

**Componentes clave:**
- `components/Hero.tsx` → imagen fija (`public/images/hero-segundo-planes.jpg`)
  que a los 1.5s hace crossfade a un video en loop
  (`public/videos/hero-segundo-planes.mp4`, sin watermark, limpiado con
  ffmpeg/delogo). Contenedor `aspect-[7/4]` + `object-contain` para que la
  obra nunca se recorte; `min-h-[380px]` para que el texto no quede
  apretado en mobile.
- `components/FeaturedCarousel.tsx` → carrusel de "Obra destacada": solo
  muestra las 6 obras reales (filtra por `!image.includes("placeholder")`),
  drag con física spring (Framer Motion), un clic = una obra centrada con
  las vecinas asomando a los costados, tarjetas glassmorphism
  (`backdrop-blur`), cada tarjeta respeta la proporción real de su imagen.
- Resto de secciones (`ArtistStatement`, `SeriesGrid`, `ExhibitionsPress`,
  `ContactBanner`, `Footer`, `Header`) ya tienen pasada de responsividad
  mobile (padding/tipografía escalados con `sm:`/`md:`).

**Pendiente / próximos pasos** (ver detalle en "Próximos pasos" al final):
confirmar ficha técnica real de la serie Aviario, decidir qué hacer con los
placeholders de Interiores/Derivas, construir las subpáginas reales, y
hacer el primer deploy a Vercel cuando el usuario lo pida.

## Propósito de esta carpeta
Todo lo relacionado con este proyecto vive aquí:
- Este archivo (`PROYECTO.md`) como bitácora de avances y decisiones.
- Archivos de código, diseño, assets, etc.
- Cualquier otro `.md` de referencia (briefs, notas del artista, especificaciones).

## Decisiones clave
- **Propósito del sitio:** exhibición curada + camino a consulta/venta (sin carrito, "consultar disponibilidad").
- **Contenido:** placeholder por ahora; el artista y sus obras reales aún no están definidos. Estructura de datos separada (`data/*.ts`) para sustituir sin tocar componentes.
- **Stack:** Next.js (App Router) + TypeScript + Tailwind CSS. Target de despliegue: Vercel.
- **Referencia visual:** el usuario pasó el HTML renderizado de la home de Art Blocks (galería de arte generativo). Se adapta su lenguaje visual (minimalista, editorial, mucho whitespace) pero simplificado para un solo artista — sin carrusel de colecciones ni buscador global.
- **Spec de la home:** ver `docs/specs/2026-08-16-homepage-design.md` para la estructura completa de secciones, paleta, tipografía y modelo de contenido.

## Bitácora
- **2026-08-16**: Se crea la carpeta del proyecto.
- **2026-08-16**: Brainstorming de la página principal. Usuario aprueba diseño, contenido placeholder, propósito (exhibición + consultas), y stack Next.js/TS/Tailwind. Se escribe el spec en `docs/specs/2026-08-16-homepage-design.md`.
- **2026-08-16/17**: Se construye la home directamente (sin esperar al flujo completo de plan formal) para que el usuario la viera corriendo en local cuanto antes. Servidor de desarrollo levantado en `http://localhost:3000`.
- **2026-08-17**: Se separa "marca de la galería" de "nombre del artista" en el modelo de datos (`data/site.ts` nuevo). Galería: **PIGMENTIUM**. Artista: **Segundo Planes** (bio/tagline siguen siendo placeholder, redactadas ahora en masculino). Header, footer y `<title>` usan la marca de la galería; hero y sección "sobre mí" siguen mostrando el nombre del artista.
- **2026-08-17**: Se agrega una foto real del artista como imagen de fondo del Hero, detrás del nombre "Segundo Planes" (`artist.heroImage`, nuevo campo en `data/types.ts`).
- **2026-08-17**: Primeras obras reales del artista incorporadas al catálogo (6 piezas, todas con aves/flora/figuras infantiles). Como el contenido no encajaba temáticamente con las series placeholder ("Interiores"/"Derivas"), se crea una tercera serie real: **Aviario** (`serie-aviario` en `data/series.ts`). Ficha técnica (año, medio, dimensiones) es provisional — el año se leyó de la firma visible en cada obra ("2do" + año abreviado); dimensiones y títulos definitivos pendientes de confirmar con el artista. Los 6 placeholders de Interiores/Derivas se conservan sin tocar.

- **2026-08-17**: "Obra destacada" pasa de grid estático a carrusel con física de arrastre (drag + inercia con spring, vía Framer Motion) y tarjetas con efecto de vidrio esmerilado (glassmorphism: `backdrop-blur` + borde/tinte translúcido) sobre cada imagen. Autoplay que se pausa al interactuar, botones prev/next y dots, todos con el mismo tratamiento de vidrio. El carrusel solo muestra las obras reales (serie Aviario); los placeholders siguen visibles en el catálogo completo (`/obra`) pero no en la sección destacada. Nueva dependencia: `framer-motion`.

- **2026-08-17**: Dos correcciones al carrusel de obra destacada: (1) cada tarjeta ahora respeta el tamaño/proporción real de su imagen (alto fijo, ancho automático) en vez de forzar un recorte 4:5 uniforme — piezas apaisadas y verticales conviven sin deformarse; (2) se envuelve el track arrastrable en un contenedor `overflow-hidden` y se fija `touch-action: pan-y`, ya que el drag no estaba clippeado y desbordaba el layout de toda la página al arrastrar/scrollear sobre el carrusel.

- **2026-08-17**: Carrusel de obra destacada pasa de filmstrip libre a modo "un clic = una obra": el ítem activo se centra en el viewport (fórmula de centrado basada en el ancho real de cada tarjeta) y las vecinas quedan asomando a los costados con menor escala/opacidad. Viewport angostado (`max-w-420/560/680px`) para que solo quepa una obra a foco completo más los bordes de sus vecinas; mismo cálculo de centrado se usa al hacer clic, en autoplay y al soltar el drag (snap al centro más cercano).

- **2026-08-17**: El Hero pasa de imagen estática a imagen + video: se mantiene la foto fija ~4s y luego hace crossfade (1.5s) hacia un video en loop del mismo cuadro ("cobra vida"). Video en autoplay/muted/loop/playsInline; si el navegador bloquea el autoplay, la imagen se queda de fondo sin romper nada. Nuevo campo `artist.heroVideo` en el modelo de datos; Hero.tsx pasa a ser client component por el timer y el control del `<video>`.

- **2026-08-17**: Se detecta y elimina el watermark "DeeVid AI" (herramienta con la que se generó el video) en la esquina superior derecha del video del Hero. Se instala ffmpeg (winget) y se tapa esa zona con una caja negra sólida — coincide con el fondo negro del video en ese punto, queda invisible. Video reemplazado en `public/videos/hero-segundo-planes.mp4`.

- **2026-08-17**: Se corrige el Hero para que la obra se vea completa. El contenedor era `h-[90vh]` (muy alto/angosto en móvil) mientras que el video/imagen es panorámico (1344×768, 7:4) — ese desfase de proporción hacía que `object-cover` recortara fuerte y en pantallas angostas terminara mostrando sobre todo el fondo negro del video en vez del cuadro. Se cambia el contenedor a `aspect-[7/4]` (con tope `max-h-[85vh]`) y `object-cover` → `object-contain`, así la pieza completa siempre es visible, sin recortes ni "cuadro negro".

- **2026-08-17**: Se corrige de verdad el "cuadro negro" del video: el fondo de esa esquina no era negro sólido sino una textura oscura (ramas), así que la caja negra plana que tapaba el watermark quedaba como un parche visible y notorio — eso era lo que el usuario seguía viendo. Se reemplaza por el filtro `delogo` de ffmpeg (reconstruye la zona interpolando la textura de alrededor en vez de rellenar con un color plano). Reencodeado y verificado en varios puntos del video (inicio, medio, fin): ya no se ve ninguna caja, solo un leve rastro de interpolación imperceptible sobre la textura oscura.

- **2026-08-17**: Pasada de responsividad mobile en toda la home. El sitio se construyó con espaciado/tipografía pensados para desktop (`py-24` fijo, `text-3xl`/`text-lg` sin variante mobile) y se veía desproporcionado en pantallas chicas. Cambios: (1) Header — nombre de marca más chico en mobile (`text-sm` → `sm:text-lg`) para que no se apriete contra el botón de menú; (2) Hero — se agrega `min-h-[380px]` para que el título/tagline/botón no queden apretados en la caja corta que resulta del aspect-ratio 7:4 en mobile, tipografía y padding escalados (`text-3xl` → `sm:text-5xl` → `md:text-7xl`); (3) todas las secciones (Obra destacada, Sobre mí, Series, Exposiciones, Contacto, Footer) bajan su padding vertical de `py-24` fijo a `py-16 sm:py-20 md:py-24`, con títulos `text-2xl sm:text-3xl` en vez de `text-3xl` fijo.

- **2026-08-17**: Se construye la ficha de obra (ver spec `docs/specs/2026-08-17-artwork-detail-design.md`, brainstorming previo con el usuario). Alcance: (1) `/obra/[id]` — página de detalle con imagen(es) sin recortar, ficha técnica y comentarios de críticos; (2) `/obra` — catálogo real que reemplaza el stub "Próximamente", muestra las 6 obras reales enlazadas a su detalle; (3) las tarjetas del carrusel "Obra destacada" del home ahora son clickeables y llevan al detalle. Modelo de datos: `Artwork` gana `additionalImages?` y `criticReviews?` (opcionales, no rompen nada existente); las 6 obras reales llevan 1 cita de crítico cada una — **placeholder**, atribuida a un rol genérico ("crítica de arte independiente", etc.), nunca a un nombre o publicación real, pendiente de reemplazar. Verificado: `/obra`, `/obra/obra-07` y un id inexistente (404 correcto) contra el servidor de desarrollo.

- **2026-08-17**: Selector de idioma ES/EN (brainstorming previo, spec en
  `docs/specs/2026-08-17-language-toggle-design.md`). Toggle simple en el
  Header, sin cambiar la URL, guardado en `localStorage`
  (`dartgallery-lang`), default `"es"`. Nuevo tipo `LocalizedText =
  { es, en }` en `data/types.ts` aplicado a todo campo editorial
  (títulos/medios/dimensiones de obra, citas de críticos, nombres y
  descripciones de series, títulos/descripciones de exposiciones, bio y
  tagline del artista); campos no lingüísticos (ids, año, imágenes,
  venue, nombres propios) quedan como antes. Traducido al inglés todo el
  contenido actual, incluido el placeholder. Textos fijos de interfaz
  (nav, botones, estados, footer) en nuevo `data/translations.ts`. La
  mayoría de los componentes de contenido pasan a Client Components
  (`useLanguage()` + helper `pick()`); las páginas de `app/*` siguen
  siendo Server Components salvo `/obra` (necesitaba textos traducidos).
  **Límite aceptado:** el `<title>`/meta description (SEO, generados en
  el servidor) quedan fijos en español — el servidor no puede leer el
  `localStorage` del navegador sin pasar a rutas `/en` (fuera de
  alcance). Verificado: `npx tsc --noEmit` limpio, las 7 rutas
  (`/`, `/obra`, `/obra/obra-07`, `/obra/obra-12`, `/sobre-mi`,
  `/exposiciones`, `/contacto`) responden 200.

- **2026-08-17**: Vista en tu pared v1 (brainstorming previo, spec en
  `docs/specs/2026-08-17-wall-simulator-design.md`). El pedido original
  mezclaba dos features distintas — vista con foto propia vs. RA en vivo
  con cámara — se acotó a la primera; RA en vivo queda para una fase
  aparte. Se evaluó agregar un paso de calibración de escala (línea de
  referencia + cm reales) pero se descartó a pedido del usuario: el
  cliente solo sube la foto, la obra aparece a un tamaño inicial
  razonable con su medida real como etiqueta, y la ubica/agranda a ojo
  (sin garantía matemática de escala exacta — trade-off aceptado).
  Nuevo campo opcional `Artwork.realDimensionsCm` (`{ width, height }`
  en cm, separado del texto `dimensions` ya existente) actúa como gate:
  sin él, ni el botón "Ver en tu pared" en `/obra/[id]` ni la ruta
  `/obra/[id]/simulador` existen (404). Hoy ninguna de las 6 obras
  reales lo tiene. Implementación sin librerías nuevas: arrastre/resize
  con Pointer Events sobre `<img>` posicionadas con CSS durante la
  edición, composición final en un `<canvas>` oculto solo al descargar;
  nada se sube a ningún servidor. De paso, se extrajo a
  `lib/artworks.ts` la lógica de "obras reales" que estaba duplicada en
  `/obra` y `/obra/[id]`. Verificado con una medida de prueba temporal
  en `obra-07` (revertida antes de commitear): botón visible, ruta
  200, obras sin medida siguen en 404; servidor reiniciado limpio para
  descartar ruido de hot-reload.

## Próximos pasos
- Confirmar con el artista: títulos definitivos, año y dimensiones exactas de las obras de la serie Aviario; citas reales de críticos (hoy son placeholder); reemplazar o retirar los placeholders restantes de Interiores/Derivas. **Esto también activa "Ver en tu pared"** — en cuanto una obra tenga `realDimensionsCm` cargado, el botón aparece solo.
- **RA en vivo** (cámara en tiempo real, la obra "flota" en el espacio del cliente): fase aparte de "Vista en tu pared" v1 (ya construida) — necesita `model-viewer`/WebXR y modelos 3D por obra, con su propio spec cuando se retome.
- Más adelante: construir el resto de subpáginas (Sobre mí, Contacto con formulario real) con contenido real; decidir si se integra un CMS headless.
