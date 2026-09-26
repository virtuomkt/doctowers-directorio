# Tokens

Valores crudos extraídos del home en Figma. **Sin llenar todavía** — se completa con el
screenshot o el acceso a Figma.

Regla: si un valor no está aquí, no se usa en una vista. Un color suelto que aparece solo en
una pantalla es lo que rompe la coherencia cuando Claude Design genera las cinco en paralelo.

## Paleta

Los nombres de token van **en inglés**, porque caen tal cual en la configuración de Tailwind.
El contenido del sitio va en español; los tokens no.

| Token | Hex | Dónde se usa |
|---|---|---|
| `primary` | — | Botones principales, links, acentos |
| `primary-hover` | — | Estado hover del primario |
| `secondary` | — | |
| `text-strong` | — | Títulos |
| `text-base` | — | Párrafos |
| `text-muted` | — | Metadatos, consultorio, piso |
| `background` | — | Fondo de página |
| `surface` | — | Tarjetas, campos |
| `border` | — | Divisiones, contorno de tarjetas |

Salud es un contexto donde el contraste no es negociable: todo texto sobre su fondo tiene que
pasar **AA (4.5:1)**. Verificar antes de cerrar la paleta, no después.

## Tipografía

| Token | Familia | Tamaño | Peso | Interlineado |
|---|---|---|---|---|
| `display` | — | — | — | — |
| `h1` | — | — | — | — |
| `h2` | — | — | — | — |
| `h3` | — | — | — | — |
| `body` | — | — | — | — |
| `body-sm` | — | — | — | — |
| `label` | — | — | — | — |

## Espaciado

Escala base: — px.

| Token | Valor |
|---|---|
| `xs` | — |
| `sm` | — |
| `md` | — |
| `lg` | — |
| `xl` | — |
| `2xl` | — |

## Radios y sombras

| Token | Valor |
|---|---|
| `radius-sm` | — |
| `radius-md` | — |
| `radius-full` | — |
| `shadow-card` | — |

## Breakpoints

| Nombre | Ancho |
|---|---|
| `mobile` | — |
| `tablet` | — |
| `desktop` | — |

El mobile no es un ajuste posterior: falta el mobile de las tres vistas y es donde la gente
va a buscar a su médico.
