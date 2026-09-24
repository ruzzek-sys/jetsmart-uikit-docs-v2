/**
 * Crea el .mdx de una página nueva de componente con la estructura base.
 *
 *   npm run new -- <colección> <slug> "<Título>" "<Descripción>" [node-id]
 *   npm run new -- components date-picker "Date Picker" "Selector de fechas." 1234:5678
 *
 * <colección>: components | product-components | flows
 * El nav no se toca: la página aparece sola en el sidebar, en orden alfabético.
 * Nunca pisa un archivo existente.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const COLLECTIONS = ['components', 'product-components', 'flows'];

const [collection, slug, title, description, rawNode] = process.argv.slice(2);

function fail(msg) {
  console.error(`✕ ${msg}\n\nUso: npm run new -- <${COLLECTIONS.join('|')}> <slug> "<Título>" "<Descripción>" [node-id]`);
  process.exit(1);
}

if (!COLLECTIONS.includes(collection)) fail(`Colección desconocida: ${collection ?? '(vacía)'}`);
if (!slug || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) fail(`El slug va en minúsculas con guiones: ${slug ?? '(vacío)'}`);
if (!title || !description) fail('Faltan el título o la descripción.');

// Acepta «1234:5678», «1234-5678» o el link completo de Figma.
const node = rawNode ? (/node-id=([\d]+[-:][\d]+)/.exec(rawNode)?.[1] ?? rawNode).replace('-', ':') : undefined;
if (node && !/^\d+:\d+$/.test(node)) fail(`Node-id inválido: ${rawNode}`);

const dest = path.join(ROOT, 'src/content', collection, `${slug}.mdx`);
if (fs.existsSync(dest)) fail(`Ya existe ${path.relative(ROOT, dest)}; no se sobrescribe.`);

const q = (s) => JSON.stringify(s);
const isFlow = collection === 'flows';

const frontmatter = [
  '---',
  `title: ${q(title)}`,
  `description: ${q(description)}`,
  node ? `figma: [${q(node)}]` : 'figma: []',
  ...(isFlow
    ? []
    : [
        'props:',
        `  ${slug}:`,
        '    - name: "Nombre de la propiedad"',
        '      type: Variant',
        '      desc: "Qué cambia y cuál es el valor por defecto."',
      ]),
  '---',
].join('\n');

const body = [
  node ? `<FigmaEmbed node="${node}" />` : '{/* <FigmaEmbed node="1234:5678" /> */}',
  ...(isFlow
    ? []
    : [
        '## Resumen',
        'Qué es el componente y para qué sirve.',
        'Los ejes de variante (`Breakpoint`, `State`…) o de qué partes se arma.',
        '## Propiedades',
        'Lo que se puede ajustar en cada instancia.',
        `<PropsTable block="${slug}" />`,
      ]),
].join('\n\n');

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, `${frontmatter}\n\n${body}\n`);
console.log(`✓ Creado ${path.relative(ROOT, dest)} → /${collection}/${slug}/`);
