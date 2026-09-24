// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { satteri } from '@astrojs/markdown-satteri';
import { headingIdsPlugin } from './src/lib/heading-ids.ts';

export default defineConfig({
  // El texto viene de Figma y se conserva literal: nada de comillas ni guiones «inteligentes».
  markdown: {
    processor: satteri({ hastPlugins: [headingIdsPlugin], features: { smartPunctuation: false } }),
  },
  // 'jsx' (el default de Astro 7) se come los espacios entre elementos inline.
  compressHTML: true,
  integrations: [mdx()],
  vite: { plugins: [tailwindcss()] },
});
