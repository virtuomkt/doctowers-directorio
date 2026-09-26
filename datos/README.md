# Datos

`doctores.json` es la fuente de verdad del sitio. Todo sale de ahí: las fichas, la lista, el
`select` de especialidad y los contadores del home.

**Se regenera, no se edita a mano.** Corregir un registro suelto aquí se pierde en la
siguiente corrida. Se corrige la hoja o `importar.mjs`.

## De dónde sale

De **DIRECTORIO_GENERAL_DOCTOWERS.xlsx**, hoja **Directorio**: la base que Jordy pidió usar
para el directorio (26-sep). La copia vive en `virtuo-wiki/raw/`; el original es el Google
Sheet del mismo nombre en el Drive de Virtuo, carpeta `DOCTOWERS`. La llena el equipo a mano;
los médicos no tienen acceso.

Para actualizar:

1. Abrir el archivo y guardar **solo la hoja Directorio** como CSV UTF-8.
2. Guardarla como `datos/crudo/directorio-general.csv`.
3. `npm run datos`.

**Solo cuenta la hoja Directorio** (decisión de Valeria del 26-sep). Las otras hojas del
archivo no se usan, aunque "Hoja3" parezca una lista del directorio: no coincide del todo con
Directorio, y donde difieren manda Directorio.

La hoja trae al pie una tabla de conteos por estatus. No estorba: esas filas no tienen nombre
de especialista y el importador las salta.

La base de contratos de Jordy (`Base_de_datos_Jordy_Doctowers.xlsx`, mismo `raw/`) **no** es
la fuente: trae al titular del contrato, que no siempre es quien atiende. Sirve para cruzar
consultorios, y así se hizo el 26-sep: los 84 publicados existen en ella.

`crudo/` está en `.gitignore`: la hoja trae teléfonos y correos de arrendatarios y locales que
no se publican. Al repo solo llega lo que filtra el importador.

## Qué filtra el importador

- **Estatus**: solo `INFO COMPLETA` e `INFO PENDIENTE`.
- **Sin especialidad** en la hoja: no entra, porque no hay dónde ponerlo en el `select`.
- **`EXCLUIDOS`**: registros con estatus publicable que igual no entran, cada uno con su razón.
- **Especialidad nueva**: si la hoja trae un texto que `ESPECIALIDADES` no conoce, el script
  se detiene y dice cuál. Se agrega a la tabla a mano, porque decide en qué opción del `select`
  cae un médico real.
- **Teléfonos** que no tienen 10 dígitos no se publican, y el script lo avisa.
- **Doctoralia**: solo links a `doctoralia.com.mx` o `na.doct.to`. Los acortadores, mapas y
  agendas propias de esa columna se ignoran.

Al correr, imprime cuántos entraron, cuáles se quedaron fuera y por qué.

## Esquema

| Campo | Qué es |
|---|---|
| `slug` | Ruta de la ficha, del nombre sin título |
| `nombre` | Con su título tal cual: `Dr.`, `Dra.`, `CD.`, `LFT.`, `MNC.`, `Psic.` |
| `especialidad` | La categoría del `select` |
| `especialidad_detalle` | Lo que escribió el médico en la hoja. Va en la ficha y se busca |
| `cedula` | Una o varias, separadas por ` · ` |
| `consultorio` | El número de la puerta: `302`, `1001`, `525 y 526` |
| `piso` | Sale del consultorio: `302` es piso 3 |
| `telefono` | Teléfono para citas, `229 502 7362`, o vacío |
| `whatsapp` | Mismo formato, o vacío |
| `foto` | Vacío hasta que se asignen las fotos reales |
| `destacado` | `true` en los cuatro del home, lista `DESTACADOS` del importador |
| `doctoralia_url` | Link a su perfil de Doctoralia, o vacío |

Un texto vacío significa que la hoja no lo trae. Las vistas lo esconden, no lo rellenan.
