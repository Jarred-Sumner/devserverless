import * as IDB from "idb";
import { openDB } from "src/lib/openDB";
import { getPackageID } from "src/_dev_/getPackageID";
import { StoredPackage, StoredPackageRecord } from "./StoredPackage";

export class Database {
  db: IDB.IDBPDatabase;

  async load() {
    if (this.db) return;
    this.db = await openDB();
  }

  async savePackage(pkg: StoredPackage) {
    await this.load();
    await this.db.put("packages", pkg.toRecord(), pkg.id);
  }

  async saveDir(
    directory: FileSystemDirectoryHandle,
    pkgHandle: FileSystemFileHandle
  ) {
    await this.load();
    await this.db.put(
      "dirs",
      { directory, id: getPackageID(), pkgHandle },
      getPackageID()
    );
  }

  async loadDir(): Promise<FileSystemDirectoryHandle> {
    await this.load();
    return await this.db.get("dirs", getPackageID());
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
