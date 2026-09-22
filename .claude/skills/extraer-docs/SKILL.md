---
name: extraer-docs
description: Extrae los sections "Docs · <Componente>" de una página de Figma del Jetsmart UI Kit y rellena la página HTML correspondiente, sea de un componente o de varios. Úsalo cuando el usuario pase una página del kit más un link de Figma y pida documentar, extraer las propiedades, rellenar el resumen, separar o poner en orden los componentes de una página, o escriba /extraer-docs.
argument-hint: "[pagina.html] [link-figma]"
---

# Extraer docs de Figma → página del UI Kit

Rellena **Resumen** y **Propiedades** de una página del kit con la información del
section `Docs · <Componente>` que vive en la página de Figma del componente.

Una página de **un solo componente** tiene exactamente dos secciones: **Resumen** y
**Propiedades**. No agregues ninguna otra.

Una página de Figma puede traer **varios componentes**, y entonces hay dos formas de
resolverla. Cuál corresponde se decide por los nombres (paso 5):

- **Familia** — los componentes son variantes del concepto que nombra la página
  (Banner → «Promotional Banner» y «Membership Banner»; Avatar Selector → «Avatar» y
  «Avatar Selector»). Siguen siendo dos secciones: un Resumen conjunto y una
  Propiedades con un `<h3>` por componente.
- **Componentes distintos** — cada uno tiene identidad propia y su nombre no deriva del
  de la página (Tabs → «Chips», «Toggle Tab», «Tab Bar / Searchbox», «Tab Bar Filter»,
  «Tab Underline Item»). Ahí va un bloque completo por componente. Referencia:
  `components/tabs.html`.

Si dudas entre las dos, pregunta antes de escribir: rehacer la estructura después es
mucho más caro que la pregunta.

## Argumentos

```
/extraer-docs [pagina.html] [link-figma]
```

- `pagina.html` — nombre o ruta de la página, ej. `alert-dialog`, `alert-dialog.html`
  o `components/alert-dialog.html`. Si viene sin carpeta, búscala con
  `ls components/ product-components/ patterns/`.
- `link-figma` — URL del nodo, ej.
  `https://www.figma.com/design/dKd6jNGAnng8hIV5MS4Avd/Jetsmart-UI-Kit-v1.0?node-id=2339-47383`

Si falta alguno, pídelo antes de empezar. Si el nodeId apunta a la matriz o a un
componente suelto en vez de a la página del componente, el paso 2 falla: pide el link
de la página completa (la que en Figma se llama `↳ <Componente> ✅`).

## Procedimiento

### 1. Ubica la página y verifica que no tenga ya contenido

```bash
grep -n '<h2 id="doc-' components/<slug>.html
grep -c 'coming-soon' components/<slug>.html
```

Si Resumen o Propiedades ya tienen contenido real (no `coming-soon`), **para y
pregunta** antes de sobrescribir. El proyecto está en git, así que se puede revertir,
pero igual conviene confirmar antes de pisar trabajo ajeno.

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

El orden de los componentes en la página HTML es el del canvas, de arriba hacia abajo
(por la coordenada `y` del frame `Matriz · <Componente>`).

### 3. Parsea las propiedades

```bash
python .claude/skills/extraer-docs/scripts/parse_docs.py <ruta-metadata> --html
```

Imprime el bloque `<p>subtítulo</p>` + `<div class="ty-table-wrap">…</table></div>`
listo para pegar en la sección Propiedades. Sin `--html` imprime el JSON, útil para
revisar antes de escribir.

**Una página puede documentar más de un componente relacionado** (ej. Avatar Selector
trae `Docs · Avatar` y `Docs · Avatar Selector`). El script los detecta todos y
devuelve una entrada por cada uno. Con `--html`, si hay más de uno antepone un `<h3>`
con el nombre a cada tabla; con uno solo no pone nada, como siempre. Revisa el JSON
primero para saber cuántos vienen.

El script ya resuelve:
- la estructura `Frame · <Prop>` con sus tres `<text>` (nombre, tipo, descripción),
- los tipos `VARIANT`/`TEXT`/`BOOLEAN` → `Variant`/`Text`/`Boolean` (Title Case, que es
  la convención del kit),
- las entidades HTML (`&quot;`, `&#39;`) y las comillas rectas, simples o dobles,
  → comillas angulares `«»`,
- el subtítulo del encabezado de la leyenda.

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

### 5. Escribe las secciones

**Resumen** — dos párrafos:
1. Qué es el componente y para qué sirve, en una o dos frases. Redáctalo tú a partir
   de las propiedades y de la card; no lo inventes más allá de lo que muestran.
2. La bajada del paso 4:
   - si era de **ejes de variante**, transcríbela con los nombres de props en `<code>`;
   - si era de **familia**, nombra el compuesto y sus partes en `<code>` y recién
     después menciona qué recorren las columnas y las filas de la matriz.

**Propiedades** — pega tal cual la salida del paso 3.

**Si la página trae varios componentes de una familia**, el Resumen los trata juntos:
explica en un párrafo qué es cada uno y cómo se relacionan, y en el segundo pon la
cobertura de variantes de cada uno. Las tablas quedan una tras otra bajo su `<h3>`.
Ejemplo: `components/banner.html`.

**Si son componentes distintos**, va un bloque completo por componente, en el orden del
canvas, cada uno en su propia `<section class="doc-section">`:

1. `<h2 id="doc-<slug>">` con el nombre del componente.
2. Un párrafo de descripción corta: qué es y para qué sirve.
3. Su `<div class="figma-preview">` con el iframe de **su** frame Live Preview.
4. `<h3 id="doc-<slug>-resumen">Resumen</h3>` — los mismos dos párrafos de siempre.
5. `<h3 id="doc-<slug>-propiedades">Propiedades</h3>` — subtítulo + tabla.

El índice lateral se anida solo: `renderInPageNav` en `assets/js/layout.js` etiqueta
cada ítem con `page-toc__item--h2` / `--h3` y el CSS indenta los h3 cuando la lista
tiene alguno. Para que un h3 aparezca en el índice **su id tiene que empezar con
`doc-`**: el selector es `main [id^='doc-']`.

Actualiza además el manifiesto, porque la página ya no tiene un solo preview:

- `tools/generate-pages.mjs` — en el item de la página, `nodes` con **todos** los nodos
  de Live Preview (en el orden de la página) y `live: true`.
- `assets/js/nav-data.js` — la misma lista en `figmaNodeIds`, con `figmaNodeId` igual al
  primero. Es un archivo derivado: si no lo sincronizas, la próxima corrida del
  generador pisa el cambio.

En una página de un componente reemplaza sólo los `<p class="coming-soon">` de esas
dos secciones; en una de componentes distintos se reescribe el cuerpo entero. La
estructura queda así:

```html
          <section class="doc-section">
            <h2 id="doc-resumen">Resumen</h2>
            <p>…descripción del componente…</p>
            <p>…bajada de variantes con <code>Breakpoint</code>…</p>
          </section>

          <section class="doc-section">
            <h2 id="doc-propiedades">Propiedades</h2>
            <p>…subtítulo…</p>
            <div class="ty-table-wrap">
              <table class="ty-table">…</table>
            </div>
          </section>
```

Y así queda una página de componentes distintos:

```html
          <section class="doc-section">
            <h2 id="doc-chips">Chips</h2>
            <p>…qué es y para qué sirve…</p>
            <div class="figma-preview">
              <p class="figma-preview__label">Live Preview</p>
              <div class="figma-preview__frame">
                <iframe … loading="lazy" allowfullscreen></iframe>
              </div>
            </div>
            <h3 id="doc-chips-resumen">Resumen</h3>
            <p>…</p>
            <h3 id="doc-chips-propiedades">Propiedades</h3>
            <p>…subtítulo…</p>
            <div class="ty-table-wrap">…</div>
          </section>

          <section class="doc-section">
            <h2 id="doc-toggle-tab">Toggle Tab</h2>
            …lo mismo para cada componente…
          </section>
```

**Cuidado con los ejes de la matriz:** a veces el rótulo del eje no coincide con el
nombre real de la propiedad. En Avatar Selector la matriz dice `STATE` pero la prop
del componente es `Expansion`. Manda el nombre del section Docs, que es el que ve el
diseñador en el panel; si los ves distintos, avísale al usuario.

Los nombres de las propiedades van **en inglés**, tal como aparecen en Figma
(`Show Button Secondary`, no «Mostrar botón secundario»): tienen que calzar con el
panel que ve el diseñador. Las descripciones van en español, copiadas textualmente.

### 6. Verifica en el navegador

```bash
"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless=new \
  --disable-gpu --hide-scrollbars --window-size=1400,1800 \
  --screenshot=<scratchpad>/check.png --virtual-time-budget=5000 \
  "file:///D:/Rohkea%20Studio/Dev/uikit-jetsmart/components/<slug>.html"
```

Recorta con PIL y mira el resultado. Confirma que:
- Resumen y Propiedades tienen contenido y no quedó ningún `coming-soon`,
- la tabla tiene tantas filas como propiedades (`grep -c '<tr>'` = props + 1),
- el TOC lateral lista las dos secciones —o, si son componentes distintos, los lista
  todos con sus dos subsecciones anidadas debajo.

El iframe del Live Preview sale en blanco en headless — es normal, no es un error.

## Convenciones del kit que debes respetar

- Títulos de sección en español: **Resumen** y **Propiedades**, con ids
  `doc-resumen` y `doc-propiedades`. En una página de componentes distintos, el `h2`
  es el nombre del componente (`doc-<slug>`) y los ids de las subsecciones llevan su
  prefijo: `doc-<slug>-resumen`, `doc-<slug>-propiedades`.
- Todo heading que deba salir en el índice necesita un id que empiece con `doc-`.
- Los iframes de Live Preview llevan `loading="lazy"`: si cargan varios a la vez sin
  eso, Figma responde 403. Y si un embed muestra el frame equivocado, sospecha de la
  caché del navegador antes de tocar el node-id.
- Tablas con `.ty-table-wrap` > `.ty-table`, descripciones en `<td class="ty-muted">`,
  tipos en `<code>`.
- Nada de tooltips en hover: las etiquetas y tablas se leen directo.
- Cabecera de tabla siempre `Propiedad · Tipo · Descripción`.

## Resultado

Cierra reportando: qué componente documentaste y cuántas propiedades entraron. Si eran
varios, nómbralos en el orden en que quedaron y di cuántas props entró cada uno.

No hace falta proteger la página de `tools/generate-pages.mjs`: el generador no
sobrescribe archivos que ya existen. Solo `--force` lo haría, y eso avisa en pantalla.
