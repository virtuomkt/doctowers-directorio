# Assets que necesitamos — DocTowers Directorio

**Para:** Rebeca y Valeria
**Entrega:** viernes 7-ago
**Para qué:** Todo esto entra a Claude Design, que genera las tres vistas del sitio de un
jalón. Entre mejor ordenado llegue, menos se reinventa después. El demo ante directivos de
DocTowers es el sábado 15-ago.

**Actualización del 7-ago:** el sitio bajó de nueve vistas a tres (Home, Directorio, Ficha).
Eso quita dos cosas de esta lista: **las fotos de la torre** y **la imagen del consultorio
vacío**, porque las vistas que las usaban ya no existen. El resto se mantiene igual, y las
fotos de médicos siguen siendo lo que más importa después del archivo de Figma.

---

## Lo primero, y lo que más importa

### 1. El archivo `.fig` del home, ordenado

Claude Design acepta un `.fig` y lo lee completo. De ahí saca la paleta, la tipografía y los
componentes sin que nadie los transcriba a mano. Por eso esto vale más que cualquier
exportación suelta.

Lo que necesita traer para que sirva:

- **Colores publicados como estilos o variables de Figma**, con nombre. No hexadecimales
  sueltos en cada capa. Si el teal está aplicado como estilo llamado `Primario`, se lee como
  token. Si está pegado a mano en 40 capas, no se lee como nada.
- **Estilos de texto publicados**, también con nombre: display, título grande, título
  mediano, título chico, cuerpo, cuerpo chico, etiqueta. Con su tamaño, peso e interlineado.
- **Los elementos del home como componentes de Figma reales**, no como grupos: la barra de
  navegación, el buscador del hero, las cajas de números, la tarjeta de médico y el botón.
- **Los frames con nombre claro**: `Home / Desktop` y `Home / Mobile`. Nada de "Frame 427" ni
  "Group 12". Claude Design lee los nombres de capa y son la mitad de la pista.
- **Las dos versiones que ya existen**, desktop y mobile.

Si algo de esto implica reordenar el archivo, se reordena. Es la pieza que desbloquea todo
lo demás.

### 2. Tipografía

Los archivos de las fuentes que usa el diseño, en `woff2` de preferencia, o `otf`/`ttf`.
Y el nombre exacto de cada una.

Si son de Google Fonts basta con decirnos cuáles y nos las bajamos. Si son de pago,
necesitamos saber que la licencia cubre uso en web, antes de publicar el link.

### 3. Logo

En **SVG**, en tres versiones:

- Completo a color (para fondo claro)
- Monocromático en blanco (para el hero oscuro, donde va hoy)
- Solo el isotipo, la cruz, sin el texto (para el favicon y para mobile)

Más el **favicon** en 512×512 PNG.

### 4. El fondo del hero

La onda con degradado teal a azul profundo y la cruz, la del home. En **SVG** si se puede,
o PNG a 2x si trae efectos que no sobreviven al SVG.

Dos recortes distintos, **desktop y mobile**, porque la composición no es la misma: en el
mockup de celular la onda se acomoda diferente.

### 5. Iconos

Los del diseño actual: persona, portapapeles, lupa, pin de ubicación, hamburguesa de mobile,
flecha de "ver todos", teléfono y reloj para la ficha del médico.

**Antes de exportarlos uno por uno:** si salieron de una librería (Lucide, Phosphor, Feather,
Material), dinos cuál y ya. Nos la instalamos y sale más parejo que exportar SVGs a mano.
Solo si son dibujados a mano hay que exportarlos, en SVG, con trazos expandidos.

---

## Fotos

### 6. Fotos de médicos

Aquí hay un dato nuevo: el directorio subió de 15 a **200 médicos**.

**No pidas 200 fotos distintas.** Nos sirve un banco numerado y nosotros lo repartimos por
código, sin que tú empates nada a mano:

| Nivel | Cuántas | Qué logra |
|---|---|---|
| Mínimo | 16 | Alcanza para los destacados del home |
| Bueno | 40 a 60 | El directorio ya no se ve repetido al hacer scroll |
| Ideal | 200 | Cada médico con su cara |

Con 40 a 60 el efecto ya funciona. Arriba de eso es lujo.

Especificación:

- **Cuadradas**, 800×800 px mínimo, JPG
- **Nombre:** `foto-01.jpg`, `foto-02.jpg`, y así. Numeradas, nada más. Nosotros las
  asignamos a cada médico desde el generador de datos.
- **Fondo neutro o desenfocado**, bata blanca, encuadre de medio busto. Se recortan en
  círculo, así que la cara va centrada y con aire arriba.
- **Variedad**: mezcla de edades, de género y de tono de piel. Van a aparecer 200 juntas en
  una cuadrícula y ahí se nota si todas se parecen.
- Son de stock. Ninguna puede ser de una persona real vinculable a la torre.

### 7. Fotos de la torre — **ya no hacen falta**

Eran para la vista Sobre nosotros, que salió del alcance el 7-ago. Si ya las juntaste no se
tiran, se guardan para la v2, pero no las persigas.

Lo único que sí sigue sirviendo de ese bloque es **una foto de la fachada**, y solo si sale
fácil: puede entrar en la vista previa del link, que es el punto 9.

### 8. Imagen de consultorio vacío — **ya no hace falta**

Era para la vista Para médicos, que también salió del alcance el 7-ago.

### 9. Imagen de vista previa del link

Cuando el link se comparta por WhatsApp o correo con los directivos, se ve una tarjeta con
imagen. Necesitamos una, **1200×630 px**, con el logo y algo de la torre. Es lo primero que
van a ver, antes de abrir el sitio.

---

## Prioridad, si no da el tiempo para todo

| | Qué | Por qué |
|---|---|---|
| **1** | El `.fig` ordenado, tipografía, logo | Sin esto no arranca el design system |
| **2** | Fondo del hero, iconos, 16 fotos de médicos | Con esto ya se generan las vistas |
| **3** | Resto de fotos de médicos, vista previa del link | Se pueden meter después sin rehacer nada |

Si el viernes solo llega el bloque 1, seguimos avanzando. Si no llega, ahí sí nos frenamos.

---

## Dudas que nos ayudan a cerrar cosas

- **¿DocTowers es una torre o son varias?** En el mockup hay un campo de "Ciudad de México"
  junto al buscador. Si es una sola torre, ese campo sobra y el buscador recupera espacio.
  Si son varias, hay que agregarlo a los datos desde ahora.
- **¿Las fuentes son de pago?** Nada más para saber si la licencia cubre web.
- **¿Los iconos salieron de una librería?** Si sí, con el nombre basta.
