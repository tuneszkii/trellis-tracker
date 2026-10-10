import type { ProjectInput, Task } from './project-type.js';

let n = 0;
const task = (title: string, done = false, description = ''): Task => ({
  id: `seed-${(n += 1)}`,
  title,
  description,
  done,
  kind: 'task',
  subtasks: [],
});
const card = (title: string, subtasks: Task[], description = ''): Task => ({
  id: `seed-${(n += 1)}`,
  title,
  description,
  done: false,
  kind: 'card',
  subtasks,
});

/**
 * Example project written to the database when it is empty.
 * Shows cards nested inside cards: Armory > Gun system > tasks.
 */
export const seedProjects: ProjectInput[] = [
  {
    name: 'FPS',
    description: 'Multiplayer first-person shooter prototype',
    color: '#ff5c7a',
    logo: '',
    tasks: [
      card(
        'Armory',
        [
          card(
            'Gun system',
            [
              task('Recoil controller', false, 'Camera kick, spread pattern and recovery curve'),
              task('Client logic', false, 'Firing input, muzzle FX, local prediction'),
              task('Server logic', false, 'Authoritative hit registration'),
              task('Server validation', false, 'Rate-of-fire and line-of-sight checks'),
            ],
            'Everything related to shooting'
          ),
          card('Weapon types', [task('Pistols'), task('Rifles'), task('Shotguns')]),
        ],
        'Weapons, attachments and loadouts'
      ),
      card('Movement', [task('Walk / sprint', true), task('Crouch & slide'), task('Jump & air control')]),
      card('Networking', [task('Lobby & matchmaking'), task('State replication')]),
      task('Main menu UI'),
    ],
  },
];
