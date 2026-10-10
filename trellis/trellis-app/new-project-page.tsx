import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProjectsContext } from './projects-context.js';
import { newId, type Task } from './task-tree.js';
import { DEFAULT_COLOR } from './theme.js';
import { ColorPicker } from './color-picker.js';
import { ImagePicker } from './image-picker.js';
import { ProjectLogo } from './project-logo.js';
import { ThemeScope } from './theme-scope.js';
import styles from './ui.module.css';

/**
 * New project frame: name, description, color (the whole page previews it live),
 * logo, and optional starter cards (one per line).
 */
export function NewProjectPage() {
  const { createProject } = useProjectsContext();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [logo, setLogo] = useState('');
  const [cards, setCards] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true);
    const tasks: Task[] = cards
      .split('\n')
      .map((a) => a.trim())
      .filter(Boolean)
      .map((title) => ({ id: newId(), title, description: '', done: false, kind: 'card', subtasks: [] }));
    try {
      const created = await createProject({ name: name.trim(), description: description.trim(), color, logo, tasks });
      navigate(`/projects/${created.id}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <ThemeScope color={color} narrow>
      <nav className={styles.breadcrumb}><Link to="/">Dashboard</Link> <span>›</span> <span>New project</span></nav>
      <div className={styles.newHead}>
        <ProjectLogo name={name || 'N'} color={color} logo={logo} size={56} />
        <h1 className={styles.pageTitle}>{name.trim() || 'New project'}</h1>
      </div>
      <form className={`${styles.card} ${styles.formStack}`} onSubmit={submit}>
        <label className={styles.field}>
          <span>Project name</span>
          <input autoFocus className={styles.input} placeholder="e.g. FPS" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className={styles.field}>
          <span>Description <em>(optional)</em></span>
          <input className={styles.input} placeholder="What are you building?" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <div className={styles.field}>
          <span>Theme color</span>
          <ColorPicker value={color} onChange={setColor} />
        </div>
        <ImagePicker label="Logo (optional)" maxSize={256} value={logo} onChange={setLogo} />
        <label className={styles.field}>
          <span>Starter cards <em>(optional, one per line)</em></span>
          <textarea className={styles.textarea} rows={4} placeholder={'Armory\nMovement\nNetworking'} value={cards} onChange={(e) => setCards(e.target.value)} />
        </label>
        <div className={styles.formButtons}>
          <Link to="/" className={styles.ghostBtn}>Cancel</Link>
          <button type="submit" className={styles.primaryBtn} disabled={!name.trim() || busy}>Create project</button>
        </div>
      </form>
    </ThemeScope>
  );
}
