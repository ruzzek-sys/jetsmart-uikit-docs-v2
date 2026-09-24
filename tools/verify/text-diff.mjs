/**
 * Verificación de la migración: compara cada página HTML vieja con su versión en dist/.
 *
 *   npm run build && node tools/verify/text-diff.mjs [--old <dir>] [--only <ruta>]
 *
 * Por página revisa: texto de <main> (normalizado), secuencia de iframes de Figma (y que todos
 * lleven loading="lazy"), cantidad de tablas y filas, y la secuencia de headings.
 * --old apunta a una copia del sitio viejo (por defecto, la raíz del repo; para las foundations,
 * a la carpeta con los DOM volcados por Edge, que ya traen lo que pinta el JS).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const args = process.argv.slice(2);
const opt = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);
const OLD = path.resolve(opt('--old') ?? ROOT);
const ONLY = opt('--only');
const DIST = path.join(ROOT, 'dist');

const norm = (s) => s.replace(/[\s ]+/g, ' ').trim();

function oldPages() {
  const pages = [];
  for (const dir of ['components', 'product-components', 'flows', 'patterns', 'foundations']) {
    const abs = path.join(OLD, dir);
    if (!fs.existsSync(abs)) continue;
    for (const f of fs.readdirSync(abs).filter((f) => f.endsWith('.html'))) {
      const slug = f.replace(/\.html$/, '');
      pages.push({ key: `${dir}/${slug}`, old: path.join(abs, f), new: path.join(DIST, dir, slug === 'index' ? '' : slug, 'index.html') });
    }
  }
  if (fs.existsSync(path.join(OLD, 'index.html'))) pages.push({ key: 'index', old: path.join(OLD, 'index.html'), new: path.join(DIST, 'index.html') });
  return ONLY ? pages.filter((p) => p.key === ONLY) : pages;
}

function extract(file, side) {
  const $ = cheerio.load(fs.readFileSync(file, 'utf8'));
  const $main = $('main').first();
  if (side === 'old') {
    $main.find('.figma-preview__label').remove();
  } else {
    // Agregados del sitio nuevo que no existían: índice móvil, links vecinos, cabecera del embed.
    $main.find('details:has([data-toc-link]), nav[aria-label="Páginas vecinas"], .figma-preview figcaption').remove();
  }
  $main.find('script, style').remove();
  const iframes = $main.find('iframe').toArray().map((f) => ({ src: $(f).attr('src'), lazy: $(f).attr('loading') === 'lazy' }));
  const tables = $main.find('table').toArray().map((t) => $(t).find('tbody tr').length);
  const headings = $main.find('h1, h2, h3, h4').toArray().map((h) => `${h.tagName}:${norm($(h).text())}`);
  const ids = $main.find('[id^="doc-"]').toArray().map((h) => $(h).attr('id'));
  // Separa bloques para que el texto de celdas y párrafos contiguos no se pegue.
  $main.find('p, li, td, th, h1, h2, h3, h4, div, section, figure, a, button, span').each((_, el) => {
    $(el).prepend(' ').append(' ');
  });
  return { text: norm($main.text()), iframes, tables, headings, ids };
}

function firstDiff(a, b) {
  let i = 0;
  while (i < a.length && a[i] === b[i]) i++;
  return { at: i, old: a.slice(Math.max(0, i - 60), i + 80), new: b.slice(Math.max(0, i - 60), i + 80) };
}

let failures = 0;
const idChanges = [];
for (const page of oldPages()) {
  if (!fs.existsSync(page.new)) {
    console.log(`✕ ${page.key}: no existe en dist/`);
    failures++;
    continue;
  }
  const a = extract(page.old, 'old');
  const b = extract(page.new, 'new');
  const problems = [];
  if (a.text !== b.text) {
    const loose = a.text.replace(/\s/g, '') === b.text.replace(/\s/g, '');
    const d = firstDiff(a.text, b.text);
    problems.push(`${loose ? 'espacios' : 'TEXTO'} distinto en ${d.at}:\n    viejo: …${d.old}…\n    nuevo: …${d.new}…`);
  }
  if (a.iframes.map((f) => f.src).join() !== b.iframes.map((f) => f.src).join()) problems.push(`iframes: ${a.iframes.length} → ${b.iframes.length} (o cambió un src)`);
  if (b.iframes.some((f) => !f.lazy)) problems.push('iframe sin loading="lazy"');
  if (a.tables.join() !== b.tables.join()) problems.push(`tablas/filas: [${a.tables}] → [${b.tables}]`);
  if (a.headings.join('|') !== b.headings.join('|')) {
    const d = firstDiff(a.headings.join(' | '), b.headings.join(' | '));
    problems.push(`headings:\n    viejo: …${d.old}…\n    nuevo: …${d.new}…`);
  }
  const lost = a.ids.filter((id) => !b.ids.includes(id));
  if (lost.length) idChanges.push(`${page.key}: ${lost.join(', ')}`);

  if (problems.length) {
    failures++;
    console.log(`✕ ${page.key}\n  ${problems.join('\n  ')}`);
  }
}

if (idChanges.length) console.log(`\nIds que ya no existen (anclas viejas):\n  ${idChanges.join('\n  ')}`);
console.log(failures ? `\n${failures} página(s) con diferencias` : '\n✓ Todas las páginas calzan');
process.exit(failures ? 1 : 0);
