import type { ReactNode } from "react";

type Variante = "primario" | "secundario" | "cta";
type Tamano = "normal" | "chico";

/* En este design system las acciones son pildoras, no rectangulos redondeados.
   Medidas de components/core/Button.jsx: radius-pill, padding 12/22, peso 600.

   El horizontal sube de 22 a 24 (`px-6`). Su propio Button dice 22, pero 22 no
   existe en su propia escala de espaciado, que va de 20 a 24 sin escalon en
   medio. Entre respetar el componente y respetar la escala gana la escala: es
   la regla que sostiene las tres vistas, y dos pixeles en una pildora no se
   ven. Anotado en design-system/espaciado.md. */
const BASE =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-pill font-semibold transition-[filter,background-color,color,box-shadow,border-color] duration-(--duration-fast) hover:shadow-teal disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none";

/* El chico entro el 13-ago para el "Limpiar y ver 200 especialistas" del
   directorio, que era un link de texto y Valeria pidio que fuera boton.

   Existe como tamano y no como clases sueltas en esa vista por como resuelve
   Tailwind los empates: dos utilidades de la misma propiedad no ganan por el
   orden en que se escriben en el `class`, sino por el orden en que salen en el
   CSS. `px-5` sale antes que `px-6`, asi que pasarlo por `className` no habria
   hecho nada. Ya nos paso con la pildora del nav.

   Los valores salen de la escala: 20/8 en lugar de 24/12. */
const TAMANOS: Record<Tamano, string> = {
  normal: "px-6 py-3 text-body",
  chico: "px-5 py-2 text-body-sm",
};

/* El primario y el secundario se distinguen por relleno contra contorno, no
   solo por color. Quien no distingue los dos colores sigue viendo cual manda.

   El primario es navy y no el teal de marca: el teal con texto blanco da
   1.95:1. La decision completa esta en src/index.css. */
/* El primario y el CTA van al mismo teal de marca en hover (decision del
   12-ago), y los dos voltean la tinta a navy: con texto blanco ese teal da
   2.14:1.

   CORRECCION DEL 13-AGO, el secundario ya no. Se estaba rellenando del mismo
   teal solido que los otros dos, asi que en hover los tres terminaban siendo el
   mismo boton y el secundario se leia como CTA. Eso rompia la regla de dos
   lineas mas arriba, que es la que sostiene la jerarquia: contorno contra
   relleno.

   Ahora el secundario se queda de contorno toda su vida. Lo que cambia es el
   borde, que pasa al teal de las tarjetas, y un fondo teal apenas insinuado.
   Sigue siendo el mismo teal de marca, o sea que no pierde la familia, pero
   nadie lo confunde con la accion principal. La tinta ni se mueve: navy sobre
   ese teal claro da 12.26:1, el par que el script ya vigila. */
const VARIANTES: Record<Variante, string> = {
  primario:
    "bg-primary text-text-invert hover:bg-cta-hover hover:text-cta-hover-ink",
  secundario:
    "bg-surface text-primary border border-border hover:border-border-hover hover:bg-accent-soft",
  /* El teal, para acciones sobre fondo oscuro. El navy del primario se pierde
     encima de una foto con velo navy; el teal es justo donde el sistema dice
     que brilla. Mismo tratamiento que el boton del nav, en un solo lugar para
     no tener dos teales sueltos que se desfasen. */
  cta: "bg-cta text-text-invert hover:bg-cta-hover hover:text-cta-hover-ink",
};

type Props = {
  variante?: Variante;
  tamano?: Tamano;
  children: ReactNode;
  icono?: ReactNode;
  className?: string;
} & (
  | ({ como: "enlace"; href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({ como?: "boton" } & React.ButtonHTMLAttributes<HTMLButtonElement>)
);

export default function Boton({
  variante = "primario",
  tamano = "normal",
  children,
  icono,
  className = "",
  ...resto
}: Props) {
  const clases = `${BASE} ${TAMANOS[tamano]} ${VARIANTES[variante]} ${className}`;

  if (resto.como === "enlace") {
    const { como: _como, ...props } = resto;
    void _como;
    return (
      <a className={clases} {...props}>
        {icono}
        {children}
      </a>
    );
  }

  const { como: _como, ...props } = resto as { como?: "boton" } & React.ButtonHTMLAttributes<HTMLButtonElement>;
  void _como;
  return (
    <button className={clases} {...props}>
      {icono}
      {children}
    </button>
  );
}
