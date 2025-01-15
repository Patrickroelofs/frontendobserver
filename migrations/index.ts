import * as migration_20250114_221220 from './20250114_221220';
import * as migration_20250115_175156 from './20250115_175156';
import * as migration_20250115_191950 from './20250115_191950';
import * as migration_20250115_201038 from './20250115_201038';
import * as migration_20250115_221526 from './20250115_221526';

export const migrations = [
  {
    up: migration_20250114_221220.up,
    down: migration_20250114_221220.down,
    name: '20250114_221220',
  },
  {
    up: migration_20250115_175156.up,
    down: migration_20250115_175156.down,
    name: '20250115_175156',
  },
  {
    up: migration_20250115_191950.up,
    down: migration_20250115_191950.down,
    name: '20250115_191950',
  },
  {
    up: migration_20250115_201038.up,
    down: migration_20250115_201038.down,
    name: '20250115_201038',
  },
  {
    up: migration_20250115_221526.up,
    down: migration_20250115_221526.down,
    name: '20250115_221526'
  },
];
