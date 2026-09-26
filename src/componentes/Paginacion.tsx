/* Paginacion numerada, 24 por pagina. Las dos decisiones tienen razon:
 *
 * Numerada y no "cargar mas", porque el directivo que abra el directorio el
 * 15 de agosto tiene que ver de un golpe que hay 200 medicos y nueve paginas.
 * "Cargar mas" esconde la escala justo en la vista cuyo trabajo es demostrarla,
 * y ademas obliga a bajar hasta el fondo para llegar al footer.
 *
 * 24 y no 20 o 25, porque la cuadricula es de 4, 3, 2 y 1 columnas segun el
 * ancho: 24 se reparte exacto en las cuatro y ninguna pagina termina con una
 * fila coja. Da nueve paginas parejas para 200.
 */

import { IconoFlecha } from "./Iconos";

type Props = {
  pagina: number;
  totalPaginas: number;
  alCambiar: (p: number) => void;
};

/** Ventana de paginas alrededor de la actual, con la primera y la ultima
 *  siempre visibles. Con nueve paginas casi nunca corta, pero aguanta si el
 *  directorio crece. */
function ventana(pagina: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const paginas = new Set([1, total, pagina, pagina - 1, pagina + 1]);
  const ordenadas = [...paginas].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const salida: (number | "…")[] = [];
  let previa = 0;
  for (const p of ordenadas) {
    if (previa && p - previa > 1) salida.push("…");
    salida.push(p);
    previa = p;
  }
  return salida;
}

export default function Paginacion({ pagina, totalPaginas, alCambiar }: Props) {
  if (totalPaginas <= 1) return null;

  /* `min-w-11` son 44px, el minimo tactil. Con nueve paginas y los dos botones
     de texto completos la fila no cabe en 390px y "Siguiente" se caia sola a
     un segundo renglon, descentrada. En mobile quedan solo las flechas y el
     texto vuelve a partir de `sm`. */
  const boton =
    "inline-flex min-w-11 items-center justify-center gap-1 rounded-pill border px-3 py-2 text-body-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <nav aria-label="Paginación del directorio" className="flex justify-center">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        <li>
          <button
            type="button"
            onClick={() => alCambiar(pagina - 1)}
            disabled={pagina === 1}
            aria-label="Página anterior"
            className={`${boton} border-border bg-surface text-text-base hover:border-primary hover:text-primary`}
          >
            <IconoFlecha className="size-4 rotate-180" />
            <span className="hidden sm:inline">Anterior</span>
          </button>
        </li>

        {ventana(pagina, totalPaginas).map((p, i) =>
          p === "…" ? (
            <li key={`corte-${i}`} className="px-1 text-text-muted" aria-hidden>
              …
            </li>
          ) : (
            <li key={p}>
              <button
                type="button"
                onClick={() => alCambiar(p)}
                aria-current={p === pagina ? "page" : undefined}
                aria-label={`Página ${p} de ${totalPaginas}`}
                className={`${boton} tabular-nums ${
                  p === pagina
                    ? "border-primary bg-primary text-text-invert"
                    : "border-border bg-surface text-text-base hover:border-primary hover:text-primary"
                }`}
              >
                {p}
              </button>
            </li>
          ),
        )}

        <li>
          <button
            type="button"
            onClick={() => alCambiar(pagina + 1)}
            disabled={pagina === totalPaginas}
            aria-label="Página siguiente"
            className={`${boton} border-border bg-surface text-text-base hover:border-primary hover:text-primary`}
          >
            <span className="hidden sm:inline">Siguiente</span>
            <IconoFlecha className="size-4" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
