/**
 * Componentes disponibles en todos los .mdx sin importarlos.
 * Si agregas uno, documéntalo en CLAUDE.md.
 */
import FigmaEmbed from './FigmaEmbed.astro';
import PropsTable from './PropsTable.astro';
import DocTable from './DocTable.astro';
import CardGrid from './CardGrid.astro';
import LinkCard from './LinkCard.astro';

export const mdxComponents = { FigmaEmbed, PropsTable, DocTable, CardGrid, LinkCard };
