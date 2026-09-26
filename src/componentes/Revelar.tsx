import { useEffect, useRef, useState, type ReactNode } from "react";

/* Envuelve un bloque y lo hace aparecer cuando entra en pantalla.
 *
 * El estado escondido y la transicion viven en src/index.css, dentro de un
 * `prefers-reduced-motion: no-preference`. Aqui solo se enciende el interruptor
 * con `data-visible`, asi que a quien pidio menos movimiento no le cambia nada:
 * la clase no tiene efecto y el contenido nace visible.
 *
 * Se desconecta al primer cruce. Un bloque que se desvanece cada vez que sube y
 * baja el scroll marea, y ademas obliga a leer dos veces lo mismo.
 *
 * No agrega un `div` extra: recibe `className`, asi que se usa COMO el
 * contenedor que ya existia en la vista.
 */

export default function Revelar({
  children,
  className = "",
  retraso = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Milisegundos de espera, para escalonar dos bloques hermanos. */
  retraso?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        setVisible(true);
        observador.disconnect();
      },
      /* Pide que asome un 10% antes de disparar. Sin ese margen, un bloque que
         ya se ve por la orilla empieza a aparecer cuando el usuario todavia no
         llego, y el efecto se pierde. */
      { rootMargin: "0px 0px -10% 0px" },
    );

    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`revelar ${className}`}
      data-visible={visible}
      style={retraso ? { transitionDelay: `${retraso}ms` } : undefined}
    >
      {children}
    </div>
  );
}
