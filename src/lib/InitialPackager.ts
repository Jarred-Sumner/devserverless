import { Database } from "src/lib/Database";
import { ESBuildPackage } from "src/lib/ESBuildPackage";
import { Packager } from "src/lib/Packager";
import { StoredPackage } from "src/lib/StoredPackage";
import { getPackageID } from "src/_dev_/getPackageID";

export class InitialPackager extends Packager {
  database = new Database();

  async loadStoredPackage() {
    await this.database.load();
    const pkg = await this.database.loadPackage(getPackageID());
    if (!pkg) {
      return null;
    }
  }

  storedPackage: StoredPackage;

  async verify(handle: FileSystemDirectoryHandle) {
    return true;
  }
}
