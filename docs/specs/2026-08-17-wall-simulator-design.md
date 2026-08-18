# Vista en tu pared (simulador de escala, v1) — Diseño

**Estado:** aprobado (2026-08-17)

## Propósito

Dar al cliente una forma de ver una obra montada en su propia pared
antes de comprarla: sube una foto de su espacio, la obra aparece
superpuesta con sus dimensiones reales como referencia, y puede
ubicarla y ajustar su tamaño a ojo hasta que "se vea bien" contra los
objetos reales de su foto.

**RA en vivo** (cámara en tiempo real, la obra "flota" en el espacio
mientras se mueve el celular) queda **explícitamente fuera** de este
diseño — es un subsistema aparte (requiere `model-viewer`/WebXR,
modelos 3D por obra, soporte distinto iOS/Android), con su propio
spec cuando se retome.

## Decisión clave: sin calibración

Se evaluaron dos caminos para que la obra apareciera "a escala real"
en la foto del cliente:
- Pedirle que marque una referencia (línea + cm, o dos puntos sobre
  un objeto estándar) para calcular píxeles-por-cm matemáticamente.
- Mostrar la obra a un tamaño inicial razonable con su medida real
  como etiqueta visible, y que el cliente la arrastre/agrande **a
  ojo**, sin garantía matemática de escala exacta.

Se eligió la segunda: cero pasos de calibración, el cliente solo sube
la foto. Esto significa que la escala final depende del juicio del
cliente, no es pixel-perfect — trade-off aceptado a cambio de una
experiencia de un solo paso.

## Gate de datos: `realDimensionsCm`

Nuevo campo opcional en `Artwork` (`data/types.ts`):

```ts
export interface Artwork {
  // ...
  dimensions: LocalizedText;               // texto mostrado, ya existente
  realDimensionsCm?: { width: number; height: number }; // nuevo, opcional
}
```

Mientras una obra no tenga `realDimensionsCm`, el botón del
simulador **no aparece en ningún lado** y la ruta del simulador para
esa obra devuelve 404 si se accede directo por URL. Hoy ninguna de
las 6 obras reales (serie Aviario) lo tiene — sus dimensiones siguen
"por confirmar" — así que el botón queda invisible en producción
hasta que el artista confirme medidas y se cargue este campo.
`dimensions` (el texto) y `realDimensionsCm` (los números) son
independientes: cuando lleguen medidas reales, se cargan los dos a la
vez.

## Flujo

1. **`/obra/[id]`** (`ArtworkDetail`) — si `artwork.realDimensionsCm`
   existe, aparece un botón "Ver en tu pared" junto a "Consultar
   disponibilidad", que lleva a `/obra/[id]/simulador`.
2. **`/obra/[id]/simulador`** (nueva ruta, `generateStaticParams`
   solo sobre obras con `realDimensionsCm`; `notFound()` si no
   aplica):
   - Paso 1: subir/tomar foto (`<input type="file" accept="image/*"
     capture="environment">` — abre cámara en celular, selector de
     archivo en escritorio).
   - Paso 2: la foto se muestra de fondo; la obra aparece como
     overlay a un tamaño inicial (ver "Tamaño inicial" abajo) con una
     etiqueta pegada mostrando sus dimensiones reales (ej. "120 × 90
     cm", en el idioma activo vía `useLanguage()`).
   - Interacción: arrastrar el overlay para ubicarlo (Pointer
     Events, mouse + touch con el mismo código); un handle en la
     esquina inferior derecha para agrandar/achicar, con el aspect
     ratio bloqueado a `realDimensionsCm.width / height` (no se
     puede deformar la obra).
   - Paso 3: botón "Descargar" — compone foto + obra en su posición
     final sobre un `<canvas>` oculto y exporta con `toDataURL`,
     dispara la descarga. Nada se sube a ningún servidor; la foto
     nunca sale del navegador.

**Tamaño inicial:** el overlay arranca ocupando ~35% del ancho de la
foto subida, con la proporción real de la obra — punto de partida
razonable para que el cliente ajuste, no pretende ser exacto.

## Componentes

- **`components/WallSimulator.tsx`** (nuevo, client) — todo el
  estado: foto subida, posición/tamaño del overlay, export a
  canvas. Recibe la `artwork` ya validada (con `realDimensionsCm`
  garantizado) desde la página.
- **`app/obra/[id]/simulador/page.tsx`** (nuevo) — busca la obra,
  `notFound()` si no existe o no tiene `realDimensionsCm`, renderiza
  `Header` + `WallSimulator` + `Footer`.
- **`components/ArtworkDetail.tsx`** (modificado) — botón condicional
  nuevo.
- **`data/translations.ts`** (modificado) — strings nuevos para el
  flujo (instrucciones de cada paso, botones, etiqueta de
  dimensiones) en `es`/`en`.

## Responsividad

Mobile-first: en pantallas chicas el flujo ocupa toda la pantalla
(la foto de fondo suele venir vertical desde la cámara), controles
grandes para dedo (handle de resize con área táctil ampliada más
allá del ícono visible). Sigue las convenciones de padding/tipografía
ya usadas en el resto del sitio.

## Fuera de alcance (v1)

- RA en vivo con cámara (spec aparte).
- Calibración de escala real (línea de referencia, objeto estándar,
  etc.) — anotado como posible v2 si el ajuste a ojo resulta
  insuficiente.
- Guardar el render en servidor o compartirlo por link.
- Corrección de perspectiva (obra "pegada" al ángulo de la pared).

## Verificación

- `npx tsc --noEmit` sin errores.
- Con una obra de prueba con `realDimensionsCm` seteado
  temporalmente en dev: el botón aparece en `/obra/[id]`, el flujo
  completo (subir foto → mover → agrandar → descargar) funciona sin
  errores de consola.
- Confirmar que ninguna obra real queda con el botón visible hasta
  que se cargue `realDimensionsCm` de verdad (hoy: ninguna).
- Confirmar 404 en `/obra/[id]/simulador` para una obra sin
  `realDimensionsCm`.
