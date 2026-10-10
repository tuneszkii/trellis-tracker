import type { CSSProperties } from 'react';

/** Ready-made colors offered as one-click templates. */
export const TEMPLATE_COLORS = [
  '#7c5cff', '#ff5c7a', '#2bb3ff', '#ffb020', '#22c55e',
  '#e05cff', '#14b8a6', '#f97316', '#ef4444', '#a3e635',
];

/** Color used when a project has none. */
export const DEFAULT_COLOR = TEMPLATE_COLORS[0];

/**
 * Picks a readable text color (dark or white) for text placed on `hex`.
 * @param hex - background color like "#7c5cff"
 */
export function onColor(hex: string): string {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
  if (!m) return '#fff';
  const n = parseInt(m[1], 16);
  const lin = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  const lum = 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
  return lum > 0.4 ? '#10131a' : '#fff';
}

/**
 * CSS variables that theme everything beneath an element with a project's color.
 * @param color - project color
 */
export function themeVars(color?: string): CSSProperties {
  const c = color || DEFAULT_COLOR;
  return { ['--accent' as string]: c, ['--on-accent' as string]: onColor(c) } as CSSProperties;
}
