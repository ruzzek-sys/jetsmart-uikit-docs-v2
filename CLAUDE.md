# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es esto

Sitio de documentación del **JetSmart UI Kit v1.0**, hecho con **Astro 7 + Vite + Tailwind v4 + MDX**.
Genera un sitio estático; se trabaja con el servidor local de Astro.

El contenido se extrae del archivo de Figma `dKd6jNGAnng8hIV5MS4Avd` (`Jetsmart-UI-Kit-v1.0`), que es la
fuente de verdad. Casi todo el trabajo acá es: leer una página de Figma → escribir o actualizar un `.mdx`.

Idioma: **todo en español** (títulos, prosa, comentarios, mensajes de commit). Las únicas excepciones son
los nombres de propiedades de componentes y los paths de tokens, que van en inglés tal como aparecen en
Figma, porque tienen que calzar con lo que ve el diseñador en el panel.

## Comandos

```bash
npm install
npm run dev        # http://localhost:4321, recarga al editar un .mdx
npm run build      # genera dist/ y valida el frontmatter de todas las páginas (zod)
npm run preview    # sirve dist/
npm run check      # astro check (tipos)

# Página nueva de componente (no pisa archivos existentes)
npm run new -- components date-picker "Date Picker" "Selector de fechas." 1234:5678

# Props de una página de Figma → bloque `props:` del frontmatter (el JSON lo baja el MCP de Figma)
python .claude/skills/extraer-docs/scripts/parse_docs.py <ruta-metadata.json> --yaml
```

No hay tests ni linter. La verificación es `npm run build` + visual con el Edge instalado
(puppeteer-core), con `npm run preview` corriendo:

```bash
MSYS_NO_PATHCONV=1 node tools/verify/screens.mjs --out <scratchpad>/shots --pages /components/tabs/
MSYS_NO_PATHCONV=1 node tools/verify/screens.mjs --overflow     # scroll horizontal a 360 px, todas las páginas
```

En Git Bash, `MSYS_NO_PATHCONV=1` evita que `/components/...` se convierta en una ruta de Windows. Las
capturas salen a pantalla completa en desktop (1400) y móvil (390); los iframes de Figma salen en blanco
en headless: es normal. No instales paquetes con `npm run preview`/`dev` corriendo: en Windows el binario
nativo queda bloqueado y npm deja `node_modules` a medias.

## Estructura

```
src/
  content.config.ts        schema zod de las colecciones (components, product-components, flows, patterns)
  content/<colección>/*.mdx  una página por archivo; el nombre del archivo es el slug de la URL
  pages/
    [section]/[slug].astro   plantilla de components, product-components y flows
    patterns/index.astro     Patterns (content/patterns/index.mdx)
    foundations/*.astro      las 6 foundations, escritas a mano
    index.astro              home
  data/nav.ts              sidebar, anterior/siguiente, eyebrow de cada página
  data/foundations/*.ts    datos tipados de cada foundation (tokens, tablas, reglas)
  components/
    layout/                Sidebar (+ buscador), Topbar (drawer móvil), Toc, PrevNext, PageHeader
    doc/                   FigmaEmbed, PropsTable, DocTable, CardGrid, LinkCard, Section, mdx-components.ts
    ui/                    vocabulario visual compartido: Table, Badge, Token, Stats, Chain, Note, Caption,
                           Rules, Pair/PairCol, InfoGrid, Items, Tabs/TabPanel
    foundations/<nombre>/  piezas propias de cada foundation
  lib/                     figma.ts (URLs de embeds), heading-ids.ts, inline-md.ts, sections.ts, docs.ts
  styles/global.css        Tailwind, tokens (@theme), base y prosa (.doc-prose)
tools/new-page.mjs         scaffold de páginas
tools/verify/screens.mjs   capturas desktop/móvil y chequeo de desborde (puppeteer-core + Edge)
```

### Páginas de componente (`.mdx`)

- **Frontmatter** = datos. `title`, `description`, `figma` (node-ids de los embeds, en el orden del
  cuerpo), `props` (tablas Propiedades, una clave por componente) y `tables` (otras tablas de 3
  columnas, p. ej. Guía de uso). Validado por zod: un tipo de prop fuera del enum, un node-id mal
  escrito o una clave que no existe hacen fallar el build con el nombre del archivo.
- **Cuerpo** = prosa en Markdown + componentes, sin imports: `<FigmaEmbed node="…" />`,
  `<PropsTable block="…" />`, `<DocTable id="…" />`, `<CardGrid>`/`<LinkCard>`. Los componentes leen
  el frontmatter validado desde `Astro.locals.doc`, que la ruta setea antes de renderizar.
- Página de un componente: `FigmaEmbed` + `## Resumen` + `## Propiedades` (+ `## Guía de uso`).
  Página de **varios componentes**: un `## <Componente>` por cada uno con su descripción, su
  `FigmaEmbed`, `### Resumen` y `### Propiedades`. Ver `src/content/components/tabs.mdx`. Al mapear los
  frames «Live Preview» a su componente, hazlo por **la instancia que llevan dentro**: todos los frames
  se llaman igual y la posición en el canvas engaña.
- Los ids de los headings los pone `src/lib/heading-ids.ts` (no se escriben a mano): `##` → `doc-<slug>`,
  `###` bajo un componente → `doc-<componente>-<slug>`. El índice lateral sale de esos headings en build.
- En el YAML, textos entre comillas dobles; son Markdown inline (`` `código` ``, `**negrita**`, links).
- El sidebar se arma solo desde las colecciones, en orden alfabético: crear el `.mdx` basta.

### Foundations (`src/pages/foundations/*.astro`)

Páginas largas y a medida. Todas siguen la misma progresión: Resumen (stats + cadena Tier 1 → Tier 2 →
aplicación) → Tokens primitivos → Tokens semánticos → Cómo usar en Figma → Buenas y malas prácticas.
Los valores no van en la página: viven en `src/data/foundations/<nombre>.ts` y se pintan en build con los
componentes de `ui/` y de `components/foundations/<nombre>/`. Los h2 se declaran una vez con
`sections()` de `lib/sections.ts` (da los ids y el índice lateral). Copia el patrón de `elevations.astro`.

El único JS de cliente es: copiar un token al hacer click (`Token`), las pestañas (`Tabs`), el drawer,
el buscador (Ctrl+K o «/») y el resaltado del índice.

### Pattern / Flow

`patterns/index.mdx` (preview + tarjetas a Figma) y `flows/*.mdx` (solo el Live Preview). El orden de
los flows está en `FLOW_ORDER` de `data/nav.ts`; el de las foundations, en `FOUNDATIONS`.

### CSS

- Tokens en `@theme` de `global.css`: `brand`, `brand-dark`, `brand-light`, `ink`, `muted`, `line`,
  `surface`, `subtle`, `ok`, `info`… Se usan como utilidades (`text-brand`) o como variables
  (`var(--color-brand)`). Fuentes: Lato (`--font-sans`) y Encode Sans Variable (`--font-display`), vía
  @fontsource.
- Layout con utilidades de Tailwind; la piel de cada componente en su `<style>` scoped.
- **El CSS scoped no está en capas y le gana a las utilidades**: no mezcles una utilidad de `display`
  (`hidden`, `lg:hidden`…) con una clase que tenga CSS scoped en el mismo elemento; pon el media query
  en el `<style>`.
- En un `<style>` scoped no prefijes con `.doc-prose` (Astro scopea también el ancestro y la regla no
  aplica). Para markup que llega por `set:html` o por slot desde otro componente, usa `:global(...)`.
- **Mobile-first y sin scroll horizontal a 360 px.** Las tablas scrollean dentro de su wrapper; con
  `stack` (las de documentación) se apilan en tarjetas bajo 640 px. Targets táctiles de 44 px.

### Embeds de Figma

Siempre con `<FigmaEmbed>`; la URL sale de `embedUrl()` en `src/lib/figma.ts`. Dos cosas que ya
costaron tiempo: los iframes llevan `loading="lazy"` (si no, Figma devuelve 403 de CloudFront cuando
cargan varios a la vez; el componente lo fuerza), y cuando un embed muestra el frame equivocado suele ser
**caché del navegador**, no el node-id — verifica en incógnito antes de tocar la URL.

## Flujo de trabajo típico

1. El usuario pasa un link de Figma + el nombre de la página.
2. Bajar el metadata del nodo con el MCP de Figma (`get_metadata`). En las páginas de componente **el
   texto de cada capa viaja en su atributo `name`**, así que no hace falta `get_design_context`. En
   algunas páginas de foundation las capas están nombradas por rol (`title`, `desc`) y ahí sí hay que
   leer el contenido desde un screenshot.
3. Parsear con `parse_docs.py --yaml` o transcribir a mano.
4. Escribir el `.mdx`, `npm run build`, y verificar con las capturas.

El skill `extraer-docs` (`.claude/skills/extraer-docs/SKILL.md`) tiene el procedimiento detallado para
páginas de componente y es el que hay que mantener actualizado cuando la convención cambie.

## Cuidados

- Antes de documentar una página, revisa si ya tiene contenido real. Si lo tiene, pregunta antes de
  pisarlo.
- `figma:` del frontmatter tiene que listar los mismos nodos que los `<FigmaEmbed>` del cuerpo; el build
  lo comprueba.
- Un `<PropsTable block>` o `<DocTable id>` sin su clave en el frontmatter rompe el build: es a propósito.
