# Zoom tipo lupa — plan de implementación

> Ejecutar con superpowers:executing-plans. Spec: `docs/superpowers/specs/2026-11-24-artwork-zoom-design.md`.

**Meta:** lupa en la vista normal y zoom libre en pantalla completa, en la ficha de obra y en Obras disponibles.
**Arquitectura:** `lib/zoom.ts` (matemática pura, con pruebas) + `components/zoom/Magnifier.tsx` (lupa) + `components/zoom/ZoomViewer.tsx` (visor pantalla completa); se integran en `ArtworkDetail.tsx` y `AvailableSpecModal.tsx`.
**Stack:** React 19, Tailwind, eventos de puntero; `node --test`.

## Restricciones globales
- Fotos con lado largo < 1000 px: sin lupa ni zoom (`MIN_ZOOM_SOURCE_PX = 1000`).
- Aumento máximo = resolución real (1 px de foto = 1 px CSS); nunca más.
- Sin dependencias nuevas. Escritorio: Esc, ×, clic fuera siguen cerrando. Textos ES/EN en `t.detail`.
- No hacer commit ni despliegue.

## Review Focus
- Clic/toque tras arrastrar NO cierra el visor ni abre pantalla completa.
- Pellizcar no hace zoom a la página completa (touch-action: none en el visor).
- Imagen más chica que la pantalla en un eje: queda centrada en ese eje al ampliar.
- Rueda vertical en el visor no desplaza la página de atrás.
- Lupa en celular: la página no se desplaza mientras se arrastra con la lupa activa.

### Tarea 1: `lib/zoom.ts` + `lib/zoom.test.mjs`
Produce: `MIN_ZOOM_SOURCE_PX`, `canZoom(w?, h?)`, `type View {scale,x,y}`, `type Rect {x,y,w,h}`, `clampView(v, img: Rect, vw, vh)`, `zoomAt(v, nextScale, px, py, img, vw, vh, max)`.
Pruebas: canZoom(999,500)=false, (1000,10)=true, (undefined)=false; zoomAt mantiene fijo el punto bajo el cursor; clampView centra un eje cuando la imagen escalada es menor que la pantalla y limita los bordes cuando es mayor; la escala se limita a [1, max].

### Tarea 2: `ZoomViewer` + integración en ambos visores de pantalla completa
Rueda/pellizco/doble toque/arrastre, controles [−] % [+] ajustar, teclas + − 0. Sin zoom si no es elegible o si max < 1.1.

### Tarea 3: `Magnifier` + integración en la vista normal de ambos
Escritorio: lupa al pasar el cursor (≈180 px). Táctil: botón de lupa; activo → lupa ≈140 px arriba del dedo, `touch-action: none`.

### Tarea 4: verificación
typecheck + test; navegador a 375/430 px y escritorio: ficha y disponibles, lupa, zoom, cierres, obra < 1000 px sin zoom.
