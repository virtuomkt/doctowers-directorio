import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// BASE_PATH lo pone el workflow de GitHub Pages ("/doctowers-directorio/"),
// porque ahi el sitio vive en una subcarpeta. Local y en cualquier dominio
// propio se queda en la raiz.
export default defineConfig({
  base: process.env.BASE_PATH || "/",
  plugins: [react(), tailwindcss()],
});
