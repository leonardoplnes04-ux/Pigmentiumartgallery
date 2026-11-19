# Inglés indexable (`/en/...`) — diseño

Fecha: 2026-11-19 · Estado: pendiente de aprobación

## Intención y por qué

El sitio ya tiene todo su contenido en inglés, pero el servidor siempre entrega
español: el idioma es solo una preferencia en `localStorage` del navegador, así que
Google nunca ve el inglés. El objetivo del dueño es **llegar a galerías y
coleccionistas que buscan en inglés** para vender obra y atraer galerías.

Restricción explícita del dueño: **que todo quede igual** — mismo dominio, mismo
proyecto de Vercel, **misma propiedad de Google Analytics** (`G-JVZ7KSL064`), sin otro
despliegue ni configuración aparte. Solo se agrega la capacidad de indexar el inglés.

## Metas / no metas / anti-metas

Metas
- Cada página pública tiene versión en inglés con URL propia y HTML en inglés
  (`<html lang="en">`, título, descripción, Open Graph, JSON-LD, texto visible).
- Google entiende la relación entre versiones (`hreflang` + canonical propio).
- Sitemap con ambas versiones.

No metas
- No se cambian las URLs en español (ya enviadas a Search Console/Bing).
- No hay redirección automática por país ni por idioma del navegador (Google la
  desaconseja y confunde al rastreador).
- No se traduce contenido nuevo ni se revisa la traducción existente.
- No se crea otro proyecto de Vercel, otro dominio ni otra propiedad de Analytics.

Anti-metas (fracaso aunque "funcione")
- Que alguna URL en español deje de responder 200 o cambie su canonical/JSON-LD.
- Que se pierda el contenido estático (páginas deben seguir prerrenderizadas).
- Que el inglés quede duplicando el español sin `hreflang` (contenido duplicado).

## Enfoques considerados

- **A. Todo bajo `/[lang]/…`** (`/es/obra`, `/en/obra`): estándar y simétrico, pero cambia
  las URLs del español o exige redirecciones. Riesgo para lo ya enviado a buscadores.
- **B. Español intacto + `/en/...` espejo (elegido):** el español no se toca; las páginas
  en inglés reutilizan los mismos componentes con el idioma fijado desde el servidor.
  Menor riesgo y menor cambio.
- **C. Subdominio `en.`:** segundo despliegue, reparte autoridad del dominio. Descartado.

Elegido: **B**, por decisión del dueño ("lo que sea mejor… que quede todo igual").

## Diseño

1. **Estructura de rutas.** Dos grupos de rutas con su propio layout raíz (el grupo no
   aparece en la URL): `app/(es)/…` (lo actual, movido con `git mv`, mismas URLs) y
   `app/(en)/en/…` (espejo nuevo). Cada layout raíz fija `<html lang>` y comparte un
   mismo componente de cascarón (fuentes, tema, ImageGuard, Analytics, JSON-LD del
   artista). `app/sitemap.ts`, `robots.ts`, `llms.txt`, `globals.css` quedan en `app/`.
2. **URLs en inglés** (slugs en inglés, mejor para búsqueda). Mapa único en
   `lib/routes.ts`:
   `/`→`/en` · `/obra`→`/en/works` · `/obra/[id]`→`/en/works/[id]` ·
   `/obra/[id]/simulador`→`/en/works/[id]/simulator` · `/sobre-mi`→`/en/about` ·
   `/exposiciones[/id]`→`/en/exhibitions[/id]` · `/performance[/id]`→`/en/performance[/id]` ·
   `/videos`→`/en/videos` · `/contacto`→`/en/contact`.
   Incluye `alternatePath(path, lang)` para saber la versión equivalente de cualquier URL.
3. **Idioma desde el servidor.** `LanguageProvider` recibe `language` por prop desde el
   layout del grupo; se elimina la lectura de `localStorage` (el servidor ya renderiza el
   idioma correcto, sin parpadeo). El botón ES/EN pasa a ser un enlace a la URL
   equivalente (`alternatePath`).
4. **Enlaces internos.** Helper `useLocalizedHref()` / `localizedHref(path, lang)`
   aplicado a los ~48 enlaces internos de 20 archivos (incluye el enlace de contacto con
   `?obra=…&img=…`).
5. **Metadata por idioma.** Constructores compartidos de metadata (título, descripción,
   Open Graph con `locale` y `alternateLocale`, Twitter) y `alternates`: canonical
   propio + `languages: { es, en, "x-default": es }` en cada página y detalle.
6. **JSON-LD por idioma.** Los constructores de `lib/structuredData.ts` reciben el
   idioma: nombres, descripciones, `inLanguage`, URLs y migas de pan localizados. El
   `@id` de la persona es uno solo en ambos idiomas.
7. **Sitemap y `llms.txt`.** Cada URL aparece en ambos idiomas con `alternates.languages`.
   `llms.txt` añade las páginas en inglés.
8. **Analytics sin cambios de configuración.** Mismo componente y mismo ID en ambos
   layouts. Añadir el parámetro `page_language` (`es`/`en`) a `cta_click` y
   `generate_lead` para separar idiomas en los informes — sin nueva propiedad.
9. **Formulario.** Ya envía `lang` a Convex; el correo de aviso no cambia. En inglés
   el formulario va a `/en/contact`.

## Verificación

- Antes de mover nada: guardar la lista de URLs del sitemap actual y, para cada una,
  código HTTP, canonical y JSON-LD. Después: las mismas URLs deben dar 200 con canonical
  idéntico.
- `npx tsc --noEmit` y `npm run build` limpios; todas las páginas siguen estáticas.
- Para cada ruta `/en/...`: 200, `<html lang="en">`, título/descripción en inglés,
  `hreflang` recíproco, JSON-LD válido, sin texto en español salvo datos que no se
  traducen a propósito (títulos poéticos de exposiciones, nombres de sedes).
- En navegador: el botón ES/EN lleva a la página equivalente; clic en "Request
  information" lleva a `/en/contact` con la obra cargada; `generate_lead` y `cta_click`
  siguen llegando a Analytics con `page_language`.
- Despliegue: mismo `vercel deploy --prod` con la cuenta `leonardoplnes04`; push con el
  helper ya configurado. Después: enviar el sitemap de nuevo en Search Console y Bing.

## Decisiones tomadas por mí (el dueño puede corregirlas)

- Slugs en inglés en lugar de repetir los del español.
- Simulador de pared también espejado en inglés (para que un visitante en inglés no caiga
  en español).
- Sin redirección automática por idioma/país.
- Se publica la traducción actual al inglés tal cual; la revisión del artista sigue
  pendiente y cualquier corrección posterior solo toca `data/*.ts`.
- La página 404 por defecto de Next se mantiene (con dos layouts raíz no hay
  `not-found` global estilizado); se comprueba en el build y se avisa si cambia algo.

## Pendiente para quien construye

- Orden exacto del movimiento de archivos y del refactor de enlaces.
- Qué textos son español puro en datos y se dejan así a propósito.
