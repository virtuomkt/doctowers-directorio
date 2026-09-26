import doctoresJson from "../datos/doctores.json";

/* Datos reales desde el 26-sep, del Directorio General de DocTowers. Los
 * genera datos/importar.mjs. Un campo de texto vacio significa que la hoja no
 * lo trae, y cada vista lo esconde en vez de inventarlo. */
export type Doctor = {
  slug: string;
  nombre: string;
  /** La opcion del `select`: una de pocas, pareja. */
  especialidad: string;
  /** Lo que escribio el medico en la hoja, tal cual. Va en la ficha. */
  especialidad_detalle: string;
  /** Una o varias, separadas por " · ". */
  cedula: string;
  /** El numero de la puerta: "302", "1001", "525 y 526". */
  consultorio: string;
  piso: string;
  telefono: string;
  whatsapp: string;
  foto: string;
  destacado: boolean;
  doctoralia_url: string;
};

export const doctores = doctoresJson as Doctor[];

// Ningun numero de medicos se escribe a mano en ninguna vista. Todo sale de aqui.
export const totalDoctores = doctores.length;

export const especialidades = [...new Set(doctores.map((d) => d.especialidad))].sort(
  (a, b) => a.localeCompare(b, "es"),
);

export const totalEspecialidades = especialidades.length;

export const totalPisos = new Set(doctores.map((d) => d.piso)).size;

/** Cuantos medicos hay por especialidad. Alimenta el conteo del `select`. */
export const conteoPorEspecialidad = doctores.reduce<Record<string, number>>(
  (acc, d) => {
    acc[d.especialidad] = (acc[d.especialidad] ?? 0) + 1;
    return acc;
  },
  {},
);

export const destacados = doctores.filter((d) => d.destacado);

/** Los que traen foto. De aqui salen las caras de la pildora del hero. Hoy
 *  ninguno: las fotos reales todavia no se asignan, y las de stock no se le
 *  pegan a un medico real. */
export const conFoto = doctores.filter((d) => d.foto);

const porSlug = new Map(doctores.map((d) => [d.slug, d]));

export const buscarPorSlug = (slug: string): Doctor | undefined => porSlug.get(slug);

/** Otros medicos de la misma especialidad. Vacio si es el unico, como Nefrologia. */
export function mismosDeEspecialidad(doctor: Doctor, cuantos = 4): Doctor[] {
  return doctores
    .filter((d) => d.especialidad === doctor.especialidad && d.slug !== doctor.slug)
    .slice(0, cuantos);
}

/* Datos de la torre. Un solo edificio: no hay selector de ciudad ni de sucursal.
 *
 * Reales, tomados de doctowers.mx.
 *
 * El horario NO esta en su sitio y sigue siendo nuestro. Es lo unico de este
 * bloque que falta confirmar con Jordy.
 */
export const torre = {
  nombre: "DocTowers",
  direccion: "Blvd. Manuel Ávila Camacho 925, Boca del Río, Veracruz",
  telefono: "229 473 0349",
  correo: "contacto@doctowers.mx",
  horario: "Lunes a viernes de 7:00 a 21:00, sábados de 8:00 a 14:00",
};

/* Las marcas del area comercial. Pedidas por Jordy el 17-sep: una cuadricula
 * con los logos de los locales CONFIRMADOS, en lugar de la foto del lobby.
 *
 * Vacia a proposito hasta que Jordy mande la lista. Farmacias del Ahorro, El
 * Chopo y Optica Paris las dijo de ejemplo, no como firmadas, y un logo de una
 * marca que no ha firmado no se publica. Mientras este vacia, la seccion sigue
 * con la foto del lobby.
 *
 * `logo` es la ruta en public/img/marcas/, del archivo que entregue la marca o
 * DocTowers, nunca bajado de internet. */
export const marcas: { nombre: string; logo: string }[] = [];

/* Las cuentas reales, confirmadas por Valeria el 14-ago. Las dos devuelven 200,
 * verificado antes de publicarlas: un link muerto en el pie se lee como sitio
 * abandonado, y es lo contrario de lo que hace una red social ahi.
 *
 * Van aqui y no escritas en el Footer por la misma razon que todo lo demas de
 * este archivo: el dia que cambie una cuenta, se cambia en un solo lugar.
 */
export const redes = [
  { nombre: "Facebook", url: "https://www.facebook.com/doctowersmx/" },
  { nombre: "Instagram", url: "https://www.instagram.com/doctowers.mx" },
];
