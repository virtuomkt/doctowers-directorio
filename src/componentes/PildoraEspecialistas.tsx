import { conFoto, totalDoctores } from "../datos";
import { ruta } from "../lib/ruta";

/* La pildora del hero. Frame 16:45 en desktop, 18:594 en mobile.
   Va montada sobre el borde de abajo del hero, mitad dentro y mitad fuera.

   El numero sale de `doctores.json` como todos los del sitio. En el mockup
   lleva "+" y aqui no: el numero es exacto, y el "+" seria un numero escrito a
   mano disfrazado.

   Sin fotos, la pildora se queda con el texto. Antes desaparecia entera, y con
   los datos reales, que todavia no traen fotos, el hero se quedaba sin ella.

   El texto se acorta en mobile, tal como viene en el archivo: a 402px las
   cuatro caras mas la frase completa no caben en una linea. */

const CUANTAS = 4;

export default function PildoraEspecialistas() {
  const caras = conFoto.slice(0, CUANTAS);

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-pill bg-surface py-2 shadow-pill ${
        caras.length ? "px-3" : "px-6 sm:py-3"
      }`}
    >
      {caras.length > 0 && (
      <ul className="flex shrink-0 items-center">
        {caras.map((d, i) => (
          <li
            key={d.slug}
            /* El traslape es de 19px en los dos tamanos, asi viene en el
               archivo. Como el avatar cambia de 44 a 54, el paso cambia solo. */
            className={i < caras.length - 1 ? "-mr-[19px]" : ""}
          >
            <img
              src={ruta(d.foto)}
              alt=""
              aria-hidden
              className="size-11 rounded-full object-cover ring-2 ring-surface sm:size-[54px]"
            />
          </li>
        ))}
      </ul>
      )}
      <p className="shrink-0 text-body font-semibold text-primary sm:text-body-lg">
        {totalDoctores} especialistas
        <span className="hidden sm:inline"> en un solo lugar</span>
      </p>
    </div>
  );
}
