import type { CollectionEntry } from 'astro:content';

type DocEntry = CollectionEntry<'components' | 'product-components' | 'patterns' | 'flows'>;

/**
 * `figma:` del frontmatter tiene que listar, en orden, los mismos nodos que los <FigmaEmbed>
 * del cuerpo. Así el frontmatter sirve de índice de embeds sin quedar desactualizado.
 */
export function assertFigmaNodes(entry: DocEntry) {
  const body = entry.body ?? '';
  const inBody = [...body.matchAll(/<FigmaEmbed\b[^>]*\bnode="([^"]+)"/g)].map((m) => m[1]);
  const declared = entry.data.figma;
  if (inBody.join() !== declared.join()) {
    throw new Error(
      `${entry.collection}/${entry.id}.mdx: figma: [${declared.join(', ')}] no calza con los <FigmaEmbed> del cuerpo [${inBody.join(', ')}]`,
    );
  }
}
