/**
 * Ids de los headings de las páginas de documentación.
 *
 * Regla (la misma que usaba el sitio HTML):
 *   - h2                                   → doc-<slug>
 *   - h3 bajo Resumen/Propiedades/Guía     → doc-<slug>
 *   - h3 bajo el h2 de un componente       → <id del h2>-<slug>   (doc-accordion-resumen)
 *
 * Un heading que ya trae id se respeta. Los ids repetidos en una página llevan sufijo -2, -3…
 */

/** Slug sin tildes ni signos: «Guía de uso» → guia-de-uso. */
export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Secciones genéricas de una página de un solo componente: sus h3 no se anidan. */
const FLAT_SECTIONS = new Set(['doc-resumen', 'doc-propiedades', 'doc-guia-de-uso']);

export function createHeadingIdAssigner() {
  let currentH2 = '';
  const used = new Map<string, number>();

  const unique = (id: string) => {
    const n = (used.get(id) ?? 0) + 1;
    used.set(id, n);
    return n === 1 ? id : `${id}-${n}`;
  };

  return (depth: number, text: string): string | undefined => {
    const slug = slugify(text);
    if (depth === 2) {
      currentH2 = unique(`doc-${slug}`);
      return currentH2;
    }
    if (depth === 3) {
      const nested = currentH2 && !FLAT_SECTIONS.has(currentH2);
      return unique(nested ? `${currentH2}-${slug}` : `doc-${slug}`);
    }
    return undefined;
  };
}

/** Plugin HAST para el procesador Sätteri de Astro 7. Corre antes que el plugin de ids de Astro. */
export function headingIdsPlugin() {
  const assign = createHeadingIdAssigner();
  return {
    name: 'jetsmart-heading-ids',
    element: {
      filter: ['h2', 'h3'],
      visit(node: any, ctx: any) {
        if (typeof node.properties?.id === 'string') return;
        const id = assign(Number(node.tagName[1]), ctx.textContent(node));
        if (id) ctx.setProperty(node, 'id', id);
      },
    },
  };
}
