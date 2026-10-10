import { useState, type ReactNode } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useProjectsContext } from './projects-context.js';
import { measure } from './task-tree.js';
import { ProjectLogo } from './project-logo.js';
import styles from './ui.module.css';

/**
 * App frame: navigation rail (sidebar on tablet/desktop, collapsible top bar on mobile)
 * plus a main content area where each screen renders.
 * @param props.children - current screen
 */
export function AppShell({ children }: { children: ReactNode }) {
  const { projects, error, clearError } = useProjectsContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navClass = ({ isActive }: { isActive: boolean }) => `${styles.navItem} ${isActive ? styles.navItemActive : ''}`;

  return (
    <div className={styles.shell}>
      <aside className={styles.rail}>
        <div className={styles.railTop}>
          <Link to="/" className={styles.brand}>
            <span className={styles.logo}>⌗</span> Trellis
          </Link>
          <button className={styles.menuBtn} aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`} key={location.pathname} onClick={() => setMenuOpen(false)}>
          <NavLink to="/" end className={navClass}>
            <span className={styles.navIcon}>◧</span> Dashboard
          </NavLink>
          <div className={styles.navLabel}>Projects</div>
          {projects.map((p) => {
            const m = measure(p.tasks);
            return (
              <NavLink key={p.id} to={`/projects/${p.id}`} className={navClass}>
                <ProjectLogo name={p.name} color={p.color} logo={p.logo} size={24} />
                <span className={styles.navText}>{p.name}</span>
                <span className={styles.navPct}>{m.percent}%</span>
              </NavLink>
            );
          })}
          <NavLink to="/new" className={({ isActive }) => `${styles.navNew} ${isActive ? styles.navItemActive : ''}`}>
            + New project
          </NavLink>
        </nav>
      </aside>
      <main className={styles.main}>
        {error ? (
          <div className={styles.error} role="alert">
            <span>{error}</span>
            <button className={styles.linkBtn} onClick={clearError}>Dismiss</button>
          </div>
        ) : null}
        {children}
      </main>
    </div>
  );
}
