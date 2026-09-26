# Design system de DocTowers, extraído del código

**Generado el 11-ago-2026 desde `src/index.css` y `src/componentes/`.**

Este documento existe para que Claude Chat construya los estilos y componentes dentro del
archivo de Figma `DocTowers - Directorio`, cada uno en su página. Es la fuente de verdad para
esa tarea.

No leas `design-system/tokens.md` ni `design-system/componentes.md` para esto: son plantillas
que nunca se llenaron, con los hex en `—` y 38 casillas sin palomear. Tampoco `.21st/`, que se
generó el 8-ago **antes** de que existiera el código y dice cosas falsas, como que la
tipografía display es Georgia.

**Entregable interno.** No se va a publicar como librería compartida, así que basta con
estilos, variables y componentes locales del archivo.

---

## 1. Cómo se trabaja esto

### El conector solo ve la página abierta

Comprobado el 10-ago: al pedir la lista de páginas, el MCP devolvió únicamente la que estaba
abierta en el canvas, y al intentar entrar a otra respondió *"This is an invalid node
selection. Ask the user to select a node from a visible page on the canvas."*

Consecuencia práctica: **esto va página por página.** Valeria abre la página en Figma, Claude
Chat la llena, y hasta entonces se pasa a la siguiente. No es un flujo de un solo jalón, y si
se intenta como uno, va a fallar en silencio o a escribir en la página equivocada.

### El orden importa

Las páginas dependen unas de otras. Este es el orden y el porqué:

1. **Colors** — todo lo demás referencia estos colores.
2. **Typography** — los estilos de texto necesitan estar antes que cualquier componente.
3. **Spacing, Radius & Grid** — los radios y sombras los usan los componentes.
4. **Assets** — logotipo, isotipo e iconos, que varios componentes incrustan.
5. **Buttons** — el botón vive dentro del buscador y del estado vacío.
6. **Forms & Inputs** — el buscador y el `select`.
7. **Components** — todo lo demás, que ya puede componerse de lo anterior.

Si se hace en desorden, los componentes quedan con valores sueltos en vez de referencias, y el
archivo deja de ser un sistema y vuelve a ser un dibujo.

### Nombres

Los nombres de tokens van **en inglés**, porque caen tal cual en Tailwind: `--color-primary` se
usa como `bg-primary`. El contenido del sitio va en español; los tokens no.

En Figma, nombrar con `/` para que se agrupen solos: `color/primary`, `text/body-lg`,
`radius/pill`.

---

## 2. Reglas que no se negocian

**Contraste AA, 4.5:1 en todo texto.** Es un sitio de salud. El proyecto trae su propio
verificador, `npm run contraste`, y hoy pasa los 15 pares que revisa.

**El teal de marca `#10cfc9` NO es color de texto.** Da 1.95:1 sobre blanco. Es color de fondo
y de acento. Sobre el navy del hero sí brilla, ahí da 7:1. Esta es la decisión del 8-ago y
explica por qué las acciones del sitio son navy y no teal, que es lo que un diseñador esperaría
al ver la marca.

**Ningún color nuevo.** Si un componente pide un color que no está en esta lista, eso se decide
en el sistema, no se inventa en el componente.

---

## 3. Página **Colors**

Dos niveles: la escala cruda de marca y los semánticos. **Las vistas solo usan los semánticos.**
La escala cruda existe para que los semánticos apunten a algún lado.

En Figma conviene que sean **variables** y no estilos de color, para que los semánticos puedan
apuntar a los crudos como alias. Si el plan gratuito limita eso, entonces estilos, y los
semánticos se documentan como texto.

### 3.1 Escala cruda

| Token | Hex |
|---|---|
| `teal/100` | `#e3f7f6` |
| `teal/300` | `#8fdcd8` |
| `teal/500` | `#10cfc9` |
| `teal/600` | `#0db0ab` |
| `teal/700` | `#0a8b87` |
| `teal/800` | `#087d80` |
| `teal/900` | `#076769` |
| `navy/900` | `#003245` |
| `navy/800` | `#0a4257` |
| `navy/700` | `#155066` |
| `seafoam/300` | `#7fa5a3` |
| `seafoam/200` | `#a9c4c2` |
| `ink/900` | `#0a1f26` |
| `ink/700` | `#3d5359` |
| `ink/500` | `#5b7178` |
| `gray/200` | `#e1e8ea` |
| `gray/100` | `#f9f9f9` |

`teal/800` y `teal/900` se agregaron el 10-ago y no venían del sistema original. Existen porque
el botón del nav pide teal con texto blanco encima, y ninguno de los escalones anteriores
aguanta: `teal/600` da 2.55:1 y `teal/700` da 3.95:1. `teal/900` es el hover, y tiene que ser
más oscuro, no más claro: usar `teal/700` como hover bajaría el contraste en vez de subirlo.

### 3.2 Semánticos

| Token | Apunta a | Hex resuelto | Para qué |
|---|---|---|---|
| `color/primary` | `navy/900` | `#003245` | Acciones, links, acentos |
| `color/primary-hover` | `navy/800` | `#0a4257` | Hover del primario |
| `color/accent` | `teal/500` | `#10cfc9` | Acento de marca, solo fondo |
| `color/accent-soft` | `teal/100` | `#e3f7f6` | Fondo del avatar |
| `color/accent-ink` | `navy/900` | `#003245` | Tinta sobre superficie teal |
| `color/cta` | `teal/800` | `#087d80` | El botón del nav, el único en teal |
| `color/cta-hover` | `teal/900` | `#076769` | Hover del anterior |
| `color/text-strong` | `ink/900` | `#0a1f26` | Títulos |
| `color/text-base` | `ink/700` | `#3d5359` | Párrafos |
| `color/text-muted` | `ink/500` | `#5b7178` | Metadatos, consultorio, piso |
| `color/text-invert` | — | `#ffffff` | Texto sobre oscuro |
| `color/background` | `gray/100` | `#f9f9f9` | Fondo de página |
| `color/surface` | — | `#ffffff` | Tarjetas, campos |
| `color/border` | `gray/200` | `#e1e8ea` | Divisiones, contorno |
| `color/destructive` | — | `#b3261e` | Errores. Hoy sin uso en pantalla |

### 3.3 Degradado del hero

Un radial, no un lineal. En Figma va como estilo de relleno llamado `gradient/hero`:

```
radial-gradient(120% 140% at 8% 30%,
  seafoam/200  0%,
  seafoam/300  22%,
  navy/700     55%,
  teal/600     72%,
  navy/900     100%)
```

Sobre el hero va además un **velo navy al 30%**. No es decoración: sin él, el píxel más claro
de la foto de fondo deja el texto blanco en 3.27:1. Con 30% queda en 4.91:1 en el peor punto.

### 3.4 Tabla de contraste verificada

Estos son los pares que el proyecto verifica, con sus números reales:

| Par | Ratio |
|---|---|
| `text-strong` sobre `background` | 15.47:1 |
| `text-base` sobre `background` | 7.42:1 |
| `text-muted` sobre `background` | 4.69:1 |
| `text-strong` sobre `surface` | 16.98:1 |
| `text-base` sobre `surface` | 8.14:1 |
| `text-muted` sobre `surface` | 5.15:1 |
| `primary` sobre `surface` | 13.62:1 |
| `primary` sobre `background` | 12.41:1 |
| `text-invert` sobre `primary` | 13.62:1 |
| `text-invert` sobre `primary-hover` | 10.88:1 |
| `accent-ink` sobre `accent-soft` | 12.26:1 |
| `accent` sobre `primary` | 7.00:1 |
| **`text-invert` sobre `cta`** | **4.93:1** |
| **`text-invert` sobre `cta-hover`** | **6.66:1** |

Los dos últimos entraron al verificador el 11-ago. Antes no estaban, que era justo el riesgo:
el único botón del sitio en teal era el que podía salirse de la regla sin que nadie lo notara.
Hoy `npm run contraste` revisa **17 pares** y todos pasan.

---

## 4. Página **Typography**

Dos familias:

| Token | Familia | De dónde sale |
|---|---|---|
| `font/display` | **Intrade Demo** Regular 400 | `.ttf` servido desde el proyecto |
| `font/body` | **Manrope** variable 200–800 | `.woff2`, dos cortes con `unicode-range` |

Manrope se sirve desde el proyecto y no desde Google Fonts, para que el sitio no dependa de una
petición a `gstatic` el día de la junta.

### Escala

Los dos tamaños grandes son fluidos en el código. En Figma se documentan con su valor de
escritorio, que es la medida original del sistema, y se anota el mínimo.

| Estilo | Tamaño | Interlineado | Peso típico | Familia |
|---|---|---|---|---|
| `text/display` | 64px (mín. 36px) | 1.08 | 700 | display |
| `text/h1` | 48px (mín. 28px) | 1.08 | 700 | display |
| `text/h2` | 28px | 1.2 | 700 | display |
| `text/h3` | 18px | 1.2 | 600 | body |
| `text/body-lg` | 18px | 1.5 | 400 / 600 | body |
| `text/body` | 16px | 1.5 | 400 / 600 | body |
| `text/body-sm` | 14px | 1.5 | 400 / 600 | body |
| `text/label` | 12px | 1.5 | 600 | body |

El fluido de `display` va de 36 a 64 con `9vw`, y el de `h1` de 28 a 48 con `7vw`. No son
tamaños inventados: 36, 64, 28 y 48 son todos escalones de la escala original, solo se
interpola entre ellos. La razón es que a 390px un título de 64px parte "Encuentra a tu médico
en DocTowers" en cinco renglones.

`text/label` se usa siempre en mayúsculas con `tracking` amplio en el footer, y en caja normal
en la tarjeta de médico.

---

## 5. Página **Spacing, Radius & Grid**

### Espaciado

La escala es la de Tailwind, múltiplos de 4px. Los que el sitio usa de verdad:

`4, 6, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 256`

### Radios

| Token | Valor | Dónde |
|---|---|---|
| `radius/sm` | 8px | Foco por teclado, links |
| `radius/md` | 14px | Tarjetas, `select`, cajas |
| `radius/lg` | 20px | Sin uso hoy |
| `radius/pill` | 999px | **Todas las acciones y los avatares** |

En este sistema **las acciones son píldoras, no rectángulos redondeados.** Es lo que más lo
distingue visualmente y conviene que quede explícito en el archivo.

### Sombras

| Token | Valor |
|---|---|
| `shadow/card` | `0 2px 8px rgb(0 50 69 / 0.06)` |
| `shadow/card-hover` | `0 8px 24px rgb(0 50 69 / 0.10)` |
| `shadow/lg` | `0 20px 48px rgb(0 50 69 / 0.16)` |
| `shadow/pill` | `0 8px 32px rgb(0 50 69 / 0.18)` |

`shadow/pill` ya existe en el archivo de Figma como la variable **"sombra sencilla"**, que hoy
es la única variable publicada ahí. Al crear el sistema conviene renombrarla o dejarla como
alias, pero no duplicarla.

### Grid y contenedores

| Concepto | Valor |
|---|---|
| Contenedor principal | `max-w-6xl`, **1152px**, centrado |
| Relleno lateral | 16px en mobile, 24px de `sm` en adelante |
| Contenedor de ficha | `max-w-4xl`, 896px |
| Contenedor del hero | `max-w-3xl`, 768px |

**Cortes responsive.** Solo se usan dos de verdad:

| Corte | Ancho | Qué cambia |
|---|---|---|
| `sm` | 640px | Nav cambia de píldora única a logo más píldora. Directorio pasa de 12 a 24 por página y de 1 a 2 columnas. |
| `md` | 768px | La tira de números pasa de una columna a tres. |
| `lg` | 1024px | Directorio pasa a 3 columnas. Destacados del home pasan a 4. |

El directorio llega a **3 columnas como máximo**. A cuatro, la tarjeta baja a 273px y el nombre
del médico se parte en dos líneas en casi todas, 24 veces por página.

### Movimiento

| Token | Valor |
|---|---|
| `duration/fast` | 120ms |
| `duration/base` | 200ms |
| `ease/standard` | `cubic-bezier(0.4, 0, 0.2, 1)` |

Todo el movimiento se apaga bajo `prefers-reduced-motion`.

### Foco por teclado

Contorno de **3px sólido** en `color/primary`, con `outline-offset` de 2px y `radius/sm`. Tiene
que verse de verdad, no ser un halo apenas perceptible.

---

## 6. Página **Assets**

### Logotipo

Cinco variantes del lockup, todas con `viewBox` de **665 × 81**, o sea proporción 8.2 a 1:

`doctowers-logo-black-teal.svg` · `-black` · `-navy-white` · `-white-teal` · `-white`

En uso hoy: **black-teal** sobre fondo claro y **white-teal** sobre el hero.

### Isotipo

Archivo `favicon.svg`, lienzo de 512 × 512. **Ojo con esto:** el dibujo real mide 502 × 319 y
está centrado con 97px de aire arriba y abajo. Para favicon está bien, pero para el nav hay que
recortar el `viewBox` a `5 97 502 319`, si no una marca de 32px se ve de 20px y flota.

En Figma conviene crear el componente ya recortado, con la caja pegada al dibujo.

El isotipo es la cruz más la **D**. La cruz va siempre en `color/accent`; la D cambia con el
fondo, blanca sobre oscuro y tinta sobre claro.

### Cruz sola

`cruz.svg`, lienzo 512 × 512, la cruz lo llena de borde a borde, proporción 1.004. Es
cuadrada.

**El archivo trae el color clavado en `#10cfc9`**, y así da 1.95:1 sobre blanco. En el código
se usa inline con `currentColor` para que herede el color de donde esté. En Figma, crear el
componente con el color como propiedad, no fijo.

### Iconos

Vienen de **Heroicons, set outline de 24px, grosor 1.5**. No hay que redibujarlos: basta con
nombrar cuáles se usan.

`MagnifyingGlass` · `Phone` · `MapPin` · `Clock` · `Identification` · `ArrowRight` ·
`ChevronRight` · `XMark`

Tamaño por defecto en el sitio: **20px**. En las cajas de números la cruz va a 28px, y el
chevron del botón del nav a 24px.

Dos excepciones que no son de Heroicons:
- **La cruz de marca**, descrita arriba.
- **WhatsApp**, dibujado a mano porque Heroicons no incluye logotipos. Va con el mismo grosor
  de trazo, 1.5, para que no desentone.

### Fotos

Cuatro fotos de médicos, cuadradas, recortadas en círculo. El banco completo lo entrega Rebeca.
La especificación está en `assets-para-rebeca.md`.

---

## 7. Página **Buttons**

### Botón base

Un solo componente con dos variantes. Se distinguen por **relleno contra contorno**, no solo
por color: quien no distingue los dos colores sigue viendo cuál manda.

| Propiedad | Valor |
|---|---|
| Forma | `radius/pill` |
| Relleno | 22px horizontal, 12px vertical |
| Texto | `text/body`, 16px, peso 600 |
| Espacio entre ícono y texto | 8px |
| Transición | 120ms sobre color de fondo |

| Variante | Reposo | Hover |
|---|---|---|
| **Primario** | fondo `primary`, texto `text-invert` | fondo `primary-hover` |
| **Secundario** | fondo `surface`, texto `primary`, borde 1px `border` | borde `primary`, fondo `background` |

**Deshabilitado:** opacidad 50% y cursor bloqueado, en las dos variantes.

El primario es navy y no el teal de marca. Es la decisión de contraste de la sección 2.

### Botón CTA del nav

Es el **único botón del sitio en teal**, y por eso resalta. No es una variante del anterior:
tiene su propia medida y su propio color.

| Propiedad | Valor |
|---|---|
| Forma | `radius/pill` |
| Fondo | `color/cta`, hover `color/cta-hover` |
| Relleno | 28px izquierda, 20px derecha, 12px vertical |
| Texto | `text/body-lg`, 18px, peso 700, `text-invert` |
| Ícono | `ChevronRight` de 24px, a 2px del texto |

El relleno es asimétrico a propósito: el chevron de la derecha ya aporta peso visual, así que
ese lado lleva menos aire.

### Botones de paginación

| Propiedad | Valor |
|---|---|
| Ancho mínimo | **44px**, que es el mínimo táctil |
| Forma | `radius/pill`, borde 1px |
| Relleno | 12px horizontal, 8px vertical |
| Texto | `text/body-sm`, peso 600, cifras tabulares |

| Estado | Valores |
|---|---|
| Reposo | borde `border`, fondo `surface`, texto `text-base` |
| Hover | borde `primary`, texto `primary` |
| Página actual | borde y fondo `primary`, texto `text-invert` |
| Deshabilitado | opacidad 40% |

En mobile, "Anterior" y "Siguiente" pierden su texto y quedan solo las flechas: con nueve
páginas y los dos textos completos la fila no cabe en 390px.

---

## 8. Página **Forms & Inputs**

En todo el sitio hay **exactamente dos campos**: el buscador y el `select`. No hay login, no
hay formularios, no hay campos de contraseña. Si aparece un tercero, algo se salió del alcance.

### Buscador

Píldora blanca con el botón metido adentro, que también es píldora.

| Propiedad | Valor |
|---|---|
| Forma | `radius/pill`, borde 1px `border`, fondo `surface` |
| Foco | el borde del contenedor pasa a `primary` |
| Texto | `text/body`, `text-strong`; placeholder en `text-muted` |
| Espacio interno | 12px entre elementos |

Dos tamaños:

| Tamaño | Relleno | Sombra | Dónde |
|---|---|---|---|
| **Grande** | 6px, con 16px a la izquierda (24px en `sm`) | `shadow/lg` | Hero del home |
| **Normal** | 6px, con 16px a la izquierda (20px en `sm`) | `shadow/card` | Directorio |

Estados y piezas condicionales:

- **Ícono de lupa a la izquierda:** solo en el tamaño normal, en `text-muted`.
- **Botón de limpiar:** aparece únicamente cuando hay texto. Píldora, `text-muted`, con fondo
  `background` en hover.
- **Botón "Buscar":** solo existe donde hay algo que enviar, o sea en el home. En el directorio
  filtra conforme se escribe, así que ahí un botón sería decorativo. Es píldora `primary`, con
  relleno de 24px por 14px, ícono de 18px, y el texto "Buscar" se oculta abajo de `sm`.

### Select de especialidad

Es un **`select` nativo**, no un panel de filtros ni un desplegable a medida. La razón: iOS y
Android lo abren como rueda o como hoja a pantalla completa, que resuelve mejor 30 opciones en
mobile de lo que armaríamos a mano, y ya lo sabe usar cualquiera.

| Propiedad | Valor |
|---|---|
| Ancho | 100% en mobile, 288px de `sm` en adelante |
| Forma | `radius/md`, borde 1px `border`, fondo `surface` |
| Relleno | 16px izquierda, 44px derecha, 12px vertical |
| Texto | `text/body`, `text-strong` |
| Foco | borde `primary` |
| Chevron | `ChevronDown` de 20px en `text-muted`, a 12px del borde derecho |

El chevron es un **ícono de verdad**, no una imagen de fondo. Como imagen de fondo, el color se
escribe a mano en el data URI y no puede heredar del sistema, así que quedaba fuera de los
tokens y se desfasaba solo. En el archivo de Figma conviene armarlo igual: el ícono como capa
con su color enlazado a `color/text-muted`, no un chevron dibujado dentro del campo.

El campo se estira a la altura del buscador cuando van lado a lado, así que en desktop los dos
controles miden 58px y en mobile el `select` se queda en su alto natural de 50px.

La primera opción siempre es "Todas las especialidades" con el total entre paréntesis, y cada
opción lleva su conteo. Los conteos salen de los datos.

---

## 9. Página **Components**

Trece componentes. Para cada uno: anatomía, variantes, estados y comportamiento en mobile, que
es justo lo que `componentes.md` pedía y nunca se llenó.

### 9.1 Avatar

Círculo con las iniciales, y la foto encima cuando carga.

| Propiedad | Valor |
|---|---|
| Forma | `radius/pill`, fondo `accent-soft` |
| Iniciales | peso 600, color `accent-ink` |
| Medidas en uso | **56px** en la tarjeta, **128px** en la ficha, **44px** (mobile) y **54px** (desktop) en la píldora del hero |
| Texto de iniciales | `text/h3` a 56px, `text/display` a 128px |

**Las iniciales siempre se pintan y la foto va encima.** No al revés. Hacerlo al revés deja un
círculo vacío mientras la petición falla, y con 200 tarjetas el fallo no llega parejo: unas ya
tienen iniciales y otras siguen en blanco, y eso se lee como sitio a medio cargar.

Las iniciales van en navy y no en el teal del sistema original, porque teal sobre `teal/100`
da 3.74:1 y no pasa AA.

### 9.2 Tarjeta de médico

El componente central: cuatro veces en el home y hasta 24 por página en el directorio.

| Propiedad | Valor |
|---|---|
| Forma | `radius/md`, borde 1px `border`, fondo `surface`, `shadow/card` |
| Relleno | 20px |
| Espacio avatar–texto | 16px, alineados **arriba**, no al centro |
| Nombre | `text/body` peso 600, `text-strong`, máximo 2 líneas |
| Especialidad | `text/body-sm`, `text-base`, máximo 2 líneas, a 6px del nombre |
| Consultorio y piso | `text/label`, `text-muted`, a 10px |

**Hover:** sube 2px, el borde pasa a `primary`, la sombra a `shadow/card-hover`, y el nombre a
`primary`.

Dos ausencias deliberadas: **no lleva botón adentro**, porque la tarjeta entera es el link y un
"Ver más" repetido 200 veces compite con ella misma. Y **no lleva insignia de "Disponible
hoy"**, porque ese dato no existe y derivarlo del horario dejaría a casi todo el directorio en
"sin disponibilidad" justo un sábado, que es el día de la demostración.

La especialidad va a dos líneas y no a una porque "Ginecología y Obstetricia" y "Traumatología
y Ortopedia" se cortan en "y…" y dejan de decir cuál especialidad es.

### 9.3 Nav

El más complejo del sistema: **dos estados por dos arreglos**, o sea cuatro variantes.

**Estados.** *Transparente* solo en el home mientras el hero está en pantalla. *Sólido* en el
home al pasar el hero, y desde el primer píxel en Directorio y Ficha.

| | Transparente | Sólido |
|---|---|---|
| Barra | sin fondo, borde transparente | fondo `surface` al 95% con desenfoque, borde inferior `border` |
| Relleno vertical | 16/12px, y 56/24px en `sm` | 12px, 16px en `sm` |
| Logotipo | variante blanca | variante black-teal |
| Píldora | fondo blanco al 12%, desenfoque 66px, borde `accent` al 55% | fondo `primary` |

**Arreglos.** No son el mismo diseño con otras medidas, son dos distintos.

*Mobile, abajo de `sm`:* el nav **es** una píldora. Isotipo de 32px a la izquierda, botón CTA a
la derecha, relleno de 16px por 8px, `shadow/pill`. **No lleva "Consultorios disponibles"**:
a 402px no cabe, y ese dato sigue vivo en la banda del home y en el footer.

*Desktop, de `sm` en adelante:* el logotipo vive **afuera** de la píldora, a la izquierda, a
22px de alto, seguido de un separador vertical de 48px y la palabra "Veracruz" en
`text/body-lg`. La píldora va a la derecha con el texto "Consultorios disponibles" y el botón
CTA, separados por 20px.

**Contenido:** el logotipo es el link al inicio. "Inicio" no existe como link, a propósito.
"Consultorios disponibles" ancla a la sección de consultorios del home.

### 9.4 Píldora de especialistas

La del hero, montada sobre su borde inferior, mitad dentro y mitad fuera.

| Propiedad | Valor |
|---|---|
| Forma | `radius/pill`, fondo `surface`, `shadow/pill` |
| Relleno | 12px horizontal, 8px vertical |
| Avatares | 4, de **44px** en mobile y **54px** en desktop |
| Traslape | **19px**, igual en los dos tamaños |
| Anillo entre avatares | 2px en `surface` |
| Texto | `text/body` en mobile, `text/body-lg` en desktop, peso 600, `primary` |

El texto se acorta en mobile: dice "200 especialistas" en vez de "200 especialistas en un solo
lugar", porque las cuatro caras más la frase completa no caben en una línea a 402px.

El número sale de los datos. En el mockup dice "+200" y en el sitio dice "200": son exactamente
200, no más de 200.

### 9.5 Tira de números

Tres cajas con los totales de la torre.

| Propiedad | Valor |
|---|---|
| Forma | `radius/md`, borde 1px, fondo `surface`, `shadow/card` |
| Relleno | 24px en mobile, 32px de `md` en adelante |
| Ícono | la cruz de marca a 28px, en `primary` |
| Número | `text/h1`, familia display, peso 700, cifras tabulares |
| Etiqueta | `text/body-sm`, `text-muted` |

**Mobile:** una sola columna, con la caja en **horizontal**: ícono a la izquierda, número y
etiqueta a la derecha. **De `md` en adelante:** tres columnas, con la caja en vertical.

Las tres cajas llevan **la misma cruz**, decisión de Valeria del 10-ago. Antes cada una traía
su propio ícono. Se gana marca y se pierde la distinción entre las tres, y eso fue a propósito:
el dato lo carga el número y la etiqueta, no el dibujo.

El número tiene que verse bien con **uno y con tres dígitos**: hoy conviven 200, 30 y 12.

### 9.6 Contador de resultados

Tres estados, y el vacío se diseña, no se improvisa.

| Estado | Qué dice |
|---|---|
| Sin filtro | "200 especialistas" |
| Con búsqueda | "11 resultados para *cardio*" |
| Con filtro pero sin texto | "14 especialistas" |

Texto en `text/body` peso 600, `text-strong`. Cuando hay filtro aparece a la derecha un botón
de texto subrayado en `primary` para limpiar.

Va con `aria-live` para que un lector de pantalla anuncie el cambio, porque la lista se filtra
conforme se escribe.

### 9.7 Estado vacío

| Propiedad | Valor |
|---|---|
| Forma | `radius/md`, borde 1px, fondo `surface` |
| Relleno | 24px horizontal, 56px vertical |
| Alineación | centrado |
| Título | `text/h2`, familia display, peso 700 |
| Cuerpo | `text/body`, `text-base`, ancho máximo 448px |
| Acción | botón secundario |

**Dice qué hacer ahora, no pide perdón.** El texto explica las dos causas probables, que la
especialidad del filtro no coincida o que sobre una palabra en la búsqueda, y propone probar
con el apellido.

### 9.8 Paginación

Numerada y no "cargar más", porque el directivo tiene que ver de un golpe que hay 200 médicos.
"Cargar más" esconde la escala justo en la vista cuyo trabajo es demostrarla.

Ventana de páginas alrededor de la actual, con la primera y la última siempre visibles, y `…`
en `text-muted` donde se corta. Con siete páginas o menos se muestran todas.

Medidas y estados en la página **Buttons**.

### 9.9 Footer

Dos columnas de `md` en adelante, en proporción 1.5 a 1. Fondo `surface`, borde superior.

Columna izquierda: logotipo a 32px, dirección, teléfono y horario, cada uno con su ícono en
`text-muted`. Columna derecha: el encabezado "NAVEGACIÓN" en `text/label` mayúsculas, y los dos
links.

Abajo, separada por un borde, la línea de derechos reservados en `text/body-sm`, `text-muted`.

Sin *newsletter*, sin redes sociales inventadas, y sin un solo link a algo que no existe.

### 9.10 Marca

Dos componentes: **Lockup**, que es el archivo completo con dos variantes de color, y
**Isotipo**, que es la cruz más la D con el `viewBox` recortado. Detalle en la página Assets.

### 9.11 Iconos

Capa delgada sobre Heroicons. Existe como capa y no como importaciones sueltas para que el
tamaño y el `aria-hidden` se decidan en un solo lugar. Los iconos son **decorativos a
propósito**: el dato siempre está escrito al lado, así que anunciarlos con lector de pantalla
solo duplicaría.

### 9.12 y 9.13 Buscador y Select

Están en la página **Forms & Inputs**.

---

## 10. Lo que NO va al archivo

- **Login, panel del médico y cualquier formulario.** Nadie inicia sesión en este sitio.
- **Tarjeta de especialidad.** No hay vista de Especialidades; el `select` cubre ese camino.
- **Filtros por aseguradora y búsqueda por síntoma.** Son v2.
- **Insignia de "Disponible hoy".** El dato no existe.
- **Modo oscuro.** El sitio no tiene.
- Los alias del puente 21st/shadcn que están en `index.css`. Son alias hacia los mismos
  colores, no colores nuevos, y meterlos al archivo duplicaría la paleta sin agregar nada.

---

## 11. Pendientes conocidos

**Ninguno. Los tres se cerraron el 11-ago.** Se dejan anotados porque explican por qué el
código quedó como quedó.

**Números escritos a mano en pantalla.** `ContadorResultados.tsx` decía "Limpiar y ver los 200"
y "Ver los 200 especialistas" con el 200 literal. Ahora los dos botones arman el texto desde
`totalDoctores`, con el plural resuelto, así que sirven igual para 200 que para 1.

**El verificador de contraste no cubría el par nuevo.** `scripts/contraste.mjs` revisaba 15
pares y ninguno era el del botón teal del nav. Ahora revisa 17: entraron `text-invert` sobre
`cta` (4.93:1) y sobre `cta-hover` (6.66:1).

**El chevron del `select` traía un color fuera del sistema.** Estaba incrustado como `#5b6b75`
dentro de un data URI, cuando el token `ink/500` es `#5b7178`. No se corrigió el hex: se quitó
el data URI y el chevron pasó a ser un ícono que hereda `text-muted`. Corregir el hex lo dejaba
bien hoy y desfasado la próxima vez que cambie el token.

Después de eso, **no queda un solo color escrito a mano en `src/componentes/` ni en
`src/vistas/`.** Todo sale de los tokens.

---

## 12. Instrucción sugerida para Claude Chat

> Tengo el archivo de Figma `DocTowers - Directorio` abierto en la página **[NOMBRE]**.
> Usando el MCP de Figma, crea en esa página lo que este documento describe en su sección
> correspondiente, respetando los nombres de token tal cual vienen.
> No inventes colores, tamaños ni componentes que no estén aquí.
> Si algo no alcanza para construir un componente, dímelo en vez de rellenarlo.

Y antes de empezar cada página, confirmar que es la que está abierta en el canvas. Es la falla
más probable de todo este proceso.
