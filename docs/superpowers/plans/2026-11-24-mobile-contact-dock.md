# Barra fija de contacto en celular — plan de implementación

> **Para quien ejecute:** usar superpowers:executing-plans. Los pasos usan casillas `- [ ]`.

**Meta:** barra fija «Contacto» en celular que abre una hoja con WhatsApp y correo.

**Arquitectura:** un componente cliente `ContactDock` montado en `RootDocument` (sirve a ES y EN); un helper puro `isContactPath` en `lib/routes.ts` (con prueba); textos en `data/translations.ts`; número en `data/artist.ts`.

**Stack:** Next.js 15, React 19, Tailwind, `node --test` para `lib/*.test.mjs`.

**Spec:** `docs/superpowers/specs/2026-11-24-mobile-contact-dock-design.md`

## Restricciones globales
- WhatsApp: `https://wa.me/528126905176`, chat en blanco. Correo: `mailto:segundoplanesobras@outlook.com` (`artist.email`), sin asunto ni cuerpo.
- Solo celular (`md:hidden`); oculta en `/contacto` y `/en/contact`.
- Sin dependencias nuevas. Textos ES/EN en el diccionario existente. Tokens del sitio (`bg-background`, `text-ink`, `border-line`, `text-muted`).
- Aviso de cookies (z-60) por encima de la barra; la hoja por encima del aviso.
- No hacer commit ni despliegue (el usuario los pide aparte).

## Review Focus
- Ruta de contacto con query o hash (`/contacto?obra=x`, `/en/contact#form`) → sigue oculta.
- Ruta que solo empieza parecido (`/contactos`, `/en/contact-us`) → NO se oculta.
- Esc, toque fuera y «Cerrar» cierran la hoja y devuelven el foco al botón de la barra.
- La barra no tapa el pie de página (espaciador al final del documento).
- Escritorio (≥768 px): ni barra ni hoja.

### Tarea 1: helper `isContactPath`
**Archivos:** Modificar `lib/routes.ts`; Probar `lib/routes.test.mjs`.
**Produce:** `export function isContactPath(path: string): boolean`.
- [ ] Prueba que falla: `isContactPath` es `true` para `/contacto`, `/en/contact`, `/contacto?obra=x`, `/en/contact#form`; `false` para `/`, `/obra`, `/contactos`, `/en/contact-us`, `/en/works`.
- [ ] Correr `npm test` → falla (no existe).
- [ ] Implementar con `esPathOf` + `split`: primer segmento de la ruta canónica === `"contacto"`.
- [ ] Correr `npm test` → pasa.

### Tarea 2: datos y textos
**Archivos:** Modificar `data/artist.ts`, `data/translations.ts`.
**Produce:** `artist.whatsapp: string` (`"528126905176"`); `UiStrings.contactDock: { bar; eyebrow; title; whatsapp; whatsappSub; email; close; closeAria }` en ES y EN (ES: «Contacto», «¿Cómo prefieres escribirnos?», «WhatsApp», «Chat directo», «Correo electrónico», «Cerrar»; EN: «Contact», «How would you like to reach us?», «WhatsApp», «Direct chat», «Email», «Close»).
- [ ] Añadir campo al tipo y valores; `npm run typecheck` → sin errores.

### Tarea 3: componente `ContactDock`
**Archivos:** Crear `components/ContactDock.tsx`; Modificar `lib/rootLayout.tsx` (montar tras `<CookieBanner />`).
**Consume:** `isContactPath`, `useLanguage().t.contactDock`, `artist.email`, `artist.whatsapp`, `usePathname`.
**Produce:** `export default function ContactDock()` — devuelve `null` si `isContactPath(pathname)`; si no: barra `fixed bottom-0 z-[55] md:hidden`, hoja con `role="dialog" aria-modal="true"` (scrim `z-[69]`, hoja `z-[70]`), espaciador `h-[72px] md:hidden` al final del flujo. Esc/scrim/«Cerrar» cierran; al abrir enfoca la primera opción; al cerrar devuelve el foco a la barra; bloquea el scroll del `body` mientras está abierta. WhatsApp relleno (`target="_blank" rel="noopener"`), correo con contorno mostrando la dirección.
- [ ] Implementar y montar; `npm run typecheck` → sin errores.

### Tarea 4: verificación y limpieza
- [ ] En el navegador (servidor de desarrollo ya activo) a 360, 375 y 390 px, ES y EN, claro y oscuro: barra visible al abrir; hoja abre/cierra; enlaces correctos; pie de página no tapado; con aviso de cookies; sin barra en `/contacto`, `/en/contact` ni en escritorio.
- [ ] Borrar `public/cta-preview.html`.
- [ ] `npm test` y `npm run typecheck` pasan. No hacer commit.
