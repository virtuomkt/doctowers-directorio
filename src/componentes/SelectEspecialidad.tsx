import { especialidades, conteoPorEspecialidad, totalDoctores } from "../datos";
import { IconoChevronAbajo } from "./Iconos";

/* Un `select` nativo, no un panel de filtros: el panel no cabe en la fecha, y
   sobre todo el nativo resuelve solo el problema de 30 opciones en mobile.
   iOS y Android lo abren como rueda o como hoja a pantalla completa, que es
   mejor de lo que armariamos a mano y ya lo sabe usar cualquiera.

   Sigue siendo nativo, y ese es el punto. Lo unico que cambio el 12-ago es que
   la lista desplegada ya se ve como el sitio y no como el sistema operativo,
   con `appearance: base-select`. El estilo vive en src/index.css, dentro de un
   `@supports`, asi que donde no haya soporte esto se comporta igual que antes.
   No se perdio nada: ni el type-ahead, ni el teclado, ni la hoja de mobile. */

type Props = {
  valor: string;
  alCambiar: (v: string) => void;
  id?: string;
};

export default function SelectEspecialidad({
  valor,
  alCambiar,
  id = "especialidad",
}: Props) {
  /* `flex` en el envoltorio para que el `select` lo llene. En el directorio
     este componente es hermano del buscador en una fila flex, y el buscador es
     mas alto, asi que el envoltorio se estira. Sin esto el campo se queda en su
     alto natural, el chevron se centra sobre el envoltorio estirado y cae 4px
     abajo del centro del campo. De paso los dos controles quedan de la misma
     altura, que es como se ven bien lado a lado.

     `sm:w-80` y no `w-72` desde que el cuerpo subio a 18px el 26-sep: a 288
     de ancho "Todas las especialidades (84)" se partia en dos renglones. */
  return (
    <div className="grupo-select relative flex w-full sm:w-80">
      <label htmlFor={id} className="sr-only">
        Filtrar por especialidad
      </label>
      <select
        id={id}
        value={valor}
        onChange={(e) => alCambiar(e.target.value)}
        className="select-ds w-full rounded-md border border-border bg-surface py-3 pr-11 pl-4 text-body text-text-strong transition-colors focus:border-primary"
      >
        <option value="">Todas las especialidades ({totalDoctores})</option>
        {especialidades.map((e) => (
          <option key={e} value={e}>
            {e} ({conteoPorEspecialidad[e]})
          </option>
        ))}
      </select>
      {/* `pointer-events-none` para que el clic siga cayendo en el `select` y no
          en el icono, que es lo unico que se rompe al sacarlo del fondo.
          Gira al abrir: la regla vive en index.css porque necesita mirar el
          estado del `select`, que es su hermano y no su padre. */}
      <IconoChevronAbajo className="chevron-select pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-text-muted transition-transform duration-fast" />
    </div>
  );
}
