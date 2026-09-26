import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Nav from "./componentes/Nav";
import Footer from "./componentes/Footer";
import Home from "./vistas/Home";
import Directorio from "./vistas/Directorio";
import FichaDoctor from "./vistas/FichaDoctor";

/** Cada cambio de vista arranca arriba. Sin esto, ir de la pagina 5 del
 *  directorio a una ficha te deja a media ficha. */
function AlIrArriba() {
  const { pathname, hash } = useLocation();
  // Con llaves, no flecha corta: un `useEffect` que devuelve algo distinto de
  // una funcion truena en React con "destroy is not a function".
  useEffect(() => {
    /* Con ancla manda el ancla, no el tope. Es lo que hace funcionar
       "Consultorios disponibles" del nav desde el directorio y desde la ficha:
       navega al home y baja a la banda. Si el ancla no existe, cae al tope y
       nadie se queda mirando una pantalla que no se movio. */
    if (hash) {
      const destino = document.getElementById(hash.slice(1));
      if (destino) {
        destino.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <AlIrArriba />
      {/* Salto al contenido: el directorio tiene 200 tarjetas antes del footer. */}
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-text-invert"
      >
        Saltar al contenido
      </a>
      <Nav />
      <main id="contenido" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/directorio" element={<Directorio />} />
          <Route path="/doctor/:slug" element={<FichaDoctor />} />
          {/* Ningun link del sitio queda muerto: lo que no existe vuelve al home. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
