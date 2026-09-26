import { Link, Navigate, useParams } from "react-router-dom";
import Boton from "../componentes/Boton";
import Avatar from "../componentes/Avatar";
import TarjetaDoctor from "../componentes/TarjetaDoctor";
import {
  IconoUbicacion,
  IconoTelefono,
  IconoWhatsapp,
  IconoCredencial,
} from "../componentes/Iconos";
import { buscarPorSlug, mismosDeEspecialidad, torre } from "../datos";

/* El final del recorrido. Aqui el paciente ya decidio y lo unico que necesita
   es el telefono y el piso, asi que esos dos datos van arriba y en grande.

   Los datos son reales y vienen incompletos: hay medicos sin telefono, sin
   WhatsApp o sin cedula en la hoja. Cada dato que falta se esconde, no se
   rellena. Cuando no hay ni telefono ni WhatsApp, el camino es la recepcion de
   la torre, y se dice asi: el numero es de DocTowers, no del medico.

   El boton de Doctoralia solo aparece si existe `doctoralia_url`, que el
   importador solo llena con links que de verdad van a Doctoralia. La ficha
   propia sigue siendo el destino del perfil. */

const aTel = (numero: string) => `tel:+52${numero.replace(/\s/g, "")}`;

function Dato({
  icono,
  etiqueta,
  children,
}: {
  icono: React.ReactNode;
  etiqueta: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 text-primary">{icono}</span>
      <div>
        <p className="text-label font-semibold tracking-wide text-text-muted uppercase">
          {etiqueta}
        </p>
        <div className="mt-2 text-body text-text-strong">{children}</div>
      </div>
    </div>
  );
}

export default function FichaDoctor() {
  const { slug } = useParams();
  const doctor = slug ? buscarPorSlug(slug) : undefined;

  // Un slug que no existe no muestra una pantalla de error: vuelve al directorio.
  if (!doctor) return <Navigate to="/directorio" replace />;

  // Tres y no cuatro: la ficha es mas angosta que el directorio, y a cuatro
  // columnas "Dr. Federico Madrigal" se corta en "Dr. Federic...".
  const otros = mismosDeEspecialidad(doctor, 3);

  const aWhatsapp = `https://wa.me/52${doctor.whatsapp.replace(/\s/g, "")}`;
  const sinContacto = !doctor.telefono && !doctor.whatsapp;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Migaja de pan: es la unica forma de volver ademas del nav, asi que no
          es decorativa. La especialidad lleva al directorio ya filtrado. */}
      <nav aria-label="Ruta" className="text-body-sm text-text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link to="/directorio" className="rounded-sm transition-colors hover:text-link-hover">
              Directorio
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link
              to={`/directorio?esp=${encodeURIComponent(doctor.especialidad)}`}
              className="rounded-sm transition-colors hover:text-link-hover"
            >
              {doctor.especialidad}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="font-semibold text-text-strong">
            {doctor.nombre}
          </li>
        </ol>
      </nav>

      <article className="mt-6 rounded-lg border border-border bg-surface p-6 shadow-card sm:p-8">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
          <Avatar doctor={doctor} tamano="size-32" texto="text-display" prioridad />

          <div className="min-w-0">
            <h1 className="font-display text-h1 font-bold text-text-strong">
              {doctor.nombre}
            </h1>
            <p className="mt-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-body-sm font-semibold text-primary">
              {doctor.especialidad}
            </p>
            {/* Solo si dice algo mas que la categoria: "Reumatología" debajo
                de "Reumatología" seria ruido. */}
            {doctor.especialidad_detalle !== doctor.especialidad && (
              <p className="mt-3 text-body text-pretty text-text-base">
                {doctor.especialidad_detalle}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
          <Dato icono={<IconoUbicacion />} etiqueta="Consultorio">
            Consultorio {doctor.consultorio} · Piso {doctor.piso}
          </Dato>

          {doctor.telefono && (
            <Dato icono={<IconoTelefono />} etiqueta="Teléfono para citas">
              <a
                href={aTel(doctor.telefono)}
                className="rounded-sm font-semibold text-primary transition-colors hover:text-link-hover"
              >
                {doctor.telefono}
              </a>
            </Dato>
          )}

          {doctor.whatsapp && (
            <Dato icono={<IconoWhatsapp />} etiqueta="WhatsApp">
              <a
                href={aWhatsapp}
                className="rounded-sm font-semibold text-primary transition-colors hover:text-link-hover"
              >
                {doctor.whatsapp}
              </a>
            </Dato>
          )}

          {sinContacto && (
            <Dato icono={<IconoTelefono />} etiqueta="Recepción de DocTowers">
              <a
                href={aTel(torre.telefono)}
                className="rounded-sm font-semibold text-primary transition-colors hover:text-link-hover"
              >
                {torre.telefono}
              </a>
            </Dato>
          )}

          {doctor.cedula && (
            <Dato
              icono={<IconoCredencial />}
              etiqueta={doctor.cedula.includes("·") ? "Cédulas profesionales" : "Cédula profesional"}
            >
              <span className="tabular-nums">{doctor.cedula}</span>
            </Dato>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row">
          {doctor.telefono && (
            <Boton como="enlace" href={aTel(doctor.telefono)} icono={<IconoTelefono />}>
              Llamar al consultorio
            </Boton>
          )}
          {doctor.whatsapp && (
            <Boton
              como="enlace"
              variante={doctor.telefono ? "secundario" : "primario"}
              href={aWhatsapp}
              icono={<IconoWhatsapp />}
            >
              Enviar WhatsApp
            </Boton>
          )}
          {sinContacto && (
            <Boton como="enlace" href={aTel(torre.telefono)} icono={<IconoTelefono />}>
              Llamar a recepción
            </Boton>
          )}
          {doctor.doctoralia_url && (
            <Boton
              como="enlace"
              variante="secundario"
              href={doctor.doctoralia_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Agendar en Doctoralia
            </Boton>
          )}
        </div>
      </article>

      {/* Solo texto, sin mapa embebido. */}
      <section className="mt-10 rounded-md border border-border bg-surface p-6">
        <h2 className="font-display text-h2 font-bold text-text-strong">Cómo llegar</h2>
        <p className="mt-3 text-body text-text-base">{torre.direccion}</p>
        <p className="mt-2 text-body text-text-base">
          Piso {doctor.piso}, consultorio {doctor.consultorio}.
        </p>
      </section>

      {/* Si el medico es el unico de su especialidad, como Nefrologia, esta
          seccion no aparece. No se muestra vacia. */}
      {otros.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-h2 font-bold text-text-strong">
            Otros médicos de {doctor.especialidad}
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otros.map((d) => (
              <TarjetaDoctor key={d.slug} doctor={d} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
