import type { Doctor } from "../datos";

/** Marcas de acento que NFD deja sueltas despues de separarlas de su letra. */
const ACENTOS = /[̀-ͯ]/g;

/**
 * Normaliza para comparar: minusculas y sin acentos.
 *
 * Es la pieza que sostiene la busqueda en espanol. Sin esto, "cardiologia"
 * no encuentra "Cardiología" y el buscador se siente roto justo con el
 * usuario que escribe rapido y sin acentos, que es la mayoria en celular.
 *
 * La n con virgulilla se normaliza a "n" a proposito: se descompone en n mas
 * acento, asi que "nino" encuentra "niño" y "niño" tambien. Las dos direcciones
 * sirven, que es lo que queremos.
 */
export function normalizar(texto: string): string {
  return texto.normalize("NFD").replace(ACENTOS, "").toLowerCase().trim();
}

/**
 * Filtra por texto libre y por especialidad. Los dos se suman, no se pisan.
 *
 * El texto busca en tres cosas, lo que pidio Jordy el 17-sep: nombre,
 * especialidad y consultorio. La especialidad se busca en la categoria y en lo
 * que escribio el medico, asi "endoscopia" encuentra a quien la tiene en su
 * detalle aunque su categoria sea Ginecologia.
 *
 * El consultorio va por prefijo y no por coincidencia parcial: "30" tiene que
 * traer el 302 y el 305, no tambien el 1030 y el 730. Acepta como lo escribe
 * la gente: "302", "C302" o "consultorio 302".
 *
 * La coincidencia es parcial, no por palabra completa: "cardio" encuentra
 * "Cardiología". Ojo con el efecto de lado: "pedia" trae Pediatría y tambien
 * Traumatología y Ortopedia, porque "pedia" esta dentro de "Ortopedia". Es
 * correcto y esta decidido asi, pero conviene verlo antes de decidir si se
 * resalta el texto que coincide en pantalla.
 */
export function filtrarDoctores(
  lista: Doctor[],
  consulta: string,
  especialidad: string,
): Doctor[] {
  const q = normalizar(consulta);
  const numero = q.match(/^(?:consultorio\s*|c\s*)?(\d+)$/)?.[1];

  return lista.filter((d) => {
    if (especialidad && d.especialidad !== especialidad) return false;
    if (!q) return true;
    if (numero) {
      // "525 y 526" son dos puertas: cualquiera de las dos cuenta.
      return (d.consultorio.match(/\d+/g) ?? []).some((c) => c.startsWith(numero));
    }
    return (
      normalizar(d.nombre).includes(q) ||
      normalizar(d.especialidad).includes(q) ||
      normalizar(d.especialidad_detalle).includes(q)
    );
  });
}
