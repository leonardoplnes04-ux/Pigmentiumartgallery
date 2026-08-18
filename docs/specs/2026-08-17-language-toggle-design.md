# Selector de idioma ES/EN — Diseño

**Estado:** aprobado (2026-08-17)

## Propósito

Agregar un botón ES/EN en el Header que cambia el idioma de todo el
sitio (interfaz + contenido) al instante, sin recargar ni cambiar la
URL, y recuerda la elección en el navegador.

## Mecánica del toggle

`hooks/useLanguage.tsx` (client) define un Context de React:
`LanguageProvider` guarda `language: "es" | "en"` en `useState`,
default `"es"`; lee/escribe `localStorage["dartgallery-lang"]` en
`useEffect`. `useLanguage()` expone `{ language, toggleLanguage, t,
pick }`, donde `t` es el diccionario de textos fijos de la interfaz
para el idioma activo y `pick(campo)` selecciona `es`/`en` de un
`LocalizedText`.

`app/layout.tsx` envuelve `{children}` en `<LanguageProvider>`.

**Límite aceptado:** el `<title>`/meta description (generados en el
servidor, en `layout.tsx` y en `generateMetadata` de
`/obra/[id]`) quedan fijos en español — el servidor no puede conocer
la preferencia guardada en `localStorage` del navegador sin URLs por
idioma (mecanismo descartado por ser mucho más trabajo del que pide
este alcance).

## Modelo de datos

Nuevo tipo en `data/types.ts`:

```ts
export type Language = "es" | "en";
export interface LocalizedText {
  es: string;
  en: string;
}
```

Se aplica a todo campo editorial en español hoy:
- `Artwork.title`, `Artwork.medium`, `Artwork.dimensions`
- `CriticReview.critic`, `CriticReview.role`, `CriticReview.quote`
- `Series.name`, `Series.description`
- `Exhibition.title`, `Exhibition.description`
- `Artist.tagline`, `Artist.shortBio`, `Artist.longBio`

Quedan como `string` simple (no lingüísticos o nombres propios):
`id`, `year`, `image`/`additionalImages`, `seriesId`, `status`,
`coverImage`, `email`, `socials`, `link`, `date`, `Exhibition.venue`
(nombres de lugares/publicaciones), `Artist.name`, `site.name`.

Traduzco yo mismo el contenido actual (incluido el placeholder) al
inglés en esta misma pasada; cuando el artista confirme contenido
real, se actualizan ambos campos igual que hoy.

## Diccionario de interfaz

Nuevo `data/translations.ts`: `Record<Language, UiStrings>` con las
cadenas fijas de la UI (nav, botones, eyebrows, estados de obra,
footer, "Próximamente", etc.), agrupadas por sección/componente.

## Componentes

Los componentes que muestran contenido (`Header`, `Hero`,
`ArtistStatement`, `FeaturedWorks`, `FeaturedCarousel`, `SeriesGrid`,
`ExhibitionsPress`, `ContactBanner`, `Footer`, `ArtworkCard`,
`ArtworkDetail`, `ComingSoonPage`) pasan a usar `useLanguage()` (se
marcan `"use client"` los que no lo son ya) y reemplazan texto
hardcodeado por `t.*` / `pick(campo)`. Las páginas de `app/*` no
cambian de tipo — siguen importando datos y pasándolos hacia abajo;
`generateMetadata` en `/obra/[id]` usa `pick` fijado en `"es"`
(límite aceptado arriba).

Botón de idioma: texto simple **ES | EN** en el Header (desktop junto
al botón Contacto, y dentro del menú móvil), el idioma activo en
negrita/subrayado.

## Fuera de alcance

- SEO/meta multi-idioma (requeriría rutas `/en`, ver límite aceptado).
- Detección automática del idioma del navegador — default siempre
  `"es"` en la primera visita.
- Traducción de `date`/formatos de fecha.

## Verificación

- `npx tsc --noEmit` sin errores.
- Servidor de desarrollo: toggle cambia todo el texto visible en
  home, `/obra`, `/obra/obra-07` y los 3 stubs, sin recargar.
- Recargar la página después de tocar EN mantiene el inglés
  (localStorage).
