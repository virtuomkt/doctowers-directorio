import { totalDoctores, totalEspecialidades, totalPisos } from "../datos";
import { IconoCruz } from "./Iconos";
import { usarContador } from "../lib/usarContador";

/* Los tres numeros salen de los datos, nunca escritos a mano. Hoy son 200, 30
   y 12: dos y tres digitos conviviendo, asi que el numero se dimensiona por
   linea de texto y no por ancho, y un "12" no se ve perdido al lado de un "200".

   Las tres cajas llevan la misma cruz desde el 10-ago, por decision de Valeria.
   Antes cada una traia su propio icono de Heroicons: personas, cuadricula y
   edificio. Se gana marca y se pierde la distincion entre las tres, y eso fue
   a proposito: el dato lo carga el numero y la etiqueta, no el dibujo.

   Mobile: una sola columna, con la caja en horizontal. Antes eran dos columnas
   y la tercera al ancho completo, que dejaba al "12" flotando en una caja del
   doble de ancho que las otras dos. */

const CAJAS = [
  { valor: totalDoctores, uno: "Especialista", varios: "Especialistas" },
  { valor: totalEspecialidades, uno: "Especialidad", varios: "Especialidades" },
  { valor: totalPisos, uno: "Piso de consultorios", varios: "Pisos de consultorios" },
];

/* Una caja aparte porque cada una lleva su propio contador, y un hook no se
   puede llamar dentro de un `map`. */
function Caja({
  valor,
  uno,
  varios,
}: {
  valor: number;
  uno: string;
  varios: string;
}) {
  const { valor: contado, ref } = usarContador(valor);

  return (
    <li
      ref={ref as React.RefObject<HTMLLIElement>}
      className="flex items-center gap-5 rounded-md border border-border bg-surface p-6 shadow-card md:block md:p-8"
    >
      <IconoCruz className="size-7 text-icon-accent" />
      <div>
        {/* `tabular-nums` ya estaba y aqui se vuelve necesario: sin el, cada
            digito cambia de ancho mientras cuenta y el numero tiembla.
            El texto accesible es el valor final desde el primer momento; lo
            que se anima es solo lo que se ve. */}
        <p
          className="font-display text-h1 leading-none font-bold text-text-strong tabular-nums md:mt-5"
          aria-label={String(valor)}
        >
          <span aria-hidden>{contado}</span>
        </p>
        {/* El plural sale del valor final, no del que va contando: si no, la
            etiqueta diria "1 Especialista" durante los primeros cuadros. */}
        <p className="mt-2 text-body-sm text-text-muted">
          {valor === 1 ? uno : varios}
        </p>
      </div>
    </li>
  );
}

export default function TiraNumeros() {
  return (
    <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-5 px-4 sm:px-6 md:grid-cols-3">
      {CAJAS.map((caja) => (
        <Caja key={caja.uno} {...caja} />
      ))}
    </ul>
  );
}
