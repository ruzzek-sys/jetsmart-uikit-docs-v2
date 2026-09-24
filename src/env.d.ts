declare namespace App {
  interface Locals {
    /** Entrada de la colección que se está renderizando; la leen PropsTable y DocTable. */
    doc?: import('astro:content').CollectionEntry<'components' | 'product-components' | 'patterns' | 'flows'>;
  }
}
