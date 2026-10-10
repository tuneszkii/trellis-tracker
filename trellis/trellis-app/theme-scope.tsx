import type { ReactNode } from 'react';
import { themeVars } from './theme.js';
import styles from './ui.module.css';

/**
 * Themes everything inside it with a project's color: accent buttons, rings,
 * borders, hover glows and a soft color wash behind the page.
 * @param props.color - project color
 * @param props.children - page content
 * @param props.narrow - use the narrow form layout
 */
export function ThemeScope({ color, children, narrow = false }: { color?: string; children: ReactNode; narrow?: boolean }) {
  return (
    <div className={`${narrow ? styles.pageNarrow : styles.page} ${styles.themed}`} style={themeVars(color)}>
      {children}
    </div>
  );
}
