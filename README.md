# pFAE — Prototipo Ficha Anestésica Electrónica

Descripción

- pFAE es un prototipo frontend que demuestra cómo una Ficha Anestésica Electrónica (simplificada) puede cargarse dinámicamente a partir de un QR con JSON generado por MiFAE.

Objetivo del prototipo

- Mostrar que una interfaz anestésica inicialmente vacía puede recibir los datos del médico y combos (inducción, mantenimiento, despertar) desde un QR y representarlos dinámicamente.

Tecnologías

- React (hooks)
- JavaScript
- CSS simple
- html5-qrcode (lectura de QR en navegador)
- Vite (dev server)

Cómo instalar dependencias

1. Abrir PowerShell en la carpeta del proyecto.
2. Ejecutar:

```powershell
npm install
```

Cómo ejecutar en notebook Windows

1. Instalar dependencias (ver arriba).
2. Ejecutar el servidor de desarrollo:

```powershell
npm run dev
```

3. Abrir el navegador en la dirección que indique Vite (por ejemplo http://localhost:5173).

Cómo probar lectura QR

- Pulsar el botón "Leer QR". El navegador pedirá permiso para usar la cámara. En notebook intentará usar la webcam; en tablet Android usará la cámara trasera.
- Escanear un QR que contenga un JSON válido (ejemplo abajo).
- La cámara se cierra automáticamente al leer y parsear el JSON.

Cómo preparar para tablet Android

- El prototipo es responsive y usa la cámara del dispositivo vía la API MediaDevices utilizada por `html5-qrcode`.
- Para instalar en Android como PWA más adelante, se recomienda convertirlo a PWA y agregar manifiesto. Esto no está implementado en este prototipo.

Estructura de carpetas

- public: (no usado explícitamente)
- src/: código fuente React
  - components/: componentes React
- docs/: documentación adicional

Flujo MiFAE → QR → pFAE

1. MiFAE genera un QR que contiene un JSON con la estructura esperada.
2. pFAE abre la cámara y lee el QR.
3. pFAE parsea y valida el JSON mínimamente.
4. pFAE carga el estado con el `medico` y los `combos` para cada fase.
5. Los botones Inducción/Mantenimiento/Despertar muestran modales con los combos.

Ejemplo de JSON válido

```json
{
  "medico": { "nombre": "Alejandro", "apellido": "Figar" },
  "induccion": [
    {
      "nombre": "Inducción estándar",
      "items": [
        "Propofol 150 mg EV",
        "Fentanilo 100 mcg EV",
        "Rocuronio 50 mg EV"
      ]
    }
  ],
  "mantenimiento": [{ "nombre": "Hipotensión", "items": ["Efedrina 5 mg EV"] }],
  "despertar": [{ "nombre": "Reversión", "items": ["Sugammadex 200 mg EV"] }]
}
```

Ejemplo de JSON inválido

- Texto plano que no sea JSON.
- Objeto JSON que no contenga las claves `medico`, `induccion`, `mantenimiento`, `despertar`.
- Arrays cuyo contenido no tenga `nombre` o `items` como array de strings.

Limitaciones del prototipo

- No guarda datos en backend ni localmente.
- No es una ficha clínica real ni reemplaza sistemas sanitarios.
- Validación mínima solo para demostración.

Notas de seguridad y privacidad

- No almacenar datos clínicos. Este prototipo mantiene todo en memoria de la sesión del navegador.

Licencia y aviso

- Proyecto educativo / prototipo. No para uso clínico.
