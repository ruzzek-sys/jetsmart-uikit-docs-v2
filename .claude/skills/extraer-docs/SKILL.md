---
name: extraer-docs
description: Extrae los sections "Docs · <Componente>" de una página de Figma del Jetsmart UI Kit y rellena el .mdx de la página correspondiente, sea de un componente o de varios. Úsalo cuando el usuario pase una página del kit más un link de Figma y pida documentar, extraer las propiedades, rellenar el resumen, separar o poner en orden los componentes de una página, o escriba /extraer-docs.
argument-hint: "[pagina] [link-figma]"
---

# Extraer docs de Figma → página del UI Kit

Rellena **Resumen** y **Propiedades** del `.mdx` de una página del kit con la información
del section `Docs · <Componente>` que vive en la página de Figma del componente.

Cada página es un archivo en `src/content/<colección>/<slug>.mdx`:

- **frontmatter** (YAML, validado por zod en `src/content.config.ts`): `title`,
  `description`, `figma` (los node-ids de los embeds, en orden), `props` (tablas
  Propiedades, una clave por componente) y `tables` (cualquier otra tabla de 3 columnas).
- **cuerpo** (Markdown + componentes, sin imports): headings, prosa y
  `<FigmaEmbed node="…" />`, `<PropsTable block="…" />`, `<DocTable id="…" />`.

Una página de **un solo componente** tiene: Live Preview, **Resumen** y **Propiedades**,
más **Guía de uso** cuando Figma trae un section `Guía de uso ·` (paso 5b). Nada más.

Cuando la página de Figma trae **varios componentes** —varios frames `Live Preview` y
varios sections `Docs ·`— van **separados, uno por componente**, cada uno con su propio
`##` título, descripción, Live Preview, `### Resumen` y `### Propiedades` (paso 5).

Esto vale siempre, aunque los componentes sean parientes: da igual que compartan el
nombre de la página (Banner → «Promotional Banner» y «Membership Banner») o que uno sea
parte del otro (Tabs → «Chips» y las barras que se arman con él). No juntes varios
componentes bajo un mismo Resumen. Referencias: `src/content/components/tabs.mdx` (cinco)
y `src/content/components/banner.mdx` (dos).

## Argumentos

```
/extraer-docs [pagina] [link-figma]
```

- `pagina` — slug o ruta, ej. `alert-dialog` o `src/content/components/alert-dialog.mdx`.
  Si viene sin carpeta, búscala con `ls src/content/*/`. Si no existe, créala con
  `npm run new -- <colección> <slug> "<Título>" "<Descripción>" <node-id>`.
- `link-figma` — URL del nodo, ej.
  `https://www.figma.com/design/dKd6jNGAnng8hIV5MS4Avd/Jetsmart-UI-Kit-v1.0?node-id=2339-47383`

Si falta alguno, pídelo antes de empezar. Si el nodeId apunta a la matriz o a un
componente suelto en vez de a la página del componente, el paso 2 falla: pide el link
de la página completa (la que en Figma se llama `↳ <Componente> ✅`).

## Procedimiento

### 1. Ubica la página y verifica que no tenga ya contenido

```bash
grep -n '^##' src/content/components/<slug>.mdx
```

Si Resumen o Propiedades ya tienen contenido real (no el texto de plantilla del
scaffold), **para y pregunta** antes de sobrescribir. El proyecto está en git, así que
se puede revertir, pero igual conviene confirmar antes de pisar trabajo ajeno.

### 2. Baja el metadata del nodo

Del link saca `fileKey` (`dKd6jNGAnng8hIV5MS4Avd`) y `nodeId` (`2339-47383` → `2339:47383`).

Llama `mcp__plugin_figma_figma__get_metadata` con esos dos valores.

No hace falta `get_design_context`: en el dump de metadata **el contenido de cada
capa de texto viaja en su atributo `name`**, así que el texto de las propiedades ya
viene ahí. Es mucho más barato.

Si la salida es grande, la herramienta la guarda en un archivo y te da la ruta. Úsala
tal cual en el paso 3. Si vino inline, pégala en un `.txt` en el scratchpad.

**Cuenta los frames `Live Preview` y los sections `Docs ·` del dump.** Si hay más de uno
de cada, la página trae varios componentes y tienes que mapearlos. Los frames se llaman
todos igual, así que **no los identifiques por su posición en el canvas**: hazlo por la
instancia que llevan dentro.

```bash
python - <<'EOF'
import re, io
lines = io.open(r"<ruta-metadata.xml>", encoding="utf-8").read().splitlines()
for i, l in enumerate(lines):
    m = re.match(r'^  <frame id="([^"]+)" name="Live Preview"', l)
    if not m:
        continue
    child = re.search(r'name="([^"]+)"', lines[i + 1])
    print(m.group(1), "->", child.group(1) if child else "?")
EOF
```

El orden de los componentes en la página es el del canvas, de arriba hacia abajo
(por la coordenada `y` del frame `Matriz · <Componente>`).

### 3. Parsea las propiedades

```bash
python .claude/skills/extraer-docs/scripts/parse_docs.py <ruta-metadata> --yaml
```

Imprime el bloque `props:` listo para pegar en el frontmatter, con una clave por
componente (su slug) y cada texto ya entre comillas y con el Markdown escapado. El
subtítulo de cada tabla sale como comentario `#`: ese texto va en el cuerpo, como
párrafo justo antes de `<PropsTable>`. Sin `--yaml` imprime el JSON, útil para revisar.

**Una página puede documentar más de un componente relacionado** (ej. Avatar Selector
trae `Docs · Avatar` y `Docs · Avatar Selector`). El script los detecta todos y
devuelve una entrada por cada uno.

El script ya resuelve:
- la estructura `Frame · <Prop>` con sus tres `<text>` (nombre, tipo, descripción),
- los tipos `VARIANT`/`TEXT`/`BOOLEAN` → `Variant`/`Text`/`Boolean` (Title Case, que es
  la convención del kit),
- las entidades HTML (`&quot;`, `&#39;`) y las comillas rectas, simples o dobles,
  → comillas angulares `«»`,
- el subtítulo del encabezado de la leyenda.

El schema solo acepta los tipos `Variant`, `Boolean`, `Text`, `Instance`, `Slot` y
`Heredada`. Si Figma trae otro (ej. `N/A`), esa tabla no es de Propiedades: va en
`tables:` y se pinta con `<DocTable>`.

Si avisa que un frame tiene menos de 3 textos, míralo a mano: suele ser una propiedad
con el layout distinto.

### 4. Consigue la bajada para el Resumen

La descripción de variantes vive en el subtítulo de la matriz, y **ese texto no está
en el metadata** (la capa se llama `lbl · subtítulo`, no lleva el contenido). Hay que
leerla de una imagen:

1. En el metadata busca el frame `Matriz · <Componente>` y toma su id.
2. `mcp__plugin_figma_figma__get_screenshot` con ese id, `maxDimension: 1300`.
3. Descarga el PNG con `curl -sL -o` y recorta la franja superior:
   ```bash
   python -c "from PIL import Image; Image.open('m.png').crop((0,0,1300,220)).save('h.png')"
   ```
4. Lee `h.png` y transcribe el subtítulo.

**El subtítulo no siempre habla de lo mismo.** Hay dos casos y cambian lo que escribes
en el Resumen:

- **Ejes de variante** — lo habitual. Ej. Alert Dialog: «Un solo eje de variante:
  Breakpoint. Desktop y Mobile no son el mismo diseño reescalado…». Transcríbelo y
  listo.
- **Familia / composición** — cuando menciona «maestros», «partes», «compuesto» o
  «familia». Ej. Accordion: «Cuatro maestros. El compuesto arriba y sus partes debajo,
  en el orden en que se ensamblan». Acá el subtítulo describe de qué se arma el
  componente, no cómo varía, y **hay que nombrar esos maestros**. Sácalos del
  metadata, no los adivines:

  ```bash
  python -c "
  import json,re
  t=''.join(b['text'] for b in json.load(open(r'<ruta-metadata>',encoding='utf-8')))
  i=t.find('<id-del-frame-Matriz>')
  for m in re.finditer(r'<frame\s+id="([^"]+)"\s+name="([^"]+)"', t[i:i+20000]):
      print(m.group(1), '|', m.group(2))
  " | head -20
  ```

  Entre los primeros resultados están el compuesto y sus partes. Descarta los frames
  auxiliares de la matriz (`Column Headers`, `lbl · …`, `nota slot · …`, `bracket …`).

### 5. Escribe la página

**Resumen** — dos párrafos:
1. Qué es el componente y para qué sirve, en una o dos frases. Redáctalo tú a partir
   de las propiedades y de la card; no lo inventes más allá de lo que muestran.
2. La bajada del paso 4:
   - si era de **ejes de variante**, transcríbela con los nombres de props en `` `código` ``;
   - si era de **familia**, nombra el compuesto y sus partes en `` `código` `` y recién
     después menciona qué recorren las columnas y las filas de la matriz.

**Propiedades** — el subtítulo como párrafo y `<PropsTable block="<slug>" />`; las filas
van en `props.<slug>` del frontmatter (salida del paso 3).

Página de un componente:

```mdx
---
title: Alert Dialog
description: Diálogo modal que pide confirmar una acción.
figma: ["2339:47383"]
props:
  alert-dialog:
    - name: "Breakpoint"
      type: Variant
      desc: "Desktop centra el diálogo… Desktop es el valor por defecto."
---

<FigmaEmbed node="2339:47383" />

## Resumen

…qué es y para qué sirve…

…bajada de variantes con `Breakpoint`…

## Propiedades

…subtítulo…

<PropsTable block="alert-dialog" />
```

Página de varios componentes: un bloque por componente, en el orden del canvas.

```mdx
---
title: Tabs
description: …
figma: ["1:2", "3:4"]
props:
  chips: [ … ]
  toggle-tab: [ … ]
---

## Chips

…qué es y para qué sirve…

<FigmaEmbed node="1:2" title="Chips" />

### Resumen

…

### Propiedades

…subtítulo…

<PropsTable block="chips" />

## Toggle Tab

…lo mismo para cada componente…
```

Reglas que el build hace cumplir (si fallan, `npm run build` avisa con el archivo):
- `figma:` lista **todos** los `<FigmaEmbed>` del cuerpo, en el mismo orden.
- Cada `<PropsTable block>` y `<DocTable id>` tiene su clave en el frontmatter.
- Los tipos de `props` son del enum de arriba.

Los ids de los headings y el índice lateral salen solos (`src/lib/heading-ids.ts`):
un `##` recibe `doc-<slug>`; un `###` bajo el `##` de un componente recibe
`doc-<componente>-<slug>` (`doc-chips-resumen`), y bajo Resumen/Propiedades/Guía de uso,
`doc-<slug>`. No escribas ids a mano. El `title` de `<FigmaEmbed>` solo hace falta
cuando el componente no se llama como la página.

**Cuidado con los ejes de la matriz:** a veces el rótulo del eje no coincide con el
nombre real de la propiedad. En Avatar Selector la matriz dice `STATE` pero la prop
del componente es `Expansion`. Manda el nombre del section Docs, que es el que ve el
diseñador en el panel; si los ves distintos, avísale al usuario.

Los nombres de las propiedades van **en inglés**, tal como aparecen en Figma
(`Show Button Secondary`, no «Mostrar botón secundario»): tienen que calzar con el
panel que ve el diseñador. Las descripciones van en español, copiadas textualmente.

### 5b. Guía de uso (si la página la trae)

Algunas páginas de Figma traen, además del `Docs ·`, un section `Guía de uso · <Componente>`
con una o más `legend card`. Cada card tiene título + bajada y filas `Frame · <Aspecto>`
con tres textos: aspecto, categoría (en mayúsculas, ej. `COMPORTAMIENTO`) y descripción.
Transcríbela textualmente, con las comillas pasadas a `«»`.

- Página de un componente: `## Guía de uso`, y cada card como `### <título>` + párrafo
  con la bajada + `<DocTable id="…" />`.
- Página de varios: al final del bloque de su componente, `### Guía de uso` y cada card
  como `#### <título>`. Si la guía no corresponde a ningún bloque documentado
  (ej. `Calendar Day`, `Footer`), va como `## Guía de uso` al final de la página.
- Cada tabla va en `tables:` del frontmatter, con `columns: [Aspecto, Categoría, Descripción]`
  y filas `{ name, meta, desc }`. La categoría es una lista de badges en tipo oración
  (el CSS la pasa a mayúsculas): `meta: [{ label: "Comportamiento" }]`. Tonos disponibles
  con `tone:` → `var` (default), `on`, `off`, `neutral`, `brand`.
- La clave de la tabla es `<componente>-<slug-del-título-de-la-card>`.

```yaml
tables:
  accordion-detalle-del-accordion:
    columns: [Aspecto, Categoría, Descripción]
    rows:
      - name: "Detalle del accordion — Desktop"
        meta: [{ label: "Comportamiento" }]
        desc: "El detalle se completa hacia la derecha…"
```

Referencias: `src/content/components/badge.mdx` (un componente),
`src/content/components/buttons.mdx` (varios, con dos cards) y
`src/content/components/calendar.mdx` (guía a nivel de página).

### 6. Verifica

```bash
npm run build                      # zod valida el frontmatter; un error nombra el archivo
npm run preview                    # http://localhost:4321/components/<slug>/
```

Con el preview arriba, saca capturas desktop y móvil (en Git Bash hace falta
`MSYS_NO_PATHCONV=1` para que no convierta la ruta):

```bash
MSYS_NO_PATHCONV=1 node tools/verify/screens.mjs --out <scratchpad>/shots --pages /components/<slug>/
```

Mira los PNG y confirma que:
- Resumen y Propiedades tienen contenido y no quedó texto de plantilla,
- la tabla tiene tantas filas como propiedades,
- el índice lateral lista las secciones —o, si son componentes distintos, los lista
  todos con sus subsecciones anidadas debajo—,
- a 390 px la tabla se apila en tarjetas y nada desborda.

El iframe del Live Preview sale en blanco en headless — es normal, no es un error.

## Convenciones del kit que debes respetar

- Títulos de sección en español: **Resumen**, **Propiedades**, **Guía de uso**.
- `<FigmaEmbed>` siempre: pone `loading="lazy"` (sin eso, varios iframes a la vez dan
  403 de Figma). Si un embed muestra el frame equivocado, sospecha de la caché del
  navegador antes de tocar el node-id.
- En el YAML, los textos siempre entre comillas dobles; son Markdown inline
  (`` `código` ``, `**negrita**`, `[link](/components/otro/)`).
- Nada de tooltips en hover: las etiquetas y tablas se leen directo.
- Cabecera de tabla siempre `Propiedad · Tipo · Descripción` (la pone `<PropsTable>`).

## Resultado

Cierra reportando: qué componente documentaste y cuántas propiedades entraron. Si eran
varios, nómbralos en el orden en que quedaron y di cuántas props entró cada uno.
