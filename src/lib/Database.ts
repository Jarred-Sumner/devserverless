import * as IDB from "idb";
import * as path from "path";
import { getPackageID } from "src/_dev_/getPackageID";
import { StoredPackage, StoredPackageRecord } from "./StoredPackage";

export class Database {
  db: IDB.IDBPDatabase;

  async load() {
    if (this.db) return;
    this.db = await IDB.openDB("handles", 7, {
      upgrade(database, oldVersion, newVersion, transaction) {
        if (!database.objectStoreNames.contains("packages"))
          database.createObjectStore("packages");

        if (!database.objectStoreNames.contains("dirs"))
          database.createObjectStore("dirs");
      },
    });
  }

  async savePackage(pkg: StoredPackage) {
    await this.load();
    await this.db.put("packages", pkg.toRecord(), pkg.id);
  }

  async saveDir(directory: FileSystemDirectoryHandle) {
    await this.load();
    await this.db.put(
      "dirs",
      { directory, id: getPackageID() },
      getPackageID()
    );
  }

  async loadDir(): Promise<FileSystemDirectoryHandle> {
    await this.load();
    return (await this.db.get("dirs", getPackageID()))?.directory || null;
  }

  async loadPackage(id: string) {
    await this.load();

    const rec = (await this.db.get("packages", id)) as StoredPackageRecord;
    if (!rec) {
      return null;
    }

    return StoredPackage.fromRecord(rec);
  }
}
