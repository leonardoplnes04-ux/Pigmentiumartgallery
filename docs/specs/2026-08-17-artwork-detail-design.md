# Ficha de obra (páginas de detalle) — Diseño

**Estado:** aprobado (2026-08-17)

## Propósito

Hoy el sitio no tiene ninguna forma de ver una obra individual: el
carrusel "Obra destacada" no lleva a ningún lado y `/obra` es un stub
"Próximamente". Este diseño agrega una página de detalle por obra
(imagen, ficha técnica, comentarios de críticos) y el catálogo que
enlaza a ellas.

El **simulador de pared** (subir foto, indicar dimensiones, generar
render) queda explícitamente fuera de este diseño — es un subsistema
aparte, con su propio diseño pendiente.

## Alcance

1. `/obra/[id]` — página de detalle de cada obra.
2. `/obra` — catálogo real, reemplaza el stub `ComingSoonPage`.
3. El carrusel de "Obra destacada" en el home se vuelve clickeable
   hacia el detalle de cada obra.

**Qué obras se muestran:** solo las 6 reales (serie Aviario, ids
`obra-07`..`obra-12`), mismo filtro que ya usa el carrusel
(`!image.includes("placeholder")`). Los 6 placeholders de
Interiores/Derivas quedan fuera del catálogo público hasta que haya
contenido real para reemplazarlos.

## Modelo de datos

`data/types.ts` — dos campos nuevos en `Artwork`, ambos opcionales
(no rompen los datos existentes):

```ts
export interface CriticReview {
  critic: string;
  role: string;   // ej. "Crítica de arte independiente" — nunca un
                   // nombre o publicación real; es contenido
                   // placeholder hasta tener citas reales.
  quote: string;
}

export interface Artwork {
  id: string;
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  image: string;
  additionalImages?: string[]; // fotos extra (detalle/contexto)
  seriesId: string;
  status: ArtworkStatus;
  criticReviews?: CriticReview[];
}
```

`data/artworks.ts` — cada una de las 6 obras reales (`obra-07`..
`obra-12`) recibe 1-2 `criticReviews` de placeholder, con el mismo
tratamiento que ya tiene la bio del artista: texto plausible pero
marcado con comentario `// NOTE: placeholder` en el código, listo
para reemplazar por citas reales. `additionalImages` queda vacío/sin
usar por ahora — no hay fotos adicionales disponibles todavía; la UI
debe manejar su ausencia con normalidad (no debe romper ni dejar
huecos visuales).

## Páginas y componentes

- **`app/obra/[id]/page.tsx`** (nueva, ruta dinámica) — `generateStaticParams`
  a partir de `artworks` (solo las reales); `notFound()` si el `id` no
  existe. Renderiza `ArtworkDetail`.
- **`components/ArtworkDetail.tsx`** (nuevo) — imagen grande (+ galería
  de `additionalImages` si existen), ficha técnica (título, año,
  medio, dimensiones, estado), bloque de comentarios de críticos,
  CTA "Consultar disponibilidad" (`mailto:`, mismo patrón que
  `ContactBanner`), link de vuelta a `/obra`.
- **`app/obra/page.tsx`** (modificado) — deja de usar `ComingSoonPage`;
  arma una grilla (mismo patrón de grid que ya se usó en
  `FeaturedWorks` antes del carrusel: `grid-cols-1 sm:grid-cols-2
  lg:grid-cols-3`) de las 6 obras reales, cada una envuelta en
  `<Link href="/obra/{id}">`.
- **`components/ArtworkCard.tsx`** (existente, sin uso desde que se
  armó el carrusel) — se reutiliza tal cual para las tarjetas del
  catálogo.
- **`components/FeaturedCarousel.tsx`** (modificado) — cada
  `motion.article` se envuelve en `<Link href="/obra/{artwork.id}">`
  para que el carrusel del home lleve al detalle.

## Responsividad

Sigue las convenciones ya establecidas en el resto del sitio en esta
misma sesión: padding vertical `py-16 sm:py-20 md:py-24`, títulos
`text-2xl sm:text-3xl`, sin introducir patrones nuevos.

## Fuera de alcance (explícito)

- Simulador de pared (diseño aparte, pendiente).
- Contenido real de críticos/fotos adicionales (se agrega cuando el
  artista lo provea).
- CMS o edición de contenido fuera de los archivos `data/*.ts`.

## Verificación

- `npx tsc --noEmit` sin errores.
- Servidor de desarrollo renderiza `/obra` y al menos una ruta
  `/obra/obra-07` sin errores de compilación.
- Confirmar que el carrusel del home navega correctamente al detalle.
