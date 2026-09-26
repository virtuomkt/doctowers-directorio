import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import type { Doctor } from "../datos";

/* El componente central: cuatro veces en el home y 200 en el directorio.
   Lo que a cuatro se perdona, a 200 se nota, asi que la tarjeta es baja y de
   altura pareja.

   Medidas de components/data/DoctorCard.jsx: radius-md, shadow-sm, borde de
   1px, padding space-5 (20px), gap space-4 (16px), avatar de 56px arriba y no
   al centro (ajuste que Valeria pidio en Claude Design).

   Sin boton adentro: la tarjeta entera es el link. Un "Ver mas" repetido 200
   veces compite con la tarjeta misma.

   Su DoctorCard incluye ademas un badge de "Disponible hoy". Aqui no va: ese
   dato no existe en doctores.json y derivarlo del horario dejaria a casi todo
   el directorio en "Sin disponibilidad" un sabado, que es justo el dia de la
   demostracion. */

export default function TarjetaDoctor({ doctor }: { doctor: Doctor }) {
  return (
    <li>
      <Link
        to={`/doctor/${doctor.slug}`}
        /* El relleno se queda en 20px y no sube a 24: cada pixel de relleno se
           lo quita al texto, y a tres columnas el nombre ya vive al limite.
           El aire de esta tarjeta se gana en vertical, no en horizontal. */
        /* El halo teal reemplaza a `shadow-card-hover`, que era navy: con el
           borde ya en teal, la sombra navy dejaba dos teales y un azul en el
           mismo gesto. */
        className="group flex h-full items-start gap-4 rounded-md border border-border bg-surface p-5 shadow-card transition-all duration-(--duration-base) hover:-translate-y-0.5 hover:border-border-hover hover:shadow-teal"
      >
        <Avatar doctor={doctor} />

        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-body font-semibold text-text-strong group-hover:text-primary">
            {doctor.nombre}
          </h3>
          {/* Dos lineas, no una: a una sola, "Ginecologia y Obstetricia" y
              "Traumatologia y Ortopedia" se cortan en "y..." y dejan de decir
              cual especialidad es, que es justo el dato que se vino a leer. */}
          <p className="mt-2 line-clamp-2 text-body-sm text-text-base">
            {doctor.especialidad}
          </p>
          {/* Cada mitad sin partirse: con los consultorios de cuatro digitos del
              piso 10 la linea se cortaba en "Piso" y "10" en renglones
              distintos. Si no cabe entera, baja la mitad completa. */}
          <p className="mt-2 text-label text-text-muted">
            <span className="whitespace-nowrap">Consultorio {doctor.consultorio}</span>
            {" · "}
            <span className="whitespace-nowrap">Piso {doctor.piso}</span>
          </p>
        </div>
      </Link>
    </li>
  );
}
