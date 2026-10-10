import { NavLink, Link } from 'react-router-dom';
import { type Project, measure } from './task-tree.js';
import { ProgressBar } from './progress-bar.js';
import { ProgressRing } from './progress-ring.js';
import { ProjectLogo } from './project-logo.js';
import styles from './ui.module.css';

/**
 * Themed header for the project frames: logo, name, overall progress and the
 * Overview / Checklist / Settings tabs.
 * @param props.project - current project
 */
export function ProjectBanner({ project }: { project: Project }) {
  const m = measure(project.tasks);
  const tab = ({ isActive }: { isActive: boolean }) => `${styles.tab} ${isActive ? styles.tabActive : ''}`;
  return (
    <header className={styles.banner}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link to="/">Dashboard</Link> <span>›</span> <span>{project.name}</span>
      </nav>
      <div className={styles.bannerRow}>
        <ProjectLogo name={project.name} color={project.color} logo={project.logo} size={64} />
        <div className={styles.bannerText}>
          <h1 className={styles.pageTitle}>{project.name}</h1>
          {project.description ? <p className={styles.muted}>{project.description}</p> : null}
          <p className={styles.muted}><strong className={styles.strong}>{m.done}</strong> of {m.total} tasks done</p>
        </div>
        <ProgressRing percent={m.percent} color={project.color} size={84} />
      </div>
      <ProgressBar percent={m.percent} color={project.color} size="lg" />
      <div className={styles.tabs} role="tablist">
        <NavLink to={`/projects/${project.id}`} end className={tab}>Overview</NavLink>
        <NavLink to={`/projects/${project.id}/checklist`} className={tab}>Checklist</NavLink>
        <NavLink to={`/projects/${project.id}/settings`} className={tab}>Settings</NavLink>
      </div>
    </header>
  );
}
