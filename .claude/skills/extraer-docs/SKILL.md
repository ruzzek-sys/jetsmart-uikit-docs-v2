---
name: extraer-docs
description: Extrae el section "Docs · <Componente>" de una página de Figma del Jetsmart UI Kit y rellena las secciones Resumen y Propiedades de la página HTML correspondiente. Úsalo cuando el usuario pase una página del kit más un link de Figma y pida documentar, extraer las propiedades, rellenar el resumen, o escriba /extraer-docs. No toca la sección Anatomía.
argument-hint: "[pagina.html] [link-figma]"
---

# Extraer docs de Figma → página del UI Kit

Rellena **Resumen** y **Propiedades** de una página del kit con la información del
section `Docs · <Componente>` que vive en la página de Figma del componente.

**No toques la sección Anatomía.** Esa se documenta aparte y debe quedar con su
placeholder intacto.

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

### 3. Parsea las propiedades

```bash
python .claude/skills/extraer-docs/scripts/parse_docs.py <ruta-metadata> --html
```

Imprime el bloque `<p>subtítulo</p>` + `<div class="ty-table-wrap">…</table></div>`
listo para pegar en la sección Propiedades. Sin `--html` imprime el JSON, útil para
revisar antes de escribir.

El script ya resuelve:
- la estructura `Frame · <Prop>` con sus tres `<text>` (nombre, tipo, descripción),
- los tipos `VARIANT`/`TEXT`/`BOOLEAN` → `Variant`/`Text`/`Boolean` (Title Case, que es
  la convención del kit),
- las entidades HTML (`&quot;`) y las comillas rectas → comillas angulares `«»`,
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

### 5. Escribe las dos secciones

**Resumen** — dos párrafos:
1. Qué es el componente y para qué sirve, en una o dos frases. Redáctalo tú a partir
   de las propiedades y de la card; no lo inventes más allá de lo que muestran.
2. La bajada del paso 4, con los nombres de props envueltos en `<code>`.

**Propiedades** — pega tal cual la salida del paso 3.

Reemplaza sólo los `<p class="coming-soon">` de esas dos secciones. La estructura
queda así:

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

          <section class="doc-section">
            <h2 id="doc-anatomia">Anatomía</h2>
            <p class="coming-soon">Anatomía pendiente de documentar desde Figma.</p>
          </section>
```

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
- Resumen y Propiedades tienen contenido y Anatomía sigue con su placeholder,
- la tabla tiene tantas filas como propiedades (`grep -c '<tr>'` = props + 1),
- el TOC lateral lista las tres secciones.

El iframe del Live Preview sale en blanco en headless — es normal, no es un error.

## Convenciones del kit que debes respetar

- Títulos de sección en español: **Resumen**, **Propiedades**, **Anatomía**, con ids
  `doc-resumen`, `doc-propiedades`, `doc-anatomia`.
- Tablas con `.ty-table-wrap` > `.ty-table`, descripciones en `<td class="ty-muted">`,
  tipos en `<code>`.
- Nada de tooltips en hover: las etiquetas y tablas se leen directo.
- Cabecera de tabla siempre `Propiedad · Tipo · Descripción`.

## Resultado

Cierra reportando: qué componente documentaste, cuántas propiedades entraron y que
Anatomía quedó pendiente.

No hace falta proteger la página de `tools/generate-pages.mjs`: el generador no
sobrescribe archivos que ya existen. Solo `--force` lo haría, y eso avisa en pantalla.
