# DocTowers — Sitio Directorio

Directorio de médicos de la torre DocTowers, en Boca del Río, Veracruz. Cliente de Virtuo.

Tres vistas: home, directorio y ficha del médico. El camino es uno: **buscar, encontrar,
llamar.** El alcance, las reglas y el porqué de cada decisión están en
[`CLAUDE.md`](CLAUDE.md), que es lo primero que hay que leer.

## Levantarlo en otra máquina

```bash
git clone git@github.com:virtuomkt/doctowers-directorio.git
cd doctowers-directorio
npm install
npm run dev
```

Node 20 o más nuevo. Aquí corre con 24.

**Antes del primer commit, fijar el correo.** Si no, git se inventa uno con el nombre de la
máquina y el commit no se enlaza a ninguna cuenta de GitHub:

```bash
git config user.email "virtuomarketing010@gmail.com"
git config user.name "Val Vichy"
```

Ese correo está verificado como secundario en la cuenta de GitHub `valvichio`, que es admin de
la organización `virtuomkt`.

## Los scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compila TypeScript y genera `dist/` |
| `npm run preview` | Sirve el build, para revisar antes de publicar |
| `npm run datos` | Regenera `datos/doctores.json` desde el export de la hoja. Ver [`datos/README.md`](datos/README.md) |
| `npm run contraste` | Verifica que todo texto pase AA (4.5:1). No se revisa a ojo |
| `npm run 21st:contexto` | Refresca el contexto de diseño para el CLI de 21st |

**`datos/doctores.json` se regenera, no se edita a mano.** Es la fuente de verdad de las
fichas, la lista y los contadores del home. Corregir un registro suelto se pierde en la
siguiente corrida: se corrige la hoja o el importador.

## Publicar

**En GitHub Pages, desde la organización `virtuomkt`**, igual que Solara. El repo es público
porque el plan gratuito no publica Pages desde un repo privado.

Link: **https://virtuomkt.github.io/doctowers-directorio/**

Cada push a `main` lo publica solo: el workflow de
[`.github/workflows/pages.yml`](.github/workflows/pages.yml) compila y sube `dist/`. No hay
comando de publicar.

Tres cosas que el sitio necesita para vivir ahí, y ninguna es de adorno:

- **La subcarpeta.** El sitio no está en la raíz del dominio sino en `/doctowers-directorio/`.
  El workflow se lo dice a Vite con `BASE_PATH`, y las imágenes que viven en JSX pasan por
  `src/lib/ruta.ts`. Un `src="/img/..."` escrito a mano funciona en local y se rompe publicado.
- **`404.html`.** El build copia `index.html` a `404.html`. Pages no conoce las rutas de React:
  sin esa copia, entrar directo a `/directorio` o a una ficha, o refrescar ahí, da 404.
- **El `noindex` vive solo en el `<meta>`.** Pages no deja poner el encabezado `X-Robots-Tag`,
  y un `robots.txt` en una subcarpeta no lo lee ningún buscador. Se deja el `<meta>` hasta que
  Jordy apruebe y el sitio pase a su dominio.

Antes de hacer push, revisar el build tal como se va a publicar:

```bash
BASE_PATH=/doctowers-directorio/ npm run build
BASE_PATH=/doctowers-directorio/ npm run preview   # abre /doctowers-directorio/
```

**El historial de este repo empieza el 26-sep**, cuando se hizo público. Los commits anteriores
(la etapa con 200 médicos ficticios) viven en el repo privado `valvichio/doctowers-directorio`,
que queda como archivo.

## Dos cosas que el clon no trae

### 1. Los symlinks de `contexto/`

Esa carpeta son siete symlinks relativos a documentos que viven fuera de este repo: el spec,
el log de decisiones, la voz de marca y el equipo. Git guarda el apuntador, no el contenido, así
que **solo resuelven si las carpetas hermanas existen** con esta forma:

```
Agents/
├── Virtuo/
│   ├── doctowers-directorio/   ← este repo
│   └── viri/                   ← AIOS de Valeria (repo Viri-AIOS)
└── Wikis/
    └── virtuo-wiki/            ← wiki compartido (repo wiki-virtuo)
```

Si al clonar los links salen rotos, no es un problema del repo: falta clonar `viri` o
`virtuo-wiki` al lado. Para verificarlo:

```bash
for f in contexto/*.md; do [ -e "$f" ] || echo "roto: $f"; done
```

El sitio corre sin ellos. Lo que se pierde es el contexto de negocio, no el build.

### 2. La llave de 21st

`.mcp.json` la lee de una variable de entorno, nunca del repo. Dos formas, las dos sirven:

```jsonc
// .claude/settings.local.json, que ya está en .gitignore
{ "env": { "API_KEY_21ST": "..." } }
```

```bash
# o a nivel máquina, en ~/.zshrc
export API_KEY_21ST="..."
```

Se lee al arrancar Claude Code, así que hay que reiniciarlo después de ponerla. Sin ella el MCP
de 21st no conecta y todo lo demás funciona igual.

Y antes de generar cualquier componente con 21st, correr `npm run 21st:contexto`: si su contexto
guardado quedó viejo, genera con una paleta que ya no existe y el resultado reprueba AA.

## Los binarios que no se versionan

De `design-system/claude-design/` se quedan fuera el `.zip` de 19 MB, `uploads/` y
`assets/images/`, porque git guarda los binarios para siempre y ahí venía todo duplicado. Se
vuelven a bajar del proyecto de Claude Design cuando se necesiten.

Lo que sí está versionado de esa carpeta es lo que vale y pesa poco: tokens, componentes,
guidelines, los logos en SVG y la tipografía. El hero ya no usa su imagen: desde el 26-sep va
la fachada real, en `public/img/hero-fachada.jpg`.

## Las imágenes: originales aparte de lo que se publica

Los archivos como llegan del cliente viven en
[`design-system/originales/`](design-system/originales/README.md), **nunca en `public/`**. Todo
lo que está en `public/` se copia al sitio aunque nadie lo pida: los cuatro originales del
13-ago pesaban 3.6 MB sin usarse, y sacarlos bajó el sitio de 6.3 MB a 2.3 MB.

El README de esa carpeta trae la tabla de cómo se regenera cada versión publicada, con los
números exactos. Importa para el logo del hospital: venía centrado en un lienzo de 1620×1620 con
96% vacío, y su recorte no se puede rehacer a ojo.

## Dónde está el design system

En [`src/index.css`](src/index.css). Los tokens viven ahí y **ningún componente trae un color,
un tamaño de fuente ni un radio escrito a mano.** Los nombres van en inglés porque caen tal cual
en Tailwind: `--color-primary` se usa como `bg-primary`.

Cambiar solo esa lista repinta las tres vistas completas.
