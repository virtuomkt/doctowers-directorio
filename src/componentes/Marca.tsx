import { ruta } from "../lib/ruta";

/* El logotipo, en sus dos formas.
 *
 * `Lockup` es el archivo completo, cruz mas palabra. Va en desktop y en el
 * footer. Se sirve como `<img>` porque no necesita recortarse.
 *
 * `Isotipo` es la cruz mas la D, y NO puede ser un `<img>`. El archivo que
 * entrego Rebeca (`favicon.svg`) mide 502x319 dentro de un lienzo de 512x512,
 * o sea que trae 97px de aire arriba y abajo. Eso esta bien para un favicon,
 * donde el margen es parte del formato, pero en el nav pedir 32px de alto
 * entregaria una marca visible de 20px flotando arriba. El `viewBox` recortado
 * lo arregla sin tocar el archivo, y `viewBox` solo existe en SVG inline.
 *
 * La D usa `currentColor` porque cambia con el fondo: blanca dentro de la
 * pildora oscura del nav, tinta sobre claro. La cruz se queda en el teal de
 * marca en los dos casos, que es como esta en el mockup.
 */

type Props = { className?: string };

/** Recorte a lo que ocupa el dibujo dentro del lienzo de 512. */
const CAJA = "5 97 502 319";

export const Isotipo = ({ className }: Props) => (
  <svg
    className={className}
    viewBox={CAJA}
    fill="none"
    role="img"
    aria-label="DocTowers"
  >
    <path
      d="M343.736 416H244.733V390.418C244.733 376.803 255.822 365.766 269.501 365.766H344.411C404.151 365.766 454.712 319.236 456.482 259.805C458.322 198.052 408.383 147.234 346.745 147.234H271.099C256.537 147.234 244.732 135.485 244.732 120.992V97H346.745C436.394 97 509.086 170.647 506.954 260.345C504.885 347.419 431.249 416 343.736 416Z"
      fill="currentColor"
    />
    <path
      d="M190.49 231.387H299.387C313.818 231.387 325.514 243.03 325.514 257.393V281.619H190.49V415.996H164.18C150.839 415.995 140.025 405.23 140.025 391.951V281.619H31.1576C16.7116 281.619 5 269.96 5 255.583V231.387H140.025V97H190.49V231.387Z"
      fill="var(--color-accent)"
    />
  </svg>
);

/** `claro` es para fondo oscuro: el hero. */
export const Lockup = ({
  className,
  claro = false,
}: Props & { claro?: boolean }) => (
  <img
    src={ruta(claro ? "/img/doctowers-logo-white-teal.svg" : "/img/doctowers-logo-black-teal.svg")}
    alt="DocTowers"
    className={className}
  />
);
