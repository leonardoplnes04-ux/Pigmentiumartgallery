# Barra fija de contacto en celular — diseño corto

Fecha: 2026-11-24 · Tamaño: cambio pequeño · Estado: pendiente de aprobación

## Intención y por qué
En celular, «Contacto» solo existe como última línea dentro de «MENÚ». Quien llega con intención de escribir puede no encontrarlo. Se quiere un llamado a contacto visible desde que abre la página, en cualquier página.

## Qué se decidió (con el usuario)
- Forma: **barra fija al borde inferior** (variante A de la comparación temporal), no botón en la barra superior ni en el hero.
- Al tocarla se muestran **dos opciones**:
  - **WhatsApp** → `https://wa.me/528126905176`, chat en blanco (número de México, +52, confirmado).
  - **Correo** → `mailto:segundoplanesobras@outlook.com`, sin asunto ni cuerpo. Es el mismo correo que ya usa el sitio (`artist.email`).
- Aparece en **todas las páginas** en celular (recomendación aceptada).

## Decisiones mías (el usuario puede vetarlas)
- Solo celular: oculta desde el ancho de escritorio (`md`) hacia arriba, donde ya existe el botón «Contacto» del encabezado.
- No se muestra en la página de Contacto (`/contacto`, `/en/contact`).
- Las opciones se abren en una hoja inferior con fondo atenuado, cierre con toque fuera, botón de cerrar y tecla Esc; foco gestionado y `role="dialog"`.
- El aviso de cookies queda por encima de la barra (z-index mayor) hasta que se acepte o rechace.
- Se añade espacio inferior al contenido en celular para que la barra no tape el pie de página.
- Textos en español e inglés, en el diccionario existente (`data/translations.ts`).
- Bajo «Correo» se muestra la dirección en texto pequeño, porque `mailto:` no hace nada si el teléfono no tiene app de correo configurada.

## Metas / no metas / antimetas
- Metas: contacto visible al abrir, un toque para elegir canal, sin romper el diseño actual.
- No metas: mensajes prellenados, rastreo de clics en Analytics, cambios al encabezado de escritorio o al hero, formulario nuevo.
- Antimetas (sería fracaso aunque «funcione»): que tape el aviso de cookies o el pie de página; que aparezca en escritorio; que el número de WhatsApp sin código de país no abra el chat.

## Enfoques considerados
1. **Componente propio en el layout compartido** (elegido): un solo componente cliente montado en el `RootDocument` compartido, que sirve a ES y EN sin duplicar. Sin dependencias nuevas.
2. Hoja de una librería de UI: añade dependencia por algo pequeño.
3. Despliegue en línea (la barra crece hacia arriba): empuja contenido y es más difícil de hacer accesible.

## Qué queda al implementador
Nombre y archivo del componente, estilos exactos (siguiendo los tokens del sitio: fondo/tinta/línea), animación de la hoja, y la prueba visual en 360, 375 y 390 px, en modo claro y oscuro, en ES y EN.
