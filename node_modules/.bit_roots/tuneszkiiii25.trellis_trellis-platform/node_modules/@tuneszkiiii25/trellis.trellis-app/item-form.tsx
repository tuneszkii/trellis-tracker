import { useState } from 'react';
import type { Kind } from './task-tree.js';
import { ImagePicker } from './image-picker.js';
import styles from './ui.module.css';

/** Values collected by the form. */
export type ItemValues = { title: string; description: string; kind: Kind; image: string };

/**
 * Form for creating or editing a card or task: title, optional description,
 * and — for cards — a cover picture.
 * @param props.onSubmit - called with the trimmed values
 * @param props.onCancel - optional cancel handler
 * @param props.initial - prefilled values when editing
 * @param props.kind - kind of node being created (default "task")
 * @param props.allowKindChange - let the user switch between Task and Card
 * @param props.placeholder - title placeholder
 * @param props.submitLabel - submit button text
 */
export function ItemForm({
  onSubmit,
  onCancel,
  initial,
  kind = 'task',
  allowKindChange = false,
  placeholder = 'Title',
  submitLabel = 'Add',
}: {
  onSubmit: (v: ItemValues) => void;
  onCancel?: () => void;
  initial?: Partial<ItemValues>;
  kind?: Kind;
  allowKindChange?: boolean;
  placeholder?: string;
  submitLabel?: string;
}) {
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [image, setImage] = useState(initial?.image || '');
  const [type, setType] = useState<Kind>(initial?.kind || kind);
  const [showDesc, setShowDesc] = useState(Boolean(initial?.description));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), description: description.trim(), kind: type, image });
    if (!initial) {
      setTitle('');
      setDescription('');
      setImage('');
    }
  };

  return (
    <form className={styles.taskForm} onSubmit={submit}>
      {allowKindChange ? (
        <div className={styles.segmented} role="radiogroup" aria-label="Type">
          {(['task', 'card'] as Kind[]).map((k) => (
            <button key={k} type="button" role="radio" aria-checked={type === k} className={`${styles.segment} ${type === k ? styles.segmentActive : ''}`} onClick={() => setType(k)}>
              {k === 'task' ? 'Task' : 'Card'}
            </button>
          ))}
        </div>
      ) : null}
      <input
        autoFocus
        className={styles.input}
        value={title}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === 'Escape' && onCancel?.()}
      />
      {showDesc ? (
        <textarea className={styles.textarea} value={description} placeholder="Description (optional)" aria-label="Description" rows={2} onChange={(e) => setDescription(e.target.value)} />
      ) : null}
      {type === 'card' ? <ImagePicker label="Picture (optional)" wide maxSize={960} value={image} onChange={setImage} /> : null}
      <div className={styles.formActions}>
        {!showDesc ? (
          <button type="button" className={styles.linkBtn} onClick={() => setShowDesc(true)}>+ Description</button>
        ) : <span />}
        <div className={styles.formButtons}>
          {onCancel ? <button type="button" className={styles.ghostBtn} onClick={onCancel}>Cancel</button> : null}
          <button type="submit" className={styles.primaryBtn} disabled={!title.trim()}>{submitLabel}</button>
        </div>
      </div>
    </form>
  );
}
