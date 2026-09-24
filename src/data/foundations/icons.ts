/**
 * Foundations · Icons.
 *
 * Fuente: página Icons del archivo «Jetsmart UI Kit v1.0» (node 5467:14480): librería
 * Font Awesome 7 y Round World Flags. Los glifos de muestra se pintan con Font Awesome 6.5.2
 * (cdnjs) y las banderas desde flagcdn.com.
 *
 * Los textos admiten HTML (se pintan con set:html).
 */

/** Prefijo de estilo de Font Awesome: solid o brands. */
export type FaStyle = 'fas' | 'fab';

/** Clases de un glifo de Font Awesome 6 («fas fa-house»). */
export const faClass = (style: FaStyle, glyph: string) => `${style} fa-${glyph}`;

/** Accesos a las dos librerías dentro del archivo de Figma. */
export const LIBRARIES: { label: string; icon: string; nodeId: string }[] = [
  { label: 'Ir a Font Awesome en el kit', icon: 'book', nodeId: '5564:123884' },
  { label: 'Ir a Round World Flags en el kit', icon: 'flag', nodeId: '5860:132216' },
];

export interface CorePack {
  name: string;
  style: FaStyle;
  /** Glifo de muestra (nombre de Font Awesome 6, sin prefijo fa-). */
  glyph: string;
  description: string;
}

export const CORE_PACKS: CorePack[] = [
  { name: 'Brands', style: 'fab', glyph: 'font-awesome', description: 'Logotipos de marcas y redes.' },
  { name: '7 Free', style: 'fas', glyph: 'house', description: 'Set gratuito de Font Awesome 7.' },
  { name: '7 Pro', style: 'fas', glyph: 'house', description: 'Set Pro de Font Awesome 7 (requiere licencia).' },
];

export const PRO_PLUS: string[] = [
  'Chisel',
  'Etch',
  'Graphite',
  'Jelly',
  'Mosaic',
  'Notdog',
  'Pixel',
  'Slab',
  'Thumbprint',
  'Utility',
  'Vellum',
  'Whiteboard',
];

export const STEPS: { n: string; title: string; text: string }[] = [
  {
    n: '01',
    title: 'Instalar las fuentes OTF',
    text: 'Descarga los archivos de escritorio de los paquetes Font Awesome 7 elegidos e instala los OTF en el sistema. Sin eso, el componente no renderiza el glifo en Figma.',
  },
  {
    n: '02',
    title: 'Elegir el paquete',
    text: 'Selecciona el paquete preferido: Core (Brands, 7 Free, 7 Pro) o uno de los packs Pro+.',
  },
  {
    n: '03',
    title: 'Ajustar propiedades',
    text: 'Con el componente Font Awesome Icon seleccionado, cambia familia, estilo, relleno y escala desde la barra lateral derecha.',
  },
  {
    n: '04',
    title: 'Escribir el icon-name',
    text: 'Escribe el nombre del ícono en el campo de texto icon-name. Los nombres se consultan en el catálogo de Font Awesome.',
  },
];

export const PROPERTIES: { name: string; controls: string }[] = [
  { name: 'Padding', controls: 'Square u otras opciones de caja del componente.' },
  { name: 'Scale', controls: '1x por defecto; también .75x y 1.25x.' },
  { name: 'Icon Pack', controls: 'Paquete activo, por ejemplo v7-icon (pro).' },
  { name: 'Family', controls: 'Classic, Classic Duotone u otras familias del pack.' },
  { name: 'Style', controls: 'Solid, Regular, Light, Thin, según el pack.' },
  { name: 'icon-name', controls: 'Nombre del glifo. En Duotone: icon-name# y icon-name##.' },
];

/** Bloques bajo la tabla de propiedades: modos de capa y dónde consultar. */
export const PROPERTY_NOTES: { tag: string; title: string; text: string }[] = [
  {
    tag: 'Mono',
    title: 'Una capa',
    text: 'Un único campo <code>icon-name</code>. Caso por defecto para botones, inputs y navegación.',
  },
  {
    tag: 'Duotone',
    title: 'Dos capas',
    text: 'Escribir el nombre en <code>icon-name#</code> (capa principal) y en <code>icon-name##</code> (capa secundaria).',
  },
  {
    tag: 'Catálogo',
    title: 'Nombres oficiales',
    text: 'Los nombres se toman del <a href="https://fontawesome.com/search" target="_blank" rel="noopener noreferrer">buscador de Font Awesome</a>, no de un alias interno del kit.',
  },
  {
    tag: 'Docs',
    title: 'Instalación de fuentes',
    text: 'Detalle de instalación OTF en el <a href="https://docs.fontawesome.com/" target="_blank" rel="noopener noreferrer">centro de documentación de Font Awesome</a>.',
  },
];

export const FA_RULES: { ok: boolean; text: string }[] = [
  { ok: true, text: 'Instanciar el componente Font Awesome Icon desde la librería enlazada.' },
  { ok: true, text: 'Escribir el icon-name exacto del catálogo oficial.' },
  { ok: false, text: 'No pegar un SVG suelto ni redibujar el glifo a mano dentro del archivo.' },
  { ok: false, text: 'No mezclar packs Pro+ distintos dentro del mismo flujo sin criterio de producto.' },
];

export interface SampleIcon {
  /** icon-name que se escribe en Figma y que se copia al hacer click. */
  name: string;
  style: FaStyle;
  /** Glifo equivalente en Font Awesome 6 (a veces cambió de nombre: search → magnifying-glass). */
  glyph: string;
}

export const SAMPLE_ICONS: SampleIcon[] = [
  { name: 'plane', style: 'fas', glyph: 'plane' },
  { name: 'suitcase', style: 'fas', glyph: 'suitcase' },
  { name: 'ticket', style: 'fas', glyph: 'ticket' },
  { name: 'user', style: 'fas', glyph: 'user' },
  { name: 'calendar', style: 'fas', glyph: 'calendar' },
  { name: 'map-marker-alt', style: 'fas', glyph: 'location-dot' },
  { name: 'check', style: 'fas', glyph: 'check' },
  { name: 'xmark', style: 'fas', glyph: 'xmark' },
  { name: 'chevron-down', style: 'fas', glyph: 'chevron-down' },
  { name: 'search', style: 'fas', glyph: 'magnifying-glass' },
  { name: 'bell', style: 'fas', glyph: 'bell' },
  { name: 'heart', style: 'fas', glyph: 'heart' },
];

export interface FlagSample {
  /** Nombre de la variante en Round World Flags. */
  name: string;
  /** Código ISO 3166-1 alfa-2, para la imagen de flagcdn. */
  iso: string;
  /** Nombre del país en español (alt y title). */
  label: string;
}

/** Muestra representativa; el set completo vive en la librería de Figma (~260). */
export const FLAG_SAMPLES: FlagSample[] = [
  { name: 'chile', iso: 'cl', label: 'Chile' },
  { name: 'argentina', iso: 'ar', label: 'Argentina' },
  { name: 'peru', iso: 'pe', label: 'Perú' },
  { name: 'colombia', iso: 'co', label: 'Colombia' },
  { name: 'brazil', iso: 'br', label: 'Brasil' },
  { name: 'uruguay', iso: 'uy', label: 'Uruguay' },
  { name: 'paraguay', iso: 'py', label: 'Paraguay' },
  { name: 'bolivia', iso: 'bo', label: 'Bolivia' },
  { name: 'ecuador', iso: 'ec', label: 'Ecuador' },
  { name: 'mexico', iso: 'mx', label: 'México' },
  { name: 'spain', iso: 'es', label: 'España' },
  { name: 'united states', iso: 'us', label: 'Estados Unidos' },
  { name: 'united kingdom', iso: 'gb', label: 'Reino Unido' },
  { name: 'france', iso: 'fr', label: 'Francia' },
  { name: 'germany', iso: 'de', label: 'Alemania' },
  { name: 'italy', iso: 'it', label: 'Italia' },
  { name: 'canada', iso: 'ca', label: 'Canadá' },
  { name: 'australia', iso: 'au', label: 'Australia' },
  { name: 'japan', iso: 'jp', label: 'Japón' },
  { name: 'china', iso: 'cn', label: 'China' },
  { name: 'south korea', iso: 'kr', label: 'Corea del Sur' },
  { name: 'india', iso: 'in', label: 'India' },
  { name: 'south africa', iso: 'za', label: 'Sudáfrica' },
  { name: 'new zealand', iso: 'nz', label: 'Nueva Zelanda' },
];

/** Imagen circular de una bandera (flagcdn, 80 px de ancho). */
export const flagSrc = (iso: string) => `https://flagcdn.com/w80/${iso}.png`;

export const FLAG_RULES: { ok: boolean; text: string }[] = [
  { ok: true, text: 'Usar Round World Flags cuando el dato es un país o territorio.' },
  { ok: true, text: 'Mantener el formato circular del componente; no recortar a rectángulo.' },
  { ok: false, text: 'No sustituir una bandera por un emoji de texto ni por una imagen raster suelta.' },
  { ok: false, text: 'No usar Font Awesome Brands como reemplazo de una bandera de país.' },
];
