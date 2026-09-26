# Espaciado y ritmo

La escala dice **qué valores existen**. Esta regla dice **cuál va dónde**. Sin la segunda, cada
vista lo decide a ojo y el sitio deja de sentirse uno solo.

Fuente de la escala: `claude-design/tokens/spacing.css`. Aquí no se inventa ningún valor, solo
se reparte.

## La escala

Base 4px, diecisiete pasos. El nombre del token es siempre el valor dividido entre cuatro, que
es también su clase de Tailwind: `space-6` son 24px y se escribe `p-6`.

| Token | Valor | Paso desde el anterior | |
|---|---|---|---|
| `space-1` | 4px | | de 4 en 4: |
| `space-2` | 8px | 4 | detalle fino, |
| `space-3` | 12px | 4 | dentro de un |
| `space-4` | 16px | 4 | componente |
| `space-5` | 20px | 4 | |
| `space-6` | 24px | 4 | |
| `space-8` | 32px | 8 | de 8 en 8: |
| `space-10` | 40px | 8 | entre bloques |
| `space-12` | 48px | 8 | de una vista |
| `space-14` | 56px | 8 | |
| `space-16` | 64px | 8 | |
| `space-20` | 80px | 16 | de 16 en 16: |
| `space-24` | 96px | 16 | entre secciones |
| `space-32` | 128px | 32 | de 32 en 32: |
| `space-40` | 160px | 32 | layout, solo |
| `space-48` | 192px | 32 | el hero |
| `space-64` | 256px | 64 | |

El paso crece con el valor, y eso es a propósito: 4px de diferencia se notan en el interior de
una tarjeta y son invisibles entre dos secciones. Una escala de paso constante obliga a elegir
entre valores que nadie distingue.

**Si un paso no está en esta tabla, no se usa.** Eso deja fuera `0.5`, `1.5`, `2.5`, `3.5`, `7`,
`9`, `11`, `13`, `18` y `28` de Tailwind, que existen en el framework pero no en este sistema.

Los cinco pasos de abajo (`space-14`, `space-32`, `space-40`, `space-48`, `space-64`) se
agregaron el 13-ago. `space-14` porque la escala saltaba de 48 a 64 y el nav de Figma pide 56.
Los otros cuatro porque la escala terminaba en 96 y el hero ya usaba 128, 160, 192 y 256 de
facto, escritos a mano. No se inventó ningún valor: se le puso nombre al que ya estaba en uso.

Un detalle de Tailwind 4 que explica por qué esto se rompió solo: el espaciado no es una lista,
es una multiplicación. En el CSS compilado, `--spacing` vale `.25rem` y cada clase se resuelve
como `calc(var(--spacing) * N)`, con la N que sea. Por eso `py-3.5` compila sin protestar, y por
eso `px-[22px]` también. **El framework no tiene forma de saber que 14px no es de este sistema.**
La escala no se respeta sola: se verifica.

## Las cinco reglas

### 1. Aire entre secciones

| Caso | Mobile | Desktop | Clase |
|---|---|---|---|
| Sección normal | 48px | 64px | `py-12 sm:py-16` |
| Sección de vitrina (solo home) | 80px | 96px | `py-20 sm:py-24` |

Dos medidas, no cinco. La amplia existe porque el home es la portada y ahí el aire es
argumento de venta. El directorio y la ficha usan la normal: son vistas de trabajo, y el aire
de más solo aleja al usuario del siguiente médico.

### 2. Padding del contenedor

**`px-4 sm:px-6`**, en las tres vistas, sin excepción. 16px en celular y 24px en compu.

El ancho lo pone `max-w-6xl` (1152px) para las vistas de lista, y `max-w-3xl` para el bloque
del hero, que es texto centrado y a 1152px se leería como un renglón interminable.

### 3. Aire entre bloques dentro de una sección

| Caso | Valor | Clase |
|---|---|---|
| Después del título de la sección | 40px | `mt-10` |
| Entre bloques hermanos | 24px | `mt-6` |

Esta es la regla que hoy más se rompe, y la que más se nota: el mismo salto está escrito como
`mt-6`, `mt-8`, `mt-10` y `mt-12` en lugares que hacen lo mismo. Dos valores bastan. El título
abre con 40 porque es el que arranca el bloque; todo lo demás dentro de la sección respira a 24.

### 4. Aire interno de tarjeta

| Caso | Valor | Clase |
|---|---|---|
| Tarjeta de lista (la de médico) | 20px | `p-5` |
| Tarjeta de contenido (ficha) | 24px / 32px | `p-6 sm:p-8` |
| Separación entre tarjetas de una rejilla | 20px | `gap-5` |
| Avatar o icono a su texto | 16px | `gap-4` |

La tarjeta de lista se queda en 20 y no sube a 24 a propósito: aparece 200 veces y a tres
columnas el nombre ya vive al límite. Cada pixel de relleno se lo quita al texto. El aire de
esa tarjeta se gana en vertical, no en horizontal.

### 5. Aire entre etiqueta y dato

**`mt-2`** (8px) entre una línea y la que la explica. Nombre a especialidad, especialidad a
consultorio, título a subtítulo.

Nunca 6px ni 10px. Son diferencias que nadie ve pero que obligan a decidir cada vez.

## El tramo de layout

Los cuatro pasos de arriba de 96px existen para una sola cosa: el hero del home. Son los únicos
lugares del sitio donde el aire deja de ser ritmo y pasa a ser composición.

| Token | Valor | Dónde | Clase |
|---|---|---|---|
| `space-32` | 128px | Cierre del hero en mobile | `pb-32` |
| `space-40` | 160px | Apertura del hero en mobile | `pt-40` |
| `space-48` | 192px | Cierre del hero en desktop | `sm:pb-48` |
| `space-64` | 256px | Apertura del hero en desktop | `sm:pt-64` |

La apertura de 256px no es gusto: el nav flota encima del hero en el home en vez de ocupar su
lugar en el flujo, así que ese relleno tiene que librarlo y dejar respiro. En el archivo de
Figma ese respiro son 162px sobre un lienzo de 1920, o sea la misma proporción.

**Fuera del hero, nada usa este tramo.** Si aparece un `pt-40` en otra vista, es un error.

## Excepciones ópticas

Tres valores fuera de escala que **se quedan**, porque no son espaciado sino alineación:

| Valor | Dónde | Por qué |
|---|---|---|
| `mt-0.5` (2px) | Iconos del footer y de la ficha | Baja el icono para que su centro coincida con la primera línea de texto. Sin él se ve montado. |
| `-mr-[19px]` | Caras de `PildoraEspecialistas` | Es el traslape de los avatares, una medida de diseño, no un margen. |
| `pr-11` (44px) | `SelectEspecialidad` | Le deja lugar a la flecha. Si baja, el texto de la especialidad más larga pasa por debajo del icono. |

Están escritas aquí para que la próxima pasada de espaciado no las "corrija" y rompa la
alineación. Un valor óptico documentado es una decisión. Sin documentar, es un error que alguien
va a limpiar.

## Píldoras y botones

El relleno de una píldora **no cambia con su color**. Hoy la píldora del nav mide `pl-5 pr-4` en
su estado sólido y `pl-6 pr-6` en el de vidrio, así que cambia de ancho al hacer scroll. El nav
ya decidió que en ese cambio transicionan los colores y no el relleno; la píldora tiene que
seguir la misma regla.

| Elemento | Relleno | Nota |
|---|---|---|
| Píldora contenedora | `py-3 px-5` | Igual en los dos estados |
| Botón con icono a la derecha | `py-3 pl-6 pr-5` | Asimétrico a propósito |
| Botón sin icono | `py-3 px-6` | Simétrico |

La asimetría del botón con icono no es capricho: un chevron trae aire propio a su derecha, así
que el relleno de ese lado se recorta para que ópticamente se vea centrado. La diferencia es de
un paso de escala (24 y 20), no de ocho pixeles sueltos.

## Auditoría del 12-ago: lo que se movió

| Archivo | Antes | Ahora |
|---|---|---|
| `Boton.tsx` | `px-[22px]` | `px-6` |
| `Nav.tsx` (botón) | `gap-0.5 pl-7 pr-5` | `gap-1 pl-6 pr-5` |
| `Nav.tsx` (píldora) | `pl-5 pr-4` / `pl-6 pr-6` | `px-5` en ambos estados |
| `Buscador.tsx` (forma) | `p-1.5` | `p-2` |
| `Buscador.tsx` (campo) | `py-3` / `py-2.5` | `py-3` en los dos tamaños |
| `Buscador.tsx` (limpiar) | `p-1.5` | `p-2` |
| `Buscador.tsx` (enviar) | `py-3.5` | `py-4` |
| `TarjetaDoctor.tsx` | `mt-1.5`, `mt-2.5` | `mt-2` las dos |
| `PildoraEspecialistas.tsx` | `gap-1.5` | `gap-2` |
| `ContadorResultados.tsx` | `py-14` | `py-16` |
| `FichaDoctor.tsx` (dato) | `mt-0.5` | `mt-2` |
| `FichaDoctor.tsx` (`dd`) | `mt-1` ×4 | `mt-2` |

Dos consecuencias visibles, las dos a propósito: el buscador del hero crece 8px de alto, y la
píldora del nav deja de encogerse al hacer scroll.

Lo que **no** se tocó, y por qué:

- **El ritmo de bloques** (`mt-6` contra `mt-8` contra `mt-10`). Todos esos valores sí están en
  la escala; lo que falla es cuál va dónde, y corregirlo mueve el aire de las tres vistas a tres
  días de la junta. Va en una segunda pasada, con la pantalla enfrente.
- **`px-4 sm:px-6`** del contenedor. Ya era consistente en las tres vistas. No había nada que
  arreglar, solo que escribirlo.

## Cierre del 13-ago: ya no queda nada fuera de escala

Los dos valores que quedaban abiertos se resolvieron, y cada uno por su lado:

| Dónde | Antes | Ahora | Cómo |
|---|---|---|---|
| `Nav.tsx` | `sm:pt-14` (56px) | `sm:pt-14` | Se agregó `space-14` a la escala |
| `Home.tsx` | `sm:pt-28` (112px) | `pt-24` (96px) | Se movió la vista |

**El nav no se tocó y la escala sí**, porque sus 56px son medida del archivo de Figma (frame
16:6). Cuando el valor viene del diseño, se le hace lugar en el sistema; no se redondea la vista
para que quepa en una tabla.

**El home fue al revés.** Sus 112px no venían de ningún lado: eran un cálculo para librar la
mitad de la píldora que sobresale del hero. Esa mitad son unos 35px en escritorio y unos 30 en
móvil, o sea que la diferencia real entre los dos casos son 5px, no los 16 que separaban `pt-24`
de `sm:pt-28`. Con 96px en ambos quedan unos 60px de aire libre, que es de sobra, y de paso se
cae un `sm:` que no estaba ganando nada.

Ese es el criterio para la próxima vez: **si el valor viene del diseño, crece la escala; si el
valor viene de una cuenta, se ajusta la vista.**

## Excepciones vivas

Además de las tres ópticas de arriba, `Paginacion.tsx` usa `min-w-11` (44px), que es el mínimo
táctil y no espaciado. No se toca por la misma razón que `pr-11`.

## Cómo se sostiene

Una regla que solo vive en un documento se rompe en la tercera vista. Esta se verifica con un
script, igual que el contraste.

El proyecto ya tiene el patrón: `npm run contraste` revisa que todo texto pase AA, porque es
regla dura y no se deja a criterio. El espaciado va igual, con `npm run espaciado`, que recorre
`src/` y falla si encuentra un paso fuera de la tabla o un valor arbitrario en corchetes. Las
tres excepciones ópticas de arriba van en su lista blanca, con el motivo escrito al lado.

Existe además `claude-design/_adherence.oxlintrc.json`, que **vino en el zip del design system**
y ya trae la regla escrita:

```
"selector": "Literal[value=/\\b\\d+px\\b/]",
"message": "Raw px value — use a design-system spacing token via var()."
```

Nunca se conectó. El proyecto no tiene script de lint, así que esa regla lleva desde el 8-ago
sin correr una sola vez. Conectarla es la otra mitad del trabajo, y es la que evita que esta
pasada se tenga que repetir en septiembre.
