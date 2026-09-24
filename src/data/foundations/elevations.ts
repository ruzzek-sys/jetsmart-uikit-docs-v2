/**
 * Foundations · Elevations.
 *
 * Valores del archivo «Jetsmart UI Kit v1.0»: 20 primitivos en Tier 1 (color/shadow,
 * shadow/offset-y, shadow/blur, shadow/spread), 21 tokens semánticos repartidos entre
 * Tier 2: Color y Tier 2: Spatial & Shape, y 5 estilos de efecto Elevation-xs → Elevation-xl.
 *
 * Los textos admiten HTML (se pintan con set:html).
 */

/** Tono base de todas las sombras: #98AAC0. */
export const SHADOW_RGB = '152, 170, 192';

export interface Level {
  level: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  offsetY: number;
  blur: number;
  spread: number;
  /** Opacidad en %. */
  alpha: number;
  use: string;
}

export const LEVELS: Level[] = [
  { level: 'xs', offsetY: 4, blur: 12, spread: -1, alpha: 14, use: 'Superficie apenas despegada del fondo: el primer escalón sobre la página.' },
  { level: 'sm', offsetY: 8, blur: 24, spread: -2, alpha: 18, use: 'Elementos que se separan del flujo sin bloquearlo.' },
  { level: 'md', offsetY: 12, blur: 32, spread: -3, alpha: 24, use: 'Nivel de panel: contenido que se abre sobre la página y la tapa en parte.' },
  { level: 'lg', offsetY: 16, blur: 48, spread: -4, alpha: 32, use: 'Contenedores que toman el foco de la pantalla.' },
  { level: 'xl', offsetY: 24, blur: 64, spread: -6, alpha: 42, use: 'El nivel más alto de la rampa, para el overlay principal.' },
];

/** box-shadow CSS de un nivel. */
export function shadow(l: Pick<Level, 'offsetY' | 'blur' | 'spread' | 'alpha'>): string {
  return `0 ${l.offsetY}px ${l.blur}px ${l.spread}px rgba(${SHADOW_RGB}, ${l.alpha / 100})`;
}

/** box-shadow de un nivel por nombre, para las demos de prácticas. */
export const shadowOf = (level: Level['level']) => shadow(LEVELS.find((l) => l.level === level)!);

export const PRIMITIVES: { token: string; value: string; group: string; consumedBy: string }[] = [
  { token: 'color/shadow/base-14', value: '#98AAC0 · 14%', group: 'Color', consumedBy: 'color/effect/elevation-xs' },
  { token: 'color/shadow/base-18', value: '#98AAC0 · 18%', group: 'Color', consumedBy: 'color/effect/elevation-sm' },
  { token: 'color/shadow/base-24', value: '#98AAC0 · 24%', group: 'Color', consumedBy: 'color/effect/elevation-md' },
  { token: 'color/shadow/base-32', value: '#98AAC0 · 32%', group: 'Color', consumedBy: 'color/effect/elevation-lg' },
  { token: 'color/shadow/base-42', value: '#98AAC0 · 42%', group: 'Color', consumedBy: 'color/effect/elevation-xl' },
  { token: 'shadow/offset-y/4', value: '4 px', group: 'Offset Y', consumedBy: 'elevation/xs/offset-y' },
  { token: 'shadow/offset-y/8', value: '8 px', group: 'Offset Y', consumedBy: 'elevation/sm/offset-y' },
  { token: 'shadow/offset-y/12', value: '12 px', group: 'Offset Y', consumedBy: 'elevation/md/offset-y' },
  { token: 'shadow/offset-y/16', value: '16 px', group: 'Offset Y', consumedBy: 'elevation/lg/offset-y' },
  { token: 'shadow/offset-y/24', value: '24 px', group: 'Offset Y', consumedBy: 'elevation/xl/offset-y' },
  { token: 'shadow/blur/12', value: '12 px', group: 'Blur', consumedBy: 'elevation/xs/blur' },
  { token: 'shadow/blur/24', value: '24 px', group: 'Blur', consumedBy: 'elevation/sm/blur' },
  { token: 'shadow/blur/32', value: '32 px', group: 'Blur', consumedBy: 'elevation/md/blur' },
  { token: 'shadow/blur/48', value: '48 px', group: 'Blur', consumedBy: 'elevation/lg/blur' },
  { token: 'shadow/blur/64', value: '64 px', group: 'Blur', consumedBy: 'elevation/xl/blur' },
  { token: 'shadow/spread/-1', value: '-1 px', group: 'Spread', consumedBy: 'elevation/xs/spread' },
  { token: 'shadow/spread/-2', value: '-2 px', group: 'Spread', consumedBy: 'elevation/sm/spread' },
  { token: 'shadow/spread/-3', value: '-3 px', group: 'Spread', consumedBy: 'elevation/md/spread' },
  { token: 'shadow/spread/-4', value: '-4 px', group: 'Spread', consumedBy: 'elevation/lg/spread' },
  { token: 'shadow/spread/-6', value: '-6 px', group: 'Spread', consumedBy: 'elevation/xl/spread' },
];

export const RAMP: { dimension: string; range: string; controls: string; reading: string }[] = [
  { dimension: 'Offset Y', range: '4 → 24', controls: 'Altura', reading: 'Sube de a 4 px hasta lg y salta a 24 en xl. Es la distancia percibida entre la superficie y el fondo.' },
  { dimension: 'Blur', range: '12 → 64', controls: 'Difusión', reading: 'Siempre entre 2,7× y 3× el offset. Mantener esa proporción al agregar un paso nuevo.' },
  { dimension: 'Spread', range: '-1 → -6', controls: 'Contención', reading: 'Negativo y creciente: contrae la sombra para que el blur no la haga asomar por los costados del nodo.' },
  { dimension: 'Alpha', range: '14% → 42%', controls: 'Opacidad', reading: 'Sube con la altura. El tono base es siempre #98AAC0, un azul grisáceo, nunca negro puro.' },
  { dimension: 'Regla única', range: 'Tier 1 → Tier 2', controls: 'Herencia', reading: 'Un primitivo nunca se aplica a un nodo ni a un estilo. Solo alimenta un token semántico.' },
];

export const ANATOMY: { field: string; scope: string; token: string; does: string }[] = [
  { field: 'Color', scope: 'EFFECT_COLOR', token: 'color/effect/elevation-md', does: 'Aliasa color/shadow/base-24. El alpha va incorporado en el primitivo.' },
  { field: 'Offset Y', scope: 'EFFECT_FLOAT', token: 'elevation/md/offset-y = 12 px', does: 'Desplaza la sombra hacia abajo: la luz del sistema es cenital.' },
  { field: 'Offset X', scope: 'EFFECT_FLOAT', token: 'elevation/offset-x = 0 px', does: 'Compartido por los cinco niveles; las sombras nunca se desplazan en X.' },
  { field: 'Blur', scope: 'EFFECT_FLOAT', token: 'elevation/md/blur = 32 px', does: 'Radio de difusión; crece más rápido que el offset en toda la rampa.' },
  { field: 'Spread', scope: 'EFFECT_FLOAT', token: 'elevation/md/spread = -3 px', does: 'Negativo: contrae la sombra para que no asome por los costados.' },
];

export const COLLECTIONS: { where: string; kind: string; contains: string }[] = [
  { where: 'Assets → Effect styles', kind: 'Estilos', contains: 'Elevation-xs a Elevation-xl. Es lo único que se aplica sobre un nodo.' },
  { where: 'Tier 1: Core Primitives', kind: 'Primitivo', contains: 'color/shadow/base-*, shadow/offset-y/*, shadow/blur/*, shadow/spread/*. 20 variables con scope vacío, ocultas de los pickers.' },
  { where: 'Tier 2: Color', kind: 'Semántico', contains: 'color/effect/elevation-*. El color vive con los demás colores para poder rematizarse por mode.' },
  { where: 'Tier 2: Spatial &amp; Shape', kind: 'Semántico', contains: 'elevation/{nivel}/{offset-y, blur, spread} más elevation/offset-x. 16 variables de geometría.' },
];

export const APPLY: { ok: boolean; title: string; text: string }[] = [
  { ok: true, title: 'Aplicar', text: 'Seleccionar el nodo, ir al panel Effects y aplicar el estilo Elevation-* desde la librería.' },
  { ok: true, title: 'Cambiar de nivel', text: 'Subir o bajar la elevación es cambiar de estilo, no ajustar el blur ni la opacidad a mano.' },
  { ok: false, title: 'Bindear tokens sueltos', text: 'Vincular elevation/md/blur directamente en un nodo rompe la trazabilidad del nivel completo.' },
  { ok: false, title: 'Editar el estilo', text: 'Sobrescribir un valor en el estilo desvincula la variable. El cambio se hace en el token.' },
  { ok: false, title: 'Apilar elevaciones', text: 'Un solo nivel por capa: no combinar dos estilos en el mismo nodo ni en padre e hijo directos.' },
];

export const SCRIM_PRIMITIVES: { token: string; kind: string; value: string; sample: string | null }[] = [
  { token: 'color/alpha/ink/ink-60', kind: 'Color', value: '#0B1624 · 60%', sample: 'rgba(11, 22, 36, 0.6)' },
  { token: 'color/alpha/ink/ink-40', kind: 'Color', value: '#0B1624 · 40%', sample: 'rgba(11, 22, 36, 0.4)' },
  { token: 'blur/24', kind: 'Float', value: '24 px', sample: null },
  { token: 'blur/16', kind: 'Float', value: '16 px', sample: null },
];

export const SCRIM_SEMANTIC: { token: string; alias: string; use: string }[] = [
  { token: 'color/background/scrim', alias: 'color/alpha/ink/ink-60', use: 'Overlay oscuro estándar: modales, bottom sheets.' },
  { token: 'color/background/scrim-subtle', alias: 'color/alpha/ink/ink-40', use: 'Overlay oscuro liviano: tooltips, popovers.' },
  { token: 'blur/background/scrim', alias: 'blur/24', use: 'Desenfoque de fondo del overlay estándar.' },
  { token: 'blur/background/scrim-subtle', alias: 'blur/16', use: 'Desenfoque de fondo del overlay liviano.' },
];
