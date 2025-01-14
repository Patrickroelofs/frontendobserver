import * as migration_20250114_165030 from './20250114_165030';

export const migrations = [
  {
    up: migration_20250114_165030.up,
    down: migration_20250114_165030.down,
    name: '20250114_165030'
  },
];
