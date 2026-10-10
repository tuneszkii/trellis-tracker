/** What a node is: a card holds other nodes, a task is a checkbox. */
export type Kind = 'card' | 'task';

/**
 * A node in the tree. Cards can hold cards and tasks to any depth;
 * a card's progress is derived from the tasks beneath it.
 */
export type Task = {
  id: string;
  title: string;
  description?: string;
  done: boolean;
  kind?: Kind;
  /** id of an uploaded picture */
  image?: string;
  subtasks: Task[];
};

/**
 * A project — the root of the tree (e.g. "FPS").
 */
export type Project = {
  id: string;
  name: string;
  description?: string;
  color?: string;
  /** id of an uploaded logo */
  logo?: string;
  tasks: Task[];
};

/** Progress summary for a node or list of nodes. */
export type Progress = { done: number; total: number; percent: number };

/** Creates a unique id for new nodes. */
export const newId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

/**
 * Whether a node is a card (container). Older data without `kind`
 * is treated as a card when it has children.
 * @param t - node
 */
export const isCard = (t: Task): boolean => (t.kind ? t.kind === 'card' : (t.subtasks?.length ?? 0) > 0);

/**
 * Counts completed vs total tasks beneath a list of nodes. Every task weighs
 * the same, so a card's % reflects how much real work is done inside it.
 * Empty cards add nothing.
 * @param tasks - nodes to measure
 */
export function measure(tasks: Task[]): Progress {
  let done = 0;
  let total = 0;
  const walk = (list: Task[]) => {
    list.forEach((t) => {
      if (isCard(t)) walk(t.subtasks || []);
      else {
        total += 1;
        if (t.done) done += 1;
      }
    });
  };
  walk(tasks);
  return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
}

/**
 * Progress of one node — a task is 0% or 100%, a card reflects its contents.
 * @param task - the node
 */
export function taskProgress(task: Task): Progress {
  if (isCard(task)) return measure(task.subtasks || []);
  return { done: task.done ? 1 : 0, total: 1, percent: task.done ? 100 : 0 };
}

const setAll = (task: Task, done: boolean): Task => ({
  ...task,
  done,
  subtasks: (task.subtasks || []).map((s) => setAll(s, done)),
});

/** Re-derives each card's `done` from its contents. */
const normalize = (tasks: Task[]): Task[] =>
  tasks.map((t) => {
    if (!isCard(t)) return t;
    const subtasks = normalize(t.subtasks || []);
    const m = measure(subtasks);
    return { ...t, kind: 'card' as Kind, subtasks, done: m.total > 0 && m.done === m.total };
  });

/**
 * Applies a function to the node with the given id, anywhere in the tree.
 * @param tasks - tree to search
 * @param id - node id
 * @param fn - returns the replacement node, or null to delete it
 */
export function mapTask(tasks: Task[], id: string, fn: (t: Task) => Task | null): Task[] {
  const out: Task[] = [];
  tasks.forEach((t) => {
    if (t.id === id) {
      const next = fn(t);
      if (next) out.push(next);
    } else {
      out.push({ ...t, subtasks: mapTask(t.subtasks || [], id, fn) });
    }
  });
  return normalize(out);
}

/**
 * Toggles a node. Toggling a card checks/unchecks everything inside it.
 * @param tasks - tree
 * @param id - node id
 */
export function toggleTask(tasks: Task[], id: string): Task[] {
  return mapTask(tasks, id, (t) => setAll(t, !t.done));
}

/** Fields for a new node. */
export type NewItem = { title: string; description?: string; kind?: Kind; image?: string };

/**
 * Adds a card or task inside a card (or at the top level when parentId is null).
 * Adding inside a task turns that task into a card.
 * @param tasks - tree
 * @param parentId - parent id or null for top level
 * @param input - title, description, kind and optional picture
 */
export function addTask(tasks: Task[], parentId: string | null, input: NewItem): Task[] {
  const node: Task = {
    id: newId(),
    title: input.title,
    description: input.description || '',
    done: false,
    kind: input.kind || 'task',
    image: input.image || undefined,
    subtasks: [],
  };
  if (!parentId) return normalize([...tasks, node]);
  return mapTask(tasks, parentId, (p) => ({ ...p, kind: 'card', done: false, subtasks: [...(p.subtasks || []), node] }));
}

/** Removes a node (and everything inside it) from the tree. */
export function removeTask(tasks: Task[], id: string): Task[] {
  return mapTask(tasks, id, () => null);
}

/**
 * Updates a node's title, description, picture or kind (task → card).
 * Pass `image: ''` to remove the picture.
 */
export function editTask(
  tasks: Task[],
  id: string,
  patch: { title?: string; description?: string; image?: string; kind?: Kind }
): Task[] {
  return mapTask(tasks, id, (t) => {
    const next: Task = { ...t, ...patch, image: patch.image === undefined ? t.image : patch.image || undefined };
    if (patch.kind === 'card') next.done = false;
    return next;
  });
}
