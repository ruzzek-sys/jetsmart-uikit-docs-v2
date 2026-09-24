/**
 * Contraste de color según WCAG 2.1 (luminancia relativa, criterios 1.4.3 y 1.4.11).
 *
 * Funciones puras: se usan en build para calcular los ratios de las tablas de Colors, así
 * que ningún número de contraste está escrito a mano.
 */

import type { BadgeTone } from '../components/ui/Badge.astro';

/** Mínimo para texto normal (1.4.3 · AA). */
export const MIN_TEXT = 4.5;
/** Mínimo para bordes y componentes de interfaz (1.4.11 · AA). */
export const MIN_BORDER = 3;

/** Canal sRGB (0–255) a su valor lineal. */
function channel(value: number): number {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/** Luminancia relativa de un hex #RRGGBB (se ignora el alpha si lo trae). */
export function luminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** Un hex de 8 dígitos (#RRGGBBAA) lleva transparencia y su contraste no se puede calcular solo. */
export function hasAlpha(hex: string): boolean {
  return hex.length > 7;
}

/** Ratio de contraste entre dos colores opacos, o null si falta uno o alguno es translúcido. */
export function contrast(a: string | null | undefined, b: string | null | undefined): number | null {
  if (!a || !b || hasAlpha(a) || hasAlpha(b)) return null;
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/** «12,50:1» con coma decimal, o «—» cuando no hay ratio. */
export function ratioText(value: number | null): string {
  return value === null ? '—' : `${value.toFixed(2).replace('.', ',')}:1`;
}

export interface WcagLevel {
  label: 'AAA' | 'AA' | 'AA large' | 'Falla' | '—';
  tone: BadgeTone;
}

/** Nivel WCAG que alcanza un ratio para texto. */
export function wcagLevel(value: number | null): WcagLevel {
  if (value === null) return { label: '—', tone: 'neutral' };
  if (value >= 7) return { label: 'AAA', tone: 'on' };
  if (value >= 4.5) return { label: 'AA', tone: 'on' };
  if (value >= 3) return { label: 'AA large', tone: 'var' };
  return { label: 'Falla', tone: 'off' };
}
