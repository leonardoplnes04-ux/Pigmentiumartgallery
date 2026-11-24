# Que todo quepa en celular — diseño corto

Fecha: 2026-11-24 · Tamaño: cambio pequeño · Estado: decisiones del usuario recogidas

## Intención
La mayoría de visitas llegarán por celular. Ninguna sección debe salirse del margen del teléfono ni cortar títulos u obras. La computadora debe quedar exactamente igual.

## Auditoría (360 y 375 px, 18 rutas ES/EN)
Ninguna página se desborda a nivel documento. Problemas encontrados dentro de componentes:
1. Inicio → Obra destacada: tarjeta fija de 360 px (382 px enfocada) en pantalla de 375; títulos cortados con «…»; caja de imagen fija de 440 px de alto.
2. Catálogo (/obra): 9 obras verticales de hasta 978 px de alto en pantalla de ~740.
3. Privacidad: tablas de cookies de 520 px con scroll lateral.

## Decisiones del usuario
- Obra destacada: la obra central completa dentro de la pantalla, con la anterior y la siguiente asomándose a los lados (efecto carrusel como en computadora).
- Títulos: completos, bajando de línea (no «…»).
- Catálogo: cada obra cabe completa en la pantalla (verticales más angostas y centradas).
- Privacidad: fichas apiladas en lugar de tabla con scroll lateral.
- Computadora: sin cambios. Todo aplica por debajo de `sm` (640 px).
- Teléfono de referencia: iPhone → probar 375, 390, 393, 430 (y 360).

## Decisiones mías (vetables)
- Carrusel en celular: tarjeta de 68 % del ancho de pantalla (máx. 360 px), separación 12 px, caja de imagen 4:5, y el carrusel ocupa todo el ancho de la pantalla (sin el margen de 20 px) para que las vecinas se asomen desde el borde.
- Catálogo: altura máxima de cada obra = alto de pantalla menos 10rem (encabezado, barra de contacto y pie de foto).
- Privacidad: fichas visibles solo en celular; la tabla sigue igual desde 640 px.

## Enfoques
Solo clases responsivas `max-sm:`/`sm:` de Tailwind sobre los componentes existentes (elegido): cero cambios en computadora y sin JS nuevo. Descartado: lógica JS por ancho de pantalla (más frágil y con salto al hidratar).
