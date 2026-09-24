import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Id de nodo de Figma tal como sale en el panel: «5167:54214». */
const nodeId = z.string().regex(/^\d+:\d+$/, 'Usa el formato 1234:5678');

export const BADGE_TONES = ['var', 'on', 'off', 'neutral', 'brand'] as const;
export const PROP_TYPES = ['Variant', 'Boolean', 'Text', 'Instance', 'Slot', 'Heredada'] as const;

const badge = z.object({ label: z.string(), tone: z.enum(BADGE_TONES).default('var') });

/** Fila de la tabla Propiedades. `name` y `desc` admiten Markdown inline. */
const propRow = z.object({ name: z.string(), type: z.enum(PROP_TYPES), desc: z.string() });

/** Fila de una tabla genérica (Guía de uso y otras): la columna del medio es texto o badges. */
const row = z.object({
  name: z.string(),
  meta: z.union([z.string(), z.array(badge).min(1)]),
  desc: z.string(),
});

const table = z.object({
  columns: z.tuple([z.string(), z.string(), z.string()]),
  rows: z.array(row).min(1),
});

const doc = z.object({
  title: z.string(),
  description: z.string(),
  /** Todos los nodos que la página embebe con <FigmaEmbed>, en orden. */
  figma: z.array(nodeId).default([]),
  /** Tablas Propiedades, por bloque (el slug del componente). */
  props: z.record(z.string(), z.array(propRow).min(1)).default({}),
  /** Otras tablas, por id. */
  tables: z.record(z.string(), table).default({}),
});

export type DocData = z.infer<typeof doc>;
export type PropRow = z.infer<typeof propRow>;
export type TableRow = z.infer<typeof row>;

const collection = (dir: string) =>
  defineCollection({ loader: glob({ pattern: '**/*.mdx', base: `./src/content/${dir}` }), schema: doc });

export const collections = {
  components: collection('components'),
  'product-components': collection('product-components'),
  patterns: collection('patterns'),
  flows: collection('flows'),
};
