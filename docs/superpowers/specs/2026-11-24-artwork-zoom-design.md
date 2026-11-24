# Zoom tipo lupa en las obras — diseño corto

Fecha: 2026-11-24 · Tamaño: cambio mediano · Estado: pendiente de aprobación

## Intención
Que coleccionistas y visitantes puedan observar detalle y textura de las pinturas, en computadora y en celular.

## Decisiones del usuario
- Dos modos: **lupa** sobre la imagen en la vista normal y **zoom completo** en pantalla completa.
- Lugares: **ficha de obra** (`/obra/…`, todas sus fotos) y ventana de **Obras disponibles**.
- Aumento: **hasta el detalle real de cada foto** (nunca más allá de su resolución, para no pixelar).
- Fotos con lado largo **menor a 1000 px: sin zoom ni lupa** (37 obras); de 1000 px en adelante sí (281).
- Celular: la lupa se activa con un **botón de lupa**; mientras está activa, arrastrar el dedo recorre la obra.

## Cómo se comporta
- **Computadora, vista normal:** al pasar el cursor sobre la obra aparece una lupa circular (≈180 px) que muestra esa zona a resolución real; clic sigue abriendo pantalla completa.
- **Celular, vista normal:** botón de lupa sobre la imagen (siempre visible). Activo: la lupa (≈140 px) aparece arriba del dedo para no taparla y sigue el arrastre; la página no se desplaza mientras tanto. Tocar el botón otra vez la apaga; con la lupa apagada, tocar la obra abre pantalla completa como hoy.
- **Pantalla completa (ambos):** rueda del mouse o pellizcar para ampliar en el punto señalado; doble clic/doble toque alterna entre ajustada y máximo; arrastrar recorre; controles [−] porcentaje [+] y un botón para volver a ajustar. Límite: de 100 % hasta la resolución real. Esc / × cierran como hoy.
- Obras sin zoom: todo funciona como hoy (sin lupa ni controles).

## Decisiones mías (vetables)
- Sin dependencias nuevas: lupa y visor propios con eventos de puntero (mouse, táctil y pluma con un solo código).
- Elegibilidad por el mapa existente `data/imageDimensions.ts` (se sabe en el servidor, sin saltos); si una foto no está en el mapa, se decide al cargarla.
- Textos de botones en ES/EN en `data/translations.ts`; accesibles por teclado (+/− y 0 en pantalla completa).
- Lógica matemática (límites, zoom en un punto, recorte del arrastre) en un módulo puro con pruebas.

## Enfoques considerados
1. **Componentes propios con eventos de puntero** (elegido): control total del comportamiento táctil, sin peso extra ni riesgo de compatibilidad con React 19.
2. Librería de pan/zoom (p. ej. react-zoom-pan-pinch): menos código propio, pero la lupa igual sería propia y añade dependencia.
3. Visor de mosaicos tipo Deep Zoom (OpenSeadragon): pensado para imágenes gigantes; aquí las fotos son ≤2200 px, sería exceso.

## Antimetas
Que la lupa estorbe el desplazamiento normal en celular; que se vea pixelado; que la vista de escritorio o los cierres actuales (Esc, ×, clic fuera) cambien.
