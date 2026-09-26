# El archivo de referencia del home

Qué tiene que llevar el archivo de Figma limpio del que se extrae el design system. Es el
insumo de la fase 1 de `prompt-figma-claude-chat.md`.

**Por qué se pasa a limpio en vez de usar el original.** El archivo `DOCTOWERS` tiene siete
páginas de trabajo de otras cosas (RRSS, impresión, presentación), el home vive dentro de un
artboard de Instagram reciclado, y las capas se llaman `Group 20` y `RECORTE (75) 1`. Un
agente que lee eso adivina, y lo que adivina se cuela al design system sin que nadie lo note.

Regla que ordena todo lo de abajo: **si un valor no tiene nombre, no se puede extraer como
token.** Un teal aplicado a mano en 40 capas se lee como 40 colores distintos. El mismo teal
aplicado como estilo llamado `primary` se lee como un token.

---

## 1. Estructura

Un archivo nuevo, con **una sola página y un solo frame**.

| | Nombre exacto |
|---|---|
| Archivo | `DocTowers - Home aprobado` |
| Página | `Home` |
| Frame | `Home / Desktop` |

Si además existe el home de celular, va en la misma página como un segundo frame llamado
`Home / Mobile`. Si no existe, no se inventa: la fase 1 reporta que falta y la fase 2 lo
diseña.

**Nada más.** Ni carátula, ni página de notas, ni los artboards de Instagram, ni versiones
anteriores puestas al lado "por si acaso". Cada frame extra es un frame que el agente tiene
que preguntar si cuenta.

**El ancho del frame importa.** Ponle el ancho de escritorio real con el que se diseñó, 1440
o 1280. Si el home se dibujó dentro de un artboard de Instagram, es probable que su ancho no
sea ninguno de los dos, y de ese ancho se deduce la retícula y los márgenes. Si no estás
segura de a qué ancho se diseñó, dilo: es mejor que se pregunte que se asuma.

---

## 2. Colores como estilos, con nombre

Esto es lo que más rinde de toda la lista.

Publica cada color como estilo de Figma, con estos nombres. Van en inglés porque caen tal cual
en la configuración de Tailwind.

| Estilo | Qué es en el home |
|---|---|
| `primary` | El teal de los botones y los acentos |
| `primary-hover` | Si no existe, se deja fuera y la fase 1 lo propone |
| `secondary` | El azul profundo del degradado del hero |
| `text-strong` | El casi negro de los títulos |
| `text-base` | El gris de los párrafos |
| `text-muted` | El gris claro de "Consultorio 719" y las etiquetas |
| `background` | El blanco o gris muy claro del fondo de página |
| `surface` | El fondo de las tarjetas y de los campos |
| `border` | El gris de los contornos y las divisiones |

Si un color del home no cabe en ninguno de esos nueve, súbelo igual con un nombre descriptivo
y la fase 1 decide qué hacer con él. Lo que no sirve es dejarlo sin nombre.

**El degradado del hero va como estilo también**, no como fill pegado a mano, y con los dos
colores que lo forman identificados.

---

## 3. Tipografía como estilos de texto

Publica cada nivel como estilo de texto, con su tamaño, peso e interlineado ya definidos:

`display` · `h1` · `h2` · `h3` · `body` · `body-sm` · `label`

Si el home no usa los siete, publica los que sí use. Es mejor tener cinco reales que siete con
dos inventados para llenar la lista.

Y aparte, en texto plano cuando lo compartas: **el nombre exacto de cada familia**, y si es de
Google Fonts o de pago. Si es de pago, hay que saber si la licencia cubre uso en web antes de
publicar el link.

---

## 4. Componentes de Figma reales, no grupos

Estos cinco elementos del home tienen que ser componentes:

- `Nav`
- `Buscador`
- `Stat` (la caja de número y etiqueta)
- `Tarjeta médico`
- `Botón / Primario`

Un grupo se lee como un montón de rectángulos. Un componente se lee como un componente, con
su anatomía y sus propiedades.

---

## 5. Capas con nombre de verdad

Dentro del frame, las capas que importan llevan nombre:

`Logo` · `Fondo hero` · `Título hero` · `Buscador` · `Tira de stats` ·
`Especialistas destacados` · `Icono / lupa` · `Icono / persona`

Los nombres de capa son la mitad de la pista que tiene el agente. Lo que se tiene que ir:
`Group 20`, `Vector 4`, `RECORTE (75) 1`, `5 1`, `Frame 427`, `Instagram story - 3`.

No hace falta nombrar cada vector de un icono. Sí el contenedor de cada icono.

---

## 6. Assets, dentro del archivo

- **Logo** en vectores editables, en las versiones que existan: a color, en blanco, y solo el
  isotipo.
- **Fondo del hero** (la onda con el degradado y la cruz) como vector, si sobrevive. Si trae
  efectos que solo funcionan como imagen, déjalo como imagen y avísalo.
- **Iconos** del home. Y lo que más ahorra: **si salieron de una librería** (Lucide, Phosphor,
  Feather, Material), basta con decir cuál. No hay que exportarlos.
- **Fotos de los médicos**: con las cuatro del mockup alcanza. No hace falta el banco completo.

---

## 7. Lo que no va, y por qué

- **Nada de otros clientes ni de otras entregas.** Este archivo se comparte con una
  herramienta externa. Todo lo que esté adentro sale del control de Virtuo.
- **Nada de las páginas `RRSS`, `IMPRESIÓN`, `Presentación` ni `NOMBRES DOCTORES`.**
- **Nada de textos de relleno nuevos.** Los que ya tiene el mockup se quedan como están, con
  todo y el "Directorio Médico Digital" repetido tres veces. El brief de contenido ya dice
  cuáles son los reales, y cambiarlos aquí solo agrega una versión más que no coincide con
  ninguna.

---

## 8. Revisión antes de compartirlo

- [ ] Una página, un frame (o dos si existe el mobile)
- [ ] Los nueve colores publicados como estilos con nombre en inglés
- [ ] El degradado del hero como estilo, con sus dos colores identificados
- [ ] Los estilos de texto publicados, con tamaño, peso e interlineado
- [ ] Los cinco componentes son componentes, no grupos
- [ ] Ninguna capa se llama `Group`, `Vector`, `Frame` ni `Instagram`
- [ ] El frame tiene el ancho de escritorio real
- [ ] No hay nada de otro cliente ni de otra entrega adentro
- [ ] Anotado aparte: nombre de las familias tipográficas y de la librería de iconos

---

## Si no da el tiempo para todo

El orden en que rinde, de más a menos:

1. **Los colores como estilos con nombre.** Sin esto la fase 1 devuelve una lista de
   hexadecimales sin jerarquía y alguien tiene que adivinar cuál es el primario.
2. **Los estilos de texto.** Segundo en peso: define la escala completa del sitio.
3. **Un solo frame con nombre claro y el ancho correcto.** Barato y evita la pregunta de cuál
   es el home bueno.
4. **Las capas nombradas.**
5. **Los cinco componentes.** Es lo más tardado y lo que menos cambia el resultado, porque la
   fase 2 va a construir sus propios componentes de todos modos.

Con los tres primeros la fase 1 ya sirve.
