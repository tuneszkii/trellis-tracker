import { Link } from 'react-router-dom';
import { imageUrl } from './api.js';
import { isCard } from './task-tree.js';
import type { Item } from './task-views.js';
import { ProgressRing } from './progress-ring.js';
import styles from './ui.module.css';

const STATUS_LABEL = { empty: 'Empty', todo: 'Not started', active: 'In progress', done: 'Done' } as const;

/**
 * A card shown as a tile: cover picture (or accent strip), status, title,
 * progress ring, and counts. Opens the card on click.
 * @param props.item - summarized card
 * @param props.to - link target
 * @param props.color - project color
 * @param props.onDelete - deletes the card
 */
export function CardTile({ item, to, color, onDelete }: { item: Item; to: string; color?: string; onDelete: () => void }) {
  const cover = imageUrl(item.task.image);
  const subCards = (item.task.subtasks || []).filter(isCard).length;
  return (
    <article className={styles.tile}>
      <Link to={to} className={styles.tileLink}>
        {cover ? <div className={styles.tileCover} style={{ backgroundImage: `url(${cover})` }} /> : <div className={styles.tileBar} />}
        <div className={styles.tileBody}>
          <div className={styles.areaTop}>
            <div className={styles.areaInfo}>
              <span className={`${styles.badge} ${styles[`badge_${item.status}`]}`}>{STATUS_LABEL[item.status]}</span>
              <h3>{item.task.title}</h3>
              {item.task.description ? <p>{item.task.description}</p> : null}
            </div>
            <ProgressRing percent={item.percent} color={color} size={56} />
          </div>
          <div className={styles.areaFoot}>
            <span>{item.done}/{item.total} tasks</span>
            <span>{subCards ? `${subCards} ${subCards === 1 ? 'card' : 'cards'} inside` : `${item.weight}% of this level`}</span>
          </div>
        </div>
      </Link>
      <button className={styles.cardDelete} aria-label={`Delete ${item.task.title}`} onClick={onDelete}>✕</button>
    </article>
  );
}
