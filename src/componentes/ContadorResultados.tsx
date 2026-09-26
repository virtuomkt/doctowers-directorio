import Boton from "./Boton";
import { totalDoctores } from "../datos";

/* Tres estados, y el vacio se diseña, no se improvisa: dice que hacer ahora,
   no pide perdon. Va en aria-live para que un lector de pantalla anuncie el
   cambio, porque la lista se filtra conforme se escribe y sin esto el usuario
   de teclado no se entera de que paso. */

/* El total sale de `doctores.json`, nunca escrito a mano. Los dos botones de
   este archivo lo decian literal ("ver los 200") y eso mentiria en cuanto el
   generador entregara otra cantidad. Con el plural resuelto aqui, sirve igual
   para 200 que para 1. */
const todos = `${totalDoctores} ${totalDoctores === 1 ? "especialista" : "especialistas"}`;

const plural = (n: number, uno: string, varios: string) =>
  `${n} ${n === 1 ? uno : varios}`;

/* Lo que se resalta es SIEMPRE lo que el usuario escribio o eligio, nunca el
   numero. La pregunta que se contesta en este renglon no es "cuantos son" (eso
   ya se ve en el numero grande al inicio) sino "por que estoy viendo estos".

   Va solo con color y no con negritas, porque la linea entera ya es
   `font-semibold`; y el color no carga informacion, solo la separa: si alguien
   no distingue el teal, la frase sigue diciendo lo mismo. */
function Resalte({ children }: { children: React.ReactNode }) {
  return <span className="text-accent-text">{children}</span>;
}

type Props = {
  total: number;
  consulta: string;
  especialidad: string;
  hayFiltro: boolean;
  alLimpiar: () => void;
};

export default function ContadorResultados({
  total,
  consulta,
  especialidad,
  hayFiltro,
  alLimpiar,
}: Props) {
  /* Cuatro casos, no dos. El de "solo especialidad" es el que faltaba: decia
     "14 especialistas" a secas y el usuario tenia que mirar el `select` para
     saber de que. Ahora la linea se explica sola.

     La especialidad va sin comillas y la busqueda con ellas, a proposito: las
     comillas son para lo que alguien tecleo, porque puede ser cualquier cosa y
     hay que marcar donde empieza y donde acaba. La especialidad se eligio de
     una lista, es un nombre propio, y entrecomillarla la haria ver dudosa. */
  const texto = !hayFiltro ? (
    plural(total, "especialista", "especialistas")
  ) : consulta && especialidad ? (
    <>
      {plural(total, "resultado", "resultados")} para{" "}
      <Resalte>“{consulta}”</Resalte> en <Resalte>{especialidad}</Resalte>
    </>
  ) : consulta ? (
    <>
      {plural(total, "resultado", "resultados")} para{" "}
      <Resalte>“{consulta}”</Resalte>
    </>
  ) : (
    <>
      {plural(total, "especialista encontrado", "especialistas encontrados")} en{" "}
      <Resalte>{especialidad}</Resalte>
    </>
  );

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p aria-live="polite" className="text-body font-semibold text-text-strong">
        {texto}
      </p>
      {/* Era un link de texto hasta el 13-ago. Valeria lo pidio como boton, y
          tiene razon de fondo: es la unica accion de esta franja y estaba
          escrita igual que el texto de al lado, asi que no se leia como algo
          que se puede tocar. Va en el tamano chico y en secundario para que no
          compite con los botones de llamar de las tarjetas. */}
      {hayFiltro && (
        <Boton variante="secundario" tamano="chico" onClick={alLimpiar}>
          Limpiar y ver {todos}
        </Boton>
      )}
    </div>
  );
}

export function SinResultados({
  consulta,
  alLimpiar,
}: {
  consulta: string;
  alLimpiar: () => void;
}) {
  return (
    <div className="rounded-md border border-border bg-surface px-6 py-16 text-center">
      <p className="font-display text-h2 font-bold text-text-strong">
        No encontramos médicos para “{consulta}”
      </p>
      <p className="mx-auto mt-3 max-w-md text-body text-text-base">
        Puede ser la especialidad seleccionada en el filtro, o una palabra de más
        en la búsqueda. Prueba con el apellido del médico, el nombre de la
        especialidad o el número de consultorio.
      </p>
      <Boton variante="secundario" className="mt-6" onClick={alLimpiar}>
        Ver {todos}
      </Boton>
    </div>
  );
}
