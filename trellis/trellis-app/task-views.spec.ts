import { flattenLeaves, trail } from './task-views.js';
import { addTask, measure, type Task } from './task-tree.js';

const task = (id: string, done = false): Task => ({ id, title: id, done, kind: 'task', subtasks: [] });
const card = (id: string, subtasks: Task[]): Task => ({ id, title: id, done: false, kind: 'card', subtasks });

describe('nested cards', () => {
  it('keeps breadcrumbs for tasks buried several cards deep', () => {
    const tree = [card('armory', [card('gun', [task('recoil', true), task('client')])])];
    const flat = flattenLeaves(tree);
    expect(flat.map((f) => [f.task.id, f.path])).toEqual([['recoil', ['armory', 'gun']], ['client', ['armory', 'gun']]]);
    expect(trail(tree, 'client')?.map((t) => t.id)).toEqual(['armory', 'gun', 'client']);
  });

  it('adding a card inside a card rolls progress up through every level', () => {
    let tree: Task[] = [];
    tree = addTask(tree, null, { title: 'Armory', kind: 'card' });
    tree = addTask(tree, tree[0].id, { title: 'Gun system', kind: 'card' });
    tree = addTask(tree, tree[0].subtasks[0].id, { title: 'Recoil', kind: 'task' });
    tree = addTask(tree, tree[0].subtasks[0].id, { title: 'Types', kind: 'task' });
    expect(measure(tree).total).toBe(2);
    expect(measure(tree).percent).toBe(0);
  });
});
