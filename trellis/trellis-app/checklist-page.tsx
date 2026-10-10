import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProjectsContext } from './projects-context.js';
import { isCard, toggleTask } from './task-tree.js';
import { flattenLeaves, summarize } from './task-views.js';
import { ProjectBanner } from './project-banner.js';
import { ProgressBar } from './progress-bar.js';
import { CheckRow } from './check-row.js';
import { NotFound } from './card-page.js';
import { ThemeScope } from './theme-scope.js';
import styles from './ui.module.css';

type Filter = 'remaining' | 'all' | 'done';

/**
 * Checklist frame: every task in the project as one flat list, grouped by
 * top-level card, with a Remaining / All / Done filter. Nested cards appear as
 * a breadcrumb above each task instead of indentation.
 */
export function ChecklistPage() {
  const { projectId } = useParams();
  const { projects, loading, updateTasks } = useProjectsContext();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>('remaining');
  const project = projects.find((p) => p.id === projectId);

  if (loading) return <p className={styles.empty}>Loading…</p>;
  if (!project) return <NotFound />;

  const keep = (done: boolean) => (filter === 'all' ? true : filter === 'done' ? done : !done);

  const groups = summarize(project.tasks).map((it) => {
    const leaves = isCard(it.task) ? flattenLeaves(it.task.subtasks || []) : [{ task: it.task, path: [], pathIds: [] }];
    return { it, leaves: leaves.filter((l) => keep(l.task.done)) };
  });
  const shown = groups.reduce((n, g) => n + g.leaves.length, 0);

  return (
    <ThemeScope color={project.color}>
      <ProjectBanner project={project} />

      <div className={styles.segmented} role="radiogroup" aria-label="Filter tasks">
        {(['remaining', 'all', 'done'] as Filter[]).map((f) => (
          <button key={f} role="radio" aria-checked={filter === f} className={`${styles.segment} ${filter === f ? styles.segmentActive : ''}`} onClick={() => setFilter(f)}>
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {shown === 0 ? (
        <div className={styles.card}>
          <p className={styles.empty}>{filter === 'remaining' && project.tasks.length ? '🎉 Nothing left — everything is done.' : 'No tasks here yet.'}</p>
        </div>
      ) : (
        groups.filter((g) => g.leaves.length).map(({ it, leaves }) => (
          <section key={it.task.id} className={styles.card}>
            <div className={styles.groupHead}>
              {isCard(it.task) ? (
                <Link to={`/projects/${project.id}/cards/${it.task.id}`} className={styles.groupTitle}>{it.task.title} ›</Link>
              ) : (
                <h2 className={styles.groupTitle}>{it.task.title}</h2>
              )}
              <span className={styles.groupPct}>{it.done}/{it.total} · {it.percent}%</span>
            </div>
            <ProgressBar percent={it.percent} color={project.color} />
            <ul className={styles.checkList}>
              {leaves.map((l) => (
                <CheckRow
                  key={l.task.id}
                  task={l.task}
                  path={l.path}
                  color={project.color}
                  onToggle={() => updateTasks(project.id, (t) => toggleTask(t, l.task.id))}
                  onOpenPath={l.pathIds.length ? () => navigate(`/projects/${project.id}/cards/${l.pathIds[l.pathIds.length - 1]}`) : undefined}
                />
              ))}
            </ul>
          </section>
        ))
      )}
    </ThemeScope>
  );
}
