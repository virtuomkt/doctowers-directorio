import { useEffect, useState } from "react";

/** `matchMedia` como estado de React, sin dependencias nuevas.
 *
 *  Arranca con el valor real y no con `false`: empezar en falso y corregir en
 *  el efecto haria que el directorio pintara 12 tarjetas y luego 24 en la
 *  primera carga de escritorio, que se ve como un salto. */
export function usarMedia(consulta: string): boolean {
  const [activo, setActivo] = useState(
    () => typeof window !== "undefined" && window.matchMedia(consulta).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(consulta);
    const alCambiar = () => setActivo(mq.matches);
    alCambiar();
    mq.addEventListener("change", alCambiar);
    return () => mq.removeEventListener("change", alCambiar);
  }, [consulta]);

  return activo;
}
