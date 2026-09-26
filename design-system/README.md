# Design system — DocTowers

La entrega dura del proyecto. Todo lo demás cuelga de aquí.

**No es un design system completo.** Es uno al tamaño de este proyecto: lo mínimo para que
Claude Design genere las vistas coherentes sin reinventar el estilo en cada una.

## Los tres pasos

1. **Se define aquí** — paleta, tipografía, escala de espaciado, componentes. Todo se deriva
   del home que ya está aprobado. No se inventa desde cero: se extrae.

   Son **tres archivos de Figma**, y conviene no confundirlos:

   | Archivo | Papel |
   |---|---|
   | `DOCTOWERS` | El original de trabajo. Siete páginas, mezcla de RRSS, impresión y web. No se usa directo |
   | `DocTowers - Home aprobado` | El home pasado a limpio. Es de donde se extrae. Spec en `archivo-referencia-home.md` |
   | `DocTowers - Directorio` | Donde se construye el sistema. Ocho páginas ya creadas |
2. **Se carga a Claude Design**, que genera las vistas que faltan.
3. **Se implementa** a partir de esas vistas. Claude Design produce prototipos y mockups, no
   el sitio de producción. El handoff entre 2 y 3 es explícito y no se salta.

## Archivos

| Archivo | Qué lleva |
|---|---|
| `archivo-referencia-home.md` | Qué tiene que llevar el home pasado a limpio, para poder extraer de él |
| `prompt-figma-claude-chat.md` | El prompt en dos fases que genera el sistema con el MCP de Figma |
| `tokens.md` | Paleta, tipografía, espaciado, radios, sombras. Los valores crudos |
| `componentes.md` | Inventario de componentes con sus estados y variantes |
| `assets-para-rebeca.md` | Lo que se le pide a Rebeca, con especificación |
| `para-claude-design/` | El contenido del sitio, separado del estilo. Se sube a Claude Design |

## A quién le habla

**Al paciente, y a nadie más** (7-ago). Busca a su médico, encuentra el teléfono y el piso, y
se va. No crea cuenta.

El negocio de atrás sigue siendo que DocTowers renta consultorios y que el directorio existe
para que un consultorio en esta torre valga más. Pero eso ya no se diseña: se resuelve con una
banda delgada en el home y el teléfono de la torre.

## Vistas que tiene que poder generar

Tres, decisión del 7-ago que reemplaza la de nueve del 6-ago.

| Vista | Ruta | Diseño hoy |
|---|---|---|
| Home | `/` | ✅ Existe (desktop), y aun así se regenera. Falta mobile |
| Directorio (lista + buscador) | `/directorio` | ❌ |
| Ficha del médico | `/doctor/[slug]` | ❌ |

El camino es uno: **buscar, encontrar, llamar.** El peso se lo llevan Directorio y Ficha, que
son las que el directivo va a tocar el 15-ago.

**Se cayeron seis** y con ellas la mitad del inventario de componentes: Especialidades (el
`select` del directorio cubre ese camino), Sobre nosotros, Contacto, Para médicos, Iniciar
sesión y Panel del médico. **Ya no hay login de ninguna clase**, así que en todo el sitio hay
exactamente dos campos: el buscador y el `select`. Ni contraseñas, ni formularios.

## Navegación

`Inicio · Directorio`, y el logo que lleva a `/`. Nada más, porque no hay más vistas.

Un nav de dos links es un nav muy vacío, y ahí está el reto: que se vea intencional y no
incompleto. Aparece en las tres vistas, así que vale la pena resolverlo bien.

**No es lo que trae el mockup**, que tiene `Directorio`, `Sobre nosotros` y `Contacto`. Dos de
esos tres ya no existen.

## Regla

Si el sistema no alcanza para generar una vista, **se arregla el sistema**, no se parcha la
vista. Un parche en una pantalla es deuda que reaparece en las otras ocho.
