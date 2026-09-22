# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es esto

Sitio de documentación estático del **JetSmart UI Kit v1.0**. No hay build, ni bundler, ni dependencias:
HTML plano + un CSS + JS vanilla en IIFEs. Se abre con `file://` directamente.

El contenido se extrae del archivo de Figma `dKd6jNGAnng8hIV5MS4Avd` (`Jetsmart-UI-Kit-v1.0`), que es la
fuente de verdad. Casi todo el trabajo acá es: leer una página de Figma → escribir la página HTML.

Idioma: **todo en español** (títulos, prosa, comentarios, mensajes de commit). Las únicas excepciones son
los nombres de propiedades de componentes y los paths de tokens, que van en inglés tal como aparecen en
Figma, porque tienen que calzar con lo que ve el diseñador en el panel.

## Comandos

```bash
# Crea solo las páginas que faltan y regenera assets/js/nav-data.js
node tools/generate-pages.mjs

# Reescribe TODAS las páginas desde la plantilla — destruye la documentación escrita a mano
node tools/generate-pages.mjs --force

# Extrae props de una página de Figma (el JSON de metadata lo baja el MCP de Figma)
python .claude/skills/extraer-docs/scripts/parse_docs.py <ruta-metadata.json>          # JSON
python .claude/skills/extraer-docs/scripts/parse_docs.py <ruta-metadata.json> --html   # tabla lista para pegar
```

No hay tests ni linter. La verificación es visual, con Edge headless:

```bash
"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless=new \
  --disable-gpu --hide-scrollbars --window-size=1400,1800 \
  --screenshot=<scratchpad>/check.png --virtual-time-budget=5000 \
  "file:///D:/Rohkea%20Studio/Dev/uikit-jetsmart/components/<slug>.html"
```

Recorta el PNG con PIL y míralo. Los iframes de Figma salen en blanco en headless (necesitan GPU): es
normal, no es un error.

## Arquitectura

### El shell de la página lo arma el JS, no el HTML

Cada página es un esqueleto con contenedores vacíos (`#sidebar`, `#topbar`, `#page-toc`) que
`assets/js/layout.js` rellena en `DOMContentLoaded`. Una página nueva necesita, sí o sí:

- `<body data-page-id="...">` — con eso `layout.js` marca el link activo en el sidebar.
- `<script>window.JETSMART_BASE = "../";</script>` antes de los demás scripts — resuelve las rutas
  relativas según la profundidad de la carpeta.
- Los tres scripts en orden: `nav-data.js`, `layout.js`, `main.js`.

`assets/js/nav-data.js` es **derivado**: `generate-pages.mjs` lo reescribe siempre. Si editas el nav a
mano, sincroniza también el manifiesto `SECTIONS` del generador o el cambio se pierde.

### El índice lateral se arma desde los ids

`renderInPageNav` recoge `main [id^='doc-']`. Un heading sin id que empiece con `doc-` no aparece en el
índice. Cada `<li>` lleva `page-toc__item--h2` o `--h3` según el nivel, y el CSS indenta los h3 solo
cuando la lista tiene alguno (regla con `:has()`), así que las páginas de un componente no cambian.

### Tres tipos de página

**Componente** (`components/`, `product-components/`) — `Resumen` + `Propiedades`, nada más.
Cuando la página de Figma trae **varios componentes**, se repite el bloque completo por cada uno: `h2`
con el nombre del componente, descripción, su propio Live Preview, y `h3` Resumen + `h3` Propiedades.
Ver `components/tabs.html`. Al mapear los frames «Live Preview» a su componente, hazlo por **la instancia
que llevan dentro**: todos los frames se llaman igual y la posición en el canvas engaña.

**Foundation** (`foundations/`) — páginas largas y a medida, con secciones propias. Todas siguen la misma
progresión: Resumen (stats + cadena Tier 1 → Tier 2 → aplicación) → Tokens primitivos → Tokens semánticos
→ Cómo usar en Figma → Buenas y malas prácticas. Los datos no van en el HTML: cada foundation tiene un
módulo en `assets/js/<nombre>.js` con los valores como arrays y funciones que renderizan sobre
contenedores `<div data-<prefijo>="...">`. Copia el patrón de `radius-width.js` o `elevations.js`.

**Pattern / Flow** — todavía placeholders generados.

### CSS: un vocabulario compartido y un namespace por página

`assets/css/custom.css` es el único stylesheet. El prefijo **`ty-` es compartido** y lo usa todo el sitio:
`ty-table-wrap` / `ty-table`, `ty-badge`, `ty-note`, `ty-stats`, `ty-chain`, `ty-token`, `ty-pair`,
`ty-rules`, `ty-item`. Úsalos antes de inventar clases nuevas.

Cada foundation agrega su bloque al final del archivo con su propio prefijo: `cl-` colors, `sp-` spacing,
`rw-` radius & width, `ic-` icons, `el-` elevations. Los colores y fuentes salen de las variables
`--js-*` definidas en `:root`.

Tailwind entra por CDN pero casi no se usa: el estilo real está en `custom.css`.

### Embeds de Figma

`embedUrl()` en el generador produce el link del iframe. Ojo con dos cosas que ya costaron tiempo:
los iframes llevan `loading="lazy"` (si no, Figma devuelve 403 de CloudFront cuando cargan varios a la
vez), y cuando un embed muestra el frame equivocado suele ser **caché del navegador**, no el node-id —
verifica en incógnito antes de tocar la URL.

## Flujo de trabajo típico

1. El usuario pasa un link de Figma + el nombre de la página.
2. Bajar el metadata del nodo con el MCP de Figma (`get_metadata`). En las páginas de componente **el
   texto de cada capa viaja en su atributo `name`**, así que no hace falta `get_design_context`. En
   algunas páginas de foundation las capas están nombradas por rol (`title`, `desc`) y ahí sí hay que
   leer el contenido desde un screenshot.
3. Parsear con `parse_docs.py` o transcribir a mano.
4. Escribir la página y verificar con el screenshot headless.

El skill `extraer-docs` (`.claude/skills/extraer-docs/SKILL.md`) tiene el procedimiento detallado para
páginas de componente y es el que hay que mantener actualizado cuando la convención cambie.

## Cuidados

- `generate-pages.mjs` **no** sobrescribe páginas existentes; solo `--force` lo hace, y borraría toda la
  documentación escrita a mano. No lo corras con `--force` salvo que el usuario lo pida explícitamente.
- `STALE_FILES` en el generador borra archivos en cada corrida. Agregar algo ahí elimina el archivo.
- Antes de documentar una página, revisa si ya tiene contenido real (`grep -c 'coming-soon'`). Si lo
  tiene, pregunta antes de pisarlo.
