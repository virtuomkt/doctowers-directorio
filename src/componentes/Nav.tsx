import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Isotipo, Lockup } from "./Marca";
import { IconoChevron } from "./Iconos";

/* El nav del 10-ago, derivado de la pagina "Template" del archivo de Figma.
   Frames: 16:6 (home, sobre el hero) y 16:52 (nav sobre fondo blanco), mas
   18:527 y 17:393 para las dos versiones de mobile.

   Un solo componente con dos apariencias, no dos componentes. Lo que cambia
   entre ellas es el color, no la estructura:

     transparente  el logo va en blanco y la pildora es vidrio sobre el hero
     solido        el logo va en tinta y la pildora es navy, con barra pintada

   La barra pintada solo existe en el estado solido, y no es capricho: el nav
   es pegajoso, y sin fondo las 200 tarjetas del directorio se ven pasar por
   debajo del logotipo.

   Mobile y desktop no son el mismo arreglo con otras medidas, son dos arreglos
   distintos, y asi vienen en el archivo. En desktop el logo vive afuera de la
   pildora, a la izquierda. En mobile el nav ES una pildora, con el isotipo
   adentro y el boton del otro lado, y se cae el texto "Consultorios
   disponibles" porque a 402px no cabe. Ese dato no se pierde del sitio: sigue
   en la banda del home y en el footer.

   "Inicio" ya no esta. El logotipo es el link al home, asi que ningun link
   queda muerto, que es la regla. */

/** El unico boton del sitio en teal y no en navy. Por eso resalta. */
function BotonDirectorio() {
  return (
    <Link
      to="/directorio"
      /* Asimetrico a proposito: el chevron trae aire propio a su derecha, asi
         que ese lado lleva un escalon menos para que se vea centrado. La
         diferencia es de un paso de escala (20 y 16).

         Bajo de `text-body-lg` a `text-body` el 12-ago. El relleno vertical se
         queda en `py-3`, que con 16px deja el boton en 48px: se ve mas
         contenido y sigue arriba de los 44px de minimo tactil, que importan
         porque este mismo boton es el del nav de mobile. */
      className="inline-flex shrink-0 items-center gap-1 rounded-pill bg-cta py-3 pl-5 pr-4 text-body font-semibold text-text-invert transition-[background-color,color,box-shadow] duration-fast hover:bg-cta-hover hover:text-cta-hover-ink hover:shadow-teal"
    >
      Directorio
      <IconoChevron />
    </Link>
  );
}

export default function Nav() {
  const { pathname } = useLocation();
  const esHome = pathname === "/";

  /* El cambio de apariencia lo dispara el hero entrando y saliendo de pantalla,
     con un observer y no con un listener de scroll: el observer no corre en
     cada pixel, asi que no hace falta throttle.

     Si no hay hero que observar, el nav nace solido. Eso cubre el directorio y
     la ficha, y tambien el caso de que el home algun dia pierda el hero: sin
     este fallback el nav se quedaria en blanco sobre un fondo claro. */
  const [sobreHero, setSobreHero] = useState(esHome);

  useEffect(() => {
    const hero = esHome ? document.getElementById("hero") : null;
    if (!hero) {
      setSobreHero(false);
      return;
    }
    setSobreHero(true);
    const observador = new IntersectionObserver(
      ([entrada]) => setSobreHero(entrada.isIntersecting),
      // Se vuelve solido un poco antes de que el hero termine, para que el
      // cambio ocurra mientras todavia hay fondo oscuro detras y no despues.
      { rootMargin: "-80px 0px 0px 0px" },
    );
    observador.observe(hero);
    return () => observador.disconnect();
  }, [esHome, pathname]);

  const solido = !sobreHero;

  /* El nav publica su altura real en `--alto-nav`. La barra de filtros del
     directorio se pega justo debajo y antes lo hacia con un `top-14` a mano,
     que dejo de ser cierto en cuanto el nav crecio. Medirlo en vez de
     escribirlo evita que vuelva a desfasarse cada que cambie el diseno. */
  const barra = useRef<HTMLElement>(null);
  useEffect(() => {
    const nodo = barra.current;
    if (!nodo) return;
    const publicar = () =>
      document.documentElement.style.setProperty(
        "--alto-nav",
        `${Math.round(nodo.getBoundingClientRect().height)}px`,
      );
    publicar();
    const ro = new ResizeObserver(publicar);
    ro.observe(nodo);
    return () => ro.disconnect();
  }, []);

  return (
    <header
      ref={barra}
      className={[
        // Sobre el hero flota encima; en las otras vistas ocupa su lugar en el
        // flujo, asi no hace falta compensar con relleno arriba del contenido.
        esHome ? "fixed inset-x-0 top-0" : "sticky top-0",
        /* Transicionan los colores, NO el relleno. Si el alto se anima, el
           `ResizeObserver` de arriba publica alturas a medio camino y
           `--alto-nav` se queda con un valor que ya no es cierto. Ademas una
           barra que crece y encoge al hacer scroll se siente inestable. */
        "z-40 transition-[background-color,border-color] duration-base ease-standard",
        solido
          ? "border-b border-border bg-surface/95 py-3 backdrop-blur sm:py-4"
          // 56px arriba en desktop es la medida del archivo (frame 16:6).
          : "border-b border-transparent pt-4 pb-3 sm:pt-14 sm:pb-6",
      ].join(" ")}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* ── Mobile: el nav entero es una pildora ─────────────────────── */}
        <div
          className={[
            "flex items-center justify-between rounded-pill px-4 py-2 shadow-pill sm:hidden",
            solido
              ? "bg-primary"
              : "border border-accent/55 bg-white/12 backdrop-blur-[66px]",
          ].join(" ")}
        >
          <Link to="/" className="flex shrink-0 items-center rounded-sm">
            <Isotipo className="h-8 w-auto text-text-invert" />
            <span className="sr-only">DocTowers, inicio</span>
          </Link>
          <BotonDirectorio />
        </div>

        {/* ── Desktop: logo afuera, pildora a la derecha ────────────────── */}
        <div className="hidden items-center justify-between gap-6 sm:flex">
          <Link to="/" className="flex items-center gap-5 rounded-sm">
            <Lockup claro={!solido} className="h-[22px] w-auto" />
            <span
              aria-hidden
              className={[
                "h-12 w-px transition-colors duration-base",
                solido ? "bg-border" : "bg-text-invert/40",
              ].join(" ")}
            />
            <span
              className={[
                "text-body-lg transition-colors duration-base",
                solido ? "text-text-base" : "text-text-invert",
              ].join(" ")}
            >
              Veracruz
            </span>
          </Link>

          <div
            className={[
              /* El relleno NO cambia con el color. Antes el estado solido
                 media `pl-5 pr-4` y el de vidrio le encimaba `pl-6 pr-6`, que
                 gana por orden en la hoja compilada: la pildora se encogia al
                 volverse solida. Es la misma regla que ya sigue la barra de
                 aqui abajo, donde transicionan los colores y no el relleno. */
              "flex items-center gap-4 rounded-pill px-4 py-2 shadow-pill transition-colors duration-base",
              solido
                ? "bg-primary"
                : "border border-accent/55 bg-white/12 backdrop-blur-[66px]",
            ].join(" ")}
          >
            {/* Es etiqueta, no link: manda al ancla del home, que es la unica
                seccion que le habla al medico y no al paciente. */}
            <Link
              to="/#consultorios"
              className="rounded-sm text-body font-semibold text-text-invert transition-colors duration-fast hover:text-cta-hover"
            >
              Consultorios disponibles
            </Link>
            <BotonDirectorio />
          </div>
        </div>
      </div>
    </header>
  );
}
