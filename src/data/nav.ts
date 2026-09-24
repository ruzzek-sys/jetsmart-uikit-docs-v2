import { getCollection } from 'astro:content';

/**
 * Navegación del sitio. Components y Product Components salen de sus colecciones, en orden
 * alfabético: basta con crear el .mdx para que aparezca. Foundations y Flows tienen orden fijo.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface NavSection {
  id: string;
  label: string;
  items: NavItem[];
}

/** Las foundations son páginas .astro a medida, no una colección: su orden va acá. */
const FOUNDATIONS: NavItem[] = [
  { label: 'Typography', href: '/foundations/typography/' },
  { label: 'Colors', href: '/foundations/colors/' },
  { label: 'Spacing', href: '/foundations/spacing/' },
  { label: 'Radius & Width', href: '/foundations/radius-width/' },
  { label: 'Elevations', href: '/foundations/elevations/' },
  { label: 'Icons', href: '/foundations/icons/' },
];

/** Orden de los flows, de la entrada al sitio a la cuenta del usuario. */
const FLOW_ORDER = ['home', 'booking', 'administra-tu-vuelo', 'administracion-de-usuario'];

/** Colecciones que se publican como /<colección>/<slug>/ con la plantilla de componente. */
export const DOC_SECTIONS = {
  components: 'Components',
  'product-components': 'Product Components',
  flows: 'Flows',
} as const;

export type DocSectionId = keyof typeof DOC_SECTIONS;

const byTitle = (a: { data: { title: string } }, b: { data: { title: string } }) =>
  a.data.title.localeCompare(b.data.title, 'es');

let cache: NavSection[] | undefined;

export async function getNav(): Promise<NavSection[]> {
  if (cache) return cache;

  const alphabetical = async (id: 'components' | 'product-components') =>
    (await getCollection(id)).sort(byTitle).map((e) => ({ label: e.data.title, href: `/${id}/${e.id}/` }));

  const flows = (await getCollection('flows'))
    .sort((a, b) => FLOW_ORDER.indexOf(a.id) - FLOW_ORDER.indexOf(b.id))
    .map((e) => ({ label: e.data.title, href: `/flows/${e.id}/` }));

  cache = [
    { id: 'foundations', label: 'Foundations', items: FOUNDATIONS },
    { id: 'components', label: DOC_SECTIONS.components, items: await alphabetical('components') },
    { id: 'product-components', label: DOC_SECTIONS['product-components'], items: await alphabetical('product-components') },
    { id: 'patterns', label: 'Patterns', items: [{ label: 'Overview', href: '/patterns/' }] },
    { id: 'flows', label: DOC_SECTIONS.flows, items: flows },
  ];
  return cache;
}

/** Página anterior y siguiente en el orden del sidebar, para los links al pie. */
export async function getPrevNext(href: string): Promise<{ prev?: NavItem; next?: NavItem }> {
  const flat = (await getNav()).flatMap((s) => s.items);
  const i = flat.findIndex((item) => item.href === href);
  if (i === -1) return {};
  return { prev: flat[i - 1], next: flat[i + 1] };
}

/** Sección del sidebar a la que pertenece una página (para el eyebrow). */
export async function getSectionOf(href: string): Promise<NavSection | undefined> {
  return (await getNav()).find((s) => s.items.some((item) => item.href === href));
}
