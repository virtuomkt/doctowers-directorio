import { ruta } from "../lib/ruta";
import Revelar from "./Revelar";
import { marcas } from "../datos";
import {
  IconoFarmacia,
  IconoLaboratorio,
  IconoOptica,
  IconoComercio,
} from "./Iconos";

/* Pedida por Jordy el 13-ago: "otro donde hable de la zona comercial, nuestra
 * zona comercial y logos de las marcas y un poco de info, farmacia, optica,
 * laboratorios".
 *
 * VA SIN LOGOS A PROPOSITO, y esto sigue siendo lo importante de este archivo.
 *
 * Su sitio menciona farmacias, laboratorios y comercios de salud, pero no
 * nombra una sola marca. Poner un logo exige dos cosas que hoy no tenemos: el
 * archivo original, que no se baja de internet porque son marcas registradas de
 * terceros, y saber si esos negocios ya firmaron o son prospectos. Un logo de
 * una farmacia que todavia no firma no es un detalle de diseno.
 *
 * Asi que la seccion se sostiene con las categorias, que si son ciertas, y con
 * nada mas. La foto de la planta baja salio el 26-sep por decision de Valeria:
 * la foto era provisional. Cuando `marcas` en datos.ts traiga los locales
 * confirmados, aparece la cuadricula de logos debajo de las tarjetas, que es
 * lo que pidio Jordy el 17-sep: varias lineas, no una sola tira.
 *
 * La optica no aparece en su sitio: la nombro Jordy. Queda pendiente de
 * confirmar con el.
 *
 * MAQUETA DEL 13-AGO, sobre la segunda referencia de Valeria: titulo corto con
 * la segunda palabra en acento, una linea de entrada, las cuatro tarjetas como
 * ya estaban, y la foto de la planta baja a todo lo ancho debajo.
 */

const LOCALES = [
  {
    Icono: IconoFarmacia,
    titulo: "Farmacia",
    texto: "Surtes tu receta al salir, sin buscar otra sucursal.",
  },
  {
    Icono: IconoLaboratorio,
    titulo: "Laboratorio",
    texto: "Los estudios que te pidieron, en la planta baja.",
  },
  {
    Icono: IconoOptica,
    titulo: "Óptica",
    texto: "De la consulta de oftalmología a tus lentes, en la misma visita.",
  },
  {
    Icono: IconoComercio,
    titulo: "Salud y bienestar",
    texto: "Comercios pensados para quien viene a atenderse.",
  },
];

export default function SeccionComercios() {
  return (
    <section id="comercios" className="scroll-mt-32">
      <div className="mx-auto max-w-6xl px-4 pt-20 pb-12 sm:px-6 sm:pt-24 sm:pb-16">
        <Revelar>
          {/* El acento cae en la segunda palabra, como en la referencia. Aqui si
              es el teal del sistema: la excepcion azul es del hospital y no sale
              de su seccion. */}
          <h2 className="font-display text-h1 font-bold text-balance text-text-strong">
            Área <span className="text-accent-text">comercial</span>
          </h2>
          {/* Una linea de entrada, no un parrafo: en la referencia es una sola
              frase corta y las tarjetas hacen el resto. */}
          <p className="mt-4 text-body text-text-base">
            En DocTowers resuelves todo en un solo lugar:
          </p>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {LOCALES.map(({ Icono, titulo, texto }) => (
              <li
                key={titulo}
                className="rounded-md border border-border bg-surface p-6 shadow-card"
              >
                <Icono className="size-7 text-icon-accent" />
                <h3 className="mt-5 text-body-lg font-semibold text-text-strong">
                  {titulo}
                </h3>
                <p className="mt-2 text-body-sm text-text-base">{texto}</p>
              </li>
            ))}
          </ul>
        </Revelar>
      </div>

      {marcas.length > 0 ? (
        <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-24">
          {/* Todos los logos del mismo alto maximo: una marca no
              puede verse mas grande que otra solo porque su archivo trae
              menos aire alrededor. */}
          <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {marcas.map(({ nombre, logo }) => (
              <li
                key={nombre}
                className="flex h-32 items-center justify-center rounded-md border border-border bg-surface p-6 shadow-card"
              >
                <img src={ruta(logo)} alt={nombre} loading="lazy" className="max-h-16 w-auto max-w-full object-contain" />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
