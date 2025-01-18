import * as migration_20250114_221220 from './20250114_221220';
import * as migration_20250115_175156 from './20250115_175156';
import * as migration_20250115_191950 from './20250115_191950';
import * as migration_20250115_201038 from './20250115_201038';
import * as migration_20250115_221526 from './20250115_221526';
import * as migration_20250115_224723 from './20250115_224723';
import * as migration_20250117_165400 from './20250117_165400';
import * as migration_20250117_192523 from './20250117_192523';
import * as migration_20250118_132856 from './20250118_132856';
import * as migration_20250118_142332 from './20250118_142332';

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
    name: '20250115_221526',
  },
  {
    up: migration_20250115_224723.up,
    down: migration_20250115_224723.down,
    name: '20250115_224723',
  },
  {
    up: migration_20250117_165400.up,
    down: migration_20250117_165400.down,
    name: '20250117_165400',
  },
  {
    up: migration_20250117_192523.up,
    down: migration_20250117_192523.down,
    name: '20250117_192523',
  },
  {
    up: migration_20250118_132856.up,
    down: migration_20250118_132856.down,
    name: '20250118_132856',
  },
  {
    up: migration_20250118_142332.up,
    down: migration_20250118_142332.down,
    name: '20250118_142332'
  },
];
