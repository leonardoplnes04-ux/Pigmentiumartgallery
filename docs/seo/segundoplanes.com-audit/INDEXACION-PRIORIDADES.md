# Prioridades de indexación — segundoplanes.com (2026-11-24)

Fuente: inspección de las 292 URLs del sitemap con la API de Search Console (datos en `raw/gsc-inspect-all-2026-11-24.jsonl`).

## Estado

| Tipo | Indexadas | Sin indexar | Notas |
|---|---|---|---|
| Secciones (22) | 19 | 3 | Faltan `/videos`, `/en/videos`, `/privacidad` (ésta no importa). Portada: duplicado por `www` (arreglado, re-solicitada). |
| Fichas en inglés (124) | 87 | 37 | |
| **Fichas en español (124)** | **23** | **101** | 84 descubiertas sin indexar, 12 desconocidas, 5 con canónica en `pigmentiumartgallery.vercel.app` |
| Exposiciones, detalle (16) | 8 | 8 | |
| Performance, detalle (6) | 2 | 4 | |
| **Total** | **138** | **154** | |

Lectura: Google prefiere las fichas en **inglés** porque es/en son casi idénticas (mismo título, misma ficha técnica).
Las descripciones de cada obra (distintas en cada idioma) las diferencian. El público real es México/español.

## Prioridad 0 — Bloqueos técnicos (antes de pedir nada)

1. `pigmentiumartgallery.vercel.app` redirige con **307 temporal** → Google eligió esa dirección como canónica en
   `obra-10`, `obra-28`, `obra-30`, `obra-109`, `obra-120`. Pasar a **308** (mismo arreglo que `www`).
2. Publicar las descripciones de obra (local, listo).

## Prioridad 1 — Detalle de exposiciones y performance (contenido único, búsquedas con nombre propio)

Valen más que las fichas: cada una tiene sede, fecha y 6–79 fotos, y responden a búsquedas tipo
"Segundo Planes Galería Estereo" o "Soy un estúpido Castillo de la Fuerza 1989".

| URL | Exposición | Estado |
|---|---|---|
| `/exposiciones/exp-11` | Algoritmo, arquetipos frustrados — Galería Estereo, 2024 (la más reciente) | sin indexar |
| `/exposiciones/exp-10` | Soy un estúpido — Castillo de la Fuerza, La Habana, 1989 | sin indexar |
| `/exposiciones/exp-05` | Lemas e himnos mutilados — GE Galería, 2012 | desconocida |
| `/exposiciones/exp-06` | Sueño tallado en espuma — GE Galería, 2011 | desconocida |
| `/exposiciones/exp-09` | Pliegues de la vejez — GE Galería, 2008 | sin indexar |
| `/exposiciones/exp-07` | Insomnio — Centro de las Artes Fundidora, 2006 | sin indexar |
| `/performance/perf-01` | Ensayo sobre el sueño — ISA, 1983 | sin indexar |
| `/performance/perf-02` | Una caja de cristal encima del cielo — Galería L, 1984 | sin indexar |
| `/performance/perf-03` | La vida es una mierda… (Anti-tesis) — ISA, 1989 | sin indexar (es y en) |
| `/en/exhibitions/exp-05`, `/en/exhibitions/exp-10` | | sin indexar / desconocida |

## Prioridad 2 — Fichas en español con más peso

| URL | Obra | Por qué |
|---|---|---|
| `/obra/obra-51`, `-52`, `-54` | Estrellas verdes, Ecua-error, Estrellas maduras (2015) | Paneles del políptico que abre "Obra destacada" en la portada (`-53` ya indexada) |
| `/obra/obra-132` | Nietzsche y Rimbaud… (gran formato) | Obra de gran formato con foto en sala |
| `/obra/obra-07`…`-12` | Serie Aviario (2018–2019) | Únicas con serie propia y título descriptivo |
| `/obra/obra-10`, `-28`, `-30`, `-109`, `-120` | | Re-solicitar tras el 308 de vercel.app |

## Prioridad 3 — Resto de fichas

Sin solicitud manual: entran por el sitemap una vez publicadas las descripciones. Revisar en 2–3 semanas.

## Ritmo

Google permite ~10 solicitudes manuales por día por propiedad. Plan: día 1 = P1 (10), día 2 = P1 restante + P2, día 3 = P2 restante.
El 2026-11-24 ya se solicitaron 6: `/`, `/exposiciones`, `/performance`, `/como-adquirir-obra`, `/en/about`, `/videos`.

## Riesgo detectado (no de indexación)

Las 6 obras de la serie Aviario muestran "Comentarios de críticos" que son **texto de relleno** (crítico "Por confirmar").
Google valora mal citas sin autor real (E-E-A-T) y un visitante puede tomarlas como reales. Recomendación: ocultarlas
hasta tener citas reales.
