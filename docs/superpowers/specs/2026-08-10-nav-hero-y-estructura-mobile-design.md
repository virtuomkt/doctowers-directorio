# Nav, hero y estructura mobile

**Fecha:** 10-ago-2026
**Alcance:** rediseño del nav, dos piezas nuevas del home, y la pasada de estructura mobile de
las tres vistas.
**Origen:** frame `Home Desktop - 1920px` (node `16:6`) del archivo de Figma
`DocTowers - Directorio`, más las mediciones hechas sobre el sitio corriendo.

---

## Por qué

El mobile de las tres vistas nunca se diseñó, y es donde la gente busca a su médico. Medido
sobre el sitio corriendo a 390px, el directorio pide **4.9 pantallas de scroll por página** y
el logo del nav se come el **51%** de la barra. Aparte, el mockup del home trae un nav nuevo y
una pieza que no se había implementado.

El demo ante directivos es el **sáb 15-ago-2026**. Esta pasada cierra estructura. El acabado
(color, interacción, el avatar de iniciales) es una segunda vuelta y no entra aquí.

---

## Decisiones tomadas

| # | Decisión | Por qué |
|---|---|---|
| 1 | "Consultorios disponibles" ancla a una sección del home | Es un tercer elemento del nav y ningún link puede quedar muerto. Rebeca diseña esa sección cuando tenga las fotos. |
| 2 | El nav es transparente sobre el hero y sólido al salir de él | El logo blanco es invisible sobre el fondo claro de Directorio y Ficha. |
| 3 | La tira de números **no** se va, solo baja | El home seguiría diciendo cuántas especialidades y cuántos pisos hay. |
| 4 | "Inicio" sale del nav | El logo ya lleva al home, así que no queda link muerto. |
| 5 | "Veracruz" reemplaza a "Boca del Río" en el nav | Decisión de Valeria del 10-ago. Reemplaza a la del 7-ago. |
| 6 | El contador sale de `doctores.json`, sin "+" | Son exactamente 200, no más de 200. La regla dura ya lo pedía. |
| 7 | El teal del botón se oscurece a `#087d80` | `#0ba5a8` da 2.87:1 con texto `#f9f9f9` y la regla del proyecto pide 4.5:1. `#087d80` es el mismo tono al 76% de luz y da 4.69:1. |
| 8 | Las dos piezas nuevas van en Manrope | El Figma está en Inter, que no existe en el proyecto. Se asume sustituto. |
| 9 | Directorio: 12 por página en mobile, 24 en desktop | 12 arregla el pulgar, 24 evita dejar el desktop en 3 renglones y 17 páginas. |
| 10 | La cruz reemplaza los tres iconos de las cajas del home | Petición de Valeria. Se pierde la diferencia entre las tres cajas y se gana unidad de marca. |

### Lo que el archivo de Figma no resolvió

- **No hay frame de mobile.** La versión mobile de las dos piezas nuevas se propone aquí.
- **No hay frame del nav sólido.** Se deriva del transparente cambiando logo y fondo.
- **El archivo casi no tiene variables.** `get_variable_defs` devolvió una sola, la sombra
  `sombra sencilla`. Los colores son hex sueltos, así que se mapean a tokens a mano.

---

## Los cambios

### 1. Nav con dos estados

Un solo componente con dos apariencias, no dos componentes.

**Estado transparente.** Solo en el home y solo mientras el hero está en pantalla. Fondo
transparente, sin borde, logo `doctowers-logo-white.svg`, "Veracruz" en blanco.

**Estado sólido.** En el home al pasar el hero, y desde el primer pixel en Directorio y Ficha.
Fondo `surface` con `backdrop-blur`, borde inferior, logo `doctowers-logo-black-teal.svg`.

El cambio se dispara con un `IntersectionObserver` sobre el hero, no con un listener de
`scroll`: el observer no corre en cada pixel y no necesita `throttle`.

**Contenido, de izquierda a derecha:**

- Logo, que es el link al home. Abajo de `sm` usa el favicon `+D` con `viewBox="5 97 502 319"`.
  El archivo trae 97px de aire arriba y abajo dentro del lienzo cuadrado, así que sin recortar
  el `viewBox` una marca de 32px se ve de 20px. Va como SVG inline porque un `<img>` no permite
  declarar `viewBox`.
- Separador vertical y "Veracruz". Se oculta abajo de `sm`.
- Píldora a la derecha: texto "Consultorios disponibles" más botón "Directorio" con chevron.

**Medidas del Figma:** píldora con fondo blanco al 12%, `backdrop-blur` 66px, borde
`#10CFC9` al 55%, radio completo, padding 24/12, gap 20. Botón con radio completo, padding
28 izquierda, 20 derecha, 12 vertical.

**Mobile.** La píldora completa no cabe a 390px. Abajo de `sm` se queda solo el botón
"Directorio" y el texto "Consultorios disponibles" se va: el dato vive en la banda del home y
en el footer, así que no se pierde del sitio.

**El ancla.** "Consultorios disponibles" apunta a `/#consultorios`. Desde Directorio y Ficha
navega al home y baja. La banda que ya existe en el home recibe ese `id`.

### 2. Píldora de avatares en el hero

Píldora blanca montada sobre el borde inferior del hero. Cuatro fotos de 54px en círculo con
traslape de 19px, gap 6, padding 12/8, sombra `sombra sencilla`, y el texto
"200 especialistas en un solo lugar" en `#003245`, que da 13.62:1 sobre blanco.

Las caras salen de los médicos que **sí tienen foto** en `doctores.json`, hoy cuatro. Si el
banco crece, la píldora toma las primeras cuatro y no se rompe.

**Mobile.** A 390px las cuatro caras más el texto no caben en una línea. Se reduce a tres
avatares de 40px y el texto baja a `text-body-sm`.

### 3. La cruz entra al design system

Nuevo `IconoCruz` en `Iconos.tsx` con `fill="currentColor"`, siguiendo el patrón que el archivo
ya tiene para WhatsApp. Sustituye a `IconoMedicos`, `IconoEspecialidades` e `IconoPisos` en
`TiraNumeros`, que quedan sin uso y salen junto con sus tres imports de Heroicons.

`currentColor` importa: `cruz.svg` trae el fill clavado en `#10CFC9`, que da **1.95:1** sobre
blanco. Heredando `text-primary` da **5.87:1**.

### 4. Favicon enganchado

`index.html` no tiene ninguna línea de favicon. Se agregan el SVG y el `apple-touch-icon`, y
los archivos se renombran a minúsculas para empatar con el resto de `public/img/`.

### 5. Tira de números en una columna en mobile

Abajo de `md`, las tres cajas se apilan con el contenido en horizontal: ícono a la izquierda,
número y etiqueta a la derecha. Tres renglones parejos en vez de dos cajas de 171x143 y una
huérfana de 358x143. De `md` para arriba no cambia.

### 6. Directorio con página adaptable

`POR_PAGINA` pasa de constante a valor por ancho: **12** abajo de 640px, **24** de ahí para
arriba, con `matchMedia`. Sin dependencias nuevas.

Al cruzar el breakpoint se conserva al primer médico visible y se recalcula la página desde su
índice. Sin eso, rotar el celular en la página 15 de 17 te avienta a la 9 y pierdes el lugar.
La URL no cambia de contrato: `?pagina=` sigue significando lo mismo.

---

## Qué no entra

El avatar de iniciales del directorio, la paleta, las interacciones y las alternativas por
sección. Eso es la segunda pasada, la de acabado.

## Lo que cambió al implementar

Tres cosas que no estaban en el plan y salieron de ver el resultado corriendo.

**El directorio bajó a tres columnas.** Tenía cuatro en `xl`. A cuatro, con el contenedor de
1152px, la tarjeta queda en 273px y el nombre se parte en dos líneas en casi todas: pasa 24
veces por página. A tres son 371px y todo cabe de una. El tamaño de página no cambia, siguen
siendo 24 en desktop, ahora en 8 renglones en vez de 6.

**La banda de consultorios perdió su borde de abajo.** Tenía `border-y`, y entre ese borde y
el `border-t` del footer quedaban 80px de fondo vacío. Dos líneas con un hueco en medio se
leen como un bloque que faltó llenar.

**Pasada de espaciado completa.** El hero reservaba 160px arriba para un nav que mide 158, así
que el título quedaba pegado a la barra. Ahora reserva 256 en desktop. De ahí se ajustó el
ritmo de todo el home: título a buscador, píldora a cajas, cajas a destacados, y el aire
interno de las cajas de números y de la tarjeta de médico.

**Un detalle técnico que vale registrar:** el nav publica su altura real en `--alto-nav` con un
`ResizeObserver`, y la barra de filtros del directorio se pega usando esa variable. Antes usaba
un `top-14` escrito a mano que dejó de ser cierto en cuanto el nav creció. Además la transición
del nav es solo de color y no de relleno: al animar el alto, el observer publicaba medidas a
medio camino y la variable se quedaba con un valor falso.

## Riesgos

- **El ancla depende de una sección que todavía no existe.** Hoy apunta a la banda de
  "¿Tienes consultorio en DocTowers?". Cuando Rebeca entregue el diseño, cambia el destino, no
  el mecanismo.
- **El nav transparente vive de que el hero exista.** Si el home pierde el hero, el nav se
  queda transparente sobre fondo claro. El fallback es que sin hero observado, nace sólido.
- **Rotar el celular recalcula páginas.** Es inevitable si el tamaño de página depende del
  ancho. Se mitiga conservando al primer médico visible.
