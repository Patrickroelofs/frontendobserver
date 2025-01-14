import * as migration_20250114_221220 from './20250114_221220';

export const migrations = [
  {
    up: migration_20250114_221220.up,
    down: migration_20250114_221220.down,
    name: '20250114_221220'
  },
];
