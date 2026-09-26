# Comportamiento de los componentes

El archivo de Figma trae la forma de cada componente. Este documento trae lo que una imagen
no puede cargar: los estados, los casos límite y el comportamiento en mobile.

Regla general: **un componente sin estados definidos es el que se va a ver distinto en cada
pantalla.** Hover, foco por teclado y deshabilitado, siempre. El foco por teclado tiene que
ser visible de verdad, no un halo apenas perceptible.

## Nav

- **Solo dos links: Inicio y Directorio.** Nada más, porque no hay más vistas.
- Estado activo de la sección actual, visible sin tener que compararlo con el otro.
- El logo siempre lleva a `/`.
- Mobile: con dos links no hace falta hamburguesa. Que quepan los dos.
- El reto está en que un nav de dos links se vea intencional y no incompleto. Se ve en las
  tres vistas, así que vale la pena resolverlo bien.

## Buscador

Es el mismo componente en el hero del home y en el directorio, con dos comportamientos:
en el home se envía y navega, en el directorio filtra conforme se escribe.

- Estados: reposo, foco, con texto, y con botón de limpiar.
- Busca sin acentos y por coincidencia parcial: "cardio" encuentra "Cardióloga", "diego"
  encuentra "Dr. Diego De la Riviera".
- Mobile: el buscador del hero es el elemento más importante de la pantalla. Que no quede
  apretado contra el borde ni compitiendo con el título.

## Select de especialidad

- 30 opciones más "Todas las especialidades (200)". Cada una con su conteo.
- Estados: cerrado, abierto, con selección aplicada.
- Convive con el buscador de texto: los dos filtros se suman.
- Tiene que haber una forma clara de limpiar y volver a los 200.
- Mobile: 30 opciones en una lista chica es incómodo. Resuélvelo, no lo dejes igual que en
  desktop.

## Tira de números

- Tres cajas. Ícono, número, etiqueta.
- Los valores de hoy son 200, 30 y 12. **Se tiene que ver bien con dos y con tres dígitos.**
  Un "12" en el tamaño pensado para "350" se ve perdido en su caja.
- Singular y plural: "1 especialista" contra "200 especialistas".
- Solo vive en el home. Es el único lugar del sitio donde aparece.
- Mobile: tres cajas no caben en fila. Decide si se apilan o si van en una tira que se
  desplaza.

## Tarjeta de médico

El componente central. Se repite cuatro veces en el home y **200 veces en el directorio**.
Lo que a cuatro se perdona, a 200 se nota: una tarjeta muy alta convierte el directorio en
un scroll eterno.

- Contenido: foto redonda, nombre, especialidad, consultorio y piso.
- **Sin botón dentro.** La tarjeta completa es clickeable y lleva a `/doctor/[slug]`. El
  mockup mete un "Ver más" por tarjeta: repetido 200 veces compite con la tarjeta misma.
- Estados: reposo, hover, foco por teclado.
- Dos variantes de imagen: **con foto** y **con avatar de iniciales**. La de avatar es lo que
  se ve mientras las fotos llegan, y lo que evita un hueco si un médico se queda sin foto.
- Nombres y especialidades largas sin romper el layout ni empujar la altura de la fila.
- Mobile: una por fila, y ahí la altura importa todavía más.

## Contador de resultados y estado vacío

- Reposo: **200 especialistas**
- Con búsqueda: **11 resultados para "cardio"**
- Sin resultados: **No encontramos médicos para "xyz"**, más una salida real. No una
  disculpa, no un dibujo triste: qué hacer ahora.

## Paginación

No existía cuando el directorio tenía 15 médicos. Con 200 hace falta.

Decide cuántas tarjetas por página y si es paginación numerada o "cargar más". Explica por
qué elegiste una y no la otra: la decisión importa más que la forma.

## Botón

- Variantes: primario, secundario, con ícono, solo ícono.
- Estados: reposo, hover, foco por teclado, deshabilitado.
- El botón principal de una vista y el secundario tienen que distinguirse sin depender solo
  del color.

## Campos de formulario

**No hay formularios en este sitio.** No hay login, no hay contacto, no hay registro. Los dos
únicos campos que existen son el buscador y el `select` de especialidad, y los dos ya están
arriba con sus estados.

Si un diseño te pide un campo de texto, un campo de contraseña o un área de texto, algo se
salió del alcance.

## Contraste

**Todo texto pasa AA, 4.5:1**, sin excepción. Es un sitio de salud y se presenta ante
directivos.

Los lugares donde se rompe siempre: texto suave sobre fondo de superficie, etiquetas chicas
encima de la onda del hero, y texto de placeholder dentro del buscador. Si un color aprobado
no pasa, dilo y propón el ajuste en vez de dejarlo pasar.

## Lo que no lleva componente

No los diseñes. Unos son de la versión siguiente y otros salieron del alcance al reducir el
sitio a tres vistas. Meterlos ahora abre conversaciones que no queremos abrir el día de la
demostración:

- **Login, registro, cuenta o panel del médico.** Nadie inicia sesión en este sitio
- **Formulario de contacto**
- **Tarjeta de especialidad**, porque no hay vista de Especialidades. El `select` del
  directorio cubre ese camino
- Filtros por aseguradora
- Búsqueda por síntoma o padecimiento
- Filtro por piso
- Mapa embebido
- Reseñas o calificaciones de médicos
- Agendado de citas dentro del sitio

Con tres vistas, el inventario completo son **nueve componentes**: nav, footer, buscador,
`select` de especialidad, tira de números, tarjeta de médico, contador de resultados con su
estado vacío, paginación y botón. Si te sale un décimo, dime cuál y por qué antes de
construirlo.
