import { markdownToHtml } from 'satteri';

/**
 * Markdown de una celda o de un string de datos → HTML.
 * Un único párrafo se desenvuelve (queda inline); listas y varios párrafos se dejan como bloque.
 */
const cache = new Map<string, string>();

export async function inlineMd(source: string): Promise<string> {
  const hit = cache.get(source);
  if (hit !== undefined) return hit;
  const { html } = await markdownToHtml(source, { features: { smartPunctuation: false } });
  const trimmed = html.trim();
  const single = /^<p>([\s\S]*)<\/p>$/.exec(trimmed);
  const out = single && !single[1].includes('<p>') ? single[1] : trimmed;
  cache.set(source, out);
  return out;
}
