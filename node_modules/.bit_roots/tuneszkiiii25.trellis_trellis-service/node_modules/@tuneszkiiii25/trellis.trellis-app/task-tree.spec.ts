import { measure, toggleTask, type Task } from './task-tree.js';

const leaf = (id: string, done = false): Task => ({ id, title: id, done, subtasks: [] });

describe('task tree progress', () => {
  it('rolls leaf progress up to the whole project', () => {
    const tasks: Task[] = [
      { id: 'gun', title: 'Gun', done: false, subtasks: [leaf('a', true), leaf('b'), leaf('c'), leaf('d')] },
      leaf('menu'),
    ];
    expect(measure(tasks)).toEqual({ done: 1, total: 5, percent: 20 });
  });

  it('toggling a parent checks all sub-tasks, and parents auto-complete', () => {
    const tasks: Task[] = [{ id: 'gun', title: 'Gun', done: false, subtasks: [leaf('a'), leaf('b')] }];
    expect(measure(toggleTask(tasks, 'gun')).percent).toBe(100);
    const partial = toggleTask(toggleTask(tasks, 'a'), 'b');
    expect(partial[0].done).toBe(true);
  });
});
