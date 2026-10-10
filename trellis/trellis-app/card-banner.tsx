import { Link } from 'react-router-dom';
import { imageUrl } from './api.js';
import { type Project, type Task, taskProgress } from './task-tree.js';
import { ProgressBar } from './progress-bar.js';
import { ProgressRing } from './progress-ring.js';
import styles from './ui.module.css';

/**
 * Themed header for a card page: breadcrumb trail through every parent card,
 * the card's cover picture, title, description and progress.
 * @param props.project - owning project
 * @param props.chain - parent cards followed by this card
 * @param props.onEdit - opens the edit form
 */
export function CardBanner({ project, chain, onEdit }: { project: Project; chain: Task[]; onEdit: () => void }) {
  const card = chain[chain.length - 1];
  const p = taskProgress(card);
  const cover = imageUrl(card.image);
  return (
    <header className={styles.banner}>
      {cover ? <div className={styles.bannerCover} style={{ backgroundImage: `url(${cover})` }} /> : null}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link to="/">Dashboard</Link> <span>›</span>
        <Link to={`/projects/${project.id}`}>{project.name}</Link>
        {chain.map((c, i) => (
          <span key={c.id} className={styles.crumbItem}>
            <span>›</span>{' '}
            {i < chain.length - 1 ? <Link to={`/projects/${project.id}/cards/${c.id}`}>{c.title}</Link> : <span>{c.title}</span>}
          </span>
        ))}
      </nav>
      <div className={styles.bannerRow}>
        <div className={styles.bannerText}>
          <h1 className={styles.pageTitle}>{card.title}</h1>
          {card.description ? <p className={styles.muted}>{card.description}</p> : null}
          <p className={styles.muted}><strong className={styles.strong}>{p.done}</strong> of {p.total} tasks done</p>
        </div>
        <ProgressRing percent={p.percent} color={project.color} size={84} />
      </div>
      <ProgressBar percent={p.percent} color={project.color} size="lg" />
      <div className={styles.bannerActions}>
        <button className={styles.ghostBtn} onClick={onEdit}>Edit card</button>
      </div>
    </header>
  );
}
