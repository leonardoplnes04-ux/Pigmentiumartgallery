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

## Próximos pasos
- Escribir plan de implementación y construir la home según el spec.
- Más adelante: definir artista real y reemplazar contenido placeholder; construir subpáginas (Obra, Sobre mí, Contacto); decidir si se integra un CMS headless.
