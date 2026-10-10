import { useRef } from 'react';
import { TEMPLATE_COLORS } from './theme.js';
import styles from './ui.module.css';

/**
 * Color chooser: one-click template swatches plus a Custom button that opens
 * the browser's color picker for any color.
 * @param props.value - current hex color
 * @param props.onChange - called with the new hex color
 */
export function ColorPicker({ value, onChange }: { value: string; onChange: (hex: string) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const current = (value || '').toLowerCase();
  const isCustom = !TEMPLATE_COLORS.includes(current);

  const openPicker = () => {
    const el = input.current;
    if (!el) return;
    try {
      el.showPicker();
    } catch {
      el.click();
    }
  };

  return (
    <div className={styles.colorPicker}>
      <div className={styles.swatches} role="radiogroup" aria-label="Template colors">
        {TEMPLATE_COLORS.map((c) => (
          <button
            type="button"
            key={c}
            role="radio"
            aria-checked={c === current}
            aria-label={`Color ${c}`}
            className={`${styles.swatch} ${c === current ? styles.swatchActive : ''}`}
            style={{ background: c }}
            onClick={() => onChange(c)}
          />
        ))}
        <button
          type="button"
          className={`${styles.customBtn} ${isCustom ? styles.customBtnActive : ''}`}
          onClick={openPicker}
          aria-label="Pick a custom color"
        >
          <span className={styles.rainbowDot} style={isCustom ? { background: value } : undefined} />
          Custom
        </button>
        <input
          ref={input}
          type="color"
          tabIndex={-1}
          aria-hidden
          className={styles.hiddenColor}
          value={/^#[0-9a-f]{6}$/i.test(value) ? value : '#7c5cff'}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <span className={styles.hexLabel}>{current}</span>
    </div>
  );
}
