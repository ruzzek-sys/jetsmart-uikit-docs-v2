/**
 * Foundations · Typography.
 *
 * Valores del archivo «Jetsmart UI Kit v1.0» (página Fonts): primitivas de Tier 1 (font-size,
 * font-weight, line-height, letter-spacing), las 8 escalas semánticas de Tier 2 y los estilos de
 * texto publicados. Las clases .ts-* se generan desde estos mismos datos (textStyleCss), así que
 * los especímenes y los ejemplos de buenas prácticas usan exactamente las propiedades del estilo.
 *
 * Los textos admiten HTML (se pintan con set:html).
 */

/** Familia tipográfica, resuelta a las fuentes del sitio. */
export type FamilyKey = 'primary' | 'secondary';

export const FAMILY_NAME: Record<FamilyKey, string> = { primary: 'Lato', secondary: 'Encode Sans' };
export const FAMILY_CSS: Record<FamilyKey, string> = { primary: 'var(--font-sans)', secondary: 'var(--font-display)' };

/** Número con separador de miles a la chilena (1.487), sin depender del ICU del entorno. */
export const formatCount = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

/** Número decimal con coma y signo explícito cuando es positivo: +0,8 · -0,4 · 0. */
export const signed = (n: number) => `${n > 0 ? '+' : ''}${String(n).replace('.', ',')}`;

// Familias ------------------------------------------------------------------

export interface Family {
  key: FamilyKey;
  badge: string;
  tone: 'brand' | 'neutral';
  token: string;
  description: string;
}

export const FAMILIES: Family[] = [
  {
    key: 'primary',
    badge: 'Primary',
    tone: 'brand',
    token: 'typography/font-family/primary',
    description: 'Familia base del producto. Cubre body, labels, captions y la mayoría de la interfaz.',
  },
  {
    key: 'secondary',
    badge: 'Secondary',
    tone: 'neutral',
    token: 'typography/font-family/secondary',
    description: 'Familia de énfasis para displays, headings y piezas de marketing con más presencia.',
  },
];

// Primitivas · Tier 1 -------------------------------------------------------

export const FONT_SIZES: { token: string; px: number; rem: string; ratio: string }[] = [
  { token: '2xs', px: 10, rem: '0.625rem', ratio: '—' },
  { token: 'xs', px: 12, rem: '0.75rem', ratio: '×1.20' },
  { token: 'sm', px: 14, rem: '0.875rem', ratio: '×1.17' },
  { token: 'base', px: 16, rem: '1rem', ratio: '×1.14' },
  { token: 'lg', px: 18, rem: '1.125rem', ratio: '×1.13' },
  { token: 'xl', px: 20, rem: '1.25rem', ratio: '×1.11' },
  { token: '2xl', px: 24, rem: '1.5rem', ratio: '×1.20' },
  { token: '3xl', px: 30, rem: '1.875rem', ratio: '×1.25' },
  { token: '4xl', px: 36, rem: '2.25rem', ratio: '×1.20' },
  { token: '5xl', px: 42, rem: '2.625rem', ratio: '×1.17' },
  { token: '6xl', px: 48, rem: '3rem', ratio: '×1.14' },
  { token: '7xl', px: 60, rem: '3.75rem', ratio: '×1.25' },
  { token: '8xl', px: 72, rem: '4.5rem', ratio: '×1.20' },
  { token: '9xl', px: 96, rem: '6rem', ratio: '×1.33' },
  { token: '10xl', px: 128, rem: '8rem', ratio: '×1.33' },
];

export const FONT_WEIGHTS: { token: string; css: number; figma: string }[] = [
  { token: 'thin', css: 100, figma: 'Thin' },
  { token: 'extralight', css: 200, figma: 'ExtraLight' },
  { token: 'light', css: 300, figma: 'Light' },
  { token: 'normal', css: 400, figma: 'Regular' },
  { token: 'medium', css: 500, figma: 'Medium' },
  { token: 'semibold', css: 600, figma: 'SemiBold' },
  { token: 'bold', css: 700, figma: 'Bold' },
  { token: 'extrabold', css: 800, figma: 'ExtraBold' },
  { token: 'black', css: 900, figma: 'Black' },
];

/** `used`: si algún token semántico de Tier 2 referencia el paso. */
export const LINE_HEIGHTS: { px: number; used: boolean }[] = [
  { px: 12, used: false },
  { px: 14, used: true },
  { px: 16, used: true },
  { px: 18, used: true },
  { px: 20, used: true },
  { px: 22, used: true },
  { px: 24, used: true },
  { px: 28, used: true },
  { px: 32, used: true },
  { px: 36, used: true },
  { px: 40, used: true },
  { px: 44, used: true },
  { px: 48, used: true },
  { px: 52, used: true },
  { px: 56, used: true },
  { px: 64, used: true },
  { px: 72, used: false },
  { px: 80, used: true },
  { px: 88, used: false },
  { px: 96, used: true },
  { px: 112, used: false },
  { px: 128, used: false },
];

export const LETTER_SPACING: { token: string; px: number; em: string }[] = [
  { token: 'tighter', px: -0.8, em: '-0.05em' },
  { token: 'tight', px: -0.4, em: '-0.025em' },
  { token: 'normal', px: 0, em: '0em' },
  { token: 'wide', px: 0.4, em: '+0.025em' },
  { token: 'wider', px: 0.8, em: '+0.05em' },
  { token: 'widest', px: 1.6, em: '+0.1em' },
];

// Escalas semánticas · Tier 2 -----------------------------------------------

export type Variant = 'regular' | 'strong';

export interface Step {
  step: string;
  /** Solo en Body y Label, que tienen dos pesos. */
  variant?: Variant;
  size: number;
  lh: number;
  ratio: string;
  /** Instancias en el archivo. 0 = estilo publicado sin uso; null = solo existe la variable de Tier 2. */
  usos: number | null;
}

export interface Scale {
  key: string;
  label: string;
  family: FamilyKey;
  /** Peso único de la escala; las escalas con `variants` lo definen por variante. */
  weight?: { css: number; name: string };
  variants?: { key: Variant; label: string; weight: number }[];
  /** Tracking en px. */
  ls: number;
  upper: boolean;
  role: string;
  roleDesc: string;
  intro: string;
  sample: string;
  note?: string;
  steps: Step[];
}

const TWO_WEIGHTS: Scale['variants'] = [
  { key: 'regular', label: 'Regular', weight: 400 },
  { key: 'strong', label: 'Strong', weight: 700 },
];

/** Atajo para las filas de una escala: [paso, tamaño, interlineado, ratio, usos]. */
const steps = (variant: Variant | undefined, rows: [string, number, number, string, number | null][]): Step[] =>
  rows.map(([step, size, lh, ratio, usos]) => ({ step, variant, size, lh, ratio, usos }));

export const SCALES: Scale[] = [
  {
    key: 'display',
    label: 'Display',
    family: 'secondary',
    weight: { css: 500, name: 'Medium' },
    ls: -0.4,
    upper: false,
    role: 'Portadas',
    roleDesc:
      'Hero de campaña y mensajes a pantalla completa. Uno por vista; la bajada nunca es otro paso de Display, es Subheading.',
    intro:
      'Escala de mayor jerarquía: portadas, hero de campaña y mensajes a pantalla completa. Encode Sans Medium, tracking tight (−0,4 px), ratio constante 1,33.',
    sample: 'Vuela por Sudamérica',
    steps: steps(undefined, [
      ['xs', 24, 32, '1.33', null],
      ['sm', 30, 40, '1.33', 1],
      ['md', 36, 48, '1.33', 1],
      ['lg', 48, 64, '1.33', 10],
      ['xl', 60, 80, '1.33', 0],
      ['2xl', 72, 96, '1.33', null],
    ]),
  },
  {
    key: 'heading',
    label: 'Heading',
    family: 'secondary',
    weight: { css: 500, name: 'Medium' },
    ls: -0.4,
    upper: false,
    role: 'Títulos',
    roleDesc:
      'Títulos de página, de sección y de tarjeta. Ocho pasos, de 2xs 16/20 a 3xl 48/56: la escala más usada del kit.',
    intro:
      'La escala más usada del kit para títulos de página, de sección y de tarjeta. Encode Sans Medium, tracking tight (−0,4 px).',
    sample: 'Selecciona tu asiento',
    steps: steps(undefined, [
      ['2xs', 16, 20, '1.25', 148],
      ['xs', 18, 24, '1.33', 22],
      ['sm', 20, 28, '1.40', 157],
      ['md', 24, 32, '1.33', 217],
      ['lg', 30, 40, '1.33', 73],
      ['xl', 36, 44, '1.22', 5],
      ['2xl', 42, 52, '1.24', 3],
      ['3xl', 48, 56, '1.17', null],
    ]),
  },
  {
    key: 'subheading',
    label: 'Subheading',
    family: 'primary',
    weight: { css: 500, name: 'Medium' },
    ls: 0,
    upper: false,
    role: 'Bajadas',
    roleDesc:
      'El texto que acompaña a un Display o a un Heading. Lato Medium: baja el peso sin tener que bajar tanto el cuerpo.',
    intro: 'La bajada que acompaña a un Display o a un Heading. Lato Medium, tracking normal.',
    sample: 'Nuevas rutas desde Santiago',
    steps: steps(undefined, [
      ['xs', 14, 20, '1.43', null],
      ['sm', 16, 22, '1.38', 24],
      ['md', 18, 24, '1.33', 13],
      ['lg', 20, 28, '1.40', 10],
      ['xl', 24, 32, '1.33', null],
      ['2xl', 30, 40, '1.33', null],
    ]),
  },
  {
    key: 'body',
    label: 'Body',
    family: 'primary',
    variants: TWO_WEIGHTS,
    ls: 0,
    upper: false,
    role: 'Lectura',
    roleDesc:
      'Párrafos, descripciones y datos de lectura. Regular por defecto, Strong para el énfasis dentro del mismo paso.',
    intro:
      'El cuerpo de texto de lectura del kit: párrafos, descripciones y datos. Lato en dos pesos —regular y strong—.',
    sample: 'Reserva desde la app y elige tu asiento sin costo adicional.',
    steps: [
      ...steps('regular', [
        ['xs', 12, 16, '1.33', 53],
        ['sm', 14, 20, '1.43', 655],
        ['md', 16, 24, '1.50', 977],
        ['lg', 18, 24, '1.33', 206],
        ['xl', 20, 28, '1.40', 0],
        ['2xl', 24, 32, '1.33', 0],
        ['3xl', 30, 40, '1.33', 0],
      ]),
      ...steps('strong', [
        ['xs', 12, 16, '1.33', 9],
        ['sm', 14, 20, '1.43', 77],
        ['md', 16, 24, '1.50', 324],
        ['lg', 18, 24, '1.33', 47],
        ['xl', 20, 28, '1.40', 0],
        ['2xl', 24, 32, '1.33', 40],
        ['3xl', 30, 40, '1.33', 0],
      ]),
    ],
  },
  {
    key: 'label',
    label: 'Label',
    family: 'primary',
    variants: TWO_WEIGHTS,
    ls: 0,
    upper: false,
    role: 'Rótulos',
    roleDesc:
      'Botones, campos, chips, tabs y contadores. Interlineado comprimido a propósito: una línea, no un párrafo.',
    intro:
      'Los rótulos del kit: campos, chips, tags de estado, contadores y navegación. Lato en dos pesos —regular y strong—.',
    sample: 'Continuar',
    note:
      'Label publica además la variante Strong-Underline en sus seis pasos (10 a 20 px) para enlaces dentro de texto: mismos valores que Strong más text-decoration underline.',
    steps: [
      ...steps('regular', [
        ['2xs', 10, 14, '1.40', 0],
        ['xs', 12, 14, '1.17', 0],
        ['sm', 14, 16, '1.14', 1487],
        ['md', 16, 24, '1.50', 10],
        ['lg', 18, 24, '1.33', 349],
        ['xl', 20, 28, '1.40', 32],
      ]),
      ...steps('strong', [
        ['2xs', 10, 14, '1.40', 12],
        ['xs', 12, 14, '1.17', 15],
        ['sm', 14, 16, '1.14', 467],
        ['md', 16, 24, '1.50', 1093],
        ['lg', 18, 24, '1.33', 360],
        ['xl', 20, 28, '1.40', 0],
      ]),
    ],
  },
  {
    key: 'caption',
    label: 'Caption',
    family: 'primary',
    weight: { css: 400, name: 'Regular' },
    ls: 0,
    upper: false,
    role: 'Letra pequeña',
    roleDesc: 'Legales, notas al pie y etiquetas de eje. Contenido accesorio; nunca el que el usuario vino a leer.',
    intro: 'Leyendas, texto legal, notas al pie y etiquetas de eje. Lato Regular, un solo peso.',
    sample: 'Sujeto a disponibilidad en la aeronave asignada.',
    steps: steps(undefined, [
      ['xs', 10, 14, '1.40', 26],
      ['sm', 12, 16, '1.33', 116],
      ['md', 14, 20, '1.43', 545],
      ['lg', 16, 20, '1.25', 203],
      ['xl', 18, 24, '1.33', null],
      ['2xl', 20, 28, '1.40', null],
    ]),
  },
  {
    key: 'pretitle',
    label: 'Pretitle',
    family: 'primary',
    weight: { css: 600, name: 'SemiBold' },
    ls: 0.8,
    upper: true,
    role: 'Caja alta',
    roleDesc:
      'Antetítulos cortos sobre un título o un dato. Trae textCase UPPER y tracking +0,8 desde el estilo publicado.',
    intro:
      'Etiquetas cortas que anteceden a un dato o valor. Lato SemiBold, letter-spacing wider (+0,8 px) y textCase UPPER aplicado desde el estilo.',
    sample: 'Oferta por tiempo limitado',
    steps: steps(undefined, [
      ['xs', 10, 14, '1.40', null],
      ['sm', 12, 16, '1.33', null],
      ['md', 14, 20, '1.43', 30],
      ['lg', 16, 24, '1.50', 0],
      ['xl', 18, 24, '1.33', null],
      ['2xl', 20, 28, '1.40', null],
    ]),
  },
  {
    key: 'featured',
    label: 'Featured',
    family: 'primary',
    weight: { css: 700, name: 'Bold' },
    ls: 0,
    upper: false,
    role: 'Cifras',
    roleDesc: 'Precios, horarios y códigos dentro de una tarjeta u opción seleccionable. Lato Bold, un solo peso.',
    intro:
      'Énfasis numérico: precios, horarios y códigos dentro de una tarjeta u opción seleccionable. Lato Bold, un solo peso.',
    sample: 'CLP 39.990',
    steps: steps(undefined, [
      ['2xs', 14, 18, '1.29', 18],
      ['xs', 16, 20, '1.25', 135],
      ['sm', 18, 22, '1.22', 89],
      ['md', 20, 24, '1.20', 81],
      ['lg', 24, 32, '1.33', 79],
      ['xl', 30, 36, '1.20', 0],
      ['2xl', 36, 44, '1.22', null],
    ]),
  },
];

/** Clase CSS del paso: ts-body-regular-md. */
export const stepClass = (scale: Scale, step: Step) =>
  `ts-${scale.key}${step.variant ? `-${step.variant}` : ''}-${step.step}`;

/** Token de Tier 2 del paso: typography/body/regular/md. */
export const stepToken = (scale: Scale, step: Step) =>
  `typography/${scale.key}${step.variant ? `/${step.variant}` : ''}/${step.step}`;

export const stepWeight = (scale: Scale, step: Step) =>
  step.variant ? (scale.variants?.find((v) => v.key === step.variant)?.weight ?? 400) : (scale.weight?.css ?? 400);

/** Línea de cabecera del panel de una escala: «Lato Regular / Strong · tracking 0 px». */
export const scaleMeta = (scale: Scale) =>
  `${FAMILY_NAME[scale.family]} ${scale.variants ? scale.variants.map((v) => v.label).join(' / ') : scale.weight?.name} · tracking ${signed(scale.ls)} px${scale.upper ? ' · textCase UPPER' : ''}`;

/**
 * Hoja con las clases .ts-* de todos los pasos. Se emite en build dentro de la página.
 * Bajo 640 px los pasos de 40 px o más se acotan a 11vw (con el interlineado en la misma
 * proporción) para que los especímenes grandes no desborden la pantalla.
 */
export function textStyleCss(): string {
  const rules: string[] = [];
  const mobile: string[] = [];
  for (const scale of SCALES) {
    for (const step of scale.steps) {
      const cls = stepClass(scale, step);
      rules.push(
        `.${cls}{font-family:${FAMILY_CSS[scale.family]};font-weight:${stepWeight(scale, step)};font-size:${step.size}px;line-height:${step.lh}px;letter-spacing:${scale.ls}px;text-transform:${scale.upper ? 'uppercase' : 'none'};}`,
      );
      if (step.size >= 40) {
        const lhVw = +((11 * step.lh) / step.size).toFixed(2);
        mobile.push(`.${cls}{font-size:min(${step.size}px,11vw);line-height:min(${step.lh}px,${lhVw}vw);}`);
      }
    }
  }
  return `${rules.join('\n')}\n@media (max-width:639px){\n${mobile.join('\n')}\n}`;
}

export const ROLES = SCALES.map((s) => ({ label: s.label, role: s.role, desc: s.roleDesc }));

// Cómo usar en Figma ---------------------------------------------------------

export const STYLE_INVENTORY: { family: string; count: number; role: string }[] = [
  { family: 'Display', count: 4, role: 'Portadas y titulares a ancho completo' },
  { family: 'Heading', count: 7, role: 'Jerarquía de títulos de sección' },
  { family: 'Subheading', count: 3, role: 'Bajadas y subtítulos bajo un título' },
  { family: 'Body', count: 14, role: 'Párrafos, descripciones y datos de lectura' },
  { family: 'Label', count: 12, role: 'Etiquetas de UI: botones, campos, tabs' },
  { family: 'Caption', count: 4, role: 'Notas, textos de ayuda y legales' },
  { family: 'Pretitle', count: 2, role: 'Antetítulo corto sobre un título' },
  { family: 'Featured', count: 7, role: 'Cifras y datos destacados' },
];

export const ANATOMY: { prop: string; variable: string; value: string }[] = [
  { prop: 'Font family', variable: 'typography/body/regular/xl/font-family', value: 'Lato' },
  { prop: 'Font weight', variable: 'typography/body/regular/xl/font-weight', value: '400' },
  { prop: 'Font size', variable: 'typography/body/regular/xl/font-size', value: '20 px' },
  { prop: 'Line height', variable: 'typography/body/regular/xl/line-height', value: '28 px' },
  { prop: 'Letter spacing', variable: 'typography/body/regular/xl/letter-spacing', value: '0' },
];

export const NAME_PARTS: { part: string; example: string; means: string }[] = [
  { part: 'Family', example: 'Body', means: 'El rol del texto en la interfaz' },
  { part: 'Weight', example: 'Regular', means: 'Sólo en Body y Label, que tienen Regular y Strong' },
  { part: 'Step', example: 'xl', means: 'El tamaño dentro de la escala de esa familia' },
];

export const APPLY: { ok: boolean; text: string }[] = [
  { ok: true, text: 'Se aplica el estilo completo. Si un texto necesita más énfasis, se cambia al estilo Strong de la misma escala (Body/Regular/md → Body/Strong/md).' },
  { ok: true, text: 'El interlineado siempre llega en píxeles desde la variable. No se usa AUTO ni porcentaje.' },
  { ok: false, text: 'No se desprende el estilo ni se sobrescribe tamaño, peso o interlineado en el nodo: ese texto queda fuera del sistema y deja de heredar cambios.' },
  { ok: false, text: 'No se crean estilos con valores escritos a mano. Primero se crea la variable en Tier 2 y después el estilo que la enlaza.' },
];

export const UPDATES: { goal: string; variable: string; target: string }[] = [
  { goal: 'Un paso más grande', variable: 'typography/body/regular/xl/font-size', target: 'font-size/2xl → 24' },
  { goal: 'Otro interlineado', variable: 'typography/body/regular/xl/line-height', target: 'line-height/lh-32 → 32' },
  { goal: 'Otra familia tipográfica', variable: 'typography/body/regular/xl/font-family', target: 'font-family/secondary → Encode Sans' },
  { goal: 'Más peso', variable: 'typography/body/regular/xl/font-weight', target: 'font-weight/semibold → 600' },
  { goal: 'Tracking más ajustado', variable: 'typography/body/regular/xl/letter-spacing', target: 'letter-spacing/tight → −0,4' },
];

// Ratio y errores -------------------------------------------------------------

export const RATIO_INFO: { tag: string; title: string; text: string }[] = [
  { tag: 'Fórmula', title: 'Qué es', text: 'Line-height dividido por el tamaño de fuente. Un texto de 16 px con LH 24 px da un ratio de 24 ÷ 16 = 1,50.' },
  { tag: 'Legibilidad', title: 'Para qué sirve', text: 'Regula el espacio entre líneas de un mismo párrafo: muy bajo, las líneas se pisan; muy alto, se desconectan entre sí.' },
  { tag: 'Por familia', title: 'Patrón del kit', text: 'Baja a 1,17–1,25 en los pasos grandes de Display y Heading, donde el tamaño ya aporta aire, y sube a 1,40–1,50 en Body, Label y Caption, donde el texto es pequeño y necesita más espacio.' },
  { tag: 'Piso en md', title: 'En este kit', text: 'body/regular/md y body/strong/md (16/24) llegan justo a ratio 1,50. Úsalos como piso para lectura extendida; los pasos con ratio menor a 1,33 son sólo para títulos y textos cortos.' },
];

export const BREAKERS: { title: string; badge: string; text: string }[] = [
  { title: 'Override en el nodo', badge: 'Desprende', text: 'Escribir tamaño, peso o interlineado sobre un texto que ya tiene estilo. Sigue viéndose bien y deja de heredar Tier 2.' },
  { title: 'Estilo con valores a mano', badge: 'Sin variable', text: 'Crear un estilo escribiendo números en Edit text style. Primero se crea la variable en Tier 2, después el estilo que la enlaza.' },
  { title: 'Editar una primitiva', badge: 'Mueve todo', text: 'Cambiar font-size/xl en Tier 1 no ajusta un estilo: mueve ese paso en todas las familias que lo usan, incluidas las que nadie quería tocar.' },
  { title: 'Interlineado AUTO o %', badge: 'No tokeniza', text: 'El valor queda a criterio de la métrica de la fuente y no responde a la escala. Siempre en píxeles desde la variable.' },
  { title: 'Copiar formato entre textos', badge: 'No traza', text: 'Pegar propiedades de un texto a otro no aplica el estilo. El resultado se ve idéntico y no existe para el sistema.' },
];
