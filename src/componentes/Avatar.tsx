import { useEffect, useRef, useState } from "react";
import type { Doctor } from "../datos";
import { ruta } from "../lib/ruta";

/* Las iniciales SIEMPRE se pintan, y la foto va encima cuando carga.
 *
 * La version ingenua es al reves: intentar la foto y cambiar a iniciales en
 * `onError`. Eso deja un circulo vacio entre que la peticion falla y React
 * re-renderiza, y con 200 tarjetas el fallo no llega parejo: unas ya tienen
 * iniciales y otras siguen en blanco. En una demostracion al cliente eso se
 * lee como sitio a medio cargar.
 *
 * Hoy importa mas de lo que parece porque las fotos reales todavia no se
 * asignan, asi que todos caen en iniciales. Cuando lleguen, la foto se pinta
 * encima y esto sigue sirviendo para el medico que se quede sin la suya.
 *
 * Circulo teal-100 con la inicial en navy. El sistema las pinta en teal-700,
 * pero eso da 3.74:1 y no pasa AA (ver src/index.css).
 */

/* El titulo se quita sea cual sea: en la hoja real hay "Dr.", "Dra.", "CD.",
   "LFT.", "MNC." y "Psic.", y con solo Dr/Dra el avatar de "CD. Vania" decia
   "CV" pero el de "LFT. Rubén" decia "LR". */
function iniciales(nombre: string): string {
  return nombre
    .replace(/^[\p{L}.]+\.\s+/u, "")
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

type Props = {
  doctor: Doctor;
  /** Clases de tamano. La tarjeta usa 56px, que es la medida de su DoctorCard. */
  tamano?: string;
  /** Tamano del texto de las iniciales. */
  texto?: string;
  /**
   * Carga la foto de inmediato en vez de diferirla.
   *
   * Va en la ficha, donde el retrato esta arriba del pliegue y es la imagen
   * principal de la pantalla: diferirla retrasa justo lo que el usuario vino a
   * ver. En el directorio se queda diferida, que ahi son 24 fotos por pagina y
   * la mayoria nace fuera de vista.
   */
  prioridad?: boolean;
};

export default function Avatar({
  doctor,
  tamano = "size-14",
  texto = "text-h3",
  prioridad = false,
}: Props) {
  const [fallo, setFallo] = useState(false);
  // La foto nace invisible y solo aparece cuando cargo de verdad. Sin esto,
  // Chrome alcanza a pintar su icono de imagen rota encima de las iniciales
  // en el rato que tarda `onError` en llegar.
  const [cargo, setCargo] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  /* Y esto es por la foto que ya venia en cache.
     Si la imagen se completa ANTES de que React enganche el onLoad, ese evento
     no dispara nunca y la foto se queda invisible para siempre. Pasa justo al
     ir del home, donde ya cargo, a la ficha del mismo medico: el home se veia
     con foto y la ficha con iniciales. `complete` con `naturalWidth` mayor a
     cero distingue "ya cargada" de "fallo al cargar". */
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setCargo(true);
  }, [doctor.foto]);

  return (
    <div
      className={`relative ${tamano} shrink-0 overflow-hidden rounded-pill bg-accent-soft`}
    >
      <span
        className={`grid size-full place-items-center font-body ${texto} font-semibold text-accent-ink`}
        aria-hidden
      >
        {iniciales(doctor.nombre)}
      </span>

      {doctor.foto && !fallo && (
        <img
          ref={imgRef}
          src={ruta(doctor.foto)}
          alt=""
          loading={prioridad ? "eager" : "lazy"}
          fetchPriority={prioridad ? "high" : "auto"}
          onLoad={() => setCargo(true)}
          onError={() => setFallo(true)}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-(--duration-fast) ${
            cargo ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
