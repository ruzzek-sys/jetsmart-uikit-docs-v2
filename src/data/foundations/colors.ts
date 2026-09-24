/**
 * Foundations · Colors.
 *
 * Valores de las variables de color del archivo «Jetsmart UI Kit v1.0»: 106 primitivos en
 * Tier 1 y 77 tokens semánticos en Tier 2, cada uno con el alias al primitivo que referencia.
 *
 * Los contrastes no están escritos a mano: se calculan en build con la fórmula de WCAG 2.1
 * (lib/contrast.ts) a partir de estos mismos hex, igual que los conteos de alias por paso.
 *
 * Los textos admiten HTML (se pintan con set:html).
 */

/* --- Tipos --------------------------------------------------------------- */

export interface Zone {
  steps: string[];
  label: string;
}

export interface ZoneDoc {
  range: string;
  tag: string;
  text: string;
}

export interface RampStep {
  /** «50» … «950», o «white» / «black» en la rampa Base. */
  step: string;
  hex: string;
}

export interface Ramp {
  /** Path de la rampa sin el prefijo color/. Vacío en la rampa Base (color/white, color/black). */
  path: string;
  label: string;
  role: string;
  desc: string;
  note: string;
  steps: RampStep[];
}

export type SemanticKey = 'background' | 'content' | 'border' | 'effect';

export interface SemanticToken {
  /** Nombre sin la categoría: «brand-primary» → background/brand-primary. */
  name: string;
  /** Primitivo de Tier 1 al que hace alias (sin color/), o null si es un valor directo. */
  alias: string | null;
  /** Hex resuelto; 8 dígitos cuando lleva alpha. */
  hex: string;
}

export interface SemanticGroup {
  label: string;
  desc: string;
  note?: string;
  tokens: SemanticToken[];
}

export interface SemanticCategory {
  key: SemanticKey;
  label: string;
  scope: string;
  intro: string;
  groups: SemanticGroup[];
}

/** Pareja fondo · contenido, por path completo de token. */
export interface Pair {
  bg: string;
  fg: string;
}

export interface CoverageItem {
  token: string;
  /** Ratio mínimo que exige el criterio. */
  min: number;
  rule: string;
  /** Token de reemplazo y el primitivo al que apunta. */
  fix?: string;
  why?: string;
  /** Cuando el bajo contraste es a propósito: la explicación. */
  intentional?: string;
}

export interface NamingPart {
  part: string;
  kind: string;
  text: string;
}

export interface Collection {
  name: string;
  mode: string;
  total: number;
  colors: number;
  role: string;
}

export interface ApplyRow {
  property: string;
  category: string;
  how: string;
}

export interface UpdateItem {
  goal: string;
  where: string;
  text: string;
}

/* --- Rampas (Tier 1) ------------------------------------------------------- */

export const ZONES: Zone[] = [
  { steps: ['50', '100'], label: 'Fondos' },
  { steps: ['200', '300', '400'], label: 'Decorativo' },
  { steps: ['500'], label: 'Color base' },
  { steps: ['600', '700'], label: 'Acción' },
  { steps: ['800', '900', '950'], label: 'Contenido' },
];

export const ZONE_DOCS: ZoneDoc[] = [
  { range: '50 – 100', tag: 'Fondos', text: 'Superficies tintadas y fondos subtle. Contraste bajo por diseño: nunca llevan texto de su propio color sin reforzar.' },
  { range: '200 – 400', tag: 'Decorativo', text: 'Ilustración, gráficos y bordes decorativos. En la mayoría de las rampas no tienen alias en Tier 2.' },
  { range: '500', tag: 'Color base', text: 'El color de identidad de la rampa. Es el paso que la gente reconoce como «el color», pero no siempre cumple contraste.' },
  { range: '600 – 700', tag: 'Acción', text: 'Estados hover y bordes que deben cumplir el 3:1 de WCAG 1.4.11.' },
  { range: '800 – 950', tag: 'Contenido', text: 'Texto e iconos sobre fondos claros, y fondos inversos. Es la zona que garantiza 4,5:1.' },
];

export const RAMPS: Ramp[] = [
  {
    path: 'brand/royal-navy-blue',
    label: 'Royal Navy Blue',
    role: 'Marca primaria',
    desc: 'Color institucional de Jetsmart. Alimenta todos los tokens brand-primary de fondo, contenido y borde. El paso 500 es el azul de marca.',
    note: 'Los pasos 200 a 400 no tienen alias en Tier 2: existen para ilustraciones y gráficos, no para interfaz.',
    steps: [
      { step: '50', hex: '#EEF2F6' },
      { step: '100', hex: '#D5DFEF' },
      { step: '200', hex: '#9EB3D6' },
      { step: '300', hex: '#6581B3' },
      { step: '400', hex: '#35518A' },
      { step: '500', hex: '#153266' },
      { step: '600', hex: '#11294F' },
      { step: '700', hex: '#0D2042' },
      { step: '800', hex: '#0A1832' },
      { step: '900', hex: '#070F20' },
      { step: '950', hex: '#040813' },
    ],
  },
  {
    path: 'brand/medium-ruby',
    label: 'Medium Ruby',
    role: 'Marca secundaria',
    desc: 'Color de marca secundario. Sostiene acciones destacadas, precios en campaña y los tokens brand-secondary.',
    note: 'El paso 500 pasa 4,5:1 sobre blanco, por eso puede llevar texto e icono directamente.',
    steps: [
      { step: '50', hex: '#FDF3F4' },
      { step: '100', hex: '#F9DDE0' },
      { step: '200', hex: '#EEB4BA' },
      { step: '300', hex: '#DF8790' },
      { step: '400', hex: '#CC555F' },
      { step: '500', hex: '#AF272F' },
      { step: '600', hex: '#911F27' },
      { step: '700', hex: '#74191F' },
      { step: '800', hex: '#561318' },
      { step: '900', hex: '#3A0D10' },
      { step: '950', hex: '#220709' },
    ],
  },
  {
    path: 'brand/bayou',
    label: 'Bayou',
    role: 'Marca terciaria',
    desc: 'Color de marca terciario, para superficies tintadas y acentos de apoyo. Sus pasos claros no alcanzan 3:1, por eso los tokens de texto y borde saltan a 700–800.',
    note: 'bayou/500 solo alcanza 2,66:1 sobre blanco: nunca lo uses como color de texto ni de borde informativo.',
    steps: [
      { step: '50', hex: '#F0FAFB' },
      { step: '100', hex: '#D6F0F4' },
      { step: '200', hex: '#AADFE8' },
      { step: '300', hex: '#73C7D6' },
      { step: '400', hex: '#3FB3C8' },
      { step: '500', hex: '#14AEC7' },
      { step: '600', hex: '#0F8EA3' },
      { step: '700', hex: '#0C7081' },
      { step: '800', hex: '#0A5663' },
      { step: '900', hex: '#073D47' },
      { step: '950', hex: '#04262D' },
    ],
  },
  {
    path: 'brand/amber',
    label: 'Amber',
    role: 'Accent',
    desc: 'Color accent. Reservado para promociones y realces puntuales. Su par de contenido es negro, nunca blanco.',
    note: 'amber/500 tiene 1,99:1 sobre blanco. Para texto sobre fondos claros el kit usa amber/900.',
    steps: [
      { step: '50', hex: '#FFF9EC' },
      { step: '100', hex: '#FFECCF' },
      { step: '200', hex: '#FDD795' },
      { step: '300', hex: '#FCC053' },
      { step: '400', hex: '#FCB028' },
      { step: '500', hex: '#FFA400' },
      { step: '600', hex: '#DA8600' },
      { step: '700', hex: '#A96500' },
      { step: '800', hex: '#7E4C07' },
      { step: '900', hex: '#5D390C' },
      { step: '950', hex: '#392205' },
    ],
  },
  {
    path: 'slate',
    label: 'Slate',
    role: 'Neutrales',
    desc: 'Rampa neutra del producto. Define las superficies, el texto primario, secundario y terciario, los placeholders y la mayoría de los bordes.',
    note: 'Es la rampa con más alias del kit: casi todo el texto y los bordes neutros salen de aquí.',
    steps: [
      { step: '50', hex: '#F4F7FB' },
      { step: '100', hex: '#E7EDF4' },
      { step: '200', hex: '#CFD9E5' },
      { step: '300', hex: '#B4C3D4' },
      { step: '400', hex: '#98AAC0' },
      { step: '500', hex: '#7E92A9' },
      { step: '600', hex: '#62768E' },
      { step: '700', hex: '#495B71' },
      { step: '800', hex: '#314156' },
      { step: '900', hex: '#1E2A3A' },
      { step: '950', hex: '#151823' },
    ],
  },
  {
    path: 'utility/green',
    label: 'Utility Green',
    role: 'Success',
    desc: 'Utility success. Confirmaciones, pagos aprobados, check-in completado y mensajes de éxito.',
    note: 'El fondo usa green/600 y el texto sobre fondo claro usa green/900: el 500 no llega a 4,5:1 sobre blanco.',
    steps: [
      { step: '50', hex: '#F0FDF4' },
      { step: '100', hex: '#DCFCE7' },
      { step: '200', hex: '#BBF7D0' },
      { step: '300', hex: '#86EFAC' },
      { step: '400', hex: '#4ADE80' },
      { step: '500', hex: '#22C55E' },
      { step: '600', hex: '#16A34A' },
      { step: '700', hex: '#15803D' },
      { step: '800', hex: '#166534' },
      { step: '900', hex: '#14532D' },
      { step: '950', hex: '#022C22' },
    ],
  },
  {
    path: 'utility/red',
    label: 'Utility Red',
    role: 'Error',
    desc: 'Utility error. Validaciones de formulario, errores de pago, estados destructivos y mensajes de bloqueo.',
    note: 'El rojo nunca comunica solo: acompáñalo siempre de icono y texto.',
    steps: [
      { step: '50', hex: '#FEF2F2' },
      { step: '100', hex: '#FEE2E2' },
      { step: '200', hex: '#FECACA' },
      { step: '300', hex: '#FCA5A5' },
      { step: '400', hex: '#F87171' },
      { step: '500', hex: '#EF4444' },
      { step: '600', hex: '#DC2626' },
      { step: '700', hex: '#B91C1C' },
      { step: '800', hex: '#991B1B' },
      { step: '900', hex: '#7F1D1D' },
      { step: '950', hex: '#450A0A' },
    ],
  },
  {
    path: 'utility/yellow',
    label: 'Utility Yellow',
    role: 'Warning',
    desc: 'Utility warning. Avisos que piden atención sin bloquear la tarea: cambios de horario, documentación pendiente, equipaje por confirmar.',
    note: 'yellow/500 es el único fondo de utility que lleva contenido negro: con blanco solo alcanza 1,92:1.',
    steps: [
      { step: '50', hex: '#FEFCE8' },
      { step: '100', hex: '#FEF9C3' },
      { step: '200', hex: '#FEF08A' },
      { step: '300', hex: '#FDE047' },
      { step: '400', hex: '#FACC15' },
      { step: '500', hex: '#EAB308' },
      { step: '600', hex: '#CA8A04' },
      { step: '700', hex: '#A16207' },
      { step: '800', hex: '#854D0E' },
      { step: '900', hex: '#713F12' },
      { step: '950', hex: '#422006' },
    ],
  },
  {
    path: 'utility/blue',
    label: 'Utility Blue',
    role: 'Info y foco',
    desc: 'Utility info. Mensajes informativos y, sobre todo, el anillo de foco del kit: border/focus apunta a blue/500.',
    note: 'El foco es accesibilidad, no decoración: blue/500 no se reemplaza por un color de marca.',
    steps: [
      { step: '50', hex: '#EFF6FF' },
      { step: '100', hex: '#DBEAFE' },
      { step: '200', hex: '#BFDBFE' },
      { step: '300', hex: '#93C5FD' },
      { step: '400', hex: '#60A5FA' },
      { step: '500', hex: '#3B82F6' },
      { step: '600', hex: '#2563EB' },
      { step: '700', hex: '#1D4ED8' },
      { step: '800', hex: '#1E40AF' },
      { step: '900', hex: '#1E3A8A' },
      { step: '950', hex: '#172554' },
    ],
  },
  {
    path: '',
    label: 'Base',
    role: 'Blanco y negro',
    desc: 'Blanco y negro puros. Solo se usan a través de tokens semánticos: content/inverse, content/on-brand-primary, background/primary y border/inverse.',
    note: 'Nunca escribas #FFFFFF ni #000000 a mano en un componente: siempre pasa por el token semántico que corresponde.',
    steps: [
      { step: 'white', hex: '#FFFFFF' },
      { step: 'black', hex: '#000000' },
    ],
  },
];

/* --- Tokens semánticos (Tier 2) -------------------------------------------- */

export const SEMANTIC: SemanticCategory[] = [
  {
    key: 'background',
    label: 'Background',
    scope: 'FRAME_FILL · SHAPE_FILL',
    intro: 'Se aplica como Fill de un frame o shape. Es la superficie sobre la que se apoya todo lo demás.',
    groups: [
      {
        label: 'Marca',
        desc: 'Cuatro colores de marca × tres intensidades. El token base pinta la superficie sólida, -strong resuelve hover y presionado, -subtle es el fondo tintado de baja énfasis.',
        tokens: [
          { name: 'brand-primary', alias: 'brand/royal-navy-blue/500', hex: '#153266' },
          { name: 'brand-primary-strong', alias: 'brand/royal-navy-blue/600', hex: '#11294F' },
          { name: 'brand-primary-subtle', alias: 'brand/royal-navy-blue/100', hex: '#D5DFEF' },
          { name: 'brand-secondary', alias: 'brand/medium-ruby/500', hex: '#AF272F' },
          { name: 'brand-secondary-strong', alias: 'brand/medium-ruby/700', hex: '#74191F' },
          { name: 'brand-secondary-subtle', alias: 'brand/medium-ruby/100', hex: '#F9DDE0' },
          { name: 'brand-tertiary', alias: 'brand/bayou/500', hex: '#14AEC7' },
          { name: 'brand-tertiary-strong', alias: 'brand/bayou/600', hex: '#0F8EA3' },
          { name: 'brand-tertiary-subtle', alias: 'brand/bayou/100', hex: '#D6F0F4' },
          { name: 'brand-accent', alias: 'brand/amber/500', hex: '#FFA400' },
          { name: 'brand-accent-strong', alias: 'brand/amber/700', hex: '#A96500' },
          { name: 'brand-accent-subtle', alias: 'brand/amber/50', hex: '#FFF9EC' },
        ],
      },
      {
        label: 'Superficies',
        desc: 'La base neutra del producto: página, tarjeta, sección alterna y estado inverso.',
        note: 'background/transparent es el único token sin alias a Tier 1: es blanco con opacidad 0 y sirve para estados sin fondo.',
        tokens: [
          { name: 'primary', alias: 'white', hex: '#FFFFFF' },
          { name: 'secondary', alias: 'slate/100', hex: '#E7EDF4' },
          { name: 'tertiary', alias: 'slate/50', hex: '#F4F7FB' },
          { name: 'subtle', alias: 'brand/royal-navy-blue/50', hex: '#EEF2F6' },
          { name: 'neutral', alias: 'slate/300', hex: '#B4C3D4' },
          { name: 'strong', alias: 'slate/900', hex: '#1E2A3A' },
          { name: 'inverse', alias: 'slate/950', hex: '#151823' },
          { name: 'transparent', alias: null, hex: '#FFFFFF00' },
        ],
      },
      {
        label: 'Utility',
        desc: 'Cuatro estados × dos intensidades. El token sólido se usa en badges y barras de estado; el -subtle en banners y alertas embebidas.',
        note: 'Cada fondo sólido tiene un content/on-utility-* asignado. No elijas el color del texto a ojo: usa el par.',
        tokens: [
          { name: 'utility-success', alias: 'utility/green/600', hex: '#16A34A' },
          { name: 'utility-success-subtle', alias: 'utility/green/100', hex: '#DCFCE7' },
          { name: 'utility-warning', alias: 'utility/yellow/500', hex: '#EAB308' },
          { name: 'utility-warning-subtle', alias: 'utility/yellow/100', hex: '#FEF9C3' },
          { name: 'utility-error', alias: 'utility/red/600', hex: '#DC2626' },
          { name: 'utility-error-subtle', alias: 'utility/red/100', hex: '#FEE2E2' },
          { name: 'utility-info', alias: 'utility/blue/600', hex: '#2563EB' },
          { name: 'utility-info-subtle', alias: 'utility/blue/100', hex: '#DBEAFE' },
        ],
      },
    ],
  },
  {
    key: 'content',
    label: 'Content',
    scope: 'TEXT_FILL',
    intro: 'Se aplica como color de texto o de icono. El icono es contenido: nunca lleva un token de fondo.',
    groups: [
      {
        label: 'Marca',
        desc: 'Texto e iconos con color de marca sobre fondos claros. La versión -strong existe porque el paso 500 de bayou y amber no alcanza el contraste mínimo.',
        note: 'content/brand-tertiary y content/brand-accent no cumplen 4,5:1 sobre blanco. Para texto, usa siempre la variante -strong.',
        tokens: [
          { name: 'brand-primary', alias: 'brand/royal-navy-blue/500', hex: '#153266' },
          { name: 'brand-primary-strong', alias: 'brand/royal-navy-blue/600', hex: '#11294F' },
          { name: 'brand-secondary', alias: 'brand/medium-ruby/500', hex: '#AF272F' },
          { name: 'brand-secondary-strong', alias: 'brand/medium-ruby/600', hex: '#911F27' },
          { name: 'brand-tertiary', alias: 'brand/bayou/500', hex: '#14AEC7' },
          { name: 'brand-tertiary-strong', alias: 'brand/bayou/800', hex: '#0A5663' },
          { name: 'brand-accent', alias: 'brand/amber/500', hex: '#FFA400' },
          { name: 'brand-accent-strong', alias: 'brand/amber/900', hex: '#5D390C' },
        ],
      },
      {
        label: 'Neutrales',
        desc: 'La jerarquía de lectura del producto. Cada token baja un escalón de énfasis: título, cuerpo, apoyo, placeholder, deshabilitado.',
        note: 'content/placeholder y content/disabled no cumplen 4,5:1 a propósito: comunican «aquí no hay contenido todavía» o «esto no está disponible».',
        tokens: [
          { name: 'primary', alias: 'slate/900', hex: '#1E2A3A' },
          { name: 'secondary', alias: 'slate/700', hex: '#495B71' },
          { name: 'tertiary', alias: 'slate/600', hex: '#62768E' },
          { name: 'placeholder', alias: 'slate/500', hex: '#7E92A9' },
          { name: 'disabled', alias: 'slate/300', hex: '#B4C3D4' },
          { name: 'disabled-on-brand', alias: 'slate/700', hex: '#495B71' },
        ],
      },
      {
        label: 'Utility',
        desc: 'El texto del mensaje de estado cuando el fondo es claro o -subtle. Son pasos oscuros de la rampa (800–900) justamente para cumplir contraste.',
        note: 'No confundir con los on-utility-*: estos van sobre fondos claros, los on-* van sobre el fondo sólido del estado.',
        tokens: [
          { name: 'utility-success', alias: 'utility/green/900', hex: '#14532D' },
          { name: 'utility-warning', alias: 'utility/yellow/900', hex: '#713F12' },
          { name: 'utility-error', alias: 'utility/red/800', hex: '#991B1B' },
          { name: 'utility-info', alias: 'utility/blue/800', hex: '#1E40AF' },
        ],
      },
      {
        label: 'Sobre fondo sólido',
        desc: 'Para cada fondo sólido existe un token de contenido ya validado por contraste. No se elige a ojo: se toma el par que corresponde al fondo.',
        note: 'on-brand-accent es negro y on-utility-warning también: amber y yellow no admiten texto blanco.',
        tokens: [
          { name: 'inverse', alias: 'white', hex: '#FFFFFF' },
          { name: 'on-brand-primary', alias: 'white', hex: '#FFFFFF' },
          { name: 'on-brand-secondary', alias: 'white', hex: '#FFFFFF' },
          { name: 'on-brand-tertiary', alias: 'white', hex: '#FFFFFF' },
          { name: 'on-brand-accent', alias: 'black', hex: '#000000' },
          { name: 'on-utility-success', alias: 'white', hex: '#FFFFFF' },
          { name: 'on-utility-warning', alias: 'black', hex: '#000000' },
          { name: 'on-utility-error', alias: 'white', hex: '#FFFFFF' },
          { name: 'on-utility-info', alias: 'white', hex: '#FFFFFF' },
        ],
      },
    ],
  },
  {
    key: 'border',
    label: 'Border',
    scope: 'STROKE_COLOR',
    intro: 'Se aplica como Stroke: separadores, contornos de input, tarjetas seleccionadas y el anillo de foco.',
    groups: [
      {
        label: 'Marca',
        desc: 'Bordes que llevan color de marca: outline de botones, tarjetas seleccionadas, chips activos. La versión -strong es la que cumple el 3:1 de WCAG 1.4.11.',
        note: 'border/brand-tertiary (2,66:1) y border/brand-accent (1,99:1) no cumplen 3:1. Si el borde comunica estado, usa -strong.',
        tokens: [
          { name: 'brand-primary', alias: 'brand/royal-navy-blue/500', hex: '#153266' },
          { name: 'brand-primary-strong', alias: 'brand/royal-navy-blue/600', hex: '#11294F' },
          { name: 'brand-secondary', alias: 'brand/medium-ruby/500', hex: '#AF272F' },
          { name: 'brand-secondary-strong', alias: 'brand/medium-ruby/600', hex: '#911F27' },
          { name: 'brand-tertiary', alias: 'brand/bayou/500', hex: '#14AEC7' },
          { name: 'brand-tertiary-strong', alias: 'brand/bayou/700', hex: '#0C7081' },
          { name: 'brand-accent', alias: 'brand/amber/500', hex: '#FFA400' },
          { name: 'brand-accent-strong', alias: 'brand/amber/700', hex: '#A96500' },
        ],
      },
      {
        label: 'Neutrales y estado',
        desc: 'Separadores, contornos de input, el anillo de foco y los bordes de los cuatro estados de utilidad.',
        note: 'border/focus es accesibilidad, no estilo: no se reemplaza por un color de marca ni se quita en ningún componente.',
        tokens: [
          { name: 'primary', alias: 'slate/300', hex: '#B4C3D4' },
          { name: 'secondary', alias: 'slate/200', hex: '#CFD9E5' },
          { name: 'tertiary', alias: 'brand/bayou/100', hex: '#D6F0F4' },
          { name: 'inverse', alias: 'white', hex: '#FFFFFF' },
          { name: 'focus', alias: 'utility/blue/500', hex: '#3B82F6' },
          { name: 'utility-success', alias: 'utility/green/600', hex: '#16A34A' },
          { name: 'utility-warning', alias: 'utility/yellow/500', hex: '#EAB308' },
          { name: 'utility-error', alias: 'utility/red/600', hex: '#DC2626' },
          { name: 'utility-info', alias: 'utility/blue/600', hex: '#2563EB' },
        ],
      },
    ],
  },
  {
    key: 'effect',
    label: 'Effect',
    scope: 'EFFECT_COLOR',
    intro: 'El color de las sombras. No se aplica a mano: llega a través de los estilos de efecto del kit, documentados en Elevations.',
    groups: [
      {
        label: 'Elevación',
        desc: 'Cinco niveles, todos derivados de slate/400 con distinta opacidad.',
        tokens: [
          { name: 'elevation-xs', alias: 'shadow/base-14', hex: '#98AAC024' },
          { name: 'elevation-sm', alias: 'shadow/base-18', hex: '#98AAC02E' },
          { name: 'elevation-md', alias: 'shadow/base-24', hex: '#98AAC03D' },
          { name: 'elevation-lg', alias: 'shadow/base-32', hex: '#98AAC052' },
          { name: 'elevation-xl', alias: 'shadow/base-42', hex: '#98AAC06B' },
        ],
      },
    ],
  },
];

/* --- Parejas y contraste --------------------------------------------------- */

export const PAIRS: Pair[] = [
  { bg: 'background/brand-primary', fg: 'content/on-brand-primary' },
  { bg: 'background/brand-primary-subtle', fg: 'content/brand-primary-strong' },
  { bg: 'background/brand-secondary', fg: 'content/on-brand-secondary' },
  { bg: 'background/brand-secondary-subtle', fg: 'content/brand-secondary-strong' },
  { bg: 'background/brand-tertiary', fg: 'content/on-brand-tertiary' },
  { bg: 'background/brand-tertiary-subtle', fg: 'content/brand-tertiary-strong' },
  { bg: 'background/brand-accent', fg: 'content/on-brand-accent' },
  { bg: 'background/brand-accent-subtle', fg: 'content/brand-accent-strong' },
  { bg: 'background/utility-success', fg: 'content/on-utility-success' },
  { bg: 'background/utility-success-subtle', fg: 'content/utility-success' },
  { bg: 'background/utility-warning', fg: 'content/on-utility-warning' },
  { bg: 'background/utility-warning-subtle', fg: 'content/utility-warning' },
  { bg: 'background/utility-error', fg: 'content/on-utility-error' },
  { bg: 'background/utility-error-subtle', fg: 'content/utility-error' },
  { bg: 'background/utility-info', fg: 'content/on-utility-info' },
  { bg: 'background/utility-info-subtle', fg: 'content/utility-info' },
  { bg: 'background/primary', fg: 'content/primary' },
  { bg: 'background/inverse', fg: 'content/inverse' },
];

export const COVERAGE: CoverageItem[] = [
  { token: 'content/brand-tertiary', min: 4.5, rule: 'Texto · 4,5:1', fix: 'content/brand-tertiary-strong', why: 'bayou/800' },
  { token: 'content/brand-accent', min: 4.5, rule: 'Texto · 4,5:1', fix: 'content/brand-accent-strong', why: 'amber/900' },
  { token: 'border/brand-tertiary', min: 3, rule: 'Borde · 3:1', fix: 'border/brand-tertiary-strong', why: 'bayou/700' },
  { token: 'border/brand-accent', min: 3, rule: 'Borde · 3:1', fix: 'border/brand-accent-strong', why: 'amber/700' },
  { token: 'content/placeholder', min: 4.5, rule: 'Texto · 4,5:1', intentional: 'Solo para texto de ejemplo dentro de un input vacío, nunca para contenido real.' },
  { token: 'content/disabled', min: 4.5, rule: 'Texto · 4,5:1', intentional: 'WCAG exime a los controles deshabilitados, pero el estado debe leerse también sin color.' },
];

/* --- Nombres, colecciones y aplicación en Figma ------------------------------ */

export const NAMING: NamingPart[] = [
  { part: 'background/', kind: 'Categoría', text: 'Se aplica como Fill de un frame o shape. Scope: FRAME_FILL y SHAPE_FILL.' },
  { part: 'content/', kind: 'Categoría', text: 'Se aplica como color de texto o de icono. Scope: TEXT_FILL.' },
  { part: 'border/', kind: 'Categoría', text: 'Se aplica como Stroke. Scope: STROKE_COLOR.' },
  { part: 'brand-primary', kind: 'Rol', text: 'Qué representa: marca primaria, secundaria, terciaria, accent, o un estado de utilidad.' },
  { part: '-strong', kind: 'Modificador', text: 'Un paso más oscuro. Hover, presionado, y la variante que cumple contraste cuando la base no llega.' },
  { part: '-subtle', kind: 'Modificador', text: 'Fondo tintado de baja énfasis. Siempre se combina con un contenido -strong.' },
  { part: 'on-', kind: 'Modificador', text: 'Contenido que va encima de un fondo sólido. Su valor ya está validado por contraste contra ese fondo.' },
];

export const COLLECTIONS: Collection[] = [
  { name: 'Tier 1: Core Primitives', mode: 'Default', total: 224, colors: 106, role: 'Las nueve rampas de 11 pasos, blanco y negro, y los cinco tonos de sombra. Solo se edita cuando cambia la paleta de marca.' },
  { name: 'Tier 2: Color', mode: 'Theme 1', total: 77, colors: 77, role: 'background/, content/, border/ y effect/. Es la colección que se usa a diario.' },
  { name: 'Tier 2: Typography', mode: 'Theme 1', total: 325, colors: 0, role: 'Familia, peso, tamaño, interlineado y tracking de cada estilo de texto.' },
  { name: 'Tier 2: Spatial & Shape', mode: 'Theme 1', total: 96, colors: 0, role: 'Espaciado, radios y grosores.' },
  { name: 'Tier 3: Components', mode: 'Mode 1', total: 5, colors: 5, role: 'Excepciones atadas a un componente concreto: hoy solo los iconos de asiento del selector.' },
];

export const APPLY: ApplyRow[] = [
  { property: 'Fill de un frame', category: 'background/', how: 'Selecciona el frame → Fill → icono de variable → background/…' },
  { property: 'Color de texto', category: 'content/', how: 'Selecciona el texto → Fill → icono de variable → content/…' },
  { property: 'Iconos', category: 'content/', how: 'El icono es contenido: usa content/… en su Fill, no un token de fondo.' },
  { property: 'Stroke', category: 'border/', how: 'Selecciona el nodo → Stroke → icono de variable → border/…' },
  { property: 'Sombra', category: 'effect/', how: 'Las sombras no se pintan a mano: se aplican con los estilos de efecto del kit.' },
];

export const UPDATES: UpdateItem[] = [
  { goal: 'Cambio de tono', where: 'Edita Tier 2', text: 'Reapunta el alias del token semántico a otro paso de la rampa. Todos los componentes lo reciben.' },
  { goal: 'Cambio de marca', where: 'Edita Tier 1', text: 'Cambia el valor del primitivo. Afecta a todos los tokens que lo referencian: revisa antes cuáles son.' },
  { goal: 'Nunca en el nodo', where: 'Prohibido', text: 'Corregir el color en el componente crea una excepción invisible que nadie encontrará después.' },
  { goal: 'Antes de publicar', where: 'Contraste', text: 'Cualquier cambio de alias obliga a recalcular el contraste de las parejas afectadas.' },
  { goal: 'Publicar', where: 'Librería', text: 'Los cambios llegan a producto al publicar la librería y aceptar la actualización en cada archivo.' },
];

/** Reglas de «2 · Cómo se aplican». */
export const APPLY_RULES: { ok: boolean; text: string }[] = [
  { ok: true, text: 'Se aplica desde el icono de variable del panel, nunca escribiendo el hex en el campo de color.' },
  { ok: true, text: 'El icono es contenido: su Fill lleva un token <code>content/…</code>, igual que el texto que acompaña.' },
  { ok: false, text: 'No se aplica un primitivo de Tier 1 sobre un componente, aunque el picker lo ofrezca desde la pestaña de la librería.' },
  { ok: false, text: 'No se crea un token en Tier 3 si Tier 2 ya resuelve el caso: cada excepción es un color que después nadie encuentra.' },
];

/* --- Índices (calculados en build) ------------------------------------------ */

export type TokenCategory = SemanticKey | 'primitive';

export interface TokenInfo {
  hex: string;
  alias: string | null;
  category: TokenCategory;
}

/** Path de un paso de rampa sin color/: «brand/bayou/500», o «white» en la rampa Base. */
export const rampStepPath = (ramp: Ramp, step: RampStep) => (ramp.path ? `${ramp.path}/${step.step}` : step.step);

/** Todos los tokens por path: los semánticos («content/primary») y los primitivos («slate/900»). */
export const TOKENS: Record<string, TokenInfo> = {};

/** Cuántos tokens semánticos hacen alias a cada primitivo. */
export const ALIAS_COUNT: Record<string, number> = {};

for (const cat of SEMANTIC) {
  for (const group of cat.groups) {
    for (const t of group.tokens) {
      TOKENS[`${cat.key}/${t.name}`] = { hex: t.hex, alias: t.alias, category: cat.key };
      if (t.alias) ALIAS_COUNT[t.alias] = (ALIAS_COUNT[t.alias] ?? 0) + 1;
    }
  }
}

for (const ramp of RAMPS) {
  for (const step of ramp.steps) {
    TOKENS[rampStepPath(ramp, step)] = { hex: step.hex, alias: null, category: 'primitive' };
  }
}

/** Token por path. Falla el build si el path no existe, para que un typo no pase en silencio. */
export function tokenOf(path: string): TokenInfo {
  const info = TOKENS[path];
  if (!info) throw new Error(`Token de color desconocido: ${path}`);
  return info;
}

/** Zona de la rampa a la que pertenece un paso. */
export function zoneOf(step: string): string {
  return ZONES.find((z) => z.steps.includes(step))?.label ?? 'Base';
}

/** Cantidad de tokens de una categoría semántica. */
export const tokenCount = (cat: SemanticCategory) => cat.groups.reduce((acc, g) => acc + g.tokens.length, 0);

/**
 * Variables CSS de todos los tokens, para las demos de Buenas y malas prácticas:
 * --c-<categoría>-<nombre> para los semánticos y --p-<path> para los primitivos
 * (background/brand-primary → --c-background-brand-primary; brand/amber/500 → --p-brand-amber-500).
 */
export const COLOR_VARS_CSS = (() => {
  const rules: string[] = [];
  for (const [path, info] of Object.entries(TOKENS)) {
    if (info.category !== 'primitive') rules.push(`--c-${path.replace(/\//g, '-')}:${info.hex};`);
  }
  for (const ramp of RAMPS) {
    for (const step of ramp.steps) rules.push(`--p-${rampStepPath(ramp, step).replace(/\//g, '-')}:${step.hex};`);
  }
  return `:root{${rules.join('')}}`;
})();
