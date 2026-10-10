import { useState } from 'react';
import type { Task } from './task-tree.js';
import { ItemForm, type ItemValues } from './item-form.js';
import styles from './ui.module.css';

/**
 * A single checkable task in a flat list. Ancestry is shown as a small
 * breadcrumb above the title instead of indentation, so lists stay easy to scan.
 * @param props.task - the task
 * @param props.path - breadcrumb titles
 * @param props.color - accent for the checked box
 * @param props.onToggle - toggles done
 * @param props.onEdit - saves edits (optional; enables the edit button)
 * @param props.onRemove - deletes the task (optional)
 * @param props.onOpenPath - click handler for the breadcrumb (optional)
 */
export function CheckRow({
  task,
  path = [],
  color,
  onToggle,
  onEdit,
  onRemove,
  onOpenPath,
}: {
  task: Task;
  path?: string[];
  color?: string;
  onToggle: () => void;
  onEdit?: (v: ItemValues) => void;
  onRemove?: () => void;
  onOpenPath?: () => void;
}) {
  const [editing, setEditing] = useState(false);

  if (editing && onEdit) {
    return (
      <li className={styles.checkRow}>
        <div className={styles.checkBody}>
          <ItemForm
            initial={{ title: task.title, description: task.description, kind: 'task' }}
            allowKindChange
            submitLabel="Save"
            onCancel={() => setEditing(false)}
            onSubmit={(v) => { onEdit(v); setEditing(false); }}
          />
        </div>
      </li>
    );
  }

  return (
    <li className={`${styles.checkRow} ${task.done ? styles.checkRowDone : ''}`}>
      <label className={styles.check}>
        <input type="checkbox" checked={task.done} onChange={onToggle} aria-label={task.title} />
        <span className={styles.checkBox} style={task.done ? { background: color, borderColor: color } : undefined}>
          {task.done ? '✓' : ''}
        </span>
      </label>
      <div className={styles.checkBody}>
        {path.length ? (
          <button type="button" className={styles.crumbs} onClick={onOpenPath} disabled={!onOpenPath}>
            {path.join(' › ')}
          </button>
        ) : null}
        <span className={styles.checkTitle}>{task.title}</span>
        {task.description ? <span className={styles.checkDesc}>{task.description}</span> : null}
      </div>
      {onEdit || onRemove ? (
        <div className={styles.rowTools}>
          {onEdit ? <button className={styles.iconBtn} title="Edit" aria-label={`Edit ${task.title}`} onClick={() => setEditing(true)}>✎</button> : null}
          {onRemove ? <button className={styles.iconBtn} title="Delete" aria-label={`Delete ${task.title}`} onClick={onRemove}>✕</button> : null}
        </div>
      ) : null}
    </li>
  );
}
