# Inglés indexable (`/en/...`) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar cada página del sitio también en inglés bajo `/en/...`, con HTML, metadata, JSON-LD, `hreflang` y sitemap en inglés, sin cambiar ninguna URL en español.

**Architecture:** Dos grupos de rutas de Next con layout raíz propio: `app/(es)` (lo actual, movido) y `app/(en)/en` (espejo nuevo). El idioma viene del layout del grupo (prop de `LanguageProvider`), ya no de `localStorage`. Un módulo puro `lib/routes.ts` traduce rutas entre idiomas; los cuerpos de página y los constructores de metadata se comparten entre ambos árboles.

**Tech Stack:** Next 15 (App Router, estático), React 19, TypeScript, Tailwind. Pruebas unitarias con `node --test` (Node 24 ejecuta `.ts` sin compilar); verificación de URLs con un script propio contra `next start`.

**Spec:** `docs/superpowers/specs/2026-11-19-english-indexable-design.md`

## Global Constraints

- URLs en español **idénticas** a las actuales; mismo `canonical`, mismo JSON-LD (hash idéntico) y 200 en todas.
- `SITE_URL = https://segundoplanes.com` (de `lib/seo.ts`); mismo proyecto de Vercel, mismo ID de Analytics `G-JVZ7KSL064` y `NEXT_PUBLIC_GA_ID`; no tocar variables de entorno.
- Mapa de URLs en inglés: `/`→`/en` · `/obra`→`/en/works` · `/obra/[id]`→`/en/works/[id]` · `/obra/[id]/simulador`→`/en/works/[id]/simulator` · `/sobre-mi`→`/en/about` · `/exposiciones[/id]`→`/en/exhibitions[/id]` · `/performance[/id]`→`/en/performance[/id]` · `/videos`→`/en/videos` · `/contacto`→`/en/contact`.
- Sin redirección automática por país ni por idioma del navegador.
- Páginas siguen siendo estáticas (`next build` sin rutas dinámicas nuevas).
- `<html lang>` = `es` / `en` según el árbol; Open Graph `locale` `es_ES` / `en_US`.
- Archivos `.ts/.tsx` del repo usan CRLF en Windows; editar con Edit o conservar el fin de línea existente.
- Despliegue siempre con la cuenta `leonardoplnes04`: `npx vercel deploy --prod --yes`; push con el helper local ya configurado. Nunca tocar credenciales globales ni `.env`.
- No commitear `biografia/` (ajeno a este trabajo).

## Review Focus

1. Cambiar de idioma con el botón conserva el query string (`/contacto?obra=…&img=…`, `/obra?disponibles=1`). → Task 4.
2. Un visitante con `dartgallery-lang=en` viejo en `localStorage` que abre una URL en español ve español y no se redirige. → Task 4.
3. `/en/works/<id inexistente>`, `/en/exhibitions/<id inexistente>` y `/en/performance/<id inexistente>` dan 404, no error 500. → Task 6.
4. Texto en español que se cuela en páginas en inglés (migas "Inicio"/"Obra", aria-labels como "Quitar esta obra", borradores de correo). → Tasks 6 y 10.
5. `hreflang` recíproco y sitemap: cada URL `/en/...` apunta a una versión española que existe, y las obras con `noDetailPage`/`featuredOnly` no se listan en inglés si no se listan en español. → Task 8.

---

### Task 1: `lib/routes.ts` — traducción de rutas (puro, con pruebas)

**Files:**
- Create: `lib/routes.ts`
- Create: `lib/routes.test.mjs`
- Modify: `package.json` (script `"test": "node --test lib/"`)

**Interfaces:**
- Produces (todas las demás tareas las usan):
  - `export type Language = "es" | "en"`
  - `export function toLang(esPath: string, lang: Language): string` — recibe una ruta **en español** (con query/hash opcionales) y devuelve la ruta equivalente en `lang`.
  - `export function counterpart(path: string, to: Language): string` — recibe cualquier ruta (es o en) y devuelve la equivalente en `to`.
  - `export function languageOfPath(path: string): Language` — `en` solo si el primer segmento es exactamente `en`.
  - `export function esPathOf(path: string): string` — ruta española canónica de cualquier ruta.

- [ ] **Step 1: Escribir `lib/routes.test.mjs`** (`node:test` + `node:assert/strict`, importa `./routes.ts`) con estas aserciones:
  - `toLang("/", "en") === "/en"`; `toLang("/obra", "en") === "/en/works"`; `toLang("/obra/obra-07", "en") === "/en/works/obra-07"`; `toLang("/obra/obra-07/simulador", "en") === "/en/works/obra-07/simulator"`; `toLang("/sobre-mi","en") === "/en/about"`; `toLang("/exposiciones/exp-11","en") === "/en/exhibitions/exp-11"`; `toLang("/performance","en") === "/en/performance"`; `toLang("/videos","en") === "/en/videos"`; `toLang("/contacto","en") === "/en/contact"`.
  - `toLang(x, "es") === x` para cada ruta anterior.
  - Query y hash se conservan: `toLang("/obra?disponibles=1","en") === "/en/works?disponibles=1"`; `toLang("/contacto?obra=A%20B&img=%2Fx.jpg","en") === "/en/contact?obra=A%20B&img=%2Fx.jpg"`.
  - Segmento desconocido pasa tal cual: `toLang("/foo","en") === "/en/foo"`.
  - `counterpart("/en/works/obra-07","es") === "/obra/obra-07"`; `counterpart("/en","es") === "/"`; `counterpart("/obra","en") === "/en/works"`; `counterpart("/en/about?x=1","es") === "/sobre-mi?x=1"`.
  - `languageOfPath("/en/about") === "en"`, `languageOfPath("/en") === "en"`, `languageOfPath("/entrevista") === "es"`, `languageOfPath("/") === "es"`.
  - Ida y vuelta: para cada ruta del mapa, `esPathOf(toLang(p,"en")) === p`.
- [ ] **Step 2: Ejecutar `npm test` y ver que falla** (módulo inexistente).
- [ ] **Step 3: Implementar `lib/routes.ts`** con una tabla de segmentos `{obra:"works", "sobre-mi":"about", exposiciones:"exhibitions", performance:"performance", videos:"videos", contacto:"contact", simulador:"simulator"}`; sin imports (debe poder ejecutarse con Node desnudo). Separar path de `?…`/`#…` antes de mapear.
- [ ] **Step 4: `npm test` pasa.** Esperado: todas las pruebas verdes.
- [ ] **Step 5: Commit** — `git add lib/routes.ts lib/routes.test.mjs package.json && git commit -m "Rutas: traduccion es/en con pruebas"`.

---

### Task 2: Línea base de URLs (antes de tocar nada)

**Files:**
- Create: `scripts/url-inventory.mjs`
- Modify: `.gitignore` (añadir `.verify/`)

**Interfaces:**
- Produces: `node scripts/url-inventory.mjs capture <baseUrl> <out.json>` y `node scripts/url-inventory.mjs compare <a.json> <b.json> [--ignore hreflang,jsonld]`. Por cada URL del `sitemap.xml` (solo `<loc>`) registra `{url, status, htmlLang, title, description, canonical, hreflang:[{lang,href}], jsonld:[{type, hash}], ogLocale}`. `compare` lista diferencias por URL y sale con código 1 si hay alguna no ignorada.

- [ ] **Step 1: Escribir el script** (sin dependencias; `fetch` nativo; extraer con regex `<html lang>`, `<title>`, `<meta name="description">`, `<link rel="canonical">`, `<link rel="alternate" hreflang>`, `og:locale`, y los `<script type="application/ld+json">` con hash sha1 del texto).
- [ ] **Step 2: Construir y levantar el estado actual:** `npm run build` y `npx next start -p 3300` en segundo plano.
- [ ] **Step 3: Capturar:** `node scripts/url-inventory.mjs capture http://localhost:3300 .verify/es-before.json`. Esperado: todas las URLs con `status: 200`; anotar el número de URLs.
- [ ] **Step 4: Detener el servidor** (puerto 3300) y commitear `scripts/url-inventory.mjs` y `.gitignore`.

---

### Task 3: Cascarón raíz compartido + mover el español a `(es)` (sin cambio de comportamiento)

**Files:**
- Create: `lib/fonts.ts` (exporta `fraunces`, `inter`, las dos `next/font/google` de hoy)
- Create: `lib/rootLayout.tsx` (exporta `RootDocument({ lang, children })`: `<html lang suppressHydrationWarning className>` + `<head>` con `themeScript`, JSON-LD de `artistJsonLd()`, preload de imagen; `<body>` con `ImageGuard`, `Analytics`, `ThemeProvider` y `LanguageProvider` con su API actual, sin props, para que el español siga compilando; Task 4 le agrega la prop `language`)
- Create: `lib/metadata.ts` (exporta `rootMetadata(lang: Language): Metadata` — mismo contenido que la `metadata` actual de `app/layout.tsx` pero **sin `alternates`**, con `locale` según idioma)
- Create: `app/(es)/layout.tsx` (usa `RootDocument lang="es"` y `export const metadata = rootMetadata("es")`)
- Move (`git mv`): `app/page.tsx`, `app/obra`, `app/sobre-mi`, `app/exposiciones`, `app/performance`, `app/videos`, `app/contacto` → `app/(es)/…`
- Delete: `app/layout.tsx`
- Modify: `app/(es)/page.tsx` — añadir `export const metadata` con `alternates: { canonical: "/" }` (hoy la home la hereda del layout)

**Interfaces:**
- Consumes: `Language` de Task 1.
- Produces: `RootDocument`, `rootMetadata(lang)`. `app/sitemap.ts`, `robots.ts`, `llms.txt`, `globals.css` se quedan en `app/`.

- [ ] **Step 1:** Crear `lib/fonts.ts`, `lib/rootLayout.tsx`, `lib/metadata.ts` a partir de `app/layout.tsx` (mover, no reescribir). `globals.css` se importa desde `lib/rootLayout.tsx` como `@/app/globals.css`.
- [ ] **Step 2:** Mover rutas con `git mv`, borrar `app/layout.tsx`, crear `app/(es)/layout.tsx`, añadir `metadata` a la home. Borrar `.next` (los tipos generados referencian rutas viejas).
- [ ] **Step 3:** `npx tsc --noEmit` limpio y `npm run build` limpio. Anotar si el build avisa de 404 global.
- [ ] **Step 4: Regresión total:** levantar `next start -p 3300`, capturar `.verify/es-after-t3.json` y ejecutar `compare .verify/es-before.json .verify/es-after-t3.json`. Esperado: **cero diferencias** (incluido hash de JSON-LD y canonical de la home).
- [ ] **Step 5: Commit** — "Estructura: layout raiz compartido y espanol en grupo (es)".

---

### Task 4: Idioma desde la ruta, helper de enlaces y botón ES/EN como enlace

**Files:**
- Create: `hooks/useLocationSearch.ts`
- Modify: `hooks/useLanguage.tsx`, `components/Header.tsx`, `lib/rootLayout.tsx`
- Modify (enlaces internos): `components/ArtistStatement.tsx`, `ArtworkDetail.tsx`, `ContactBanner.tsx`, `ExhibitionDetail.tsx`, `ExhibitionsPress.tsx`, `FeaturedCarousel.tsx`, `Footer.tsx`, `Header.tsx`, `Hero.tsx`, `InquireBlock.tsx`, `PerformanceDetail.tsx`, `SeriesGrid.tsx`, `WallSimulator.tsx`, `app/(es)/exposiciones/page.tsx`, `app/(es)/obra/page.tsx`, `app/(es)/performance/page.tsx`, `app/(es)/videos/page.tsx`

**Interfaces:**
- Consumes: `toLang`, `counterpart` de Task 1.
- Produces:
  - `LanguageProvider({ language, children }: { language: Language; children: ReactNode })` — sin lectura ni escritura de `localStorage`; ya no expone `setLanguage`.
  - `useLanguage(): { language, t, pick, href: (esPath: string) => string }` donde `href(p) = toLang(p, language)`.
  - `useLocationSearch(): string` — devuelve `""` en el primer render y `window.location.search` después de montar.
  - `RootDocument` pasa a envolver a los hijos en `<LanguageProvider language={lang}>`.

- [ ] **Step 1: Prueba en el navegador antes de cambiar (esperado: falla)** — no hay runner de componentes; se verifica al final del task (Step 5). Documentar el comportamiento objetivo: con `localStorage["dartgallery-lang"]="en"`, `/obra` se renderiza en español.
- [ ] **Step 2:** Cambiar `LanguageProvider`/`useLanguage` como en Interfaces. La clave `dartgallery-lang` se deja sin usar (no borrarla del navegador del visitante).
- [ ] **Step 3:** En `Header.tsx`, `LanguageToggle` pasa a recibir `current: Language` y `hrefs: Record<Language,string>` y renderiza dos `<Link>` (`aria-current`, `lang`, `hrefLang`). Los `href` se calculan con `counterpart(usePathname(), "es"|"en") + useLocationSearch()`. **No** usar `useSearchParams` (rompe el prerenderizado sin Suspense).
- [ ] **Step 4:** En los 17 archivos, cada enlace interno `href="/x"` / `` href={`/x/${id}`} `` pasa a `href={href("/x")}` usando `const { href } = useLanguage()`. Incluye los enlaces armados en `InquireBlock` (`/contacto?obra=…&img=…`), `Hero` (`/obra?disponibles=1`) y las migas de `ArtworkDetail`/`ExhibitionDetail`/`PerformanceDetail`. `ArrowLink` no cambia (recibe `href` ya localizado). Los errores de `tsc` señalan cualquier llamada restante a `setLanguage`.
- [ ] **Step 5: Verificar** — `tsc` y build limpios. En `next dev`: (a) con `localStorage["dartgallery-lang"]="en"` abrir `/obra` → sigue en español, sin redirección (Review Focus 2); (b) el botón EN en `/contacto?obra=X&img=%2Fy.jpg` apunta a `/en/contact?obra=X&img=%2Fy.jpg` y en `/obra?disponibles=1` a `/en/works?disponibles=1` (Review Focus 1; todavía 404 hasta Task 6). Capturar `.verify/es-after-t4.json` y `compare … es-before.json` → cero diferencias.
- [ ] **Step 6: Commit** — "Idioma desde la ruta, helper de enlaces y selector como enlace".

---

### Task 5: Metadata, textos SEO y cuerpos de página compartidos

**Files:**
- Create: `data/seoText.ts`
- Modify: `lib/metadata.ts`
- Create: `components/pages/CatalogPage.tsx`, `ExhibitionsPage.tsx`, `PerformancePage.tsx`, `VideosPage.tsx`, `HomePageBody.tsx` (cuerpos de página compartidos)
- Modify: todas las `page.tsx`/`layout.tsx` de `app/(es)/…` para usar lo compartido; eliminar `app/(es)/{obra,exposiciones,performance,videos}/layout.tsx` (su metadata pasa a la página)

**Interfaces:**
- Consumes: `Language`, `toLang`.
- Produces en `lib/metadata.ts`:
  - `pageAlternates(esPath: string, lang: Language): Metadata["alternates"]` → `{ canonical: toLang(esPath, lang), languages: { es: toLang(esPath,"es"), en: toLang(esPath,"en"), "x-default": toLang(esPath,"es") } }`.
  - `sectionMetadata(key: "home"|"works"|"about"|"exhibitions"|"performance"|"videos"|"contact", lang): Metadata`
  - `artworkMetadata(artwork: Artwork, lang)`, `exhibitionMetadata(exhibition: Exhibition, image: string|undefined, lang)`, `performanceMetadata(performance: Performance, image: string|undefined, lang)` — todos con `openGraph` (`title`, `description`, imágenes) y `twitter` como los actuales, más `alternates` de `pageAlternates`.
- Produces en `data/seoText.ts`: `seoText: Record<SectionKey, { title: LocalizedText; description: LocalizedText }>` y `crumbs: { home, works, exhibitions: LocalizedText }`.

Textos (el español son los actuales, no cambian; `X` = `artist.name`):

| clave | title en | description en |
|---|---|---|
| home | `X — Cuban visual artist` | `${artist.shortBio.en} ${artist.tagline.en}.` |
| works | `Artwork by X — Contemporary Cuban painting` | `Catalogue of artwork by X: paintings and available pieces.` |
| about | `Biography — X` | `artist.shortBio.en` |
| exhibitions | `Exhibitions — X` | `Exhibitions and shows by X.` |
| performance | `Performance — X` | `Performances by X.` |
| videos | `Videos — X` | `Videos of exhibitions and openings by X.` |
| contact | `Contact and artwork acquisition — X` | `Acquire artwork, commissions, exhibitions and press: contact X, ${site.name}.` |

Migas: `Inicio/Home`, `Obra/Works`, `Exposiciones/Exhibitions`.

- [ ] **Step 1:** Crear `data/seoText.ts` con la tabla (español = textos actuales copiados de los layouts/pages).
- [ ] **Step 2:** Implementar los constructores en `lib/metadata.ts`; para detalle de obra/exposición/performance reutilizar la lógica de título/descripción que hoy vive en cada `generateMetadata` (en español produce exactamente lo mismo).
- [ ] **Step 3:** Mover el cuerpo de las páginas cliente (`obra/page.tsx`, `exposiciones/page.tsx`, `performance/page.tsx`, `videos/page.tsx`) a `components/pages/*` (`git mv` + renombrar el export por defecto) y dejar cada `page.tsx` como `export { default } from "@/components/pages/…"` más `export const metadata = sectionMetadata(key, "es")`. Home y contacto/sobre-mi usan `sectionMetadata` igual. Detalles usan `*Metadata(..., "es")`.
- [ ] **Step 4:** `tsc` y build limpios. Capturar `.verify/es-after-t5.json` y `compare … es-before.json --ignore hreflang`. Esperado: cero diferencias salvo `hreflang` (ahora presente en el español).
- [ ] **Step 5: Commit** — "Metadata por idioma y cuerpos de pagina compartidos".

---

### Task 6: Árbol en inglés `app/(en)/en/…`

**Files:**
- Create: `app/(en)/layout.tsx` (`RootDocument lang="en"`, `metadata = rootMetadata("en")`)
- Create: `app/(en)/en/page.tsx`, `works/page.tsx`, `works/[id]/page.tsx`, `works/[id]/simulator/page.tsx`, `about/page.tsx`, `exhibitions/page.tsx`, `exhibitions/[id]/page.tsx`, `performance/page.tsx`, `performance/[id]/page.tsx`, `videos/page.tsx`, `contact/page.tsx`

**Interfaces:**
- Consumes: cuerpos de `components/pages/*`, `*Metadata(..., "en")`, `generateStaticParams` iguales a los del español (mismos conjuntos de ids).
- Produces: las 11 rutas `/en…`. Cada una es un espejo delgado de su par en español: mismos componentes, `lang="en"` fijo por el layout, `notFound()` si el id no existe.

- [ ] **Step 1:** Crear el layout inglés y las páginas espejo (copiar la estructura de cada `page.tsx` español, cambiando solo metadata a `"en"` y, en detalles, los textos de migas con `crumbs[..].en` y rutas con `toLang`).
- [ ] **Step 2:** `tsc` y `npm run build`. Esperado: sin errores; el conteo de páginas estáticas aumenta en ~el número de páginas del español.
- [ ] **Step 3: Verificar en `next start -p 3300`:** cada `/en/...` da 200; `/en/works/obra-07` tiene `<html lang="en">`, título en inglés y canonical `https://segundoplanes.com/en/works/obra-07`; `curl -o /dev/null -w "%{http_code}"` de `/en/works/no-existe`, `/en/exhibitions/no-existe` y `/en/performance/no-existe` devuelve **404** (Review Focus 3). Los enlaces internos de una página en inglés apuntan a `/en/...`.
- [ ] **Step 4: Commit** — "Paginas en ingles bajo /en".

---

### Task 7: JSON-LD por idioma

**Files:**
- Modify: `lib/structuredData.ts`, y los puntos de uso: `lib/rootLayout.tsx`, páginas de detalle (es y en), `app/(es)/sobre-mi/page.tsx` y su espejo, `app/(es)/videos`/espejo.

**Interfaces:**
- Produces (el parámetro `lang` es el último y obligatorio): `artistJsonLd(lang)`, `artworkJsonLd(artwork, lang)`, `exhibitionJsonLd(exhibition, image, lang)`, `videosJsonLd(items, lang)`, `faqJsonLd(items, lang)`. `breadcrumbJsonLd(items)` no cambia (el llamador pasa nombres y rutas ya localizados). `ARTIST_ID` no cambia (un solo `@id` en ambos idiomas).
- Reglas: `name`/`description`/`artMedium`/`isPartOf.name` salen de `[lang]`; `inLanguage` = `lang`; `url`/`@id` se arman con `toLang(...)`; `offers.url` apunta a `toLang("/contacto", lang)`; la comprobación `isConfirmed` se hace sobre el texto del idioma pedido; `jobTitle` = "Artista plástico" / "Visual artist"; `alternateName` es el título del otro idioma si difiere.

- [ ] **Step 1:** Añadir el parámetro `lang` a los cinco constructores aplicando las reglas.
- [ ] **Step 2:** Actualizar todos los llamadores: español pasa `"es"` (resultado idéntico al actual), inglés `"en"`.
- [ ] **Step 3: Verificar** — `tsc` limpio; build; capturar inventario y `compare es-before.json … --ignore hreflang`: el **hash de JSON-LD de todas las URLs en español sigue idéntico**. En `/en/works/obra-07`: `"inLanguage":"en"`, `url` con `/en/works/obra-07`, `offers.url` `…/en/contact`; en `/en/about` el `FAQPage` está en inglés.
- [ ] **Step 4: Commit** — "Datos estructurados por idioma".

---

### Task 8: Sitemap, `hreflang` recíproco y `llms.txt`

**Files:**
- Modify: `app/sitemap.ts`, `app/llms.txt/route.ts`

**Interfaces:**
- Consumes: `toLang`.
- Produces: por cada entrada del sitemap actual, dos entradas (español e inglés), cada una con `alternates: { languages: { es, en } }` (URLs absolutas con `SITE_URL`). Los filtros actuales (`noDetailPage`, `featuredOnly`, galería cargada para exposiciones/performances) se aplican igual a los dos idiomas. `llms.txt` añade una sección "English" con las páginas `/en/...` y una línea de cómo adquirir obra.

- [ ] **Step 1:** Reescribir `sitemap.ts` con un helper local `entry(esPath)` que devuelve el par de entradas.
- [ ] **Step 2:** Ampliar `llms.txt` (contenido en inglés solo con datos de `data/artist.ts` y `data/faq.ts`; sin precios).
- [ ] **Step 3: Verificar** (Review Focus 5) — `/sitemap.xml` lista el doble de URLs; para **cada** URL `/en/...` del sitemap, su página trae `hreflang` `es` apuntando a una URL española que también está en el sitemap, y viceversa (el script `compare`/`capture` lo comprueba: para cada par, `hreflang` recíprocos y todos con 200). Obras con `noDetailPage`/`featuredOnly` ausentes en ambos idiomas.
- [ ] **Step 4: Commit** — "Sitemap bilingue y llms.txt en ingles".

---

### Task 9: Analytics — `page_language`

**Files:**
- Modify: `lib/analytics.ts`

**Interfaces:**
- Produces: `track(event, params?)` añade siempre `page_language: document.documentElement.lang || "es"` (el valor de `params` no puede sobrescribirlo). `cta_click` y `generate_lead` lo heredan sin tocar otros archivos.

- [ ] **Step 1:** Modificar `track()` como se indica.
- [ ] **Step 2: Verificar** en `next dev` con `NEXT_PUBLIC_GA_ID=G-TEST123456`: en una página en inglés, `window.dataLayer` contiene `["event","cta_click",{cta:"inquire-artwork",page_language:"en"}]`; en español, `page_language:"es"`.
- [ ] **Step 3: Commit** — "Analytics: page_language en los eventos".

---

### Task 10: Verificación completa, despliegue y bitácora

**Files:**
- Modify: `PROYECTO.md`, memoria `project_dartgallery.md`

- [ ] **Step 1: Texto en español en páginas en inglés** (Review Focus 4): para cada `/en/...` del sitemap, extraer el texto visible y buscar la lista `Inicio|Solicitar|Volver|Consultar|Ver |Quitar|Obra disponible|Biografía|Exposiciones|Contacto` fuera de títulos de obra/sedes; corregir lo que sea cadena fija de la interfaz (p. ej. `aria-label="Quitar esta obra"` en `components/DisponiblesReorder.tsx` pasa a `translations`). Los títulos poéticos y sedes que son datos se dejan.
- [ ] **Step 2: Regresión final del español:** `npm run build`, `next start`, capturar `.verify/final.json`; `compare es-before.json final.json --ignore hreflang` → cero diferencias. Todas las URLs `/en/...` con 200.
- [ ] **Step 3: Navegador (Chrome):** en `/en/works/obra-07` el botón ES lleva a `/obra/obra-07`; "Request information" lleva a `/en/contact` con la obra cargada; enviar el formulario **no** (evitar contacto de prueba nuevo); el botón EN del español lleva al espejo; capturar una pantalla de `/en` para revisión visual.
- [ ] **Step 4: Desplegar:** `git push` (helper local) y `npx vercel deploy --prod --yes`. Verificar en vivo con `scripts/url-inventory.mjs capture https://segundoplanes.com .verify/live.json` y `compare … final.json`.
- [ ] **Step 5:** Anotar en `PROYECTO.md` (entrada "SEO, fase 6: inglés indexable") y en la memoria; commit.
- [ ] **Step 6: Pasos del dueño** (decirlos al terminar): reenviar `https://segundoplanes.com/sitemap.xml` en Search Console y en Bing; opcional, registrar `page_language` como dimensión personalizada de evento en la misma propiedad de Analytics (Administrar → Definiciones personalizadas).
