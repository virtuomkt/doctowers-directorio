import { IconoBuscar, IconoCerrar } from "./Iconos";

/* El mismo componente en el hero del home y en el directorio, con dos
   comportamientos: en el home se envia y navega, en el directorio filtra
   conforme se escribe. Lo distingue `alEnviar`.

   Forma tomada de components/forms/SearchInput.jsx: pildora blanca con sombra
   alta y el boton metido adentro, tambien pildora. Su boton va en teal; aqui
   va en navy por la decision de contraste (src/index.css). */

type Props = {
  valor: string;
  alCambiar: (v: string) => void;
  alEnviar?: () => void;
  id?: string;
  etiqueta?: string;
  /** Mas corto que la etiqueta: a 390px "Busca por nombre, especialidad o
   *  consultorio" no cabe en el campo y se leia "...o co". */
  placeholder?: string;
  tamano?: "normal" | "grande";
};

export default function Buscador({
  valor,
  alCambiar,
  alEnviar,
  id = "buscador",
  etiqueta = "Busca por nombre, especialidad o consultorio",
  placeholder = "Nombre, especialidad o consultorio",
  tamano = "normal",
}: Props) {
  const grande = tamano === "grande";

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        alEnviar?.();
      }}
      className={`flex w-full items-center gap-3 rounded-pill border border-border bg-surface ${
        grande ? "p-2 pl-4 shadow-lg sm:pl-6" : "p-2 pl-4 shadow-card sm:pl-5"
      } focus-within:border-primary`}
    >
      <label htmlFor={id} className="sr-only">
        {etiqueta}
      </label>

      {!grande && <IconoBuscar className="shrink-0 text-text-muted" />}

      <input
        id={id}
        type="search"
        value={valor}
        onChange={(e) => alCambiar(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        /* El mismo alto en los dos tamanos. Antes el normal iba en `py-2.5`,
           que son 10px y no existen en la escala; lo que distingue al grande
           es la sombra y el boton, no el alto del campo. */
        className="min-w-0 flex-1 border-none bg-transparent py-3 text-body text-text-strong outline-none placeholder:text-text-muted max-sm:placeholder:text-body-sm [&::-webkit-search-cancel-button]:appearance-none"
      />

      {valor && (
        <button
          type="button"
          onClick={() => alCambiar("")}
          aria-label="Limpiar la búsqueda"
          className="shrink-0 rounded-pill p-2 text-text-muted hover:bg-background hover:text-text-strong"
        >
          <IconoCerrar />
        </button>
      )}

      {/* El boton solo existe donde hay algo que enviar. En el directorio filtra
          conforme se escribe, asi que un boton "Buscar" ahi seria decorativo. */}
      {alEnviar && (
        <button
          type="submit"
          className="inline-flex shrink-0 items-center gap-2 rounded-pill bg-primary px-6 py-4 text-body font-semibold text-text-invert transition-[background-color,color,box-shadow] duration-(--duration-fast) hover:bg-cta-hover hover:text-cta-hover-ink hover:shadow-teal"
        >
          <IconoBuscar className="size-[18px]" />
          <span className="hidden sm:inline">Buscar</span>
        </button>
      )}
    </form>
  );
}
