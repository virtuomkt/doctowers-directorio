# Prompt para Claude Chat + MCP de Figma

Generar el design system de DocTowers en el archivo limpio `DocTowers - Directorio`.
Se copia y se pega tal cual. Va en dos fases con un alto en medio: primero extrae y reporta,
hasta que Valeria apruebe no construye nada.

---

## Fase 1 (copiar esto primero)

Eres el diseñador de sistemas de este proyecto. Antes de dibujar nada, vas a **extraer** el
estilo que ya existe y reportármelo. No construyas todavía.

**El proyecto.** DocTowers es una torre de consultorios médicos Boca del Río, Veracruz. Estamos construyendo su directorio de médicos: un sitio donde un paciente busca a su doctor por
nombre o por especialidad y llega a su ficha. 

**Para qué sirve este design system.** No es un sistema completo ni una pieza de portafolio.
Es lo mínimo para que las tres vistas del sitio se generen coherentes sin reinventar el estilo
en cada pantalla. Si un componente no lo pide alguna de esas tres vistas, no va.

**Son tres vistas y nada más**, cada una en desktop y mobile:

| Vista | Ruta | Qué hace |
|---|---|---|
| Home | `/` | Presenta la torre y manda a buscar |
| Directorio | `/directorio` | Los 200 médicos, con buscador y filtro de especialidad |
| Ficha del médico | `/doctor/[slug]` | Los datos para contactar a un médico |

El camino es uno: **buscar, encontrar, llamar.**

**No hay login, ni registro, ni cuenta, ni panel del médico. Nadie inicia sesión en este
sitio.** Tampoco hay Sobre nosotros, Contacto, Para médicos ni vista de Especialidades. Por
eso el inventario de componentes es corto, y ese es el punto.

**El archivo de referencia (solo lectura).** Te comparto un archivo de Figma con una sola
página, `Home`, y un solo frame adentro, `Home / Desktop`: la vista previa del home. Es lo
único diseñado de este sitio y está aprobado por el cliente. Todo el sistema se deriva de ahí:
no inventes una paleta ni una tipografía nuevas.

Si encuentras más de un frame, o si el archivo trae páginas que no esperabas, **dime qué
encontraste y no elijas tú.**

**Lo que ese mockup no resuelve.** Es una vista previa, no el sitio: trae un nav con links a
vistas que ya no existen, una tira de dos cajas de números, cuatro tarjetas de médico y ahí se
acaba. No hay footer, no hay versión mobile, no hay estados de hover ni de foco, y varios
textos son de relleno (el título, el subtítulo y el placeholder del buscador dicen los tres
"Directorio Médico Digital"). Todo eso se **diseña** en la fase 2, derivado del estilo que
extraigas. No lo copies como está ni lo des por resuelto.

**Lo que quiero de ti en esta fase**, en texto, no en Figma:

1. La paleta completa con hexadecimales, y dónde se usa cada color en el home.
2. La tipografía: familias exactas, tamaños, pesos e interlineados de cada nivel.
3. La escala de espaciado que se puede inferir del layout, los radios de esquina y las
   sombras.
4. Los anchos de los frames que existan (desktop y, si está, mobile).
5. **Una tabla de contraste** de cada combinación de texto sobre fondo que aparezca en el
   home, con su ratio. Es un sitio de salud: todo texto tiene que pasar **AA, 4.5:1**. Donde
   no pase, propón el ajuste mínimo que sí pase, sin cambiar el carácter del color.
6. Qué está aplicado como estilo o variable con nombre, y qué está pegado a mano capa por
   capa.
7. Qué me falta para poder construir el sistema completo, y qué vas a tener que decidir tú
   porque el home no lo resuelve (por ejemplo: estados de hover y foco, color de error, color
   de deshabilitado, tarjeta de médico en mobile).

Si no puedes abrir el archivo de referencia, dímelo de una vez y no sigas.

---

## Fase 2 (copiar esto después de aprobar la fase 1)

Ya con los valores aprobados, construye el sistema en el archivo **`DocTowers - Directorio`**,
que es otro archivo, no el de referencia. Ya tiene las páginas creadas y cada una tiene su
contenido asignado. **Usa esas páginas, no crees otras.**

### Cómo se construye

- **Variables y estilos de Figma reales**, no rectángulos de muestra. Colores y espaciados
  como variables; tipografía como estilos de texto. Se van a leer como tokens más adelante,
  y un hexadecimal pegado a mano no se lee como nada.
- **Componentes de Figma reales con variantes y properties**, no grupos. Cada estado es una
  variante, no un frame aparte.
- **Auto layout en todo.** El sitio se implementa con Tailwind; lo que no tenga auto layout
  se traduce mal.
- **Nombres de token en inglés**, tal cual la lista de abajo. Van a caer en la configuración
  de Tailwind con ese mismo nombre, así que Figma y el código deben decir lo mismo.
- **Cada componente se entrega en desktop y en mobile.** El mobile no es un ajuste posterior:
  es donde la gente busca a su médico.

### Nombres de token

Todos en inglés, en minúsculas y con guion. El contenido del sitio va en español, los tokens
no.

Color: `primary`, `primary-hover`, `secondary`, `text-strong`, `text-base`, `text-muted`,
`background`, `surface`, `border`. Si hace falta alguno más (`error`, `success`, `disabled`,
`focus`), agrégalo con el mismo estilo de nombre y dime por qué.

Tipografía: `display`, `h1`, `h2`, `h3`, `body`, `body-sm`, `label`.

Espaciado: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`. Radios: `radius-sm`, `radius-md`,
`radius-full`. Sombra: `shadow-card`. Breakpoints: `mobile`, `tablet`, `desktop`.

### Qué va en cada página

**Portada** — nombre del sistema, fecha, para qué sirve, y cómo se usa en tres líneas. Que
alguien que abre el archivo por primera vez entienda qué está viendo.

**Colors** — la colección de variables de color. Cada muestra con nombre de token, hex y una
línea de dónde se usa. Abajo, la tabla de contraste con los ratios, marcando cuáles pasan AA.

**Typography** — los estilos de texto publicados, con un specimen de cada nivel en texto real
en español (con acentos: "Cardiología", "Otorrinolaringología"). Incluye la escala en mobile
si cambia.

**Spacing, Radius & Grid** — la escala de espaciado visualizada, los radios, las sombras, y
los grids de desktop, tablet y mobile con sus breakpoints y márgenes.

**Assets** — los espacios reservados para lo que entrega Rebeca, con su especificación al
lado, no los assets finales: logo (color, blanco, isotipo), fondo del hero (desktop y
mobile), set de iconos (persona, portapapeles, lupa, pin, hamburguesa, flecha, teléfono,
reloj), y foto de médico (cuadrada 1:1, se recorta en círculo). Incluye el **avatar de
respaldo con iniciales**, que es lo que se ve mientras las fotos llegan.

**Buttons** — el componente botón. Variantes: primario, secundario, con ícono, y solo ícono.
Estados: reposo, hover, foco por teclado, deshabilitado. Tamaños si hacen falta más de uno.
El foco por teclado tiene que ser visible de verdad, no un halo apenas perceptible.

**Forms & Inputs** — son solo dos campos en todo el sitio, porque no hay formularios:
- Campo de búsqueda, en sus estados reposo, foco, con texto y con botón de limpiar. Es el
  mismo componente en el hero del home y en el directorio.
- **Select de especialidad**: 30 opciones con su conteo al lado. Cerrado, abierto, con
  selección, y cómo se limpia para volver a los 200. En mobile, 30 opciones en una lista chica
  es incómodo: resuélvelo, no lo dejes igual que en desktop.

Nada de campos de contraseña ni áreas de texto. No hay login y no hay formulario de contacto.

**Components**:
- **Nav** — logo a la izquierda, y **dos links: Inicio y Directorio**. Nada más, porque no hay
  más vistas. Con estado activo de la sección actual. En mobile no hace falta hamburguesa para
  dos links: que quepan los dos.
  El reto es que un nav de dos links se vea intencional y no incompleto. Se ve en las tres
  vistas, así que vale la pena resolverlo bien. Una opción es que el buscador viva en el nav a
  partir del scroll, pero decídelo tú y explícame por qué.
- **Hero con buscador** — desktop y mobile.
- **Stat / contador** — las cajas de números del home. Tiene que verse bien con **dos y con
  tres dígitos**: los valores reales son 200 especialistas, 30 especialidades y 12 pisos.
  El mockup dice "350" y solo trae dos cajas, una de ellas sin número. Diséñalo para tres
  cajas y dime cómo queda el ancho. Contempla singular y plural ("1 especialista" / "200
  especialistas").
- **Tarjeta de médico** — el componente central: se repite 200 veces en el directorio, así
  que una tarjeta muy alta convierte la vista en un scroll eterno. Lleva foto redonda,
  nombre, especialidad, consultorio y piso. Estados reposo, hover y foco por teclado. Dos
  variantes de imagen: con foto y con avatar de iniciales.
  Dos cosas que el mockup trae y hay que resolver: **no muestra el piso** (nosotros sí lo
  queremos) y **mete un botón "Ver más" en cada tarjeta**. Propón la versión sin ese botón,
  con la tarjeta entera clickeable, y muéstrame las dos para comparar.
- **Bloques de la ficha del médico** — foto, nombre, especialidad, consultorio, piso, teléfono,
  horario, cédula profesional, y un bloque de bio con años de experiencia, formación e idiomas.
  Dos datos son condicionales y cada uno necesita sus dos variantes, sin que la variante de
  "sin dato" se vea incompleta:
  - **WhatsApp**, que la mitad de los médicos no tiene.
  - **"Agendar en Doctoralia"**, que hoy no tiene ninguno. Esa es la variante que de verdad se
    va a ver, así que es la que tiene que verse terminada.
- **Resultados y vacíos** — el contador de resultados ("200 especialistas" → "11 resultados
  para cardio") y el estado sin resultados, con qué dice y qué ofrece.
- **Paginación** — con 200 médicos hace falta. Propón cuántas tarjetas por página y si es
  paginación numerada o "cargar más", y dime por qué.
- **Footer** — logo, dirección de la torre, teléfono, horario del edificio, los dos links del
  nav y una línea de derechos. Sin newsletter y sin redes sociales inventadas.

Ese es el inventario completo: **nueve componentes**. Si te sale un décimo, dime cuál y por qué
antes de construirlo. Un componente extra aquí es señal de que se está diseñando de más para lo
que la fecha necesita.

### Textos reales para probar los componentes

No uses lorem ipsum ni nombres en inglés. Estos son los peores casos reales de la base:

- Nombre más largo: **Dra. Montserrat Alcantara**
- Especialidad más larga: **Cirugía Plástica y Reconstructiva**
- Horario más largo: **Lunes, miércoles y viernes, 10:00 a 18:00**
- Formación más larga: **Universidad Nacional Autónoma de México**
- Teléfono: **229 555 2137** · Consultorio: **0416** · Piso: **004**
- Una especialidad tiene **un solo médico** (Genética Médica) y otra tiene 15 (Pediatría).

Consultorio y piso llevan ancho fijo, cuatro y tres dígitos, en los 12 pisos. Es a propósito:
así la tarjeta no se descuadra entre el piso 4 y el piso 12. Se muestran con sus ceros.

Si un componente se rompe con estos textos, el componente está mal, no el texto.

### Reglas que no se negocian

1. **Contraste AA (4.5:1) en todo texto.** Es un sitio de salud. Si un color aprobado no
   pasa, dímelo y propón el ajuste, no lo dejes pasar callado.
2. **Ningún número escrito a mano en un componente.** Los contadores salen de los datos
   (200 médicos, 30 especialidades, 12 pisos). En el diseño se ven esos valores, pero el
   componente se diseña para que el número cambie.
3. **Ningún link del nav queda muerto.** Solo existen tres vistas, así que el nav solo lleva
   los dos links que sí tienen a dónde ir. En una demostración al cliente, un link roto se lee
   como sitio roto.
4. **Estados completos o no está terminado.** Hover, foco por teclado y deshabilitado. Lo que
   no tenga estados definidos se va a inventar distinto en cada pantalla.
5. **Nada de clichés de IA**: nada de degradados morados, nada de glassmorphism, nada de
   emojis como iconos. El estilo sale del home aprobado.
6. Estilo visual: español de México, cálido y claro. El paciente que busca a su médico suele
   estar preocupado, y el diseño no debería agregarle ruido.

### Al terminar

Devuélveme, en texto plano y en tablas de markdown:

1. La tabla de tokens llena (paleta, tipografía, espaciado, radios, sombras, breakpoints) con
   los nombres de arriba. La voy a pegar directo en el repo.
2. El inventario de componentes con sus variantes y estados, tal como quedaron en el archivo.
3. Las decisiones que tomaste tú porque el home no las resolvía, con el porqué de cada una.
4. Lo que quedó fuera y por qué.

---

## Notas para Valeria (no van en el prompt)

- El archivo está en plan **Gratis**. Ahí no se publican librerías compartidas y las
  colecciones de variables van a un solo modo. Para este proyecto alcanza (no hay modo
  oscuro), pero el archivo no se va a poder consumir como librería desde otro archivo: los
  componentes viven ahí y de ahí se copian.
- Si el MCP no puede escribir variables o crear componentes en tu plan, la fase 2 se degrada
  a "dibuja los frames" y perdemos los tokens. Vale la pena probar con **Colors** sola antes
  de soltarle las ocho páginas.
- Elegí nombres de token en español para que Figma y `tokens.md` digan lo mismo. Si prefieres
  inglés en Figma, hay que cambiarlo en el prompt antes de correrlo, no después.
