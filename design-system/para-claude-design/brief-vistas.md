# Las tres vistas

Sitio: directorio de médicos de DocTowers, una torre de consultorios en Boca del Río,
Veracruz. Una sola torre, no varias: no hay selector de ciudad ni de sucursal en ningún lado.

**Son tres vistas y nada más.** Cada una en desktop y mobile. El mobile no es un ajuste
posterior: es donde la gente busca a su médico.

| Vista | Ruta | Qué hace |
|---|---|---|
| Home | `/` | Presenta la torre y manda a buscar |
| Directorio | `/directorio` | Los 200 médicos, con buscador y filtro |
| Ficha del médico | `/doctor/[slug]` | Los datos para contactar a un médico |

El camino completo es uno: **buscar, encontrar, llamar.** Todo lo que no sirva a ese camino
está fuera de esta entrega.

**Lo que NO existe.** No lo diseñes, no lo insinúes, y sobre todo no le pongas links:

- Login, registro, cuenta o panel del médico. **Nadie inicia sesión en este sitio.**
- Vista de Especialidades. El filtro del directorio ya cubre ese camino.
- Sobre nosotros, Contacto, Para médicos.
- Agendado de citas, reseñas, calificaciones, mapa embebido.

---

## Navegación

Aparece en las tres vistas, igual en todas.

| Texto | Ruta |
|---|---|
| Inicio | `/` |
| Directorio | `/directorio` |

Eso es todo. Logo a la izquierda, que lleva a `/`. Los dos links a la derecha. **Ningún otro
link**, porque no hay a dónde ir, y un link muerto en una demostración al cliente se lee como
sitio roto.

Un nav de dos links es un nav muy vacío, y ahí está el reto de diseño: que se vea intencional
y no incompleto. Es la barra que se ve en las tres vistas, así que vale la pena resolverla
bien. Una opción es que el buscador viva en el nav a partir del scroll, pero decídelo tú y
explica por qué.

La sección actual se marca.

En mobile: con dos links no hace falta hamburguesa. Que quepan los dos.

---

## Footer

También en las tres vistas. No existe en el mockup, se diseña.

Lleva: logo, dirección de la torre, teléfono, horario del edificio, los dos links del nav y
una línea de derechos. Sin newsletter, sin redes sociales inventadas, sin links a nada que no
exista.

---

## 1. Home — `/`

Es la vista que ya tiene un mockup, y se regenera igual que las otras dos porque le faltan
piezas.

Su único trabajo es mandar al directorio. No es una landing de la torre.

**Secciones, en orden:**

1. **Nav.**
2. **Hero.** Fondo con la onda de degradado teal a azul profundo y la cruz. Encima:
   - Título: **Encuentra a tu médico en DocTowers**
   - Subtítulo: **200 especialistas en un solo lugar, en Boca del Río**
   - Buscador, con placeholder **Busca por nombre o especialidad**
   - Botón **Buscar**. Manda a `/directorio?q=...`

   El buscador es el elemento más importante de la pantalla. Que nada compita con él.
3. **Tira de números.** Tres cajas, cada una con ícono, número y etiqueta:
   - **200** · Especialistas
   - **30** · Especialidades
   - **12** · Pisos de consultorios

   El mockup trae dos cajas y una de ellas sin número. Son tres. Los números salen de los
   datos, así que el diseño tiene que verse bien con dos y con tres dígitos.
4. **Especialistas destacados.** Título de sección, cuatro tarjetas de médico en fila, y un
   link **Ver el directorio completo** que va a `/directorio`. Los cuatro son los registros
   marcados con `destacado` en los datos.
5. **Tira para médicos.** Una sola banda delgada, no una sección. Es la única parte del sitio
   que no le habla al paciente: **¿Tienes consultorio en DocTowers?** más el teléfono de la
   torre como enlace `tel:`. Sin formulario y sin botón que lleve a otra vista, porque no hay
   otra vista. No debe competir con el buscador ni con las tarjetas.
6. **Footer.**

---

## 2. Directorio — `/directorio`

**Es la vista más importante del proyecto.** Es la que el directivo va a tocar primero, y la
que tiene que aguantar 200 registros sin sentirse infinita.

**Secciones, en orden:**

1. **Nav.**
2. **Encabezado corto.** Título **Directorio médico** y una línea: **200 especialistas en 30
   especialidades.** Sin hero de altura completa: aquí la gente vino a buscar, no a leer.
3. **Barra de búsqueda y filtro**, los dos juntos y siempre visibles:
   - Campo de texto, placeholder **Busca por nombre o especialidad**. Filtra conforme se
     escribe.
   - `Select` de especialidad. Primera opción **Todas las especialidades (200)**, luego las 30
     con su conteo: **Pediatría (15)**, **Ginecología y Obstetricia (14)**, y así hasta
     **Genética Médica (1)**.
   - Los dos se suman, no se pisan. Y tiene que haber una forma clara de limpiar y volver a
     los 200.
4. **Contador de resultados.** Cambia según el estado: **200 especialistas** en reposo,
   **11 resultados para "cardio"** cuando hay búsqueda.
5. **Cuadrícula de tarjetas de médico.** Cuatro por fila en desktop, dos en tablet, una en
   mobile. Cada tarjeta lleva a `/doctor/[slug]`.
6. **Paginación.** Con 200 registros hace falta. Propón cuántas tarjetas por página y si es
   paginación numerada o "cargar más", y explica por qué.
7. **Footer.**

**Estado sin resultados**, que se diseña, no se improvisa: **No encontramos médicos para
"xyz"**, más una salida real, no una disculpa. Sugerir revisar la especialidad en el `select`
o limpiar la búsqueda.

Un detalle de la búsqueda que hay que ver antes de decidir si se resalta el texto que
coincide: funciona por coincidencia parcial, así que "pedia" trae Pediatría **y**
Traumatología y Ortopedia. Es correcto, pero se ve raro si no se explica en pantalla.

---

## 3. Ficha del médico — `/doctor/[slug]`

La otra vista de peso. Es el final del recorrido: aquí el paciente ya decidió y lo único que
necesita es el teléfono y el piso.

Con solo tres vistas, esta ficha es lo que sostiene la promesa de que el directorio sirve.
Vale la pena que se sienta terminada.

**Secciones, en orden:**

1. **Nav.**
2. **Migaja de pan.** `Directorio / Cardiología / Dr. Eduardo Sandoval`. Es la única forma de
   volver además del nav, así que no es decorativa.
3. **Bloque principal.** Foto redonda grande, nombre, especialidad como etiqueta, y los datos
   con su ícono:
   - Consultorio y piso: **Consultorio 0416 · Piso 004**
   - Teléfono: **229 555 2137**, enlace `tel:` en mobile
   - WhatsApp, **solo si el médico tiene** ese dato. La mitad de los registros no lo trae:
     diseña las dos variantes y que la de sin WhatsApp no se vea incompleta.
   - Horario: **Lunes, miércoles y viernes, 10:00 a 18:00**
   - Cédula profesional: **4324143**
4. **Sobre el médico.** Bio de una o dos frases, años de experiencia, formación e idiomas.
   Todos los registros traen estos campos, así que no hay variante vacía.
5. **Acciones.** Botón principal **Llamar al consultorio**. Botón secundario **Enviar
   WhatsApp** cuando existe el dato. Y **Agendar en Doctoralia**, que **solo aparece en algunas
   fichas**.

   Detalle importante: en los datos de hoy **ninguna** ficha tiene el enlace de Doctoralia. La
   variante que de verdad se va a ver es la de sin ese botón, y esa es la que no puede verse
   incompleta. La otra se diseña para cuando entren los datos reales.
6. **Cómo llegar.** Solo texto: la dirección de la torre y el piso. Sin mapa embebido.
7. **Otros médicos de la misma especialidad.** Tres o cuatro tarjetas. Si el médico es el
   único de su especialidad, como Genética Médica, esta sección no aparece. No se muestra
   vacía.
8. **Footer.**

---

## Textos que rompen componentes

Son reales, salen de la base. Si un componente se rompe con estos, el componente está mal.

| Caso | Valor |
|---|---|
| Nombre más largo | Dra. Montserrat Alcantara |
| Especialidad más larga | Cirugía Plástica y Reconstructiva |
| Horario más largo | Lunes, miércoles y viernes, 10:00 a 18:00 |
| Formación más larga | Universidad Nacional Autónoma de México |
| Especialidad con un solo médico | Genética Médica (1) |
| Especialidad con más médicos | Pediatría (15) |
| Consultorio y piso, ancho fijo | Consultorio 0416 · Piso 004 |

Todo en español, con acentos. Nada de lorem ipsum, nada de nombres en inglés.
