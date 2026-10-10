import { type Project, type Task, isCard, taskProgress } from './task-tree.js';

/**
 * A checkable task flattened out of the tree, with its ancestry kept as a
 * breadcrumb so it can be shown in a flat list.
 */
export type FlatTask = {
  task: Task;
  /** titles of ancestor cards, e.g. ["Weapon types", "Rifles"] */
  path: string[];
  /** ids of ancestor cards, top-most first */
  pathIds: string[];
};

/**
 * Flattens a tree into its tasks (descending through cards), keeping breadcrumbs.
 * @param tasks - tree to flatten
 * @param path - prefix titles
 * @param pathIds - prefix ids
 */
export function flattenLeaves(tasks: Task[], path: string[] = [], pathIds: string[] = []): FlatTask[] {
  const out: FlatTask[] = [];
  tasks.forEach((t) => {
    if (isCard(t)) out.push(...flattenLeaves(t.subtasks || [], [...path, t.title], [...pathIds, t.id]));
    else out.push({ task: t, path, pathIds });
  });
  return out;
}

/** A node in a list with its stats. */
export type Item = {
  task: Task;
  done: number;
  total: number;
  percent: number;
  /** share of the list's total tasks, 0..100 */
  weight: number;
  status: 'empty' | 'todo' | 'active' | 'done';
};

/**
 * Summarizes a list of nodes: progress, weight within the list, and status.
 * @param tasks - nodes to summarize
 */
export function summarize(tasks: Task[]): Item[] {
  const items = tasks.map((task) => ({ task, ...taskProgress(task) }));
  const all = items.reduce((n, i) => n + i.total, 0) || 1;
  return items.map((i) => ({
    ...i,
    weight: Math.round((i.total / all) * 100),
    status: i.total === 0 ? 'empty' : i.percent === 100 ? 'done' : i.done > 0 ? 'active' : 'todo',
  }));
}

/** A task across all projects, for the dashboard's "Up next" list. */
export type NextTask = FlatTask & { project: Project };

/**
 * Returns the next few unchecked tasks, preferring cards already in progress
 * and interleaving projects so a big one does not hide the others.
 * @param projects - all projects
 * @param limit - max items
 */
export function upNext(projects: Project[], limit = 6): NextTask[] {
  const lists = projects.map((project) => {
    const rank = (x: Item) => (x.status === 'active' ? 0 : x.status === 'todo' ? 1 : 2);
    const items = summarize(project.tasks).sort((a, b) => rank(a) - rank(b));
    const out: NextTask[] = [];
    items.forEach((i) => {
      const leaves = isCard(i.task)
        ? flattenLeaves(i.task.subtasks || [], [i.task.title], [i.task.id])
        : [{ task: i.task, path: [], pathIds: [] }];
      leaves.filter((l) => !l.task.done).forEach((l) => out.push({ ...l, project }));
    });
    return out;
  });
  const result: NextTask[] = [];
  for (let i = 0; result.length < limit && lists.some((l) => l[i]); i += 1) {
    lists.forEach((l) => l[i] && result.length < limit && result.push(l[i]));
  }
  return result;
}

/**
 * Finds a node anywhere in a tree.
 * @param tasks - tree
 * @param id - node id
 */
export function findTask(tasks: Task[], id: string): Task | undefined {
  return trail(tasks, id)?.at(-1);
}

/**
 * The chain of nodes from the top level down to the node with this id.
 * @param tasks - tree
 * @param id - node id
 * @returns ancestors followed by the node itself, or null when not found
 */
export function trail(tasks: Task[], id: string): Task[] | null {
  for (const t of tasks) {
    if (t.id === id) return [t];
    const inner = trail(t.subtasks || [], id);
    if (inner) return [t, ...inner];
  }
  return null;
}
