import { Link, useNavigate } from 'react-router-dom';
import { useProjectsContext } from './projects-context.js';
import { measure, toggleTask } from './task-tree.js';
import { summarize, upNext } from './task-views.js';
import { themeVars } from './theme.js';
import { ProgressRing } from './progress-ring.js';
import { ProjectLogo } from './project-logo.js';
import { CheckRow } from './check-row.js';
import styles from './ui.module.css';

/**
 * Dashboard frame — the at-a-glance view across all projects:
 * headline stats, one themed card per project, and a flat "Up next" list.
 */
export function DashboardPage() {
  const { projects, loading, updateTasks } = useProjectsContext();
  const navigate = useNavigate();

  if (loading) return <p className={styles.empty}>Loading…</p>;

  if (!projects.length) {
    return (
      <div className={styles.welcome}>
        <h1>Start your first project</h1>
        <p>Split it into cards, put cards inside cards, and Trellis tracks the rest.</p>
        <Link to="/new" className={styles.primaryBtn}>+ New project</Link>
      </div>
    );
  }

  const all = measure(projects.flatMap((p) => p.tasks));
  const top = projects.flatMap((p) => summarize(p.tasks));
  const finished = top.filter((a) => a.status === 'done').length;
  const next = upNext(projects);

  return (
    <div className={styles.page}>
      <header className={styles.pageHead}>
        <div>
          <p className={styles.eyebrow}>Dashboard</p>
          <h1 className={styles.pageTitle}>Your progress</h1>
        </div>
        <Link to="/new" className={styles.primaryBtn}>+ New project</Link>
      </header>

      <section className={styles.stats} aria-label="Summary">
        <div className={styles.stat}><span className={styles.statValue}>{all.percent}%</span><span className={styles.statLabel}>Overall complete</span></div>
        <div className={styles.stat}><span className={styles.statValue}>{all.done}<small>/{all.total}</small></span><span className={styles.statLabel}>Tasks done</span></div>
        <div className={styles.stat}><span className={styles.statValue}>{finished}<small>/{top.length}</small></span><span className={styles.statLabel}>Top-level items finished</span></div>
        <div className={styles.stat}><span className={styles.statValue}>{projects.length}</span><span className={styles.statLabel}>Projects</span></div>
      </section>

      <div className={styles.dashGrid}>
        <section>
          <h2 className={styles.sectionTitle}>Projects</h2>
          <div className={styles.projectCards}>
            {projects.map((p) => {
              const m = measure(p.tasks);
              const rows = summarize(p.tasks);
              return (
                <Link key={p.id} to={`/projects/${p.id}`} className={styles.projectCard} style={{ ...themeVars(p.color), ['--c' as string]: p.color }}>
                  <div className={styles.projectCardTop}>
                    <ProjectLogo name={p.name} color={p.color} logo={p.logo} size={48} />
                    <div className={styles.projectCardInfo}>
                      <h3>{p.name}</h3>
                      <p>{m.done} of {m.total} tasks</p>
                    </div>
                    <ProgressRing percent={m.percent} color={p.color} size={64} />
                  </div>
                  <div className={styles.miniAreas}>
                    {!rows.length ? <span className={styles.muted}>Nothing here yet — click to start planning →</span> : null}
                    {rows.map((a) => (
                      <div key={a.task.id} className={styles.miniArea}>
                        <span className={styles.miniName}>{a.task.title}</span>
                        <span className={styles.miniTrack}>
                          <span className={styles.miniFill} style={{ width: `${a.percent}%`, background: a.percent === 100 ? 'var(--success)' : p.color }} />
                        </span>
                        <span className={styles.miniPct}>{a.percent}%</span>
                      </div>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>Up next</h2>
          <div className={styles.card}>
            {next.length ? (
              <ul className={styles.checkList}>
                {next.map((n) => (
                  <CheckRow
                    key={`${n.project.id}-${n.task.id}`}
                    task={n.task}
                    path={[n.project.name, ...n.path]}
                    color={n.project.color}
                    onToggle={() => updateTasks(n.project.id, (t) => toggleTask(t, n.task.id))}
                    onOpenPath={() => navigate(n.pathIds.length ? `/projects/${n.project.id}/cards/${n.pathIds[n.pathIds.length - 1]}` : `/projects/${n.project.id}`)}
                  />
                ))}
              </ul>
            ) : all.total === 0 ? (
              <p className={styles.empty}>No tasks yet — open a project and add some cards and tasks.</p>
            ) : (
              <p className={styles.empty}>🎉 Everything is checked off.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
