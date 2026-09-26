/** Ruta a un archivo de `public/`, respetando la subcarpeta donde se publica.
 *
 * En GitHub Pages el sitio vive en /doctowers-directorio/, no en la raiz, y un
 * `src="/img/x.jpg"` pediria virtuomkt.github.io/img/x.jpg, que no existe.
 * Vite reescribe solo las rutas del CSS y del index.html; las que viven en JSX
 * pasan por aqui. En desarrollo BASE_URL es "/" y no cambia nada. */
export const ruta = (archivo: string) =>
  archivo ? import.meta.env.BASE_URL + archivo.replace(/^\//, "") : "";
