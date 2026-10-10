import { useRef, useState } from 'react';
import { imageUrl, uploadImage } from './api.js';
import styles from './ui.module.css';

/**
 * Picture field: shows a preview with Upload / Change / Remove buttons.
 * Images are resized in the browser before upload.
 * @param props.value - id of the current image ('' for none)
 * @param props.onChange - called with the new image id, or '' when removed
 * @param props.label - field label
 * @param props.wide - use a wide (cover) preview instead of a square one
 * @param props.maxSize - longest side in px after resizing
 */
export function ImagePicker({
  value,
  onChange,
  label,
  wide = false,
  maxSize = 512,
}: {
  value?: string;
  onChange: (id: string) => void;
  label: string;
  wide?: boolean;
  maxSize?: number;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const src = imageUrl(value);

  const pick = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      onChange(await uploadImage(file, maxSize));
    } catch (e: any) {
      setError(e.message || 'Upload failed');
    } finally {
      setBusy(false);
      if (input.current) input.current.value = '';
    }
  };

  return (
    <div className={styles.imgField}>
      <span className={styles.fieldLabel}>{label}</span>
      <div className={styles.imgPicker}>
        <div
          className={`${styles.imgPreview} ${wide ? styles.imgPreviewWide : ''}`}
          style={src ? { backgroundImage: `url(${src})` } : undefined}
          aria-hidden
        >
          {src ? null : '🖼'}
        </div>
        <div className={styles.imgActions}>
          <button type="button" className={styles.ghostBtn} onClick={() => input.current?.click()} disabled={busy}>
            {busy ? 'Uploading…' : src ? 'Change' : 'Upload'}
          </button>
          {src ? (
            <button type="button" className={styles.ghostBtn} onClick={() => onChange('')} disabled={busy}>
              Remove
            </button>
          ) : null}
        </div>
        <input
          ref={input}
          type="file"
          accept="image/*"
          tabIndex={-1}
          aria-label={label}
          className={styles.hiddenFile}
          onChange={(e) => pick(e.target.files?.[0])}
        />
      </div>
      {error ? <span className={styles.fieldError} role="alert">{error}</span> : null}
    </div>
  );
}
