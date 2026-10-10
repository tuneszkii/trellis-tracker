/**
 * A node in the project tree.
 * A "card" holds other cards and tasks (to any depth); a "task" is a checkbox.
 * A card's progress is derived from the tasks beneath it.
 */
export type Task = {
  id: string;
  title: string;
  description?: string;
  done: boolean;
  kind?: 'card' | 'task';
  /** id of an uploaded picture (see the /images endpoint) */
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
  /** id of an uploaded logo picture */
  logo?: string;
  tasks: Task[];
  createdAt?: string;
  updatedAt?: string;
};

/**
 * Fields accepted when creating or updating a project.
 */
export type ProjectInput = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;
