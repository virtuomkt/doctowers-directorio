import Revelar from "./Revelar";
import { IconoHospital, IconoEstrella, IconoEquipo, IconoRed } from "./Iconos";
import { ruta } from "../lib/ruta";

/* Pedida por Jordy el 13-ago: "un espacio donde hable del hospital".
 *
 * El hospital esta DENTRO de la torre, confirmado por Valeria, y se llama
 * Fifty Doctors Hospital. El nombre salio de los archivos que ella entrego el
 * 13-ago, no de su sitio: ahi nunca aparece.
 *
 * Los datos salen de doctowers.mx, no inventados: los 2,000 m², la
 * "hospitalidad cinco estrellas", las areas de descanso y la tecnologia
 * avanzada en equipo medico son suyos, escritos por ellos.
 *
 * Le habla al PACIENTE, que es a quien le habla el resto del sitio. El hospital
 * en el mismo edificio es, para el, una ventaja practica: no tener que ir a
 * otro lado despues de la consulta. Contarlo como folleto de la torre habria
 * metido una segunda voz en una pagina que solo tiene una.
 *
 * La cuarta tarjeta, la de la red, la pidio Jordy el 17-sep: "un bullet de en
 * donde mas esta", la cantidad y no el nombre de las ciudades. Las cifras son
 * las que Fifty Doctors publica en 50doctors.mx, verificadas en su HTML el
 * 26-sep: "4 Hospitales en operación" y "32 Hospitales en desarrollo". Si la
 * red crece, se cambia aqui.
 *
 * MAQUETA DEL 13-AGO, sobre la referencia que entrego Valeria: fondo con la
 * textura y el edificio, logo del hospital arriba, titulo con la primera parte
 * en acento, y las tres tarjetas que ya estaban, ahora en blanco.
 */

const PUNTOS = [
  {
    Icono: IconoHospital,
    titulo: "2,000 m² de hospital",
    texto: "En el mismo edificio, sin traslados entre la consulta y el estudio.",
  },
  {
    Icono: IconoEstrella,
    titulo: "Hospitalidad cinco estrellas",
    texto: "Áreas de descanso y atención cercana para el paciente y su familia.",
  },
  {
    Icono: IconoEquipo,
    titulo: "Tecnología avanzada",
    texto: "Equipo médico de última generación dentro de la misma torre.",
  },
  {
    Icono: IconoRed,
    titulo: "Parte de la red Fifty Doctors",
    texto: "4 hospitales en operación y 32 más en desarrollo.",
  },
];

export default function SeccionHospital() {
  return (
    <section id="hospital" className="relative scroll-mt-32 overflow-hidden">
      {/* La imagen trae la textura, las lineas y el edificio en una sola pieza,
          asi la entrego Valeria. Pesaba 2.6 MB en PNG; reescalada a 1600 y en
          JPEG al 60 se queda en 295 KB, que es lo mismo que ya pesa el fondo de
          consultorios.

          `object-left` en movil y `object-right` en escritorio, y no es un
          capricho: al recortar a lo ancho de un telefono solo cabe un cuarto de
          la imagen. Anclada a la derecha, ese cuarto seria puro edificio y las
          tarjetas caerian encima de las ventanas; anclada a la izquierda cae
          sobre la textura lisa, que es donde el texto se lee. En escritorio la
          proporcion de la seccion y la de la imagen casi coinciden, asi que
          practicamente no hay recorte y el edificio queda donde va. */}
      <img
        src={ruta("/img/hospital-background.jpg")}
        alt=""
        aria-hidden
        className="absolute inset-0 size-full object-cover object-left sm:object-right"
      />
      {/* Velo blanco medido. El detalle esta en src/index.css. */}
      <div className="velo-hospital absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <Revelar>
          {/* Este si lleva `alt`: no es decoracion, es el nombre del hospital y
              es la unica parte de la seccion que lo dice. Recortado de los
              1620x1620 originales, que eran 96% vacio, a su caja real. */}
          <img
            src={ruta("/img/hospital-logo.png")}
            alt="Fifty Doctors Hospital"
            width={580}
            height={99}
            className="h-9 w-auto sm:h-11"
          />
          {/* El titulo y el color salen de la referencia de Valeria del 13-ago.
              El azul es el de Fifty Doctors Hospital y esta declarado en
              src/index.css como excepcion: es el unico color del sitio fuera de
              la paleta, existe para que la palabra case con el logotipo de
              arriba, y no debe aparecer en ninguna otra vista.

              Sin parrafo debajo, tambien por instruccion del 13-ago. Las tres
              tarjetas ya cuentan lo que contaba el parrafo, y sin el la seccion
              deja ver el edificio, que era el punto de la referencia. */}
          <h2 className="mt-6 font-display text-h1 font-bold text-balance text-text-strong">
            <span className="text-hospital">Hospital</span> en la misma torre
          </h2>

          {/* Las tarjetas no se rediseñaron, solo pasaron de gris a blanco: sobre
              la textura, el gris se confundia con el fondo. */}
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PUNTOS.map(({ Icono, titulo, texto }) => (
              <li
                key={titulo}
                className="rounded-md border border-border bg-surface p-6 shadow-card md:p-8"
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
    </section>
  );
}
