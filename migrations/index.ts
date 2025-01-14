import * as migration_20250114_165030 from './20250114_165030';
import * as migration_20250114_172622 from './20250114_172622';

export const migrations = [
  {
    up: migration_20250114_165030.up,
    down: migration_20250114_165030.down,
    name: '20250114_165030',
  },
  {
    up: migration_20250114_172622.up,
    down: migration_20250114_172622.down,
    name: '20250114_172622'
  },
];
