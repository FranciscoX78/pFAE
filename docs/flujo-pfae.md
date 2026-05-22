# Flujo funcional pFAE

1. Estado antes del QR
   - Interfaz limpia, sin datos.
   - Encabezado muestra: `Médico: Anónimo`.
   - Botones Inducción/Mantenimiento/Despertar muestran `Información vacía` si se presionan.

2. Lectura del QR
   - Usuario pulsa `Leer QR`.
   - pFAE pide permiso para usar la cámara (webcam o cámara del dispositivo).
   - Al detectar un QR, pFAE intenta parsear su contenido como JSON.
   - Si el JSON es válido y cumple validación mínima, el estado se actualiza y la cámara se cierra.
   - Si el JSON es inválido, se muestra un modal con: `QR inválido o formato no compatible`.

3. Estado después del QR
   - Si `medico` está presente con `nombre` o `apellido`, el encabezado muestra `Médico: Nombre Apellido`.
   - Los combos para Inducción, Mantenimiento y Despertar quedan en estado cargado (arrays según JSON).

4. Comportamiento de cada botón
   - Inducción: abre modal con cards para cada combo en `induccion`. Si el array está vacío, muestra `Información vacía`.
   - Mantenimiento: idem con `mantenimiento`.
   - Despertar: idem con `despertar`.
   - Cerrar: resetea toda la aplicación a estado inicial (borra datos en memoria y vuelve a `Médico: Anónimo`).

5. Estructura esperada del JSON
   - Top-level keys: `medico`, `induccion`, `mantenimiento`, `despertar`.
   - `medico`: objeto con `nombre` y `apellido` (cualquiera puede faltar; si faltan se usa Anónimo).
   - `induccion`, `mantenimiento`, `despertar`: arrays de combos.
   - Cada combo: objeto con `nombre` (string) y `items` (array de strings).

6. Criterios mínimos de validación
   - JSON parseable.
   - Contiene las cuatro claves requeridas.
   - Las tres fases son arrays.
   - Cada combo tiene `nombre` y `items` (array de strings).

7. Notas para futura conversión a PWA / Android
   - Agregar `manifest.json` y iconos.
   - Servir por HTTPS y añadir `service-worker` para offline.
   - Probar permisos de cámara en WebView si se empaqueta como app.
