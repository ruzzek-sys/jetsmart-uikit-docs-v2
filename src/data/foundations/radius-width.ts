/**
 * Foundations · Radius & Width.
 *
 * Valores de las variables FLOAT del archivo «Jetsmart UI Kit v1.0»: 21 primitivos de radius
 * + 8 tokens semánticos, y 9 primitivos de border width + 7 tokens semánticos en
 * Tier 2: Spatial & Shape.
 *
 * Los textos admiten HTML (se pintan con set:html).
 */

/** Valor centinela de border/radius/full: fuerza el límite circular de Figma. */
export const FULL = 999;

export interface Primitive {
  /** Último segmento del path: border/radius/<step> o border/width/<step>. */
  step: string;
  px: number;
}

export interface Semantic {
  /** Rol: border/radius/<role> o border/width/<role>. */
  role: string;
  /** Path del primitivo de Tier 1 al que hace alias. */
  alias: string;
  px: number;
  /** Etiqueta corta del rol (badge). */
  label: string;
  use: string;
}

export interface Zone {
  steps: string;
  zone: string;
  purpose: string;
}

export const RADIUS_PRIMITIVES: Primitive[] = [
  { step: '0', px: 0 },
  { step: '1', px: 2 },
  { step: '2', px: 4 },
  { step: '3', px: 6 },
  { step: '4', px: 8 },
  { step: '5', px: 12 },
  { step: '6', px: 16 },
  { step: '7', px: 24 },
  { step: '8', px: 32 },
  { step: '9', px: 40 },
  { step: '10', px: 48 },
  { step: '11', px: 56 },
  { step: '12', px: 64 },
  { step: '13', px: 72 },
  { step: '14', px: 80 },
  { step: '15', px: 96 },
  { step: '16', px: 112 },
  { step: '17', px: 128 },
  { step: '18', px: 144 },
  { step: '19', px: 160 },
  { step: 'full', px: FULL },
];

export const RADIUS_SEMANTIC: Semantic[] = [
  { role: 'none', alias: 'border/radius/0', px: 0, label: 'Sin curva', use: 'Botones ghost/tertiary, links de texto y el shell del Navbar: elementos que no deben leerse como tarjeta ni botón.' },
  { role: 'extra-small', alias: 'border/radius/2', px: 4, label: 'Uso muy acotado', use: 'Poco frecuente en el kit; aparece en sub-frames internos como Notice Panel.' },
  { role: 'small', alias: 'border/radius/4', px: 8, label: 'Tooltips y paneles', use: 'Tooltips pequeños, Notification Item e Inline Message en layout Block.' },
  { role: 'medium', alias: 'border/radius/6', px: 16, label: 'Paneles y tablas', use: 'Tooltips grandes, Selection Table y paneles de contenido intermedio.' },
  { role: 'large', alias: 'border/radius/7', px: 24, label: 'Contenedor estándar', use: 'Modal, Alert Dialog, Notice Panel, Cards, Banner y Action Card: el radio más común para un contenedor.' },
  { role: 'large-increased', alias: 'border/radius/8', px: 32, label: 'Overlay grande', use: 'Accordion y Alert Dialog cuando ocupan la pantalla como overlay principal.' },
  { role: 'extra-large', alias: 'border/radius/9', px: 40, label: 'Formas grandes', use: 'Paneles y piezas decorativas de mayor escala.' },
  { role: 'full', alias: 'border/radius/full', px: FULL, label: 'Comportamiento circular', use: 'Badge, Buttons, chips, avatares, Progress Bar, Page Indicator e Input: el token de mayor uso.' },
];

export const RADIUS_ZONES: Zone[] = [
  { steps: '0 – 8', zone: 'Micro', purpose: 'Elementos compactos: tags, checkboxes e inputs. Incremento de 2 px.' },
  { steps: '12 – 24', zone: 'Estándar', purpose: 'Tarjetas, botones y modales. Incremento de 4 a 8 px.' },
  { steps: '32 – 160', zone: 'Macro', purpose: 'Paneles grandes y secciones hero. Incremento de 8 a 16 px; pocos alias.' },
  { steps: '999', zone: 'Centinela', purpose: 'border/radius/full. No es un paso de la rampa: fuerza el límite circular de Figma.' },
];

export const WIDTH_PRIMITIVES: Primitive[] = [
  { step: '0', px: 0 },
  { step: '1', px: 0.5 },
  { step: '2', px: 0.75 },
  { step: '3', px: 1 },
  { step: '4', px: 1.5 },
  { step: '5', px: 2 },
  { step: '6', px: 3 },
  { step: '7', px: 4 },
  { step: '8', px: 5 },
];

export const WIDTH_SEMANTIC: Semantic[] = [
  { role: 'none', alias: 'border/width/0', px: 0, label: 'Sin borde', use: 'La separación la resuelve el fondo, la sombra o el espaciado.' },
  { role: 'hairline', alias: 'border/width/1', px: 0.5, label: 'Línea mínima', use: 'Declarado en Tier 2; aún sin bindings en las páginas de componentes auditadas.' },
  { role: 'thin', alias: 'border/width/2', px: 0.75, label: 'Línea fina', use: 'Declarado en Tier 2; aún sin bindings en las páginas de componentes auditadas.' },
  { role: 'base', alias: 'border/width/3', px: 1, label: 'Grosor por defecto', use: 'Dominante del kit (~95% de los bindings): Buttons, Modal, Accordion, Dropdown, Input, Badge y Divider.' },
  { role: 'medium', alias: 'border/width/5', px: 2, label: 'Estado', use: 'Foco, error y selección. Duplica el grosor base para leerse sin depender solo del color.' },
  { role: 'thick', alias: 'border/width/6', px: 3, label: 'Uso puntual', use: 'Pocos bindings (Divider, Modal). Confirmar el rol antes de extenderlo.' },
  { role: 'heavy', alias: 'border/width/7', px: 4, label: 'Acento gráfico', use: 'Barras de acento y piezas promocionales; no para controles de formulario.' },
];

export const WIDTH_ZONES: Zone[] = [
  { steps: '0 – 1 px', zone: 'Zona fina', purpose: 'Cuatro pasos (0, 0.5, 0.75 y 1 px) para divisores y bordes de controles en reposo.' },
  { steps: '1.5 – 2 px', zone: 'Zona de estado', purpose: 'Dos pasos para foco, selección y error: duplican el grosor base.' },
  { steps: '3 – 5 px', zone: 'Zona gráfica', purpose: 'Tres pasos para anillos, barras de acento y piezas promocionales. No se usan en controles de formulario.' },
];

export const APPLY: { property: string; family: string; how: string }[] = [
  { property: 'Corner radius (4 esquinas)', family: 'border/radius/…', how: 'Caso por defecto: un mismo token en las cuatro esquinas.' },
  { property: 'Corner radius individual', family: 'border/radius/…', how: 'Excepción: tabs activos o acordeones abiertos, solo en las esquinas visibles.' },
  { property: 'Elementos circulares', family: 'border/radius/full', how: 'Avatares, switches y dots de estado en un elemento de igual ancho y alto.' },
  { property: 'Stroke weight', family: 'border/width/…', how: 'Grosor de borde en Stroke. Scope: STROKE_FLOAT.' },
];

export const APPLY_RULES: { ok: boolean; text: string }[] = [
  { ok: true, text: 'Se aplica desde el icono de variable de Corner radius o Stroke, nunca escribiendo el número en el campo.' },
  { ok: true, text: 'El radio interior de un contenido anidado debe ser menor o igual al radio exterior del contenedor.' },
  { ok: false, text: 'No se aplica un primitivo de Tier 1 sobre un componente, aunque el picker lo ofrezca.' },
  { ok: false, text: 'No se usa full cuando el comportamiento requerido es una esquina curva fija: corresponde large-increased.' },
];

export const COLLECTIONS: { name: string; mode: string; radius: number; width: number; role: string }[] = [
  {
    name: 'Tier 1: Core Primitives',
    mode: 'Default',
    radius: 21,
    width: 9,
    role: 'Rampa cruda de radius (0–160 + full) y de border width (0–5 px). Solo se edita cuando cambia la escala base.',
  },
  {
    name: 'Tier 2: Spatial &amp; Shape',
    mode: 'Theme 1',
    radius: 8,
    width: 7,
    role: 'Roles semánticos de radius y border width. Convive con spacing en la misma colección.',
  },
];

/** «Cómo se actualizan»: se pinta con <Items> (title = objetivo, badge = dónde se edita). */
export const UPDATES: { title: string; badge: string; text: string }[] = [
  {
    title: 'Cambiar el rol de un radio o grosor',
    badge: 'Edita Tier 2',
    text: 'Reapunta el alias del token semántico a otro paso de la rampa. Todos los componentes que lo usan lo reciben.',
  },
  {
    title: 'Cambiar la escala base',
    badge: 'Edita Tier 1',
    text: 'Cambia el valor del primitivo. Afecta a todos los tokens que lo referencian: conviene revisar antes cuáles son.',
  },
  {
    title: 'Nunca en el nodo',
    badge: 'Prohibido',
    text: 'Escribir un número en Corner radius o Stroke desenlaza la variable. El componente se mantiene visualmente igual y deja de heredar.',
  },
];

/** Cuántos tokens semánticos hacen alias a cada primitivo (por path completo). */
const ALIAS_COUNT = [...RADIUS_SEMANTIC, ...WIDTH_SEMANTIC].reduce<Record<string, number>>((acc, t) => {
  acc[t.alias] = (acc[t.alias] ?? 0) + 1;
  return acc;
}, {});

export const aliasCount = (path: string) => ALIAS_COUNT[path] ?? 0;

/** 16 px → «1 rem», 2 px → «0,125 rem». El centinela no tiene equivalente. */
export function rem(px: number): string {
  if (px === 0) return '0';
  if (px === FULL) return '—';
  return `${String(Math.round((px / 16) * 1000) / 1000).replace('.', ',')} rem`;
}

/** 24 → «24 px», 0.5 → «0,5 px», 999 → «999 (full)». */
export function pxLabel(px: number): string {
  if (px === FULL) return '999 (full)';
  if (px % 1 === 0) return `${px} px`;
  return `${String(px).replace('.', ',')} px`;
}

/** Zona de la rampa de radius a la que pertenece un valor. */
export function radiusZone(px: number): string {
  if (px === 0) return 'Cero';
  if (px === FULL) return 'Centinela';
  if (px <= 8) return 'Micro';
  if (px <= 24) return 'Estándar';
  return 'Macro';
}
