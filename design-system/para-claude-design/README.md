# Contenido del sitio — DocTowers Directorio

Esta carpeta es el **contenido** del sitio. El estilo vive en otro lado: en el archivo de
Figma `DocTowers - Directorio`, que se sube aparte.

La separación es a propósito. Existe un mockup del home hecho antes de que el alcance se
cerrara, y ese mockup **no es fuente de contenido**: su navegación no es la que va, tiene
números viejos y trae textos de relleno. Sirve para el estilo y nada más.

**El sitio son tres vistas: Home, Directorio y Ficha del médico.** No hay login, no hay
panel, no hay formularios. El detalle está en `brief-vistas.md`, y empieza por ahí.

## Precedencia, cuando algo se contradice

1. **Esta carpeta** manda sobre todo lo demás en cuanto a contenido, estructura y textos.
2. **El archivo de Figma del design system** manda en color, tipografía, espaciado y
   componentes.
3. **El mockup del home**, si lo llegas a ver, no manda en nada. Es referencia visual.

## Lo que NO se copia del mockup del home

Cuatro cosas concretas, porque las prohibiciones vagas no sirven:

- **Los links del nav.** El mockup trae Directorio, Sobre nosotros y Contacto. El nav real
  lleva dos: **Inicio** y **Directorio**. Las otras dos vistas no existen.
- **El "350 doctores disponibles".** El número real es 200 y sale de los datos.
- **El texto "Directorio Médico Digital" repetido tres veces** (título, subtítulo y
  placeholder del buscador). Era relleno. Los textos reales están en `brief-vistas.md`.
- **El botón "Ver más" dentro de cada tarjeta de médico.** La tarjeta completa es clickeable.

## Archivos

| Archivo | Qué lleva |
|---|---|
| `brief-vistas.md` | La navegación y las tres vistas, sección por sección |
| `componentes.md` | Cómo se comporta cada componente: variantes, estados, mobile |
| `datos-muestra.json` | 60 médicos ficticios, con los peores casos de texto |
| `notas-para-el-campo.md` | Resumen corto, para pegar en el campo de notas |

## Sobre los datos

`datos-muestra.json` trae **60 médicos**, suficientes para llenar la cuadrícula del directorio
sin que se vea repetida. Cubre las 30 especialidades y los 12 pisos, e incluye a propósito los
textos más largos de la base.

Los números que se muestran en el sitio son los de la base completa, no los de la muestra:
**200 especialistas, 30 especialidades, 12 pisos**. Los conteos por especialidad del `select`
también son los reales y están listados en `brief-vistas.md`, de Pediatría (15) a Genética
Médica (1). No los recalcules desde la muestra.

Ningún número se escribe a mano en el diseño. Se muestran esos valores porque son los de hoy,
pero el componente tiene que aguantar que cambien.

### Campos

| Campo | Ejemplo | Dónde se usa |
|---|---|---|
| `nombre` | Dra. Montserrat Alcantara | Tarjeta, ficha |
| `especialidad` | Cirugía Plástica y Reconstructiva | Tarjeta, ficha, `select`, buscador |
| `consultorio` | `0416`, `1201` | Tarjeta, ficha |
| `piso` | `004`, `012` | Tarjeta, ficha |
| `telefono` | 229 555 2137 | Ficha |
| `whatsapp` | 229 555 2137, o vacío | Ficha. **La mitad no tiene**: diseña las dos |
| `horario` | Lunes, miércoles y viernes, 10:00 a 18:00 | Ficha |
| `cedula` | 4324143 | Ficha |
| `anios_experiencia` | 20 | Ficha |
| `formacion` | Universidad Veracruzana | Ficha |
| `bio` | Una o dos frases | Ficha |
| `idiomas` | ["Español", "Inglés"] | Ficha |
| `foto` | `/img/doctores/foto-01.jpg` | Tarjeta, ficha |
| `genero` | `F` o `M` | Solo para repartir las fotos de banco |
| `destacado` | `true` en cuatro registros | Los que salen en el home |
| `doctoralia_url` | **vacío en los 60** | Ver la nota de la ficha en `brief-vistas.md` |

**Consultorio y piso tienen ancho fijo**, cuatro y tres dígitos, en los 12 pisos. Es a
propósito: así la tarjeta no se descuadra entre el piso 4 y el piso 12. Se muestran tal cual,
sin quitarles los ceros.

Los teléfonos son del bloque ficticio `229 555 XXXX`. La lada 229 es de Boca del Río.

## A quién le habla

**Al paciente, y a nadie más.** Busca a su médico, encuentra el teléfono y el piso, y se va.
No crea cuenta, no se registra, no necesita entender el modelo de negocio. Suele estar
preocupado cuando entra: el diseño no debería agregarle ruido.

Atrás de todo esto hay un negocio, que es que DocTowers renta consultorios y el directorio
existe para que un consultorio en esta torre valga más. Pero eso **no se diseña**: se resuelve
con una banda delgada en el home y el teléfono de la torre. Nada de vistas para el médico,
nada de login.
