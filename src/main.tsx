import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./estilos.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* La subcarpeta de GitHub Pages. En desarrollo es "/" y no hace nada. */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
