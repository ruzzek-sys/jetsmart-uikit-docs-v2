/**
 * Foundations · Spacing.
 *
 * Valores de las variables FLOAT del archivo «Jetsmart UI Kit v1.0»: 19 primitivos en
 * Tier 1: Core Primitives y 57 tokens semánticos en Tier 2: Spatial & Shape, cada uno con
 * alias al primitivo que referencia.
 *
 * Las barras y los rem se derivan de los px (rem = px / 16). Los conteos de alias se
 * calculan recorriendo los tokens de Tier 2. Los textos admiten HTML (se pintan con set:html).
 */
import type { BadgeTone } from '../../components/ui/Badge.astro';

/** Valor más alto de la escala: el 100 % de las barras. */
export const MAX_PX = 128;

export interface Primitive {
  /** Nombre del paso: spacing/<step>. */
  step: string;
  px: number;
}

export const PRIMITIVES: Primitive[] = [
  { step: 'none', px: 0 },
  { step: '0,5', px: 2 },
  { step: '1', px: 4 },
  { step: '2', px: 8 },
  { step: '3', px: 12 },
  { step: '4', px: 16 },
  { step: '5', px: 20 },
  { step: '6', px: 24 },
  { step: '7', px: 28 },
  { step: '8', px: 32 },
  { step: '9', px: 36 },
  { step: '10', px: 40 },
  { step: '11', px: 44 },
  { step: '12', px: 48 },
  { step: '13', px: 52 },
  { step: '16', px: 64 },
  { step: '20', px: 80 },
  { step: '24', px: 96 },
  { step: '32', px: 128 },
];

export type FamilyKey = 'stack' | 'inline' | 'inset-x' | 'inset-y' | 'inset-page' | 'gap-page';

export interface SemanticToken {
  /** Paso semántico: spacing/<familia>/<step>. */
  step: string;
  /** Primitivo al que apunta el alias. */
  alias: string;
  px: number;
  use: string;
}

export interface Family {
  key: FamilyKey;
  label: string;
  scale: 'Componente' | 'Página';
  property: string;
  scope: string;
  intro: string;
  note: string;
  tokens: SemanticToken[];
}

export const FAMILIES: Family[] = [
  {
    key: 'stack',
    label: 'Stack',
    scale: 'Componente',
    property: 'Gap vertical',
    scope: 'GAP · itemSpacing (columna)',
    intro: 'Espacio entre elementos que se apilan dentro de un auto layout en columna. Ritmo vertical: campos de un formulario, tarjetas de una lista, título y párrafo.',
    note: 'stack/none (0 px) es válido: se usa cuando dos elementos deben tocarse, como una imagen y su caption superpuesta.',
    tokens: [
      { step: 'none', alias: 'spacing/none', px: 0, use: 'Elementos que deben leerse como una sola unidad, sin aire entre ellos.' },
      { step: 'xs', alias: 'spacing/0,5', px: 2, use: 'Ajuste fino entre un label y su valor en una fila de datos muy compacta.' },
      { step: 'sm', alias: 'spacing/1', px: 4, use: 'Separación entre un campo de formulario y su texto de ayuda o error.' },
      { step: 'md', alias: 'spacing/2', px: 8, use: 'Gap por defecto entre campos de un formulario o entre ítems de una lista simple.' },
      { step: 'lg', alias: 'spacing/3', px: 12, use: 'Separación entre bloques dentro de una tarjeta: título, contenido y acciones.' },
      { step: 'xl', alias: 'spacing/4', px: 16, use: 'Separación entre secciones internas de un componente grande, como un acordeón abierto.' },
      { step: '2xl', alias: 'spacing/5', px: 20, use: 'Separación entre tarjetas cortas dentro de un mismo grupo o carrusel.' },
      { step: '3xl', alias: 'spacing/6', px: 24, use: 'Separación entre bloques de un formulario largo o entre pasos de un stepper.' },
      { step: '4xl', alias: 'spacing/7', px: 28, use: 'Gap entre tarjetas grandes o entre un bloque de contenido y su CTA principal.' },
      { step: '5xl', alias: 'spacing/8', px: 32, use: 'Separación entre módulos completos dentro de una misma pantalla.' },
      { step: '6xl', alias: 'spacing/9', px: 36, use: 'El paso más alto de stack: separación entre el último bloque de un componente y el siguiente.' },
    ],
  },
  {
    key: 'inline',
    label: 'Inline',
    scale: 'Componente',
    property: 'Gap horizontal',
    scope: 'GAP · itemSpacing (fila)',
    intro: 'Espacio entre elementos en línea dentro de un auto layout en fila. Ritmo horizontal: icono y texto de un botón, chips, acciones de una toolbar.',
    note: 'inline/sm (4 px) es el paso más usado del kit: es el gap por defecto entre icono y label en botones y tabs.',
    tokens: [
      { step: 'none', alias: 'spacing/none', px: 0, use: 'Elementos que deben leerse como una sola unidad, sin aire entre ellos.' },
      { step: 'xs', alias: 'spacing/0,5', px: 2, use: 'Separación entre un icono pequeño y su badge de notificación.' },
      { step: 'sm', alias: 'spacing/1', px: 4, use: 'Gap entre icono y label dentro de un botón o un tab — el paso más usado del kit.' },
      { step: 'md', alias: 'spacing/2', px: 8, use: 'Separación entre acciones de una toolbar o entre chips de un filtro.' },
      { step: 'lg', alias: 'spacing/3', px: 12, use: 'Gap entre campos que van en una misma fila, como código de país y teléfono.' },
      { step: 'xl', alias: 'spacing/4', px: 16, use: 'Separación entre bloques de acciones secundarias, como Cancelar y Guardar.' },
      { step: '2xl', alias: 'spacing/5', px: 20, use: 'Gap entre columnas cortas dentro de una misma fila de datos.' },
      { step: '3xl', alias: 'spacing/6', px: 24, use: 'Separación entre grupos de controles dentro de una barra de herramientas amplia.' },
      { step: '4xl', alias: 'spacing/7', px: 28, use: 'Gap entre bloques de navegación dentro de un navbar o topbar.' },
      { step: '5xl', alias: 'spacing/8', px: 32, use: 'Separación entre secciones horizontales de un breadcrumb extenso o un stepper amplio.' },
      { step: '6xl', alias: 'spacing/9', px: 36, use: 'El paso más alto de inline: separación entre grupos de navegación muy distantes entre sí.' },
    ],
  },
  {
    key: 'inset-x',
    label: 'Inset-X',
    scale: 'Componente',
    property: 'Padding left / right',
    scope: 'GAP · padding horizontal',
    intro: 'Padding horizontal interno de un contenedor: left y right. Botones, inputs, tarjetas y badges.',
    note: 'Separado de inset-y porque en la mayoría de los componentes el padding horizontal es mayor que el vertical.',
    tokens: [
      { step: 'none', alias: 'spacing/none', px: 0, use: 'Sin padding horizontal: contenido que debe llegar exactamente al borde, como una imagen a sangre.' },
      { step: 'xs', alias: 'spacing/0,5', px: 2, use: 'Padding lateral de un badge pequeño o un tag compacto.' },
      { step: 'sm', alias: 'spacing/1', px: 4, use: 'Padding lateral de un icono-botón o un chip pequeño.' },
      { step: 'md', alias: 'spacing/2', px: 8, use: 'Padding lateral por defecto de inputs y botones medianos.' },
      { step: 'lg', alias: 'spacing/3', px: 12, use: 'Padding lateral de botones primarios y tarjetas de contenido.' },
      { step: 'xl', alias: 'spacing/4', px: 16, use: 'Padding lateral de tarjetas grandes o de un modal pequeño.' },
      { step: '2xl', alias: 'spacing/5', px: 20, use: 'Padding lateral de un panel lateral (sidebar) o un modal mediano.' },
      { step: '3xl', alias: 'spacing/6', px: 24, use: 'Padding lateral de un modal grande o un panel de contenido amplio.' },
      { step: '4xl', alias: 'spacing/7', px: 28, use: 'Padding lateral de un contenedor de sección dentro de un layout denso.' },
      { step: '5xl', alias: 'spacing/8', px: 32, use: 'Padding lateral de un bloque hero pequeño.' },
      { step: '6xl', alias: 'spacing/9', px: 36, use: 'El paso más alto de inset-x antes de pasar a la escala de página.' },
    ],
  },
  {
    key: 'inset-y',
    label: 'Inset-Y',
    scale: 'Componente',
    property: 'Padding top / bottom',
    scope: 'GAP · padding vertical',
    intro: 'Padding vertical interno de un contenedor: top y bottom. Botones, inputs, tarjetas y badges.',
    note: 'Si un componente presenta poco espacio vertical, la causa habitual es inset-y, no inset-x: la percepción es más sensible a la separación vertical.',
    tokens: [
      { step: 'none', alias: 'spacing/none', px: 0, use: 'Sin padding vertical: contenido que ocupa el alto completo del contenedor.' },
      { step: 'xs', alias: 'spacing/0,5', px: 2, use: 'Padding vertical de un badge pequeño o un tag compacto.' },
      { step: 'sm', alias: 'spacing/1', px: 4, use: 'Padding vertical de un icono-botón o un chip pequeño.' },
      { step: 'md', alias: 'spacing/2', px: 8, use: 'Padding vertical por defecto de inputs y botones medianos.' },
      { step: 'lg', alias: 'spacing/3', px: 12, use: 'Padding vertical de botones primarios y tarjetas de contenido.' },
      { step: 'xl', alias: 'spacing/4', px: 16, use: 'Padding vertical de tarjetas grandes o de un modal pequeño.' },
      { step: '2xl', alias: 'spacing/5', px: 20, use: 'Padding vertical de un panel lateral o un modal mediano.' },
      { step: '3xl', alias: 'spacing/6', px: 24, use: 'Padding vertical de un modal grande o un panel de contenido amplio.' },
      { step: '4xl', alias: 'spacing/7', px: 28, use: 'Padding vertical de un contenedor de sección en un layout denso.' },
      { step: '5xl', alias: 'spacing/8', px: 32, use: 'Padding vertical de un bloque hero pequeño.' },
      { step: '6xl', alias: 'spacing/9', px: 36, use: 'El paso más alto de inset-y antes de pasar a la escala de página.' },
    ],
  },
  {
    key: 'inset-page',
    label: 'Inset-Page',
    scale: 'Página',
    property: 'Padding de página',
    scope: 'GAP · padding de los 4 lados',
    intro: 'Padding del contenedor de página o sección: separa el contenido del borde de la pantalla o de un panel grande. Otra escala, no una extensión de inset-x / inset-y.',
    note: 'inset-page/xs (32 px) ya es más grande que el paso más alto de inset-x (36 px): son familias que no se cruzan.',
    tokens: [
      { step: 'none', alias: 'spacing/none', px: 0, use: 'Contenido de página sin padding: solo para fondos que deben llegar al borde, como un hero a sangre.' },
      { step: 'xs', alias: 'spacing/8', px: 32, use: 'Padding de página en pantallas angostas o vistas embebidas.' },
      { step: 'sm', alias: 'spacing/10', px: 40, use: 'Padding de página en mobile: separa el contenido de los bordes de la pantalla.' },
      { step: 'md', alias: 'spacing/12', px: 48, use: 'Padding de página estándar en tablet o layouts de ancho medio.' },
      { step: 'lg', alias: 'spacing/16', px: 64, use: 'Padding de página en desktop: el valor más común para el contenedor principal.' },
      { step: 'xl', alias: 'spacing/24', px: 96, use: 'Padding de página en layouts anchos, como dashboards o pantallas de administración.' },
      { step: '2xl', alias: 'spacing/32', px: 128, use: 'Padding de página en pantallas muy anchas, para que el contenido no se pegue a los bordes en monitores grandes.' },
    ],
  },
  {
    key: 'gap-page',
    label: 'Gap-Page',
    scale: 'Página',
    property: 'Gap entre secciones',
    scope: 'GAP · itemSpacing entre secciones',
    intro: 'Gap entre bloques grandes de layout: secciones de una pantalla, columnas de un grid de página, separación entre widgets.',
    note: 'gap-page no tiene paso none: si dos bloques de layout no tienen gap, en realidad son un solo bloque.',
    tokens: [
      { step: 'sm', alias: 'spacing/10', px: 40, use: 'Gap entre secciones en mobile, donde el espacio vertical es más limitado.' },
      { step: 'md', alias: 'spacing/12', px: 48, use: 'Gap estándar entre secciones de una pantalla de producto.' },
      { step: 'lg', alias: 'spacing/16', px: 64, use: 'Gap entre columnas de un grid de página en desktop.' },
      { step: 'xl', alias: 'spacing/20', px: 80, use: 'Separación entre bloques grandes de un landing o una pantalla de marketing.' },
      { step: '2xl', alias: 'spacing/24', px: 96, use: 'Gap entre módulos independientes dentro de un dashboard amplio.' },
      { step: '3xl', alias: 'spacing/32', px: 128, use: 'El paso más alto: separación entre secciones completamente distintas de una misma pantalla larga.' },
    ],
  },
];

/** Cuántos tokens de Tier 2 apuntan a cada primitivo (clave: spacing/<step>). */
export const ALIAS_COUNT: Record<string, number> = {};
for (const family of FAMILIES) {
  for (const t of family.tokens) ALIAS_COUNT[t.alias] = (ALIAS_COUNT[t.alias] ?? 0) + 1;
}

/** px → rem con coma decimal: 20 → «1,25 rem», 0 → «0». */
export function rem(px: number): string {
  if (px === 0) return '0';
  return `${(Math.round((px / 16) * 1000) / 1000).toString().replace('.', ',')} rem`;
}

export type Zone = 'Cero' | 'Ajuste fino' | 'Componente' | 'Reserva' | 'Página';

/** Zona de uso de un primitivo según su valor. */
export function zoneOf(p: Primitive): Zone {
  if (p.step === 'none' || p.px === 0) return 'Cero';
  if (p.px === 2) return 'Ajuste fino';
  if (p.px <= 36) return 'Componente';
  if (p.px === 44 || p.px === 52) return 'Reserva';
  return 'Página';
}

export function zoneTone(zone: Zone): BadgeTone {
  if (zone === 'Reserva') return 'var';
  if (zone === 'Página') return 'brand';
  return 'neutral';
}

/** Leyenda bajo la muestra de un token semántico. */
const DEMO_LABEL: Record<FamilyKey, string> = {
  stack: 'Gap vertical',
  inline: 'Gap horizontal',
  'inset-x': 'Padding horizontal',
  'inset-y': 'Padding vertical',
  'inset-page': 'Padding de página',
  'gap-page': 'Gap de página',
};

export const demoLabel = (key: FamilyKey, px: number) => `${DEMO_LABEL[key]} · ${px} px`;

/** «Dos escalas, no confundir». */
export const COMPARE_INFO: { tag: string; title: string; text: string }[] = [
  { tag: 'Componente', title: '0 – 36 px', text: 'stack, inline, inset-x e inset-y comparten los mismos 11 pasos: none a 6xl.' },
  { tag: 'Página', title: '0 – 128 px', text: 'inset-page y gap-page comparten una escala aparte, pensada para bloques, no para contenido.' },
  { tag: 'Inset vs gap', title: 'Cómo elegir', text: '¿Se separa el contenido del borde? Es inset. ¿Se separan dos bloques entre sí? Es gap.' },
  { tag: 'Ante la duda', title: 'inset-page o gap-page', text: 'Determinar si se está aplicando padding a un contenedor o separando dos contenedores entre sí.' },
];

export const COMPARE: { token: string; px: number; solves: string }[] = [
  { token: 'inset-x/md', px: 8, solves: 'Padding horizontal de un componente mediano — un botón, un input.' },
  { token: 'inset-page/md', px: 48, solves: 'Padding de un contenedor de página — seis veces más grande, mismo nombre de paso.' },
  { token: 'inline/sm', px: 4, solves: 'Gap por defecto entre icono y label. El paso más usado del kit.' },
  { token: 'gap-page/sm', px: 40, solves: 'Gap entre secciones en mobile. El primer paso de la escala de página.' },
];

/** «Sistema de grid»: bloques informativos. */
export const GRID_INFO: { tag: string; title: string; text: string }[] = [
  { tag: 'Columnas', title: 'Guía de ancho', text: 'Definen el ancho de los contenedores. 4 columnas en mobile, 12 en tablet y desktop.' },
  { tag: 'Gutter', title: 'Canal entre columnas', text: '20 px constantes. No debe contener ningún elemento; si un bloque abarca varias columnas, los gutters internos pueden ignorarse.' },
  { tag: 'Margin', title: 'Margen lateral', text: 'Espacio entre cada extremo de la pantalla y las columnas. Crece con el ancho: 20, 32 y 64 px.' },
  { tag: 'Breakpoints', title: 'SM · MD · LG', text: 'MD adopta las 12 columnas de LG: solo cambia el margin. SM es el único nivel con 4 columnas.' },
];

export interface Breakpoint {
  key: 'sm' | 'md' | 'lg';
  label: string;
  range: string;
  columns: number;
  gutter: number;
  margin: number;
  note: string;
}

export const BREAKPOINTS: Breakpoint[] = [
  { key: 'sm', label: 'Mobile · SM', range: '0 – 767 px', columns: 4, gutter: 20, margin: 20, note: 'El único nivel con una grilla de 4 columnas.' },
  { key: 'md', label: 'Tablet · MD', range: '768 – 1279 px', columns: 12, gutter: 20, margin: 32, note: 'Adopta las 12 columnas de desktop: solo cambia el margin.' },
  { key: 'lg', label: 'Desktop · LG', range: '1280 px o más', columns: 12, gutter: 20, margin: 64, note: 'El gutter se mantiene en 20 px; el margin sube a 64 px.' },
];

export const COLLECTIONS: { name: string; mode: string; total: number; spacing: number; role: string }[] = [
  {
    name: 'Tier 1: Core Primitives',
    mode: 'Default',
    total: 224,
    spacing: 19,
    role: 'Los 19 pasos de spacing, de 0 a 128 px. Comparte colección con color y tipografía. Solo se edita cuando cambia la escala base.',
  },
  {
    name: 'Tier 2: Spatial &amp; Shape',
    mode: 'Theme 1',
    total: 96,
    spacing: 57,
    role: 'stack, inline, inset-x, inset-y, inset-page y gap-page. Convive con radios y grosores: las tres familias resuelven forma y espacio.',
  },
];

/** «Cómo se aplican»: propiedad en edición → familia. */
export const APPLY: { property: string; family: string; how: string }[] = [
  { property: 'Gap vertical', family: 'spacing/stack/…', how: 'Auto layout en columna → ritmo entre elementos apilados.' },
  { property: 'Gap horizontal', family: 'spacing/inline/…', how: 'Auto layout en fila → ritmo entre elementos en línea.' },
  { property: 'Padding horizontal', family: 'spacing/inset-x/…', how: 'Left / Right de un frame.' },
  { property: 'Padding vertical', family: 'spacing/inset-y/…', how: 'Top / Bottom de un frame.' },
  { property: 'Padding de página', family: 'spacing/inset-page/…', how: 'Padding del contenedor de pantalla o panel grande.' },
  { property: 'Gap de página', family: 'spacing/gap-page/…', how: 'Gap entre secciones, columnas de grid o widgets.' },
];

export const APPLY_RULES: { ok: boolean; text: string }[] = [
  { ok: true, text: 'Se aplica desde el icono de variable del Gap o del Padding, nunca escribiendo el número en el campo.' },
  { ok: true, text: 'El auto layout en columna usa <code>spacing/stack</code>; el auto layout en fila usa <code>spacing/inline</code>.' },
  { ok: false, text: 'No se aplica un primitivo de Tier 1 sobre un componente, aunque el picker lo ofrezca.' },
  { ok: false, text: 'No se usa un paso de página (64–128 px) como gap de un botón o un input: si el componente requiere ese espacio, el problema es de layout, no de spacing interno.' },
];

export const UPDATES: { title: string; badge: string; text: string }[] = [
  { title: 'Cambiar el ritmo de un rol', badge: 'Edita Tier 2', text: 'Reapunta el alias del token semántico a otro paso de la escala. Todos los componentes que lo usan lo reciben.' },
  { title: 'Cambiar la escala base', badge: 'Edita Tier 1', text: 'Cambia el valor del primitivo. Afecta a todos los tokens que lo referencian: conviene revisar antes cuáles son.' },
  { title: 'Nunca en el nodo', badge: 'Prohibido', text: 'Escribir 16 en el Gap o el Padding desenlaza la variable. El layout se mantiene visualmente igual y deja de heredar.' },
];
