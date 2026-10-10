import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProjectsContext } from './projects-context.js';
import { addTask, editTask, isCard, removeTask, toggleTask } from './task-tree.js';
import { summarize, trail } from './task-views.js';
import { ProjectBanner } from './project-banner.js';
import { CardBanner } from './card-banner.js';
import { CardTile } from './card-tile.js';
import { CheckRow } from './check-row.js';
import { ItemForm } from './item-form.js';
import { ThemeScope } from './theme-scope.js';
import styles from './ui.module.css';

/**
 * The page for a project's top level AND for any card at any depth — the same
 * layout repeats all the way down. Shows the cards inside (as tiles) and the
 * tasks inside (as a checklist), with buttons to add more of either.
 */
export function CardPage() {
  const { projectId, cardId } = useParams();
  const { projects, loading, updateTasks } = useProjectsContext();
  const navigate = useNavigate();
  const [adding, setAdding] = useState<null | 'card' | 'task'>(null);
  const [editing, setEditing] = useState(false);
  const project = projects.find((p) => p.id === projectId);
  const chain = project && cardId ? trail(project.tasks, cardId) : null;

  if (loading) return <p className={styles.empty}>Loading…</p>;
  if (!project || (cardId && !chain)) return <NotFound />;

  const card = chain ? chain[chain.length - 1] : undefined;
  const list = card ? card.subtasks || [] : project.tasks;
  const items = summarize(list);
  const cards = items.filter((i) => isCard(i.task));
  const tasks = list.filter((t) => !isCard(t));
  const doneTasks = tasks.filter((t) => t.done).length;
  const parentId = card ? card.id : null;
  const update = (fn: Parameters<typeof updateTasks>[1]) => updateTasks(project.id, fn);
  const cardLink = (id: string) => `/projects/${project.id}/cards/${id}`;

  return (
    <ThemeScope color={project.color}>
      {card && chain ? <CardBanner project={project} chain={chain} onEdit={() => setEditing(true)} /> : <ProjectBanner project={project} />}

      {editing && card ? (
        <section className={styles.card}>
          <h2 className={styles.sectionTitle}>Edit card</h2>
          <ItemForm
            initial={{ title: card.title, description: card.description, image: card.image, kind: 'card' }}
            submitLabel="Save"
            onCancel={() => setEditing(false)}
            onSubmit={(v) => { update((t) => editTask(t, card.id, { title: v.title, description: v.description, image: v.image })); setEditing(false); }}
          />
        </section>
      ) : null}

      {cards.length > 1 && cards.some((c) => c.total > 0) ? (
        <section className={styles.card}>
          <h2 className={styles.sectionTitle}>Where the progress comes from</h2>
          <div className={styles.stack} aria-hidden>
            {cards.map((c, i) => (
              <div key={c.task.id} className={styles.stackSeg} style={{ flexGrow: c.total, opacity: 0.4 + (0.6 * (cards.length - i)) / cards.length }}>
                <div className={styles.stackFill} style={{ width: `${c.percent}%`, background: project.color }} />
              </div>
            ))}
          </div>
          <ul className={styles.legend}>
            {cards.map((c) => <li key={c.task.id}><strong>{c.task.title}</strong> · {c.weight}% of this level</li>)}
          </ul>
        </section>
      ) : null}

      <div className={styles.actionBar}>
        <button className={styles.primaryBtn} onClick={() => setAdding(adding === 'card' ? null : 'card')}>+ Add card</button>
        <button className={styles.ghostBtn} onClick={() => setAdding(adding === 'task' ? null : 'task')}>+ Add task</button>
      </div>

      {adding ? (
        <section className={styles.card}>
          <h2 className={styles.sectionTitle}>{adding === 'card' ? 'New card' : 'New task'}</h2>
          <ItemForm
            key={adding}
            kind={adding}
            placeholder={adding === 'card' ? (card ? `New card inside ${card.title}` : 'e.g. Armory') : 'e.g. Recoil controller'}
            submitLabel={adding === 'card' ? 'Add card' : 'Add task'}
            onCancel={() => setAdding(null)}
            onSubmit={(v) => {
              update((t) => addTask(t, parentId, { title: v.title, description: v.description, image: v.image, kind: adding }));
              if (adding === 'card') setAdding(null);
            }}
          />
        </section>
      ) : null}

      {cards.length ? (
        <section>
          <h2 className={styles.sectionTitle}>Cards</h2>
          <div className={styles.areaGrid}>
            {cards.map((c) => (
              <CardTile
                key={c.task.id}
                item={c}
                to={cardLink(c.task.id)}
                color={project.color}
                onDelete={() => window.confirm(`Delete "${c.task.title}" and everything inside it?`) && update((t) => removeTask(t, c.task.id))}
              />
            ))}
          </div>
        </section>
      ) : null}

      {tasks.length ? (
        <section className={styles.card}>
          <div className={styles.groupHead}>
            <h2 className={styles.groupTitle}>Tasks</h2>
            <span className={styles.groupPct}>{doneTasks}/{tasks.length}</span>
          </div>
          <ul className={styles.checkList}>
            {tasks.map((t) => (
              <CheckRow
                key={t.id}
                task={t}
                color={project.color}
                onToggle={() => update((x) => toggleTask(x, t.id))}
                onEdit={(v) => update((x) => editTask(x, t.id, { title: v.title, description: v.description, kind: v.kind }))}
                onRemove={() => update((x) => removeTask(x, t.id))}
              />
            ))}
          </ul>
        </section>
      ) : null}

      {!list.length && !adding ? (
        <div className={`${styles.card} ${styles.cardDashed}`}>
          <p className={styles.empty}>
            {card ? 'This card is empty.' : 'This project is empty.'} Add a <strong>card</strong> to break it into parts (cards can hold more cards, as deep as you like), or a <strong>task</strong> to check off.
          </p>
        </div>
      ) : null}

      {card && chain ? (
        <div className={styles.dangerZone}>
          <button
            className={styles.dangerLink}
            onClick={() => {
              if (!window.confirm(`Delete "${card.title}" and everything inside it?`)) return;
              update((t) => removeTask(t, card.id));
              navigate(chain.length > 1 ? cardLink(chain[chain.length - 2].id) : `/projects/${project.id}`);
            }}
          >
            Delete this card
          </button>
        </div>
      ) : null}
    </ThemeScope>
  );
}

/** Shown when a project or card id does not exist. */
export function NotFound() {
  return (
    <div className={styles.welcome}>
      <h1>Not found</h1>
      <p>This project or card doesn’t exist anymore.</p>
      <Link to="/" className={styles.primaryBtn}>Back to dashboard</Link>
    </div>
  );
}
