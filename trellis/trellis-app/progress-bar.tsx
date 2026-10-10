import styles from './ui.module.css';

/**
 * Horizontal progress bar.
 * @param props.percent - 0..100
 * @param props.color - fill color
 * @param props.size - "sm" or "lg"
 */
export function ProgressBar({ percent, color, size = 'sm' }: { percent: number; color?: string; size?: 'sm' | 'lg' }) {
  return (
    <div className={`${styles.bar} ${size === 'lg' ? styles.barLg : ''}`} role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
      <div
        className={styles.barFill}
        style={{ width: `${percent}%`, background: percent === 100 ? 'var(--success)' : color || 'var(--accent)' }}
      />
    </div>
  );
}
