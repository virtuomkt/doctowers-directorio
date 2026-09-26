# DocTowers — Sitio Directorio

Directorio de médicos de la torre DocTowers, cliente de Virtuo. Aquí se hace el **diseño y la
construcción** del sitio. La gestión del proyecto (fechas, tarjeta de Notion, pendientes con
Jordy) vive en el AIOS de Valeria, en `../viri`.

## Qué se entrega

**Sitio terminado con datos reales a fin de septiembre de 2026**, para presentarlo a
DocTowers (acuerdo con Jordy del 17-sep). Un link vivo que se abre en celular y en compu,
busca un médico por nombre, especialidad o consultorio, y llega a su ficha. Los médicos son
los reales de la torre, del Directorio General de DocTowers.

La torre está en **Boca del Río, Veracruz**.

**Tres vistas, no nueve** (decisión del 7-ago, reemplaza la del 6-ago). Home (`/`), Directorio
(`/directorio`) y Ficha del médico (`/doctor/[slug]`), cada una en desktop y mobile. El camino
es uno: **buscar, encontrar, llamar.**

Se cayeron seis vistas y con ellas la mitad del inventario de componentes: Especialidades (el
`select` del directorio cubre ese camino), Sobre nosotros, Contacto, Para médicos, Iniciar
sesión y Panel del médico. **Ya no hay login de ninguna clase**, así que tampoco hay campos de
contraseña ni formularios en todo el sitio: los únicos dos campos son el buscador y el `select`.
Jordy pidió el 17-sep un formulario conectado a Monday; Valeria decidió dejarlo fuera por ahora.

**Le habla al paciente y a nadie más.** Busca a su médico, encuentra el teléfono y el piso, y
se va. El negocio de atrás sigue siendo que DocTowers renta consultorios, pero eso ya no se
diseña: se resuelve con una banda delgada en el home y el teléfono de la torre.

Fuera de alcance, a propósito: filtros por aseguradora, búsqueda por síntoma, panel de
edición, y las seis vistas de arriba. La base de médicos **la mantiene el equipo a mano**, no
los médicos (confirmado por Jordy el 17-sep): no hay acceso para ellos.

## Cómo se trabaja aquí

Tres pasos, en orden, y el orden importa:

1. **Design system primero** (`design-system/`) — paleta, tipografía, componentes, derivados
   del home que ya existe en Figma. Es la entrega dura.
2. **Claude Design genera las vistas** con ese sistema cargado. Es lo que ahorra días: aplica
   el sistema en paralelo en vez de reinventar el estilo en cada pantalla.
3. **Claude Code implementa** esas vistas. Claude Design produce mockups, no el sitio de
   producción. El handoff entre 2 y 3 es explícito y no se salta.

Si algo no alcanza para generar una vista, se arregla el sistema, no se parcha la vista.

## Reglas duras del proyecto

- **`doctores.json` es la fuente de verdad.** Todo sale de ahí: las fichas, la lista, y el
  contador del home. **Ningún número de médicos se escribe a mano** en ninguna vista.
- **Se enlaza, no se copia.** Jalar fichas de Doctoralia automáticamente va contra sus
  términos. Los datos de cada médico salen del Directorio General que llena el equipo.
- **Ficha propia para todos los médicos.** Doctoralia es un botón extra cuando existe
  `doctoralia_url`, nunca el destino del perfil. Si el perfil vive allá, DocTowers manda
  tráfico a un directorio competidor justo cuando el usuario ya decidió.
- **Solo sale quien respondió.** Se publican los registros con estatus `INFO COMPLETA` o
  `INFO PENDIENTE` (decisión de Valeria del 26-sep). Quien no contesta, está en renta o sin
  contactar no aparece: nadie le preguntó si quería estar aquí.
- **Un dato que la hoja no trae no se inventa.** Horario, formación, experiencia y bio no
  existen en la fuente, así que no existen en el sitio. Cada dato vacío se esconde. Sin
  teléfono ni WhatsApp, la ficha manda a la recepción de la torre y lo dice.
- **Ninguna foto de stock en un médico real.** Las fotos entran solo cuando son del médico.
- **`noindex` hasta que Jordy apruebe**, con el `<meta>` del `index.html`. En GitHub Pages es
  el único candado que funciona (ver `README.md`). Se quita cuando el sitio pase a su dominio.
- **El repo es público** (se publica en GitHub Pages de `virtuomkt`). Nada que no deba verse
  entra al repo: ni el export crudo de la hoja, ni llaves, ni archivos de fuentes de más.
- **El JSON se regenera, no se edita a mano.** `npm run datos` lo reconstruye desde el export
  de la hoja con `datos/importar.mjs`. Corregir un registro suelto en `doctores.json` se
  pierde en la siguiente corrida: se corrige la hoja o el importador.
- **Ningún link del nav queda muerto.** Con tres vistas el nav lleva **dos links, Inicio y
  Directorio**, y nada más. En un demo al cliente, un link roto se lee como sitio roto.
- **Mobile no es un ajuste posterior.** Falta el mobile de las tres vistas y es donde la gente
  busca a su médico.
- **La búsqueda tiene que aguantar el español**: sin acentos y por coincidencia parcial.
  "cardio" encuentra "Cardiología", "zarate" encuentra "Dr. Juan de Dios Zárate Torres". El
  número de consultorio va por prefijo: "30" trae el 302, no el 1030. Ojo con la coincidencia
  parcial: "pedia" trae Pediatría **y** Traumatología y Ortopedia. Es correcto.
- **El directorio lleva `select` de especialidad y paginación.** Es un `select` sobre la
  lista que ya existe, **no un panel de filtros**. Sus opciones son las categorías del
  importador; lo que escribió cada médico se conserva y se ve en su ficha.
- **Contraste AA (4.5:1) en todo texto.** Es un sitio de salud.

## Estructura

```
contexto/          symlinks de solo lo que este proyecto necesita (ver contexto/README.md)
  spec-mvp.md          el documento base: alcance, stack, datos, pantallas, riesgos, plan
  decisiones-virtuo.md el porqué del stack y las opciones que se evaluaron
  skills-y-plugins-web.md   catálogo de herramientas para trabajo web
  2026-07-20-junta-origen.md   la junta donde nació el proyecto
  voz-valeria.md       para redactar en su voz
  voz-de-marca-cliente.md   registro para copy de cara al cliente
  equipo.md            quién es quién en Virtuo
design-system/     la entrega dura: tokens y componentes
datos/
  importar.mjs         lee el export de la hoja y escribe doctores.json
  doctores.json        los médicos reales publicables (generado, no se edita a mano)
  crudo/               el export de la hoja. En .gitignore: trae datos que no se publican
```

Las fotos de la torre y de los médicos viven en el Drive de Virtuo, carpeta `DOCTOWERS`.

`contexto/` apunta al wiki compartido y al AIOS. **Son symlinks: se leen, no se editan desde
aquí.** Si un dato de negocio cambia, se cambia en su origen.

**Empieza por `contexto/spec-mvp.md`.** Es el documento base y contiene el detalle que este
archivo solo resume.

## Herramientas

El catálogo vive en `contexto/skills-y-plugins-web.md` y se revisa antes de instalar nada.
Regla de ahí que aplica aquí: **se instala cuando ya existe el trabajo que lo necesita, no
antes.** Cada plugin cobra tokens en cada sesión aunque no se use.

Instalado hoy: **`frontend-design`**, que es dirección de arte, no asistente de código. Obliga
a un plan de diseño antes de escribir, y nombra los clichés del diseño generado por IA para
esquivarlos. Sirve para el design system de este proyecto.

Los candidatos que este proyecto va a querer, por orden:

- **`browser-use`** — navegador real para ver y capturar el sitio. Sin capturas, el trabajo
  visual se hace a ciegas.
- **`figma`** — leer componentes y tokens directo del archivo, en vez de sacarlos a ojo de un
  screenshot. Relevante ya, porque el design system se deriva del home en Figma.
- **`playground`** — comparar direcciones visuales antes de comprometerse a una.

## Voz

Español de México, cálida, directa, frases cortas, sin em dashes, siempre el *porqué* detrás
de una petición. Detalle en `contexto/voz-valeria.md`.

Para **copy de cara al cliente** (cualquier texto que se vea en el sitio) el registro es otro:
`contexto/voz-de-marca-cliente.md`. Y no se publica nada en la voz de Valeria sin que ella vea
el borrador primero.

## Cómo trabajar con Valeria

- Directo y conciso. Sin relleno. Lo que necesita acción primero.
- Cuando cierre una decisión, sugerir registrarla en `../viri/decisions/log.md`. **Pausado
  por instrucción del 6-ago**: se siguen tomando decisiones y se acumulan aquí, y se vuelcan
  a `../viri` de un jalón cuando ella lo pida. No insistir en cada una.
- Antes de asumir que algo se hace a mano, preguntar hasta dónde se puede apoyar en IA.

## Dónde está el estado del proyecto

**Aquí no.** Este archivo lleva reglas estables; el estado se consulta, no se copia.

| Qué | Dónde |
|---|---|
| Estado, fecha límite, quién tiene la tarjeta | Notion, base **Producción Virtuo**, tarjeta *DocTowers / Sitio Web Directorio* |
| Qué stack se decidió y por qué | `contexto/decisiones-virtuo.md` — la última entrada de DocTowers manda |
| Alcance, plan y riesgos | `contexto/spec-mvp.md` |

Los tres se actualizan solos: Notion es en vivo y los otros dos son symlinks a su original.
Si algo de esto se contradice con lo que dice este archivo, **gana la fuente, no este
archivo**.

Regla mientras el stack no esté confirmado en el log: se avanza en lo que no depende de él
(design system, `doctores.json`, copy, vistas de Claude Design) y no se instala nada.
