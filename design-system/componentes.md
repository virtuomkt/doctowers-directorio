# Componentes

Inventario mínimo para generar las tres vistas. **Sin llenar todavía** — se completa junto
con `tokens.md`.

Cada componente necesita: anatomía, variantes, estados y comportamiento en mobile. Un
componente sin estados definidos es el que Claude Design va a inventar distinto en cada
pantalla.

## Existen en el home de Figma

### Nav
Aparece en las tres vistas. Logo a la izquierda, y dos links: `Inicio` y `Directorio`.
**Ningún link puede quedar muerto** — en un demo al cliente se lee como sitio roto.
- [ ] Anatomía
- [ ] Estado activo de la sección actual
- [ ] Los dos grupos: navegación del paciente vs acciones del médico
- [ ] Comportamiento en mobile (¿hamburguesa?)

### Hero con buscador
El buscador manda a `/directorio?q=...`.
- [ ] Anatomía
- [ ] Estados del campo: reposo, foco, con texto
- [ ] Mobile

### Stat / contador
Las cajas de números del home. **Todas son dinámicas**: se calculan en build desde
`doctores.json`. Ningún número escrito a mano, ni siquiera los aspiracionales del mockup.
Decisión del 6-ago: si la base tiene 15, en pantalla dice 15.

Los números reales de hoy:

| Caja | Valor hoy | De dónde sale |
|---|---|---|
| Especialistas | 200 | total de registros |
| Especialidades | 30 | `especialidad` distintas |
| Pisos de consultorios | 12 | `piso` distintos |
| Búsqueda rápida | sin número | es texto, no dato |

Son cuatro cajas para **dos** huecos del mockup. El home aprobado trae una sola
tira con dos cajas: "350 Doctores disponibles" y "Búsqueda rápida / por especialidad", esta
última sin número. O sea que hay un solo hueco numérico diseñado y cuatro candidatos.

Decidir si la tira crece a tres cajas o si se elige un solo número. Si crece, es cambio de
layout, no de contenido: las dos cajas de hoy ocupan el ancho completo.

El "350" del mockup se va: el dato real es 200. **El componente se tiene que ver bien con dos
y con tres dígitos** — un "12" en el tamaño pensado para "350" se ve perdido en su caja.
- [ ] Anatomía
- [ ] Cómo se comporta de 1 a 4 dígitos
- [ ] Singular y plural ("1 especialista" vs "200 especialistas")

### Tarjeta de médico
El componente central. Se repite en "Especialistas destacados" y en el directorio completo.
Lleva a `/doctor/[slug]`.

En el mockup muestra foto redonda, nombre, especialidad, consultorio y un botón "Ver más".
**No trae el piso**, y sí trae un botón por tarjeta. Las dos cosas se deciden aquí: el piso
importa cuando el paciente ya va llegando a la torre, y un botón repetido 200 veces compite
con la tarjeta entera, que ya es clickeable.

Con 200 médicos ya no se repite 15 veces, se repite 200. Lo que a 15 se perdona, a 200 se
nota: una tarjeta muy alta convierte el directorio en un scroll eterno.
- [ ] Anatomía
- [ ] Estados: reposo, hover, foco por teclado
- [ ] Nombres y especialidades largas sin romper el layout
- [ ] **Variante sin foto** (avatar con iniciales), como respaldo
- [ ] Mobile

Las fotos las provee Rebeca, así que no son el cuello de botella. Aun así la variante de
avatar se diseña: es lo que se ve mientras los assets llegan, y lo que evita un hueco si un
médico se queda sin foto. Lo que hay que pasarle a Rebeca es la especificación, no la lista:
proporción, tamaño, formato, y el nombre de archivo igual al `slug` de cada registro.

### Select de especialidad
Decisión del 6-ago. Vive en el directorio, junto al buscador. Las 30 especialidades salen de
`doctores.json`, con su conteo. No es un panel de filtros, es un `select`.
- [ ] Anatomía y estados
- [ ] Cómo convive con el buscador de texto (¿se suman o se pisan?)
- [ ] Mobile
- [ ] Cómo se limpia para volver a los 200

## Faltan, salen del sistema

### Campo de búsqueda del directorio
El mismo buscador del hero pero persistente, acotando la lista conforme se escribe.
Sin acentos y por coincidencia parcial: "cardio" trae 11, "gine" trae 14.
- [ ] Estado sin resultados — qué se ve y qué dice
- [ ] Contador de resultados ("200 especialistas" → "11 resultados para cardio")

### Paginación o "cargar más"
No existía cuando eran 15. Con 200 hace falta decidir qué pasa después de la primera
pantalla del directorio.
- [ ] Cuántas tarjetas por página
- [ ] Paginación numerada, "cargar más", o scroll infinito

### Ficha del médico
Foto, nombre, especialidad, consultorio, piso, teléfono, horario, cédula, y el bloque de bio
con años de experiencia, formación e idiomas.

Dos datos son condicionales y cada uno necesita sus dos variantes, sin que la de "sin dato" se
vea incompleta:
- **WhatsApp**, que la mitad de los registros no trae.
- **"Agendar en Doctoralia"**, solo si el médico tiene `doctoralia_url`. Hoy **ninguno** lo
  tiene, así que la variante sin ese botón es la única que se va a ver el 15-ago. Es la que
  tiene que verse terminada.

- [ ] Anatomía
- [ ] Las dos variantes de WhatsApp
- [ ] Las dos variantes de Doctoralia

### Botón
- [ ] Variantes: primario, secundario, con ícono
- [ ] Estados: reposo, hover, foco, deshabilitado

### Footer
- [ ] Anatomía y contenido

## El inventario completo son nueve

Nav, footer, buscador, `select` de especialidad, tira de números, tarjeta de médico, contador
de resultados con su estado vacío, paginación y botón. Más los bloques de la ficha, que no son
un componente reusable sino el layout de una vista.

Si aparece un décimo, es señal de que se está diseñando de más para lo que el 15-ago necesita.

## Cosas que no llevan componente

**Se cayeron el 7-ago, al reducir el sitio a tres vistas:**

- **Login, panel del médico y cualquier formulario.** Nadie inicia sesión. En todo el sitio hay
  dos campos: el buscador y el `select`.
- **Tarjeta de especialidad**, porque ya no hay vista de Especialidades. El `select` del
  directorio cubre ese camino, y con eso alcanza.

**Eran v2 desde el 3-ago:** filtros por aseguradora y búsqueda por síntoma. Valen la pena
mencionarse al cliente el 15-ago como hacia dónde va el producto, sin comprometer fecha.

El filtro por especialidad **entró** (6-ago) como `select`, no como panel. Está arriba, en su
propio componente. El filtro por piso se queda fuera: quien busca médico busca especialidad,
el piso lo necesita cuando ya va llegando y para eso está la ficha.
