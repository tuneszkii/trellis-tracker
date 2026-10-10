import styles from './ui.module.css';

/**
 * Circular progress indicator with the percentage in the middle.
 * @param props.percent - 0..100
 * @param props.color - stroke color
 * @param props.size - diameter in px
 */
export function ProgressRing({ percent, color = 'var(--accent)', size = 72 }: { percent: number; color?: string; size?: number }) {
  const stroke = Math.max(4, Math.round(size / 11));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const fill = percent === 100 ? 'var(--success)' : color;
  return (
    <div className={styles.ring} style={{ width: size, height: size }} role="img" aria-label={`${percent}% complete`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--panel-2)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={fill}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (percent / 100) * c}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className={styles.ringArc}
        />
      </svg>
      <span className={styles.ringLabel} style={{ fontSize: size / 4.2 }}>{percent}%</span>
    </div>
  );
}
