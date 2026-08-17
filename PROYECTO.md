# Galería Digital — Artista Contemporáneo

## Estado
Diseño de la página principal aprobado (2026-08-16). Contenido con datos placeholder — artista real aún sin definir. Construyendo la home con Next.js + TypeScript + Tailwind.

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

## Próximos pasos
- Confirmar con el artista: títulos definitivos, año y dimensiones exactas de las obras de la serie Aviario; reemplazar o retirar los placeholders restantes de Interiores/Derivas.
- Más adelante: construir subpáginas (Obra, Sobre mí, Contacto) con este contenido real; decidir si se integra un CMS headless.
