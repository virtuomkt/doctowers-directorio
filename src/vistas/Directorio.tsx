import { useMemo, useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Buscador from "../componentes/Buscador";
import SelectEspecialidad from "../componentes/SelectEspecialidad";
import TarjetaDoctor from "../componentes/TarjetaDoctor";
import ContadorResultados, { SinResultados } from "../componentes/ContadorResultados";
import Paginacion from "../componentes/Paginacion";
import { doctores, totalDoctores, totalEspecialidades } from "../datos";
import { filtrarDoctores } from "../lib/buscar";
import { usarMedia } from "../lib/usarMedia";

/* El tamano de pagina depende del ancho, y no es un lujo.
   Medido a 390px con 24 tarjetas: 4148px de scroll, casi cinco pantallas de
   telefono para ver 24 de 200. Con 12 baja a poco mas de tres.
   Pero 12 en escritorio dejaria la rejilla de cuatro columnas en tres
   renglones y subiria a 17 paginas, asi que arriba se queda en 24. */
const POR_PAGINA_MOBILE = 12;
const POR_PAGINA_DESKTOP = 24;

/* La vista mas importante del proyecto: es la que el directivo va a tocar
   primero y la que tiene que aguantar 200 registros sin sentirse infinita.

   El estado vive en la URL (?q=&esp=&pagina=) y no solo en React. Tres razones:
   el buscador del home puede llegar aqui con ?q= ya puesto, el boton de atras
   del navegador funciona como la gente espera, y una busqueda se puede pasar
   por mensaje. En un demo en vivo eso ultimo vale mas de lo que parece. */

export default function Directorio() {
  const [params, setParams] = useSearchParams();

  const consulta = params.get("q") ?? "";
  const especialidad = params.get("esp") ?? "";
  const pagina = Math.max(1, Number(params.get("pagina") ?? 1));

  // Lo que el usuario esta tecleando, separado de lo que ya esta en la URL:
  // asi el filtrado se siente inmediato y la URL no se reescribe letra por letra.
  const [texto, setTexto] = useState(consulta);
  useEffect(() => setTexto(consulta), [consulta]);

  const actualizar = (cambios: Record<string, string>) => {
    const siguiente = new URLSearchParams(params);
    for (const [clave, valor] of Object.entries(cambios)) {
      if (valor) siguiente.set(clave, valor);
      else siguiente.delete(clave);
    }
    // Cualquier cambio de filtro devuelve a la pagina 1: quedarse en la 7 de un
    // resultado de 3 medicos muestra una lista vacia que parece un error.
    if (!("pagina" in cambios)) siguiente.delete("pagina");
    setParams(siguiente, { replace: true });
  };

  const resultados = useMemo(
    () => filtrarDoctores(doctores, texto, especialidad),
    [texto, especialidad],
  );

  // El mismo corte que usa la rejilla para pasar de una a dos columnas.
  const esAncho = usarMedia("(min-width: 640px)");
  const porPagina = esAncho ? POR_PAGINA_DESKTOP : POR_PAGINA_MOBILE;

  const totalPaginas = Math.max(1, Math.ceil(resultados.length / porPagina));
  const paginaSegura = Math.min(pagina, totalPaginas);
  const visibles = resultados.slice(
    (paginaSegura - 1) * porPagina,
    paginaSegura * porPagina,
  );

  /* Rotar el telefono cambia cuantas caben, y con eso cambia el total de
     paginas. Sin esto, quien va en la 15 de 17 y gira el aparato aterriza en la
     9 y pierde su lugar. Guardamos en que registro empieza la pagina y al
     cambiar el tamano recalculamos la pagina desde ese indice, asi el usuario
     se queda mirando a los mismos medicos. */
  const anterior = useRef({ porPagina, primero: 0 });
  useEffect(() => {
    if (anterior.current.porPagina !== porPagina) {
      const nueva = Math.floor(anterior.current.primero / porPagina) + 1;
      anterior.current = { porPagina, primero: (nueva - 1) * porPagina };
      actualizar({ pagina: nueva === 1 ? "" : String(nueva) });
      return;
    }
    anterior.current = { porPagina, primero: (paginaSegura - 1) * porPagina };
  });

  /* Al filtrar desde media pagina, la lista se encoge debajo de los pies y el
     usuario queda mirando la cola de los resultados, o el hueco donde estaban.
     Si ya bajo del inicio de la lista, lo regresamos ahi. Si esta arriba, no se
     mueve nada: un salto por cada letra tecleada seria peor que el problema. */
  const listaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const tope = listaRef.current?.offsetTop ?? 0;
    if (window.scrollY > tope) window.scrollTo({ top: tope - 80 });
  }, [texto, especialidad]);

  const hayFiltro = Boolean(texto || especialidad);
  const limpiar = () => {
    setTexto("");
    actualizar({ q: "", esp: "", pagina: "" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header>
        <h1 className="font-display text-h1 font-bold text-text-strong">
          Directorio médico
        </h1>
        <p className="mt-2 text-body text-text-base">
          {totalDoctores} especialistas en {totalEspecialidades} especialidades.
        </p>
      </header>

      {/* Los dos filtros juntos y siempre visibles: se pegan bajo el nav al
          hacer scroll, porque con nueve paginas el usuario los va a querer sin
          tener que subir hasta arriba. */}
      <div className="sticky top-[var(--alto-nav,72px)] z-30 -mx-4 mt-6 border-b border-border bg-background/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <Buscador
              id="buscador-directorio"
              valor={texto}
              alCambiar={(v) => {
                setTexto(v);
                actualizar({ q: v });
              }}
            />
          </div>
          <SelectEspecialidad
            valor={especialidad}
            alCambiar={(v) => actualizar({ esp: v })}
          />
        </div>
      </div>

      <div className="mt-6" ref={listaRef}>
        <ContadorResultados
          total={resultados.length}
          consulta={texto}
          especialidad={especialidad}
          hayFiltro={hayFiltro}
          alLimpiar={limpiar}
        />
      </div>

      {resultados.length === 0 ? (
        <div className="mt-6">
          <SinResultados consulta={texto || especialidad} alLimpiar={limpiar} />
        </div>
      ) : (
        <>
          {/* Tres columnas como maximo, no cuatro. A cuatro, la tarjeta baja a
              273px y el nombre se parte en dos lineas en casi todas: pasa 24
              veces por pagina y se lee como apretado. A tres son 371px y los
              nombres caben de una. */}
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibles.map((d) => (
              <TarjetaDoctor key={d.slug} doctor={d} />
            ))}
          </ul>

          <div className="mt-10">
            <Paginacion
              pagina={paginaSegura}
              totalPaginas={totalPaginas}
              alCambiar={(p) => {
                actualizar({ pagina: p === 1 ? "" : String(p) });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
