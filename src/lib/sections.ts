import type { TocHeading } from '../components/layout/Toc.astro';

/**
 * Secciones h2 de una página escrita a mano (las foundations). Se declaran una vez y de ahí
 * salen el id de cada <Section> y el índice lateral:
 *
 *   const S = sections({ resumen: 'Resumen', figma: 'Cómo usar en Figma' });
 *   <BaseLayout headings={S.headings}> <Section {...S.resumen}> … </Section>
 */
export function sections<K extends string>(titles: Record<K, string>) {
  const entries = Object.entries(titles) as [K, string][];
  const byKey = Object.fromEntries(entries.map(([key, title]) => [key, { id: `doc-${key}`, title }])) as Record<
    K,
    { id: string; title: string }
  >;
  const headings: TocHeading[] = entries.map(([key, text]) => ({ depth: 2, slug: `doc-${key}`, text }));
  return { ...byKey, headings };
}
