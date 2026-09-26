import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Buscador from "../componentes/Buscador";
import TiraNumeros from "../componentes/TiraNumeros";
import TarjetaDoctor from "../componentes/TarjetaDoctor";
import PildoraEspecialistas from "../componentes/PildoraEspecialistas";
import Boton from "../componentes/Boton";
import Revelar from "../componentes/Revelar";
import SeccionHospital from "../componentes/SeccionHospital";
import SeccionComercios from "../componentes/SeccionComercios";
import { IconoFlecha, IconoTelefono } from "../componentes/Iconos";
import { destacados, torre } from "../datos";
import { ruta } from "../lib/ruta";

/* El unico trabajo del home es mandar al directorio. No es una landing de la
   torre. Por eso el buscador es lo mas pesado de la pantalla y nada compite
   con el. */

export default function Home() {
  const [consulta, setConsulta] = useState("");
  const navegar = useNavigate();

  const buscar = () =>
    navegar(consulta.trim() ? `/directorio?q=${encodeURIComponent(consulta.trim())}` : "/directorio");

  return (
    <>
      {/* Hero. La fachada de noche, tomada con dron el 3-sep; la pidio Jordy el
          17-sep para que se vea el edificio. Original de 4032x3024 en el Drive
          de Virtuo (DOCTOWERS / 04 Fotos y Dron Fachada y Piso 3 / DRON /
          DJI_20260903204601_0022_D.JPG), publicada a 2400 de ancho en JPEG 62:
          572 KB. El degradado de tokens/colors.css va debajo, asi que si la
          imagen tarda en cargar el hero nunca se ve en blanco.

          Anclada al 70% de alto: asi entra el letrero de DocTowers, que vive
          abajo a la izquierda de la foto, sin perder el cielo negro de arriba. */}
      {/* El `id` no es decorativo: el nav lo observa para saber cuando dejar de
          ser transparente. Si desaparece, el nav nace solido y nada se rompe. */}
      <section id="hero" className="fondo-hero relative">
        <img
          src={ruta("/img/hero-fachada.jpg")}
          alt=""
          aria-hidden
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover object-[50%_70%]"
        />
        {/* Velo navy en degradado. El detalle y la medicion estan en
            src/index.css, en `.velo-fachada`. */}
        <div className="velo-fachada absolute inset-0" aria-hidden />
        {/* El relleno de arriba tiene que librar al nav, que en el home flota
            encima del hero en vez de ocupar su lugar en el flujo. El nav mide
            146px en desktop, asi que 256 dejan 110 de respiro. En el archivo
            ese respiro son 162 sobre un lienzo de 1920, o sea la misma
            proporcion en una pantalla mas chica. */}
        {/* El titulo va a lo ancho del contenedor de la pagina y el buscador
            no. A 88px, en los 848px que dejaba `max-w-4xl` el titulo caia en
            tres renglones angostos, y Valeria lo queria en dos (26-sep): con
            `max-w-6xl` cabe "Encuentra a tu medico / en DocTowers". El buscador
            se queda en su ancho de antes, porque un campo de 1100px se lee como
            barra, no como pregunta. En movil siguen siendo tres renglones: a
            40px, "Encuentra a tu medico" no cabe en 358. */}
        <div className="relative mx-auto max-w-6xl px-4 pt-40 pb-32 text-center sm:px-6 sm:pt-64 sm:pb-48">
          <h1 className="entra font-display text-display font-bold text-balance text-text-invert">
            {/* El corte va despues de "medico" desde `lg`, donde la primera linea
                ya cabe entera a 88px. Sin el `br`, `text-balance` elegia
                "Encuentra a / tu medico en DocTowers", que deja una linea corta
                y otra larga. Abajo de `lg` manda el balance, y "tu medico" no
                se separa para que nunca quede "a tu / medico". */}
            Encuentra a <span className="whitespace-nowrap">tu médico</span>
            <br className="hidden lg:inline" /> en DocTowers
          </h1>
          {/* El subtitulo se fue el 10-ago: la pildora de aqui abajo dice lo
              mismo y con caras. Dos veces el mismo dato competia consigo mismo. */}
          <div className="entra entra-2 mx-auto mt-10 max-w-4xl sm:mt-12">
            <Buscador
              id="buscador-home"
              valor={consulta}
              alCambiar={setConsulta}
              alEnviar={buscar}
              tamano="grande"
            />
          </div>
        </div>

        {/* Montada sobre el borde de abajo, mitad dentro del hero y mitad
            fuera, como en el frame 16:45.

            Se centra con `flex` y no con `left-1/2 -translate-x-1/2`: un
            absoluto anclado a la mitad solo puede medir la mitad del ancho, y
            a 402px la pildora no cabia en esa mitad, asi que el texto se salia
            de su propio fondo blanco. */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex translate-y-1/2 justify-center px-4">
          {/* La clase va aqui adentro y no en el div de arriba: ese usa
              `translate-y-1/2` para montarse sobre el borde del hero, y la
              animacion tambien anima `translate`. Encimadas, la pildora
              terminaria en el lugar equivocado. */}
          <div className="entra entra-3">
            <PildoraEspecialistas />
          </div>
        </div>
      </section>

      {/* El relleno de arriba libra la mitad de la pildora que sobresale del
          hero y deja aire despues. La tira ya no monta sobre el hero: ese lugar
          lo ocupa ella.

          Un solo valor para los dos tamanos desde el 13-ago. Antes el
          escritorio iba en `sm:pt-28`, que son 112px y no existen en la escala.
          La pildora sobresale unos 35px en escritorio y unos 30 en movil, o sea
          que la diferencia real entre los dos casos son 5px, no 16. Con 96
          quedan unos 60px de aire libre en ambos, que es de sobra. */}
      <section className="pt-24 pb-4">
        <h2 className="sr-only">La torre en números</h2>
        <TiraNumeros />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <Revelar>
          {/* "Especialistas" a secas, por peticion de Jordy del 13-ago.
              Son 4 de 200, asi que el titulo solo no dice toda la verdad; lo
              corrige el link de abajo, "Ver el directorio completo". */}
          <h2 className="font-display text-h1 font-bold text-text-strong">
            Especialistas
          </h2>
          {/* Dos por fila y no cuatro desde que la tipografia subio el 26-sep:
              a cuatro columnas la tarjeta mide 273px y "Dr. Guillermo Gerardo
              Abrego Rodriguez" se cortaba a media palabra. */}
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {destacados.map((d) => (
              <TarjetaDoctor key={d.slug} doctor={d} />
            ))}
          </ul>
          <Link
            to="/directorio"
            className="mt-8 inline-flex items-center gap-2 rounded-sm text-body font-semibold text-primary transition-colors hover:text-link-hover"
          >
            Ver el directorio completo
            <IconoFlecha className="size-4" />
          </Link>
        </Revelar>
      </section>

      {/* Las dos de la torre, pedidas por Jordy el 13-ago. Van DESPUES de los
          especialistas y antes de consultorios: primero el camino del paciente,
          que es el trabajo del sitio, y luego lo que la torre ofrece. */}
      <SeccionHospital />
      <SeccionComercios />

      {/* La unica parte del sitio que no le habla al paciente, sino al medico
          que podria rentar.

          MAQUETA DEL 14-AGO, sobre la referencia de Valeria: dos mitades, el
          texto sobre blanco a la izquierda y la foto del consultorio sangrando
          hasta la orilla derecha. Antes era una foto a todo lo ancho con velo
          navy y el texto encima en blanco, que era la unica seccion del home
          que se leia en negativo. Con las del hospital y comercios ya puestas,
          desentonaba.

          Se van con ella dos cosas que ya no hacen falta: el velo navy y la
          foto de fondo, archivada en design-system/originales/.

          El `id` es el destino de "Consultorios disponibles" del nav. El
          `scroll-mt` existe porque el nav es pegajoso: sin el, el ancla deja la
          seccion justo debajo de la barra y se ve cortada. */}
      <section id="consultorios" className="scroll-mt-32 bg-surface">
        <div className="grid lg:min-h-[560px] lg:grid-cols-2">
          {/* El relleno izquierdo alinea el titulo con el resto de la pagina.
              `(100vw - 72rem) / 2` es exactamente el margen que deja
              `max-w-6xl` centrado, y el `max()` lo baja al canalon normal
              cuando la ventana es mas angosta que el contenedor. Sin esto el
              titulo arrancaria pegado a la orilla, o habria que meterlo en un
              contenedor centrado y entonces la foto ya no podria sangrar. */}
          <div className="flex items-center px-4 py-16 sm:px-6 sm:py-20 lg:py-24 lg:pr-12 lg:pl-[max(1.5rem,calc((100vw-72rem)/2))]">
            <Revelar className="max-w-xl">
              <h2 className="font-display text-h1 font-bold text-balance text-text-strong">
                Aún estás a tiempo de asegurar tu lugar
              </h2>
              <p className="mt-6 text-body-lg text-pretty text-text-base">
                El primer punto médico de Veracruz aún tiene espacios
                disponibles.
              </p>
              {/* Va al telefono de la torre y no a un formulario, porque en este
                  sitio no hay formularios: los unicos dos campos son el buscador
                  y el `select`. El telefono ademas es el camino que el proyecto
                  ya tenia escrito para este negocio. */}
              <Boton
                como="enlace"
                variante="cta"
                href={`tel:+52${torre.telefono.replace(/\s/g, "")}`}
                icono={<IconoTelefono className="size-4" />}
                className="mt-10"
              >
                Solicitar información
              </Boton>
            </Revelar>
          </div>

          {/* En movil va debajo del texto y en 4:3, porque la foto es casi
              cuadrada y a lo ancho de un telefono una tira baja no dice nada.
              De `lg` para arriba estira a la altura de la fila, que es lo que
              la deja tocar arriba y abajo como en la referencia. */}
          <img
            src={ruta("/img/consultorio.jpg")}
            alt="Consultorio disponible en DocTowers, con vista al mar."
            width={1000}
            height={1026}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover lg:aspect-auto lg:h-full"
          />
        </div>
      </section>
    </>
  );
}
