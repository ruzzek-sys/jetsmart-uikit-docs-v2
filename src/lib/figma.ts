/** Archivo de Figma del UI Kit: la fuente de verdad de toda la documentación. */
export const FIGMA_FILE_KEY = 'dKd6jNGAnng8hIV5MS4Avd';
export const FIGMA_FILE_NAME = 'Jetsmart-UI-Kit-v1.0';

/** Link al archivo, o a un nodo si se pasa su id («5167:54214» o «5167-54214»). */
export function figmaUrl(nodeId?: string): string {
  const base = `https://www.figma.com/design/${FIGMA_FILE_KEY}/${FIGMA_FILE_NAME}`;
  return nodeId ? `${base}?node-id=${nodeId.replace(':', '-')}` : base;
}

/** URL del iframe embebido para un nodo. */
export function embedUrl(nodeId: string): string {
  return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(figmaUrl(nodeId))}`;
}
