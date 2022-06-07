import Dexie from 'dexie';

export class MainDB extends Dexie {
  completedGames;

  constructor() {
    super('MemoryGame');
    this.version(1).stores({
      completedGames: '++id, itemCount, moveCount'
    });
  }
}

export const db = new MainDB();

export function resetDatabase() {
  return db.transaction('rw', db.completedGames, async () => {
    await Promise.all(db.tables.map(table => table.clear()));
  });
}
