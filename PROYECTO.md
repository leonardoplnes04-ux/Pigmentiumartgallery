# Galería Digital — PIGMENTUM ART GALLERY (Segundo Planes)

## Resumen para retomar (actualizado 2026-08-23)

**Foco actual (en curso):** seguimos ampliando la **sección de
exhibición** (`/exposiciones`) — cargando exposiciones reales del
artista una por una (título, venue, año, galería de fotos) siguiendo el
patrón ya establecido en exp-04..exp-09 (ver "Bitácora" abajo para el
criterio de cada una: traducción de títulos, orden de fotos, casos
"Sin título", etc.). Van 6 exposiciones reales cargadas. Antes de
retomar esta sección, leer las entradas de Bitácora del 2026-08-20 en
adelante y la lista de pendientes específicos al final de "Próximos
pasos" (fechas por confirmar dentro de la carpeta de exp-09, títulos de
baja confianza en exp-08).

**Vista en tu pared:** simulador de escala v1 en `/obra/[id]/simulador`
— el cliente sube una foto de su espacio y ubica la obra a ojo (sin
calibración). Solo aparece para obras con `realDimensionsCm` cargado en
`data/artworks.ts`; **hoy solo `obra-07` (Guardián del jardín, 500 ×
150 cm) lo tiene** — el resto de Aviario sigue con el botón invisible
hasta confirmar sus medidas. Detalle en "Bitácora" y en
`docs/specs/2026-08-17-wall-simulator-design.md`.

**Idioma:** el sitio tiene selector ES/EN (botón en el Header), estado
"es" por defecto, se guarda en `localStorage`. Contenido editorial
(`data/*.ts`) y textos de interfaz (`data/translations.ts`) están
duplicados en ambos idiomas — ver detalle en "Bitácora" y en
`docs/specs/2026-08-17-language-toggle-design.md`.

**Qué es:** galería digital para el artista plástico contemporáneo Segundo
Planes, marca del sitio "PIGMENTUM ART GALLERY". Home construida y
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
(rama `main`). Pusheado y al día.

**Sitio en vivo:** https://pigmentiumartgallery.vercel.app — deployado a
producción el 2026-08-20. El repo de GitHub ya tiene la integración de
Vercel instalada, así que cada `git push` a `main` dispara un redeploy
automático — no hace falta correr `vercel --prod` a mano de nuevo.
(Nota: el primer deploy generó por accidente un segundo proyecto
duplicado, `pigmentium-art-gallery` con guiones, vía `vercel --prod`
desde un link local viejo. Se eliminó y el directorio local se
relinkeó al proyecto correcto con `vercel link --project
pigmentiumartgallery` — solo queda uno.)

**Estructura de datos (`data/*.ts`)** — todo el contenido vive separado de
los componentes para poder reemplazarlo sin tocar código:
- `data/site.ts` → marca del sitio ("PIGMENTUM ART GALLERY").
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
- `data/exhibitions.ts` → 6 entradas (`exp-04..09`), todas exposiciones
  reales del artista con galería de fotos cargada en
  `data/exhibitionGalleries.ts` (detalle de cada una en "Bitácora"
  2026-08-20 y 2026-08-23). Los 3 placeholders iniciales (`exp-01..03`)
  se eliminaron el 2026-08-23 — eran ejemplos inventados, no exposiciones
  reales pendientes de reemplazar. Sección en construcción activa — se
  van sumando exposiciones reales a medida que el usuario aporta el
  material.

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

- **2026-08-17**: Confirmadas las medidas reales de `obra-07` (Guardián
  del jardín): 500 × 150 cm — dato pasado por el usuario en metros
  (5.00 × 1.50 m, ancho × alto), convertido a cm. Se cargó tanto el
  texto mostrado (`dimensions`) como `realDimensionsCm`, activando el
  botón "Ver en tu pared" en esa obra (es la primera obra real con el
  simulador visible en el sitio). Verificado: `npx tsc --noEmit`
  limpio, `/obra/obra-07/simulador` responde 200, "500 × 150 cm"
  aparece tanto en la ficha técnica como en la etiqueta del simulador.

- **2026-08-17**: `/exposiciones` deja de ser stub y pasa a página real, con
  el listado agrupado por artista (brainstorming previo: alcance acotado a
  esta página — el resto del sitio, `data/artist.ts`/Hero/Sobre mí, sigue
  asumiendo un solo artista; ver "Próximos pasos"). Nuevo tipo
  `GalleryArtist` (`{ id, name }`) en `data/types.ts`, deliberadamente
  separado del `Artist` singular ya existente. Nuevo `data/galleryArtists.ts`
  con la lista (hoy solo Segundo Planes); `Exhibition` gana `artistId`
  requerido. La página filtra por artista con un tab-bar, pero el tab-bar
  solo se renderiza si `galleryArtists.length > 1` — con un solo artista
  cargado hoy no se muestra ningún control, para no exponer un filtro
  inútil. Verificado: `npx tsc --noEmit` limpio, `/exposiciones` responde
  200 y muestra las 3 exposiciones existentes, filtro confirmado oculto.

- **2026-08-20**: Hero rehecho con foto real del artista (reemplaza la
  imagen de estudio anterior); se desactiva el crossfade a video porque
  el video viejo mostraba una pintura distinta y ya no correspondía con
  la foto nueva — queda pendiente grabar un video nuevo si se quiere
  recuperar el efecto "la obra cobra vida". Se agrega un segundo botón
  "Exposiciones" al lado de "Ver obra" en el Hero, con su propia key de
  traducción (`hero.ctaSecondary`).

- **2026-08-20**: Primera exposición real cargada en `data/exhibitions.ts`
  (`exp-04`, "Ecua-error catatónica" — Centro Cultural Plaza Fátima,
  Monterrey, México, 2015). Nuevo campo opcional `Exhibition.image`
  (foto identificatoria a la derecha de la fila, tanto en el home como en
  `/exposiciones`). Se construye además la página de detalle
  `/exposiciones/[id]` (gated por `data/exhibitionGalleries.ts`, mismo
  patrón que gatea el simulador de pared por `realDimensionsCm`): al
  hacer clic en una exposición que tiene galería cargada, abre su ficha
  con todas las fotos en una sola columna, sin recortar. Las 43 imágenes
  de la carpeta `E:\Expos-2015-...\1-EXPO.ECUA-ERROR CATATONICA` se
  copiaron a `public/images/exposiciones/ecua-error-catatonica/` y se
  renombraron `01.jpg`..`43.jpg` en el orden numérico que el propio
  artista les dio en el nombre de archivo original (no alfabético — "02"
  antes que "010"). Dos archivos no encajaban en esa numeración: un
  "19.jpg" suelto (duplicado de "019", se colocó justo después) y un
  "IMG_0183.JPG" genérico de cámara sin numerar (se colocó al final).
  Las obras sin texto descriptivo en el nombre de archivo (la mayoría a
  partir de la #25) quedan como "Sin título"/"Untitled" — es literalmente
  todo el dato que traía el archivo original, no un placeholder a
  reemplazar. Verificado: `tsc --noEmit` limpio, `/exposiciones/exp-04`
  responde 200, `/exposiciones/exp-01` (placeholder sin galería) sigue
  dando 404 correctamente.

- **2026-08-20**: Segunda exposición real, "Lemas e himnos mutilados" —
  GE Galería, Monterrey, México, 2012 (`exp-05`). Mismo patrón que
  `exp-04`: imagen identificatoria en la fila de `/exposiciones` y el
  home, ficha de detalle en `/exposiciones/exp-05` con las 34 fotos de
  `E:\Expos-2015-...\2-EXPO.LEMAS E HIMNOS MUTILADOS...\` en orden
  numérico. A diferencia de la primera exposición, esta carpeta numeraba
  cada archivo del 1 al 34 sin huecos ni duplicados, así que el orden
  salió sin ambigüedades (no hubo casos como el "19.jpg" suelto o el
  "IMG_0183.JPG" de exp-04). Un puñado de piezas sí traían título en el
  nombre de archivo ("Entre el día y la noche", "Constelaciones" ×4,
  "Perla bomba"); el resto queda "Sin título"/"Untitled" por la misma
  razón que en exp-04. Verificado: `tsc --noEmit` limpio,
  `/exposiciones/exp-05` responde 200, imágenes sirven bien.

- **2026-08-20**: Nueva foto del artista en el Hero del home (reemplaza
  la anterior, mismo archivo `hero-segundo-planes.jpg` así que no hizo
  falta tocar código).

- **2026-08-20**: Tercera exposición real, "Sueño tallado en espuma" — GE
  Galería, Monterrey, México, 2011 (`exp-06`). A diferencia de exp-04/05,
  la carpeta origen (`3-Nueva carpeta`) **no** era una carpeta limpia de
  una sola muestra: mezclaba los archivos #837-877 de esta exposición
  (confirmado por el nombre de archivo #866, que dice literalmente "GE
  GALERIA.MONTERREY") con material de otros años (obras fechadas
  2008-2010 archivadas justo después de la #877) y, más adelante en la
  numeración, **una exposición completamente distinta** — "Memorias del
  circo", Instituto de América, Granada, España (#952-954) — además de
  un lote sin identificar (#955-1001) y un .doc suelto. Se cargaron
  únicamente los 41 archivos #837-877 (4 PNG + 37 JPG, extensión
  original preservada) para no atribuirle a esta muestra fotos de otra
  exposición o de años sin confirmar; el resto de la carpeta quedó
  afuera. Títulos de las piezas (los poéticos/frase larga, ej. "Legendario
  colmillo de tiempo, en mi sueño tu venir") se dejan sin traducir al
  inglés, igual que el título de la muestra; solo las leyendas genéricas
  (vista de la expo / sin título / en mi estudio) están traducidas.
  Verificado: `tsc --noEmit` limpio, `/exposiciones/exp-06` responde 200,
  imágenes (PNG y JPG) sirven bien.

- **2026-08-20**: Cuarta exposición real, "Insomnio" — Centro de las
  Artes Fundidora, Monterrey, México, 2006 (`exp-07`). Carpeta origen
  limpia otra vez (como exp-05): 24 archivos `#928`-`#951`, todos
  fechados 2006, sin mezcla con otro material. Ninguna pieza traía
  título individual en el nombre de archivo — solo "EXPO INSOMNIO"
  (vistas de instalación, con varias variantes/erratas de esa
  leyenda en el nombre original) o dimensiones sueltas — así que la
  galería queda como vistas de la exposición + "Sin título"/"Untitled".
  Título de la muestra sí se tradujo ("Insomnio" → "Insomnia"), a
  diferencia de exp-04/05/06, por ser una palabra común y no un
  título poético/inventado. Verificado: `tsc --noEmit` limpio,
  `/exposiciones/exp-07` responde 200, imágenes sirven bien.

- **2026-08-21**: Se renombra la marca de la galería de "PIGMENTIUM" a
  "PIGMENTUM" (pedido del usuario). Cambio centralizado en `data/site.ts`
  (`site.name`), de donde lo toman `<title>` (`app/layout.tsx`), Header y
  Footer. También se actualizan el email y el Instagram placeholder en
  `data/artist.ts` (`hola@pigmentium.example` → `hola@pigmentum.example`,
  `instagram.com/pigmentium` → `instagram.com/pigmentum`). **Pendiente si
  se quiere consistencia total:** el repo de GitHub
  (`leonardoplnes04-ux/Pigmentiumartgallery`) y el proyecto/dominio de
  Vercel (`pigmentiumartgallery.vercel.app`) siguen con el nombre viejo —
  no se tocaron porque implican renombrar infraestructura externa
  (repo/dominio), fuera del alcance de "cambiar el nombre en el sitio".

- **2026-08-22**: Se agrega un tercer botón en el Hero de la home, junto a
  "Ver obra" y "Exposiciones": "Obras disponibles" (`Available works` en
  inglés). Enlaza a `/obra?disponibles=1`; en vez de crear una ruta nueva,
  `/obra` (ahora dividida en `ObraGrid` + wrapper con `Suspense`, porque
  `useSearchParams` lo exige en build) filtra `realArtworks` por
  `status === "available"` cuando ese query param está presente, y cambia
  el `<h1>` a "Obras disponibles"/"Available works" en ese caso. Strings
  nuevos en `data/translations.ts` (`hero.ctaTertiary`). Verificado:
  `tsc --noEmit` limpio, `next build` completo sin errores.

- **2026-08-23**: Quinta exposición real, "Memorias del circo" / "Memories
  of the Circus" — Instituto de América, Santa Fe, Granada, España, 2003
  (`exp-08`). A diferencia de la nota pendiente anterior ("#952-954, sin
  confirmar"), el usuario ya organizó el material en su propia carpeta
  ("EXPO. MEMORIAS DEL CIRCO INSTITUTO DE AMÉRICA SANTA FÉ, GRANADA,
  ESPAÑA"), que resultó ser el lote completo #952-1000 (49 archivos únicos
  tras descartar 3 "- copia" duplicados). Miniatura del listado
  (`image` en `exhibitions.ts`) es la foto #966 que pidió el usuario
  explícitamente. Título de la muestra sí se tradujo (frase llana, no
  invento/juego de palabras — mismo criterio que "Insomnio"→"Insomnia" en
  exp-07); los títulos de cada pieza se dejaron sin traducir porque son
  frases largas, poéticas/inventadas (mismo registro que exp-06). Varios
  quedaron "Sin título" por texto ilegible o tapado por la propia obra en
  la foto, no por falta de esfuerzo — ver el comentario junto a
  `exhibitionGalleries["exp-08"]`. Verificado: `tsc --noEmit` limpio,
  `next build` completo sin errores, `/exposiciones/exp-08` genera
  estáticamente.

- **2026-08-23**: Sexta exposición real, "Pliegues de la vejez" / "Folds of
  Old Age" — GE Galería, Monterrey, México, 2008 (`exp-09`). Esta es la
  resolución del pendiente que venía arrastrándose desde exp-06: el
  usuario organizó el material #878-927 (antes disperso en
  `3-Nueva carpeta` sin identificar) en su propia carpeta
  "5-EXPO.PLIEGUES DE LA VEJEZ", igual que hizo con "Memorias del circo".
  36 archivos, #877-930, sin huecos pero con dos números repetidos (900 y
  902, cada uno con dos piezas distintas de dimensiones/medio diferentes)
  — se conservaron ambas como piezas separadas en vez de descartar una
  como duplicado. Casi ninguna traía título en el nombre, solo
  dimensiones/medio, así que la mayoría queda "Sin título"/"Untitled";
  cuatro fotos de instalación (#878, #905, #909, #912) decían solo
  "INSTALACION" sin más dato y se etiquetaron como piezas de instalación
  sin título (distinto del #877 "VISTA GENERAL", que sí es una vista de
  sala). Tres piezas sí traían título: "Gota de rocío"→"Dewdrop" y
  "Sombra proyectando su cuerpo"→"Shadow Casting Its Body" se tradujeron
  por ser frases descriptivas directas; "Horizonte orientalmente
  huérfano" se dejó sin traducir porque "orientalmente" es ambiguo
  (¿hacia el oriente? ¿al estilo oriental?) y una traducción a ciegas
  arriesgaba tergiversar la intención del artista. Miniatura del listado
  es la foto #909 (instalación) que pidió el usuario. **Pendiente de
  confirmar con el artista:** tres archivos de esta carpeta no coinciden
  con el año 2008 de la muestra — el segundo "902" y el "903" dicen 2009,
  y "928"-"930" dicen 2010 — se incluyeron igual por el mismo criterio de
  confianza en la curaduría del usuario que se aplicó en exp-08, pero
  vale la pena confirmar si de verdad pertenecen a esta exposición o se
  archivaron ahí por error. Verificado: `tsc --noEmit` limpio, `next
  build` completo sin errores (exp-09 aparece en las rutas estáticas
  generadas), `/exposiciones` y `/exposiciones/exp-09` responden 200 en
  dev, imágenes sirven bien.

- **2026-08-23**: Se reordena `data/exhibitions.ts` para que las
  exposiciones reales (exp-04 en adelante) queden por año descendente
  (más reciente primero) en vez de por orden de alta — ni `/exposiciones`
  ni el bloque de exposiciones del home ordenan nada al renderizar, así
  que el orden visual depende 100% del orden del array. Solo hizo falta
  mover `exp-09` (2008): quedó entre `exp-06` (2011) y `exp-07` (2006).
  Se deja un comentario en el archivo explicando que `id` refleja orden
  de alta, no año, para que la próxima exposición que se agregue se
  inserte en su posición cronológica y no simplemente al final. Orden
  verificado en dev: 2015 → 2012 → 2011 → 2008 → 2006 → 2003.

- **2026-08-23**: Se eliminan de `data/exhibitions.ts` los 3 placeholders
  `exp-01`/`exp-02`/`exp-03` ("Umbral", "Derivas", "Entrevista en Revista
  Lienzo") — el usuario aclaró que eran ejemplos inventados que nunca
  correspondieron al proyecto real, no exposiciones pendientes de
  reemplazar. No los referenciaba nada más (`exhibitionGalleries` nunca
  tuvo entradas para ellos), así que fue solo borrar los 3 objetos y el
  comentario que los mencionaba. `/exposiciones` y el bloque de
  exposiciones del home quedan con las 6 exposiciones reales únicamente.
  Verificado: `tsc --noEmit` limpio, `next build` sin errores, `/exposiciones`
  en dev ya no muestra los 3 títulos eliminados.

- **2026-08-23**: Foto del Hero del home pasa de `object-contain` a
  `object-cover`. La sección mantiene su proporción fija (`aspect-[7/4]`);
  el problema eran las franjas blancas a los costados porque
  `object-contain` encogía la foto (proporción real ~3:2, 1300×867) para
  que cupiera completa dentro de un contenedor más ancho (7:4), dejando
  ver el `bg-background` del `<section>` en los bordes. Con `object-cover`
  la foto llena el contenedor de punta a punta; el recorte resultante es
  leve (~14% del alto, repartido arriba/abajo) porque las proporciones
  son cercanas, y no corta al artista (está centrado en el encuadre).
  Verificado: `tsc --noEmit` limpio, `next build` sin errores, hot-reload
  del dev server confirmado por HTML servido (`object-cover` presente,
  `object-contain` ya no aparece). No se pudo tomar captura visual
  porque la extensión de Chrome para automatización no estaba conectada
  en esta sesión — pendiente que el usuario confirme a simple vista en
  `http://localhost:3000`.

- **2026-08-23**: El usuario reportó error 500 al abrir `localhost:3000`
  justo después del cambio anterior. Causa real: no fue el cambio del
  Hero, fue haber corrido `npm run build` (build de producción) mientras
  el `npm run dev` seguía activo sobre la misma carpeta `.next` — ambos
  procesos escriben ahí y se pisaron los chunks de webpack entre sí
  (`Cannot find module './254.js'`). Fix: matar el dev server, borrar
  `.next` por completo, y levantar `npm run dev` de nuevo desde cero.
  **Regla para adelante: nunca correr `npm run build` mientras el dev
  server persistente está activo** — si hace falta verificar un build de
  producción, primero matar el dev server (o usar una carpeta `.next`
  separada), y volver a levantar el dev server después. Verificado:
  `/`, `/exposiciones` y `/obra` responden 200 tras el reinicio; el
  cambio de `object-cover` del Hero seguía aplicado (no se perdió nada
  de código, solo la caché de build).

## Próximos pasos
- Cuando se sume un segundo artista real a la galería: agregar su entrada en `data/galleryArtists.ts`, tagear sus exposiciones con su `artistId` en `data/exhibitions.ts`, y el filtro por artista en `/exposiciones` aparece solo (sin tocar componentes). Si en algún momento también se necesita que `/obra` y `/sobre-mi` sean multi-artista (hoy siguen asumiendo a Segundo Planes como único artista del sitio), eso es un cambio de modelo de datos más grande — brainstorming aparte cuando se necesite de verdad.
- Confirmar con el artista: títulos definitivos, año y dimensiones exactas del resto de la serie Aviario (`obra-08`..`obra-12`, `obra-07` ya confirmada); citas reales de críticos (hoy son placeholder); reemplazar o retirar los placeholders restantes de Interiores/Derivas. **Esto también activa "Ver en tu pared"** por obra — en cuanto tenga `realDimensionsCm` cargado, el botón aparece solo.
- **RA en vivo** (cámara en tiempo real, la obra "flota" en el espacio del cliente): fase aparte de "Vista en tu pared" v1 (ya construida) — necesita `model-viewer`/WebXR y modelos 3D por obra, con su propio spec cuando se retome.
- Más adelante: construir el resto de subpáginas (Sobre mí, Contacto con formulario real) con contenido real; decidir si se integra un CMS headless.
- Confirmar con el artista los títulos de las ~19 obras "Sin título"/"Untitled" en la galería de "Ecua-error catatónica" (`data/exhibitionGalleries.ts`, exp-04) y aclarar si "19.jpg" e "IMG_0183.JPG" son variantes reales o descartables.
- La carpeta `E:\Expos-2015-...\3-Nueva carpeta` que tenía material 2008-2010 sin cargar ya quedó resuelta: "Memorias del circo" se cargó como `exp-08` (2026-08-23) y "Pliegues de la vejez" (#878-927 + #928-930) como `exp-09` (2026-08-23), ambas en carpetas propias que el usuario organizó. Pendiente solo confirmar con el artista si #902(2009)/#903(2009)/#928-930(2010) dentro de la carpeta de "Pliegues de la vejez" de verdad pertenecen a esa muestra de 2008 (ver nota en la entrada de bitácora de exp-09) — si no, moverlas a la exposición que corresponda.
- Confirmar con el artista un puñado de títulos de pieza en `exhibitionGalleries["exp-08"]` que se transcribieron con baja confianza por texto borroso/tapado por la propia obra en la foto (quedaron como "Sin título" en vez de arriesgar una lectura incorrecta) — especialmente las fotos 962, 964, 967, 969 y 970 del lote original (11.jpg, 13.jpg, 16.jpg, 18.jpg y 19.jpg en la carpeta ya renombrada).
