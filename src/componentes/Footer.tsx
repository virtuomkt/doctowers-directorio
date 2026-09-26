import { ruta } from "../lib/ruta";
import { Link } from "react-router-dom";
import { torre, redes } from "../datos";
import {
  IconoUbicacion,
  IconoTelefono,
  IconoReloj,
  IconoCorreo,
  IconoFacebook,
  IconoInstagram,
} from "./Iconos";

/* Sin newsletter y sin un solo link a algo que no existe. Sostiene el mismo par
   de links que el nav.

   Las redes entraron el 14-ago y son las cuentas REALES de DocTowers, no
   inventadas: las dos se verificaron antes de publicarlas. Esa era la razon por
   la que no estaban, no un criterio de diseno.

   El icono de cada red se elige por nombre y no viene en los datos: `datos.ts`
   guarda hechos del negocio, no decisiones de dibujo. */
const ICONOS: Record<string, typeof IconoFacebook> = {
  Facebook: IconoFacebook,
  Instagram: IconoInstagram,
};

export default function Footer() {
  // mt-12 en mobile y mt-20 de tablet en adelante: los 80px de escritorio,
  // sumados al margen de la paginacion, dejan un hueco de 120px que en un
  // telefono se lee como que falto contenido.
  return (
    <footer className="mt-12 border-t border-border bg-surface sm:mt-20">
      {/* Tres columnas desde el 14-ago, no dos: las redes se salieron del
          bloque de la marca y ahora son columna propia a la derecha, por
          peticion de Valeria. Colgadas debajo de la direccion parecian una
          linea mas del bloque de contacto, y no lo son: contacto es donde
          llamas, redes es donde miras. */}
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <img
            src={ruta("/img/doctowers-logo-black-teal.svg")}
            alt="DocTowers"
            className="h-8 w-auto"
          />
          <ul className="mt-4 space-y-2 text-body-sm text-text-base">
            <li className="flex gap-2">
              <IconoUbicacion className="mt-0.5 text-text-muted" />
              <span>{torre.direccion}</span>
            </li>
            <li className="flex gap-2">
              <IconoTelefono className="mt-0.5 text-text-muted" />
              <a
                href={`tel:+52${torre.telefono.replace(/\s/g, "")}`}
                className="rounded-sm font-semibold text-primary transition-colors hover:text-link-hover"
              >
                {torre.telefono}
              </a>
            </li>
            <li className="flex gap-2">
              <IconoCorreo className="mt-0.5 text-text-muted" />
              <a
                href={`mailto:${torre.correo}`}
                className="rounded-sm font-semibold text-primary transition-colors hover:text-link-hover"
              >
                {torre.correo}
              </a>
            </li>
            <li className="flex gap-2">
              <IconoReloj className="mt-0.5 text-text-muted" />
              <span>{torre.horario}</span>
            </li>
          </ul>

        </div>

        {/* Estos dos links iban en ink-700 y peso normal, y eran la unica
            excepcion del sitio: en todas las demas vistas un link de texto es
            `font-semibold text-primary`. Corregido el 14-ago, porque Valeria
            noto que no pesaban lo mismo que el telefono y el correo de la
            columna de al lado.

            En la columna de contacto ese peso ademas trabaja: ahi conviven
            links y texto plano, y el semibold en navy es lo que separa lo que
            se puede tocar de lo que solo se lee. */}
        <nav aria-label="Pie de página">
          <p className="text-label font-semibold tracking-wide text-text-muted uppercase">
            Navegación
          </p>
          <ul className="mt-4 space-y-2 text-body-sm">
            <li>
              <Link
                to="/"
                className="rounded-sm font-semibold text-primary transition-colors hover:text-link-hover"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/directorio"
                className="rounded-sm font-semibold text-primary transition-colors hover:text-link-hover"
              >
                Directorio
              </Link>
            </li>
          </ul>
        </nav>

        {/* Lleva rotulo como Navegacion, y no es adorno: sin el, dos iconos
            sueltos en una columna vacia se leen como algo que quedo a medias.
            Con el, la columna es par de la de al lado.

            El rotulo es el ancla visible; cada link ademas trae su nombre
            oculto, porque el icono va `aria-hidden` y sin eso un lector de
            pantalla anunciaria dos enlaces sin texto. El area tocable es de
            44px, el minimo para el pulgar: el icono mide 20 y el relleno pone
            el resto, por eso los iconos arrancan medio paso a la izquierda del
            rotulo y se corrige con `-ml-3`. */}
        <div>
          <p className="text-label font-semibold tracking-wide text-text-muted uppercase">
            Síguenos
          </p>
          <ul className="mt-1 -ml-3 flex gap-1">
            {redes.map(({ nombre, url }) => {
              const Icono = ICONOS[nombre];
              return (
                <li key={nombre}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-11 items-center justify-center rounded-pill text-text-muted transition-colors hover:text-link-hover"
                  >
                    <Icono />
                    <span className="sr-only">{nombre} de DocTowers</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-5 text-body-sm text-text-muted sm:px-6">
          © {new Date().getFullYear()} DocTowers. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
