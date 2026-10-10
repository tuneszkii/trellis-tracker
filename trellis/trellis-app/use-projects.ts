import { useCallback, useEffect, useRef, useState } from 'react';
import type { Project, Task } from './task-tree.js';
import { request } from './api.js';

/** Project fields that can be edited from the settings screen. */
export type ProjectPatch = Partial<Pick<Project, 'name' | 'description' | 'color' | 'logo'>>;

/** Input for creating a project. */
export type NewProject = ProjectPatch & { name: string; tasks?: Task[] };

/**
 * Loads projects from the trellis service and exposes optimistic mutations.
 * Edits apply locally at once and are saved with a short debounce.
 * @returns projects, loading/error state and mutation helpers
 */
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const pending = useRef<Record<string, Record<string, unknown>>>({});

  useEffect(() => {
    request<Project[]>('/projects')
      .then(setProjects)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  /** Queues a partial update for a project and saves it shortly after. */
  const queueSave = useCallback((id: string, patch: Record<string, unknown>) => {
    pending.current[id] = { ...pending.current[id], ...patch };
    clearTimeout(timers.current[id]);
    timers.current[id] = setTimeout(() => {
      const body = pending.current[id];
      delete pending.current[id];
      request(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(body) }).catch((e) => setError(e.message));
    }, 300);
  }, []);

  const createProject = useCallback(async (input: NewProject) => {
    const created = await request<Project>('/projects', { method: 'POST', body: JSON.stringify({ tasks: [], ...input }) });
    setProjects((p) => [...p, created]);
    return created;
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    clearTimeout(timers.current[id]);
    delete pending.current[id];
    setProjects((p) => p.filter((x) => x.id !== id));
    await request(`/projects/${id}`, { method: 'DELETE' }).catch((e) => setError(e.message));
  }, []);

  const updateProject = useCallback(
    (id: string, patch: ProjectPatch) => {
      setProjects((list) => list.map((p) => (p.id === id ? { ...p, ...patch } : p)));
      queueSave(id, patch);
    },
    [queueSave]
  );

  const updateTasks = useCallback(
    (id: string, fn: (tasks: Task[]) => Task[]) => {
      setProjects((list) =>
        list.map((p) => {
          if (p.id !== id) return p;
          const tasks = fn(p.tasks);
          queueSave(id, { tasks });
          return { ...p, tasks };
        })
      );
    },
    [queueSave]
  );

  return { projects, loading, error, createProject, deleteProject, updateProject, updateTasks, clearError: () => setError(null) };
}
