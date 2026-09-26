import { useEffect, useRef, useState } from "react";

/* Cuenta de 0 al valor final cuando el elemento entra en pantalla.
 *
 * Con `IntersectionObserver` y `requestAnimationFrame`, sin libreria: animar
 * tres numeros no justifica una dependencia, y las dos APIs ya se usan en el
 * proyecto (el nav observa el hero, y publica su alto con ResizeObserver).
 *
 * Arranca al entrar en pantalla y no al cargar, porque la tira vive debajo del
 * pliegue: si contara al cargar, el usuario llegaria cuando ya termino y no
 * veria nada.
 *
 * Corre UNA vez. Un numero que se reinicia cada que pasas por encima se lee
 * como decoracion nerviosa, no como dato.
 *
 * Respeta `prefers-reduced-motion`: ahi el numero aparece en su valor final,
 * sin animar. El bloque global de src/index.css apaga transiciones y
 * animaciones de CSS, pero no puede saber de un contador en JS, asi que este
 * se apaga solo.
 */

/** Desaceleracion. Arranca rapido y frena al final, que es como se siente un
 *  contador y no una barra de progreso. */
const suavizar = (t: number) => 1 - Math.pow(1 - t, 3);

const DURACION = 1200;

export function usarContador(final: number) {
  const [valor, setValor] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const corrio = useRef(false);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;

    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (quieto) {
      setValor(final);
      return;
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting || corrio.current) return;
        corrio.current = true;
        observador.disconnect();

        const inicio = performance.now();
        const paso = (ahora: number) => {
          const t = Math.min(1, (ahora - inicio) / DURACION);
          setValor(Math.round(suavizar(t) * final));
          if (t < 1) requestAnimationFrame(paso);
        };
        requestAnimationFrame(paso);
      },
      // Un poco antes de que asome, para que el usuario no alcance a ver el
      // cero: cuando la caja esta a la vista, la cuenta ya va corriendo.
      { rootMargin: "0px 0px -15% 0px" },
    );

    observador.observe(nodo);
    return () => observador.disconnect();
  }, [final]);

  return { valor, ref };
}
