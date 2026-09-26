// Verifica contraste AA (4.5:1) sobre los pares texto/fondo que el sitio usa
// de verdad. Lee los colores de src/index.css, asi que cuando Valeria cambie
// la paleta esto contesta si pasa antes de que alguien lo note en pantalla.
//
// Correr con: npm run contraste

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const css = readFileSync(join(raiz, "src/index.css"), "utf8");

// Los hex crudos, mas los semanticos que apuntan a ellos con var().
// Asi se puede nombrar `--color-primary` en los pares aunque su valor real
// viva en `--color-navy-900`.
const crudos = Object.fromEntries(
  [...css.matchAll(/(--color-[\w-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)].map((m) => [m[1], m[2]]),
);
const alias = Object.fromEntries(
  [...css.matchAll(/(--color-[\w-]+):\s*var\((--color-[\w-]+)\)\s*;/g)].map((m) => [
    m[1],
    m[2],
  ]),
);
const resolver = (nombre, saltos = 0) => {
  if (crudos[nombre]) return crudos[nombre];
  if (alias[nombre] && saltos < 5) return resolver(alias[nombre], saltos + 1);
  return undefined;
};
const colores = new Proxy(
  {},
  { get: (_, n) => resolver(String(n)), has: (_, n) => Boolean(resolver(String(n))) },
);

const canal = (v) => {
  const c = v / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

function luminancia(hex) {
  const n = parseInt(hex.slice(1), 16);
  return (
    0.2126 * canal((n >> 16) & 255) +
    0.7152 * canal((n >> 8) & 255) +
    0.0722 * canal(n & 255)
  );
}

function razon(a, b) {
  const [x, y] = [luminancia(a), luminancia(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

// Los pares reales, incluidos los tres lugares donde el design system dice que
// el contraste siempre se rompe: texto suave sobre superficie, etiqueta sobre
// el hero, y el placeholder del buscador.
const PARES = [
  ["--color-text-strong", "--color-background", "Titulos sobre la pagina"],
  ["--color-text-base", "--color-background", "Parrafos sobre la pagina"],
  ["--color-text-muted", "--color-background", "Metadatos sobre la pagina"],
  ["--color-text-strong", "--color-surface", "Titulos sobre tarjeta"],
  ["--color-text-base", "--color-surface", "Parrafos sobre tarjeta"],
  ["--color-text-muted", "--color-surface", "Consultorio y piso en la tarjeta"],
  ["--color-text-muted", "--color-surface", "Placeholder del buscador"],
  ["--color-primary", "--color-surface", "Links y especialidad sobre tarjeta"],
  ["--color-primary", "--color-background", "Links sobre la pagina"],
  ["--color-text-invert", "--color-primary", "Texto del boton primario"],
  ["--color-text-invert", "--color-primary-hover", "Boton primario en hover"],
  // El boton "Directorio" del nav, agregado el 10-ago. Es el unico boton del
  // sitio en teal, asi que es justo el que se puede salir de la regla sin que
  // nadie lo note: los escalones teal-600 y teal-700 no aguantan texto encima.
  ["--color-text-invert", "--color-cta", "Texto del boton del nav"],
  // El hover de todos los CTA, desde el 12-ago. Ya no lleva texto blanco: sobre
  // este teal daria 2.14:1, asi que la tinta se voltea a navy y ese es el par
  // que hay que vigilar. Si alguien devuelve el texto a blanco, esto lo grita.
  ["--color-cta-hover-ink", "--color-cta-hover", "Tinta de los CTA en hover"],
  ["--color-cta-hover", "--color-primary", "Etiqueta del nav en hover, sobre la pildora"],
  // Los links perdieron el subrayado el 12-ago, asi que el color es lo unico
  // que anuncia el hover y tiene que verse de verdad.
  ["--color-link-hover", "--color-surface", "Link en hover sobre tarjeta"],
  ["--color-link-hover", "--color-background", "Link en hover sobre la pagina"],
  // El borde de la tarjeta en hover. Cuarto valor: la vara es 3:1 y no 4.5,
  // porque no es texto sino indicador de estado, y esa es la regla que le toca
  // (WCAG 1.4.11). Se mide contra los dos lados del borde: la tarjeta blanca
  // por dentro y el gris de la pagina por fuera.
  ["--color-border-hover", "--color-surface", "Borde de tarjeta en hover, por dentro", 3],
  ["--color-border-hover", "--color-background", "Borde de tarjeta en hover, por fuera", 3],
  // El icono teal de las tarjetas informativas, desde el 13-ago. Misma vara de
  // 3:1 que el borde y por la misma razon: es objeto grafico, no texto. Vive en
  // los dos fondos, porque las tarjetas del hospital van sobre el gris y las de
  // comercios sobre blanco.
  ["--color-icon-accent", "--color-surface", "Icono de tarjeta informativa, sobre blanco", 3],
  ["--color-icon-accent", "--color-background", "Icono de tarjeta informativa, sobre la pagina", 3],
  // Lo resaltado en el contador del directorio. Es texto, asi que 4.5:1.
  ["--color-accent-text", "--color-background", "Resalte del contador, sobre la pagina"],
  ["--color-accent-text", "--color-surface", "Resalte del contador, sobre tarjeta"],
  // El hover del boton secundario, desde el 13-ago. Ya no se rellena del teal
  // solido de los CTA: se queda de contorno con un fondo teal apenas
  // insinuado. Son los dos pares que ese estado estrena.
  ["--color-primary", "--color-accent-soft", "Texto del boton secundario en hover"],
  ["--color-border-hover", "--color-accent-soft", "Borde del boton secundario en hover", 3],
  // La excepcion del 13-ago: el azul de Fifty Doctors Hospital, solo en la
  // palabra "Hospital" del titulo de su seccion. No vive sobre blanco puro sino
  // sobre la textura con velo, y ese caso no lo puede medir este script porque
  // depende de la imagen; esta medido en el comentario de `.velo-hospital`
  // (4.56:1 en el peor bloque de la banda del titulo). Lo que si se vigila aqui
  // es que el color no se degrade si alguien lo cambia de tono.
  ["--color-hospital", "--color-surface", "Azul del hospital, referencia sobre blanco"],
  ["--color-accent-ink", "--color-accent-soft", "Iniciales en el avatar"],
  ["--color-accent-ink", "--color-surface", "Etiqueta de especialidad"],
  // El teal de marca no es color de texto sobre claro, y por eso no aparece
  // arriba. Donde si vive es encima del navy del hero, y ahi hay que probarlo.
  ["--color-accent", "--color-primary", "Teal de marca sobre el hero"],
  ["--color-text-invert", "--color-primary", "Titulo del hero sobre navy"],
];

let fallas = 0;
console.log("Contraste AA — texto 4.5:1, indicadores de estado 3:1\n");

for (const [frente, fondo, donde, minimo = 4.5] of PARES) {
  const a = colores[frente];
  const b = colores[fondo];
  if (!a || !b) {
    console.log(`  ?  ${donde} — falta ${!a ? frente : fondo}`);
    fallas++;
    continue;
  }
  const r = razon(a, b);
  const pasa = r >= minimo;
  if (!pasa) fallas++;
  console.log(
    `  ${pasa ? "OK" : "NO"}  ${r.toFixed(2)}:1  (min ${minimo})  ${donde}  (${frente} sobre ${fondo})`,
  );
}

console.log();
if (fallas) {
  console.log(`${fallas} par(es) no pasan AA. Ajustar el token, no la vista.`);
  process.exit(1);
}
console.log("Todos los pares pasan AA.");
