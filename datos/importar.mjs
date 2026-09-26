// Importador de datos/doctores.json desde el Directorio General de DocTowers.
//
// Entrada:  datos/crudo/directorio-general.csv
//           La hoja "Directorio" de DIRECTORIO_GENERAL_DOCTOWERS.xlsx, la base que
//           Jordy pidio usar, guardada como CSV. Ver datos/README.md.
//           Esta en .gitignore: trae telefonos y correos de arrendatarios y de
//           locales que no se publican. Al repo solo llega lo que sale de aqui.
// Salida:   datos/doctores.json
//
// Correr con: npm run datos
//
// Determinista: la misma hoja produce siempre el mismo JSON. Si un registro
// sale mal, se corrige en la hoja o en las tablas de este archivo, nunca a mano
// en doctores.json.
//
// Si la hoja trae una especialidad que ESPECIALIDADES no conoce, el script se
// detiene y dice cual. Es a proposito: una especialidad nueva decide en que
// opcion del `select` cae un medico real, y eso no se adivina.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");

/* Que se publica: decision de Valeria del 26-sep. Los que ya respondieron con
 * sus datos (INFO COMPLETA) y los que respondieron pero les falta algo
 * (INFO PENDIENTE). Los que no contestan, estan en renta o sin contactar no
 * salen: nadie les pregunto si querian estar en el sitio. */
const ESTATUS_PUBLICABLES = new Set(["INFO COMPLETA", "INFO PENDIENTE"]);

/* Registros con estatus publicable que igual no entran, cada uno con su razon.
 * La llave es el nombre tal cual viene en la hoja. */
const EXCLUIDOS = {
  "ZOE GAMBOA": "su especialidad es 'Master in beauty': no es un servicio medico",
  "Dra. Verónica Michelle López Castillo": "especialidad 'en proceso…'",
};

/* Nombres mal escritos en la hoja. Solo entra aqui lo que confirman DOS fuentes
 * aparte de la hoja: la base de contratos de Jordy (raw/Base_de_datos_Jordy_
 * Doctowers.xlsx en virtuo-wiki) y otra mas. Si solo la contradice el
 * contrato, no se corrige: el titular del contrato no siempre es quien atiende.
 * Lo ideal es corregirlo en la hoja y borrar la linea de aqui. */
const CORRECCIONES_NOMBRE = {
  // Contrato C1114: "MIRYAM LIZET FLORES CRUZ". Su Doctoralia: /m-lizet-flores-cruz.
  "Dra. Miryam Lizet Flore Cruz": "Dra. Miryam Lizet Flores Cruz",
};

/* Especialidad de la hoja -> opcion del `select`.
 *
 * La hoja es texto libre: cada medico escribio la suya ("Cardiólogo",
 * "Cardiología Intervencionista"). El `select` necesita pocas opciones y
 * parejas, asi que cada texto cae en una categoria, y el texto original se
 * conserva en `especialidad_detalle` para la ficha y para la busqueda.
 *
 * Cuando el texto nombra dos especialidades, manda la primera que escribio el
 * medico. La llave va normalizada: minusculas, sin acentos, espacios simples y
 * sin punto final. */
const ESPECIALIDADES = {
  "traumatologia y ortopedia pediatrica": "Traumatología y Ortopedia",
  "traumatologia y ortopedia": "Traumatología y Ortopedia",
  "ortopedia y traumatologia, cirugia de columna": "Traumatología y Ortopedia",
  "medicina interna - endocrinologia": "Medicina Interna",
  "medico internista / geriatra": "Medicina Interna",
  "medicina interna y cardiologia": "Medicina Interna",
  reumatologia: "Reumatología",
  reumatologo: "Reumatología",
  "ginecologia - obstetricia - infanto juvenil": "Ginecología y Obstetricia",
  "ginecologia y obstetricia": "Ginecología y Obstetricia",
  "ginecologia y obstetricia, endoscopia ginecologica y colposcopia": "Ginecología y Obstetricia",
  "ginecologia y cirugia de minima invasion": "Ginecología y Obstetricia",
  "ginecologia/ med. funcional/ sexologia": "Ginecología y Obstetricia",
  "medicina materno fetal, ginecologia y obstetricia": "Ginecología y Obstetricia",
  "medicina materno fetal": "Ginecología y Obstetricia",
  uroginecologia: "Ginecología y Obstetricia",
  "patologo clinico": "Patología",
  "anatomia patologica, alta especialidad en medicina de precision en cancer": "Patología",
  "nutricion clinica y renal": "Nutrición",
  "mtra en nutricion clinica": "Nutrición",
  "otorrinolaringologia y cirugia de cabeza y cuello": "Otorrinolaringología",
  "otorrinolaringologia, rinologia y cirugia facial": "Otorrinolaringología",
  "cirujano oftalmologo": "Oftalmología",
  "cirugia bucal": "Odontología",
  "cirujano oral y maxilofacial": "Odontología",
  "cirugia oral y maxilofacial": "Odontología",
  odontopediatria: "Odontología",
  "rehabilitacion oral": "Odontología",
  "periodoncia e implantologia": "Odontología",
  "cirujano dentista": "Odontología",
  "rehabilitacion piso pelvico": "Rehabilitación y Fisioterapia",
  "fisioterapia y rehabilitacion fisica": "Rehabilitación y Fisioterapia",
  "medico cirujano": "Medicina General",
  "medico general / psicoanalista": "Medicina General",
  "especialidad medicina familiar": "Medicina Familiar",
  "oncologia medica": "Oncología",
  "oncologia medica/ medicina interna": "Oncología",
  "cirujano oncologo": "Oncología",
  "pediatra / consultora en lactancia materna": "Pediatría",
  "neonatologa-pediatra": "Pediatría",
  "pediatra neonatologa asesora en lactancia materna": "Pediatría",
  pediatria: "Pediatría",
  "pediatria y hematologia pediatrica": "Pediatría",
  "pediatria/gastroenterologia y endoscopia pediatrica": "Pediatría",
  // El texto es el nombre de la clinica pediatrica donde atienden.
  "mimo centro pediatrico": "Pediatría",
  "gastroenterologa pediatra": "Gastroenterología",
  "gastroenterologia clinico y endoscopista digestivo": "Gastroenterología",
  "alergologia pediatrica": "Alergología",
  "alergia e inmunologia clinica": "Alergología",
  cardiologo: "Cardiología",
  "cardiologia, terapia intensiva cardiologica": "Cardiología",
  "cardiologo intervencionista master hemodinamia estructural": "Cardiología",
  "cardiologia intervencionista": "Cardiología",
  "neurologia clinica": "Neurología",
  "urologia oncologica": "Urología",
  "cirujano urologo": "Urología",
  "urologia y urologia oncologica / laparoscopia y robotica": "Urología",
  urologia: "Urología",
  "cirujano urologo y urologo pediatra": "Urología",
  "imagen diagnostica y terapeutica": "Radiología e Imagen",
  psiquiatria: "Psiquiatría",
  "psiquiatria infantil y de la adolescencia/ psiquiatria legal": "Psiquiatría",
  "dermatologia y dermatooncologa": "Dermatología",
  // Los tres del consultorio 525-526. La hoja no nombra la disciplina, solo a
  // quien atienden; una de ellas firma como "Psic." y comparten consultorio.
  "especialista en ninos y adolescentes, adultos y parejas": "Psicología",
  "especialista en ninos y adolescentes": "Psicología",
  "especialista en neurodesarrollo": "Neurodesarrollo",
  "psicoterapia | neuronutricion": "Psicología",
  neurocirugia: "Neurocirugía",
  neurocirujano: "Neurocirugía",
  neumologo: "Neumología",
  "cirugia plastica, estetica y reconstructiva": "Cirugía Plástica",
  "cirugia plastica estetica y reconstructiva": "Cirugía Plástica",
  nefrologia: "Nefrología",
};

/* Los cuatro del home. Elegidos a mano entre los de INFO COMPLETA con
 * telefono, WhatsApp, cedula y Doctoralia, uno por especialidad de las que mas
 * se buscan. Pendiente de que Jordy los confirme. */
const DESTACADOS = [
  "carlos-laertes-cruz-enriquez",
  "guillermo-gerardo-abrego-rodriguez",
  "karen-suarez-ramirez",
  "jaime-israel-morales-carvajal",
];

/* Solo cuentan como Doctoralia los links que van a Doctoralia. La hoja trae
 * tambien acortadores, un mapa y una agenda propia en esa columna, y el boton
 * de la ficha dice "Agendar en Doctoralia". */
const DOMINIOS_DOCTORALIA = /^(www\.)?(doctoralia\.com\.mx|na\.doct\.to)\//i;

// ── Utilidades ──────────────────────────────────────────────────────────────

/** CSV segun RFC 4180: comillas dobles, comas y saltos de linea adentro. */
function leerCsv(texto) {
  const filas = [];
  let fila = [];
  let campo = "";
  let comillas = false;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (comillas) {
      if (c === '"' && texto[i + 1] === '"') {
        campo += '"';
        i++;
      } else if (c === '"') comillas = false;
      else campo += c;
    } else if (c === '"') comillas = true;
    else if (c === ",") {
      fila.push(campo);
      campo = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && texto[i + 1] === "\n") i++;
      fila.push(campo);
      filas.push(fila);
      fila = [];
      campo = "";
    } else campo += c;
  }
  if (campo || fila.length) {
    fila.push(campo);
    filas.push(fila);
  }
  return filas;
}

const espacios = (s) => s.replace(/\s+/g, " ").trim();

const clave = (s) =>
  espacios(s)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\.$/, "");

const PARTICULAS = new Set(["de", "del", "la", "las", "los", "y"]);

/** Nombres que llegaron en mayusculas. No agrega acentos que la hoja no trae. */
function nombrePropio(texto) {
  const limpio = espacios(texto);
  const letras = limpio.replace(/[^\p{L}]/gu, "");
  const todoMayusculas = letras && letras === letras.toUpperCase();

  let nombre = todoMayusculas
    ? limpio
        .toLowerCase()
        .split(" ")
        .map((p, i) => (i > 0 && PARTICULAS.has(p) ? p : p.charAt(0).toUpperCase() + p.slice(1)))
        .join(" ")
    : limpio;

  // "DR", "Dr", "DRA." -> "Dr." y "Dra.", siempre con punto.
  nombre = nombre.replace(/^(dra|dr)\.?\s+/i, (_, t) => (t.toLowerCase() === "dra" ? "Dra. " : "Dr. "));
  return nombre;
}

/** Primera letra en mayuscula, sin tocar el resto; y si vino todo en
 *  mayusculas, se baja a minusculas primero. */
function oracion(texto) {
  let t = espacios(texto).replace(/\.$/, "");
  if (t === t.toUpperCase()) t = t.toLowerCase();
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function slugDe(nombre) {
  return nombre
    .replace(/^[\p{L}.]+\.\s+/u, "") // el titulo: Dr., Dra., CD., LFT., MNC., Psic.
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** 10 digitos -> "229 502 7362". Si el campo trae dos numeros seguidos, se
 *  publica el primero. Cualquier otra cosa no se publica. */
function telefono(texto, avisos, quien) {
  let digitos = texto.replace(/\D/g, "");
  if (!digitos) return "";
  if (digitos.length > 10 && digitos.length % 10 === 0) digitos = digitos.slice(0, 10);
  if (digitos.length !== 10) {
    avisos.push(`${quien}: telefono "${espacios(texto)}" no tiene 10 digitos, no se publica`);
    return "";
  }
  return `${digitos.slice(0, 3)} ${digitos.slice(3, 6)} ${digitos.slice(6)}`;
}

/** Todas las cedulas que traiga el campo, sin la etiqueta que las acompane. */
const cedulas = (texto) => (texto.match(/\d{5,9}/g) ?? []).join(" · ");

function doctoralia(texto) {
  const t = texto.trim().replace(/^https?:\/\//i, "");
  return DOMINIOS_DOCTORALIA.test(t) ? `https://${t}` : "";
}

/** "C302" -> consultorio "302", piso "3". "C525 y 526" -> "525 y 526", piso "5". */
function ubicacion(texto) {
  const consultorio = espacios(texto).replace(/^C/i, "");
  const primero = Number(consultorio.match(/\d+/)?.[0]);
  return { consultorio, piso: String(Math.floor(primero / 100)) };
}

// ── Importacion ─────────────────────────────────────────────────────────────

const [encabezado, ...filas] = leerCsv(
  readFileSync(join(raiz, "datos/crudo/directorio-general.csv"), "utf8"),
);
const col = Object.fromEntries(encabezado.map((h, i) => [espacios(h), i]));
const de = (fila, nombre) => fila[col[nombre]] ?? "";

const avisos = [];
const fuera = [];
const sinCategoria = new Set();
const doctores = [];

for (const fila of filas) {
  const crudo = espacios(de(fila, "NOMBRE DEL ESPECIALISTA"));
  if (!crudo || !ESTATUS_PUBLICABLES.has(espacios(de(fila, "ESTATUS")))) continue;

  if (EXCLUIDOS[crudo]) {
    fuera.push(`${crudo}: ${EXCLUIDOS[crudo]}`);
    continue;
  }
  const especialidadCruda = de(fila, "Especialidad");
  if (!espacios(especialidadCruda)) {
    fuera.push(`${crudo}: sin especialidad en la hoja`);
    continue;
  }
  const categoria = ESPECIALIDADES[clave(especialidadCruda)];
  if (!categoria) {
    sinCategoria.add(espacios(especialidadCruda));
    continue;
  }

  const nombre = CORRECCIONES_NOMBRE[nombrePropio(crudo)] ?? nombrePropio(crudo);
  doctores.push({
    slug: slugDe(nombre),
    nombre,
    especialidad: categoria,
    especialidad_detalle: oracion(especialidadCruda),
    cedula: cedulas(de(fila, "CEDULA")),
    ...ubicacion(de(fila, "NUM. DE CONSULTORIO")),
    telefono: telefono(de(fila, "Teléfono para citas"), avisos, nombre),
    whatsapp: telefono(de(fila, "WhasApp"), avisos, nombre),
    // Sin foto por ahora: las del banco de stock no se le pegan a un medico real.
    foto: "",
    destacado: false,
    doctoralia_url: doctoralia(de(fila, "Doctoralia")),
  });
}

if (sinCategoria.size) {
  console.error("Especialidades sin categoria. Agregalas a ESPECIALIDADES:");
  for (const e of sinCategoria) console.error(`  - "${e}"`);
  process.exit(1);
}

const slugs = new Set();
for (const d of doctores) {
  if (slugs.has(d.slug)) throw new Error(`slug repetido: ${d.slug}`);
  slugs.add(d.slug);
}
for (const s of DESTACADOS) {
  const d = doctores.find((x) => x.slug === s);
  if (!d) throw new Error(`destacado que no existe: ${s}`);
  d.destacado = true;
}

// Orden del directorio: por piso y consultorio, que es como esta la torre.
doctores.sort(
  (a, b) =>
    Number(a.consultorio.match(/\d+/)[0]) - Number(b.consultorio.match(/\d+/)[0]) ||
    a.nombre.localeCompare(b.nombre, "es"),
);

writeFileSync(join(raiz, "datos/doctores.json"), JSON.stringify(doctores, null, 2) + "\n", "utf8");

const n = (f) => doctores.filter(f).length;
console.log(
  `datos/doctores.json: ${doctores.length} medicos, ` +
    `${new Set(doctores.map((d) => d.especialidad)).size} especialidades, ` +
    `${new Set(doctores.map((d) => d.piso)).size} pisos, ` +
    `${n((d) => d.telefono)} con telefono, ${n((d) => d.whatsapp)} con whatsapp, ` +
    `${n((d) => !d.telefono && !d.whatsapp)} sin ninguno, ` +
    `${n((d) => d.doctoralia_url)} con doctoralia`,
);
if (fuera.length) console.log(`\nNo entran (${fuera.length}):\n  ${fuera.join("\n  ")}`);
if (avisos.length) console.log(`\nAvisos:\n  ${avisos.join("\n  ")}`);
