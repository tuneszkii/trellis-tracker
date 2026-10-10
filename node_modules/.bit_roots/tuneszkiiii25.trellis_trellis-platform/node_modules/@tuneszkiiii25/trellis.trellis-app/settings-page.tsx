import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProjectsContext } from './projects-context.js';
import type { Project } from './task-tree.js';
import { DEFAULT_COLOR } from './theme.js';
import { ProjectBanner } from './project-banner.js';
import { ColorPicker } from './color-picker.js';
import { ImagePicker } from './image-picker.js';
import { NotFound } from './card-page.js';
import { ThemeScope } from './theme-scope.js';
import styles from './ui.module.css';

/**
 * Project settings frame: rename, describe, recolor (live preview of the
 * whole project theme), change the logo, or delete the project.
 */
export function SettingsPage() {
  const { projectId } = useParams();
  const { projects, loading } = useProjectsContext();
  const project = projects.find((p) => p.id === projectId);
  if (loading) return <p className={styles.empty}>Loading…</p>;
  if (!project) return <NotFound />;
  return <SettingsForm key={project.id} project={project} />;
}

function SettingsForm({ project }: { project: Project }) {
  const { updateProject, deleteProject } = useProjectsContext();
  const navigate = useNavigate();
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description || '');

  const commitText = () => {
    const next = name.trim();
    if (!next) return setName(project.name);
    if (next !== project.name || description !== (project.description || '')) updateProject(project.id, { name: next, description: description.trim() });
  };

  return (
    <ThemeScope color={project.color}>
      <ProjectBanner project={project} />
      <section className={`${styles.card} ${styles.formStack}`}>
        <label className={styles.field}>
          <span>Project name</span>
          <input className={styles.input} value={name} onChange={(e) => setName(e.target.value)} onBlur={commitText} />
        </label>
        <label className={styles.field}>
          <span>Description <em>(optional)</em></span>
          <input className={styles.input} value={description} onChange={(e) => setDescription(e.target.value)} onBlur={commitText} />
        </label>
        <div className={styles.field}>
          <span>Theme color</span>
          <ColorPicker value={project.color || DEFAULT_COLOR} onChange={(color) => updateProject(project.id, { color })} />
        </div>
        <ImagePicker label="Logo" maxSize={256} value={project.logo} onChange={(logo) => updateProject(project.id, { logo })} />
      </section>
      <div className={styles.dangerZone}>
        <button
          className={styles.dangerLink}
          onClick={() => {
            if (!window.confirm(`Delete project "${project.name}" and everything in it?`)) return;
            deleteProject(project.id);
            navigate('/');
          }}
        >
          Delete project
        </button>
      </div>
    </ThemeScope>
  );
}
