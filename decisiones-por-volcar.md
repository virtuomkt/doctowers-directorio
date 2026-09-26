# Decisiones por volcar a `../viri/decisions/log.md`

Se acumulan aquí por instrucción del 6-ago: se siguen tomando decisiones y se vuelcan de un
jalón cuando Valeria lo pida. El formato es el mismo de `contexto/decisiones-virtuo.md`, así
que el volcado es copiar y pegar.

**Estado: sin volcar.**

---

## 2026-08-08 — DocTowers: la tira de confianza entra al home y el hero se queda solo con el título

**Decision:** La *trust strip* del home aprobado de Figma entra al sitio, en el borde entre el
hero y el contenido, que es donde el design system la coloca (píldora blanca con `shadow-lg` y
`translateY(-28px)`, el mismo gesto de píldora flotante del buscador).

Tres cambios que vienen con ella:

1. **El texto es "200 especialistas en un solo lugar."** Reemplaza el
   `+200 especialistas confían en DocTowers` que traía el design system.
2. **Las tarjetas de número (200 / 30 / 12) se recorren hacia abajo**, porque las dos piezas
   se disputaban el mismo borde.
3. **El subtítulo del hero desaparece.** El hero se queda solo con el título
   "Encuentra a tu médico en DocTowers". El subtítulo decía "200 especialistas en un solo
   lugar, en Boca del Río", que es justo el texto que ahora carga la tira.

**Why:** La tira **no es alcance nuevo**: ya estaba en el home aprobado de Figma. El readme del
design system dice que no inventó nada más allá de lo visible en el screenshot, y la describe
con medidas. La caja "sin número" que el brief del 7-ago detectó en el mockup era esto. Son 44
píxeles de alto, no una sección.

El copy original se cae por dos razones: los médicos no "confían" en la torre, le rentan
consultorios; y el sitio le habla al paciente, no al médico. Ese texto le hablaba al médico.

Quitar el subtítulo evita que la misma frase aparezca dos veces a 100px de distancia, y de paso
deja el buscador más cerca del título, que es el elemento que debe dominar el hero.

Aparte, `AvatarGroup` usa `max={4}` y hay exactamente **4 fotos ficticias**. Es el único lugar
del sitio donde el banco de fotos alcanza al 100%, así que la pieza sale sin costo de assets.

**Alternatives considered:** Dejar la tira fuera por alcance (rechazado — no era alcance nuevo,
era una pieza del home aprobado que el brief de tres vistas había perdido de vista). Montar la
píldora encima de las tarjetas de número sin moverlas (rechazado por Valeria — se recorren).

**Owner:** Valeria. **Pendiente de implementar:** se construye en la siguiente sesión, por
instrucción suya del 8-ago.

**Abierto:** si la píldora lleva link. Recomendación de Claude: que no, porque no hay a dónde
mandar que no sea el directorio y ya existe el botón "Ver el directorio completo" abajo. Sin
respuesta todavía.

---

## 2026-08-08 — DocTowers: el sitio se construye en React, no en Astro

**Decision:** El sitio se implementa con **Vite + React + Tailwind**, y eso es lo que se
presenta el 15-ago. **Reemplaza la decisión del 3-ago** de construirlo en Astro.

**Why:** Valeria lo eligió como implementación final y no como prototipo desechable, para no
hacer el trabajo dos veces a siete días de la demostración. Para tres vistas y 200 registros que
se filtran en el navegador, que el sitio sea SPA en vez de estático no cambia nada práctico: la
búsqueda ya corría en el cliente en las dos opciones.

**Alternatives considered:** Astro con islas de React (rechazado). React solo para el prototipo,
con porteo a Astro antes del 15-ago (rechazado — la implementación hecha dos veces en siete días).

**Owner:** Valeria.

---

## 2026-08-08 — DocTowers: navy para acciones, el teal de marca solo de acento

**Decision:** Los botones, links y textos de acento usan **navy-900 (#003245)**. El teal de
marca (**#10CFC9**) queda como color de fondo y acento, nunca como texto sobre claro. Las
iniciales del avatar y la etiqueta de especialidad también van en navy sobre el teal suave.
Cero tokens inventados: todo sale de la escala del design system.

**Why:** El teal de marca da **1.95:1** contra blanco, muy por debajo del 4.5:1 que el proyecto
exige en todo texto por ser un sitio de salud. Ni siquiera el teal más oscuro de su escala
(teal-700) llega: da 4.15:1. Sobre navy, en cambio, el teal da 7:1, que es exactamente donde el
hero lo usa. No es un color de texto, es un color de fondo.

La variante `dark (navy)` ya existía en el `Button` del design system, así que la decisión usa
el sistema como está diseñado en vez de sobreescribirlo.

Dos fallas más aparecieron al medir, y se resolvieron con el mismo criterio: las iniciales del
avatar en teal-700 sobre teal-100 daban 3.74:1, y la etiqueta de especialidad 4.15:1.

**Alternatives considered:** Botón teal con texto ink, más un token `teal-800` nuevo para links
(rechazado por Valeria). Oscurecer el teal en todo el sistema (rechazado — apaga el #10CFC9 que
le da carácter a la marca y mata el contraste vivo del hero).

**Owner:** Valeria. Se verifica con `npm run contraste`, que revisa 15 pares y hoy pasan todos.

---

## 2026-08-08 — DocTowers: velo del 30% sobre la foto del hero

**Decision:** La imagen de fondo del hero lleva un velo navy-900 al **30%**.

**Why:** No es decoración. Muestreando los píxeles reales de la zona donde va el título, el
punto más claro de la foto deja el texto blanco en **3.27:1**. El mínimo que lo sube a AA es
25%; el 30% deja margen y da 4.91:1 en el peor punto, sin apagar la imagen. Medido, no a ojo.

**Owner:** Valeria.

---

## 2026-08-08 — DocTowers: las 4 fotos van solo a los destacados del home

**Decision:** Las cuatro fotos ficticias se asignan **únicamente a los cuatro médicos
destacados** del home, una cada uno y casadas por género. Los otros 196 registros llevan `foto`
vacío y se ven con el avatar de iniciales.

**Why:** Cuatro fotos entre 200 médicos son 50 repeticiones cada una, y el directorio pinta 24
por página: la misma cara saldría unas seis veces en la misma pantalla. Eso deja de leerse como
"faltan fotos" y empieza a leerse como error, justo en la vista que el directivo va a tocar
primero. Con el reparto a los destacados, el home se ve real y no se repite ninguna.

**Owner:** Valeria. Cuando llegue el banco completo de Rebeca se vuelve al reparto cíclico y el
resto del generador no se toca.

---

## 2026-08-08 — DocTowers: la DoctorCard va sin badge de disponibilidad

**Decision:** La tarjeta de médico **no lleva** el badge de "Disponible hoy / Sin
disponibilidad" que trae la `DoctorCard` del design system.

**Why:** Ese dato no existe en `doctores.json`. Derivarlo del `horario` lo empeora: la
demostración es **sábado 15**, y casi todos los horarios son de lunes a viernes, así que el
directorio entero diría "Sin disponibilidad" el día de la junta.

**Owner:** Valeria. Si se quiere de vuelta, hay que meter el campo al generador con datos que no
contradigan el horario.

---

## 2026-08-08 — DocTowers: el generador de datos se muda al repo

**Decision:** El generador de `doctores.json` vive en **`datos/generar.mjs`**, dentro del repo.
Esto **contradice la regla de `CLAUDE.md`** de que el generador vive fuera.

**Why:** El `doctores.json` del repo estaba en el esquema viejo y las tres vistas se diseñaron
contra el nuevo (piso a 3 dígitos, consultorio a 4, lada 229, más los campos de la ficha). Ese
desfase bloqueaba toda la implementación y el generador de afuera no estaba disponible. El
nuevo es determinista y sembrado por slug, así que agregar un médico no reacomoda los otros 199.
Los 200 originales se conservaron como entrada en `datos/fuente-v1.json`.

**Riesgo abierto:** si el generador de afuera sigue vivo, hay que decidir cuál manda antes de
que alguien regenere encima del otro.

**Owner:** Valeria.

---

## 2026-08-08 — DocTowers: los dos tamaños tipográficos grandes van en `clamp()`

**Decision:** `--text-display` y `--text-h1` se sirven con `clamp()` en vez de los px fijos que
entregó el design system: `clamp(36px, 9vw, 64px)` y `clamp(28px, 7vw, 48px)`.

**Why:** La escala llegó en px fijos (64 y 48). En escritorio se ve bien; en 390px partía
"Encuentra a tu médico en DocTowers" en cinco renglones que se comían media pantalla, y el
mobile es donde la gente busca a su médico. Los extremos del `clamp` son valores que **ya
existen en su escala** (display-md 36, display-xl 64, heading-lg 28, display-lg 48): no se
inventa ningún tamaño, solo se interpola entre los suyos.

**Owner:** Valeria.

---

## 2026-08-08 — DocTowers: Manrope se sirve desde el proyecto

**Decision:** Manrope se descarga y se sirve desde `/fonts` (cortes latin y latin-ext con su
`unicode-range`), en vez de referenciarla desde Google Fonts como hacía el `typography.css` del
design system. Intrade Demo ya venía como `.ttf` en el zip.

**Why:** El sitio dependía de una petición a gstatic para su tipografía de texto. Si el wifi de
la sala falla el día de la junta, el sitio cae al fallback delante de los directivos. Con los
`unicode-range`, un sitio en español solo baja los 24 KB de latin y nunca pide latin-ext.

**Owner:** Valeria.

---

## 2026-08-08 — DocTowers: 21st.dev queda instalado pero sin usar

**Decision:** El MCP de 21st.dev queda configurado en `.mcp.json` y su contexto de diseño en
`.21st/`, pero **el sitio no usa ningún componente suyo**: se construyó con el design system de
Claude Design.

**Why:** 21st.dev nunca se autenticó (falta la API key), así que no se pudo traer un solo
componente. Lo que sí quedó y sirve: el archivo de tokens se llama `src/index.css` y no
`tokens.css` porque con el nombre anterior el CLI de 21st reportaba **cero tokens detectados**,
y con el nuevo lee los 25 colores, los radios y la tipografía. Y hay una capa de alias
shadcn al final de ese archivo para que un componente de 21st pegado tal cual herede la paleta
de DocTowers sin tocarle una clase.

**Owner:** Valeria.
