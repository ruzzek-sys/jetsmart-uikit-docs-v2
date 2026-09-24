/**
 * Migración única: páginas HTML del sitio viejo → .mdx de las colecciones de Astro.
 *
 *   node tools/migrate/html-to-mdx.mjs            escribe src/content/**
 *   node tools/migrate/html-to-mdx.mjs --report   además imprime el conteo por página
 *
 * Se borra junto con el HTML viejo cuando termina la migración.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';
import YAML from 'yaml';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const PROP_TYPES = new Set(['Variant', 'Boolean', 'Text', 'Instance', 'Slot', 'Heredada']);
/** Espacios de HTML; el nbsp (U+00A0) se conserva. */
const WS = /[ \t\n\r\f]+/g;
const FLAT_SECTIONS = new Set(['resumen', 'propiedades', 'guia-de-uso']);

const SOURCES = [
  ...['components', 'product-components', 'flows'].flatMap((dir) =>
    fs.readdirSync(path.join(ROOT, dir)).filter((f) => f.endsWith('.html')).map((f) => ({ dir, file: f, slug: f.replace(/\.html$/, '') })),
  ),
  { dir: 'patterns', file: 'index.html', slug: 'index' },
];

const slugify = (text) =>
  text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/&/g, ' ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/* ---------- HTML inline → Markdown ------------------------------------------------------ */

/** Escapa lo que Markdown/MDX interpretaría. */
function escapeText(text) {
  // Solo lo que de verdad cambia el render: `#` y `>` importan solo al inicio de línea (blockSafe).
  const out = text.replace(/[\\`*_[\]<{}]/g, (c) => `\\${c}`);
  return (out.match(/~/g) ?? []).length > 1 ? out.replace(/~/g, '\\~') : out;
}

function rewriteHref(href) {
  // ../components/hero-banner.html → /components/hero-banner/
  const m = /^(?:\.\.\/|\.\/)?([a-z-]+)\/([a-z0-9-]+)\.html(#.*)?$/.exec(href);
  if (!m) return href;
  const page = m[2] === 'index' ? `/${m[1]}/` : `/${m[1]}/${m[2]}/`;
  return page + (m[3] ?? '');
}

/** Envuelve con un marcador (** o *) dejando fuera los espacios de los bordes. */
function wrap(inner, mark) {
  const lead = /^\s*/.exec(inner)[0];
  const trail = /\s*$/.exec(inner)[0];
  const core = inner.trim();
  return core ? `${lead}${mark}${core}${mark}${trail}` : inner;
}

function inline($, nodes) {
  let out = '';
  for (const node of nodes) {
    if (node.type === 'text') {
      out += escapeText(node.data.replace(WS, ' '));
      continue;
    }
    if (node.type !== 'tag') continue;
    const $n = $(node);
    switch (node.tagName) {
      case 'strong':
      case 'b':
        out += wrap(inline($, node.children), '**');
        break;
      case 'em':
      case 'i':
        out += wrap(inline($, node.children), '*');
        break;
      case 'code': {
        const code = $n.text().replace(WS, ' ');
        const fence = code.includes('`') ? '``' : '`';
        const pad = code.startsWith('`') || code.endsWith('`') ? ' ' : '';
        out += `${fence}${pad}${code}${pad}${fence}`;
        break;
      }
      case 'a':
        out += `[${inline($, node.children).trim()}](${rewriteHref($n.attr('href') ?? '')})`;
        break;
      case 'br':
        out += '<br />';
        break;
      case 'span':
        out += inline($, node.children);
        break;
      default:
        throw new Error(`Etiqueta inline no soportada: <${node.tagName}>`);
    }
  }
  return out;
}

/** Un texto que empieza con «1. », «- », «#» o «>» se leería como lista, título o cita. */
const blockSafe = (text) =>
  text.replace(/^(\d+)([.)])(\s)/, '$1\\$2$3').replace(/^([-+])(\s)/, '\\$1$2').replace(/^([#>])/, '\\$1');

const inlineOf = ($, el) => blockSafe(inline($, el.children).replace(WS, ' ').trim());

/** Contenido de celda: inline, o lista Markdown si la celda trae <ol>/<ul>. */
function cellMarkdown($, el) {
  const lists = $(el).children('ol, ul');
  if (!lists.length) return inlineOf($, el);
  const parts = [];
  for (const child of el.children) {
    if (child.type === 'tag' && (child.tagName === 'ol' || child.tagName === 'ul')) parts.push(listMarkdown($, child));
    else {
      const text = inline($, [child]).trim();
      if (text) parts.push(text);
    }
  }
  return parts.join('\n\n');
}

function listMarkdown($, list) {
  const ordered = list.tagName === 'ol';
  return $(list)
    .children('li')
    .toArray()
    .map((li, i) => `${ordered ? `${i + 1}.` : '-'} ${inlineOf($, li)}`)
    .join('\n');
}

/* ---------- Tablas ---------------------------------------------------------------------- */

function badgesOf($, td) {
  const spans = $(td).children('span.ty-badge');
  if (!spans.length) return null;
  // La celda tiene que ser solo badges (y separadores) para convertirse en lista de badges.
  const rest = $(td).clone();
  rest.children('span.ty-badge').remove();
  if (rest.text().replace(/[\s·,]/g, '')) return null;
  return spans.toArray().map((s) => {
    const tone = /ty-badge--(\w+)/.exec($(s).attr('class') ?? '')?.[1] ?? 'var';
    const label = $(s).text().replace(WS, ' ').trim();
    return tone === 'var' ? { label } : { label, tone };
  });
}

function parseTable($, wrapEl) {
  const $t = $(wrapEl).find('table');
  const columns = $t.find('thead th').toArray().map((th) => $(th).text().replace(WS, ' ').trim());
  const rows = $t.find('tbody tr').toArray().map((tr) => $(tr).children('td').toArray());
  if (columns.length !== 3 || rows.some((r) => r.length !== 3)) throw new Error(`Tabla que no es de 3 columnas: ${columns.join(' | ')}`);

  const nameOf = (td) => {
    const kids = $(td).contents().toArray().filter((n) => !(n.type === 'text' && !n.data.trim()));
    // <strong>X</strong> sola → X (PropsTable/DocTable ya la ponen en negrita).
    if (kids.length === 1 && kids[0].type === 'tag' && kids[0].tagName === 'strong') return inlineOf($, kids[0]);
    return inlineOf($, td);
  };

  const typeOf = (td) => {
    const kids = $(td).contents().toArray().filter((n) => !(n.type === 'text' && !n.data.trim()));
    if (kids.length === 1 && kids[0].tagName === 'code') return $(kids[0]).text().trim();
    return null;
  };

  const isProps =
    columns.join('|') === 'Propiedad|Tipo|Descripción' && rows.every((r) => PROP_TYPES.has(typeOf(r[1]) ?? ''));

  if (isProps) {
    return { kind: 'props', rows: rows.map((r) => ({ name: nameOf(r[0]), type: typeOf(r[1]), desc: cellMarkdown($, r[2]) })), count: rows.length };
  }
  return {
    kind: 'table',
    columns,
    rows: rows.map((r) => ({ name: nameOf(r[0]), meta: badgesOf($, r[1]) ?? cellMarkdown($, r[1]), desc: cellMarkdown($, r[2]) })),
    count: rows.length,
  };
}

/* ---------- Página ---------------------------------------------------------------------- */

function convert({ dir, file, slug }) {
  const src = path.join(ROOT, dir, file);
  const $ = cheerio.load(fs.readFileSync(src, 'utf8'));
  const $main = $('main');
  const $header = $main.children('header.page-header');
  const title = $header.find('h1').text().trim();
  const description = $header.children('p').not('.page-header__eyebrow').first().text().replace(WS, ' ').trim();

  const figma = [];
  const props = {};
  const tables = {};
  const out = [];
  const report = { page: `${dir}/${slug}`, iframes: 0, tables: 0, rows: 0 };

  let block = slug; // clave de las tablas Propiedades: el componente del h2 actual
  let lastHeading = '';
  const uniqueKey = (store, key) => {
    let k = key;
    for (let n = 2; k in store; n++) k = `${key}-${n}`;
    return k;
  };

  const embed = (previewEl) => {
    const label = $(previewEl).children('.figma-preview__label').text().trim();
    $(previewEl)
      .find('iframe')
      .each((_, iframe) => {
        const url = new URL($(iframe).attr('src'));
        const node = new URL(url.searchParams.get('url')).searchParams.get('node-id').replace('-', ':');
        figma.push(node);
        report.iframes++;
        const iframeTitle = ($(iframe).attr('title') ?? '').replace(/ - Figma preview$/, '');
        const attrs = [`node="${node}"`];
        if (iframeTitle && iframeTitle !== title) attrs.push(`title="${iframeTitle}"`);
        if (label && label !== 'Live Preview') attrs.push(`label="${label}"`);
        out.push(`<FigmaEmbed ${attrs.join(' ')} />`);
      });
  };

  const walk = (el) => {
    const $el = $(el);
    const tag = el.tagName;
    if ($el.is('.figma-preview')) return embed(el);
    if (tag === 'section' && $el.is('.doc-section')) return $el.children().each((_, c) => walk(c));
    if (/^h[2-4]$/.test(tag)) {
      const text = inlineOf($, el);
      const level = Number(tag[1]);
      if (level === 2) {
        const s = slugify($el.text());
        block = FLAT_SECTIONS.has(s) ? slug : s;
      }
      lastHeading = slugify($el.text());
      return out.push(`${'#'.repeat(level)} ${text}`);
    }
    if (tag === 'p') {
      if ($el.attr('class')) throw new Error(`<p class="${$el.attr('class')}"> no esperado en ${src}`);
      return out.push(inlineOf($, el));
    }
    if (tag === 'ol' || tag === 'ul') return out.push(listMarkdown($, el));
    if ($el.is('.ty-table-wrap')) {
      const t = parseTable($, el);
      report.tables++;
      report.rows += t.count;
      if (t.kind === 'props') {
        const key = uniqueKey(props, block);
        props[key] = t.rows;
        return out.push(`<PropsTable block="${key}" />`);
      }
      const key = uniqueKey(tables, `${block}-${lastHeading}`);
      tables[key] = { columns: t.columns, rows: t.rows };
      return out.push(`<DocTable id="${key}" />`);
    }
    if ($el.is('.card-grid')) {
      const cards = $el
        .children('a.card')
        .toArray()
        .map((a) => {
          const $a = $(a);
          const attrs = [`href="${rewriteHref($a.attr('href'))}"`, `title="${$a.find('.card__title').text().trim()}"`];
          const desc = $a.find('.card__desc').text().trim();
          if (desc) attrs.push(`description="${desc}"`);
          if ($a.attr('target') === '_blank') attrs.push('external');
          return `  <LinkCard ${attrs.join(' ')} />`;
        });
      return out.push(['<CardGrid>', ...cards, '</CardGrid>'].join('\n'));
    }
    throw new Error(`Elemento no soportado <${tag} class="${$el.attr('class') ?? ''}"> en ${src}`);
  };

  $main.children().not('header.page-header').each((_, el) => walk(el));

  const data = { title, description };
  // Entre comillas: «5167:54214» sin comillas es un número sexagesimal en YAML 1.1.
  if (figma.length) data.figma = figma.map((n) => Object.assign(new YAML.Scalar(n), { type: 'QUOTE_DOUBLE' }));
  if (Object.keys(props).length) data.props = props;
  if (Object.keys(tables).length) data.tables = tables;
  const frontmatter = YAML.stringify(data, { lineWidth: 0, flowCollectionPadding: false }).trimEnd();
  const mdx = `---\n${frontmatter}\n---\n\n${out.join('\n\n')}\n`;

  const dest = path.join(ROOT, 'src/content', dir, `${slug}.mdx`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, mdx);
  return report;
}

const reports = SOURCES.map(convert);
const total = reports.reduce((acc, r) => ({ iframes: acc.iframes + r.iframes, tables: acc.tables + r.tables, rows: acc.rows + r.rows }), { iframes: 0, tables: 0, rows: 0 });
if (process.argv.includes('--report')) for (const r of reports) console.log(r.page.padEnd(48), r.iframes, r.tables, r.rows);
console.log(`${reports.length} páginas · ${total.iframes} iframes · ${total.tables} tablas · ${total.rows} filas`);
