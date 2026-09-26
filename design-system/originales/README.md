# Originales

Los archivos como llegaron. **No se publican**: viven aquí y no en `public/`, porque todo lo
que está en `public/` se copia tal cual al sitio, aunque nadie lo pida. Los cuatro de esta
carpeta pesaban 3.6 MB y ninguno se usaba en pantalla.

De aquí salen las versiones que sí se publican, y así se regeneran:

| Original | Publicado | Cómo |
|---|---|---|
| `bg-50doctors.png` (2.6 MB) | `public/img/hospital-background.jpg` (295 KB) | reescalar a 1600 de ancho, JPEG calidad 60 |
| `50doctors blue.png` (1620×1620, 96% vacío) | `public/img/hospital-logo.png` (24 KB) | recortar a su caja real (325,727 · 969×166) y bajar a 580 de ancho |
| `04.-Logo_50Doctors-05-1024x176.png` | — | es el logo en blanco; sobre fondo claro no se ve |
| `doctowers-edificio.png` | — | el edificio recortado. Hoy no se usa porque `bg-50doctors.png` ya lo trae dentro. Sirve si algún día la textura y el edificio tienen que moverse por separado |
| `bg-lobby.jpg` (1.4 MB) | — | era la foto del área comercial hasta el 26-sep, cuando salió por provisional. Si vuelve: 1600 de ancho, JPEG calidad 68 |
| `consultorio-square.png` (941 KB) | `public/img/consultorio.jpg` (130 KB) | reescalar a 1000 de ancho, JPEG calidad 72 |
| Drive: `DOCTOWERS / 04 Fotos y Dron Fachada y Piso 3 / DRON / DJI_20260903204601_0022_D.JPG` (4032×3024, 8 MB) | `public/img/hero-fachada.jpg` (572 KB) | reescalar a 2400 de ancho, JPEG calidad 62. El original no se versiona: 8 MB en git para siempre |
| `consultorios-background.jpg` | — | era el fondo de la sección de consultorios hasta el 14-ago, cuando pasó a dos mitades con foto cuadrada. Sin uso desde entonces |

El recorte del logo se hizo con un script de la sesión del 13-ago, no con una herramienta
instalada: `sips` no puede recortar con desplazamiento y el logo venía centrado en un lienzo
cuadrado. Si hay que rehacerlo, lo que importa son los números de la tabla.
