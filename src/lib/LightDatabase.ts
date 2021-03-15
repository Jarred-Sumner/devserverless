import * as IDB from "idb";
import { openDB } from "src/lib/openDB";

export class LightDatabase {
  db: IDB.IDBPDatabase;

  async load() {
    if (this.db) return;
    this.db = await openDB();
  }

  async hasAnyPackages() {
    await this.load();
    debugger;
    return (await this.db.getAll("packages")).length > 0;
  }

  async hasAnyDirs() {
    await this.load();

    return (await this.db.getAll("dirs")).length > 0;
  }
}
