import { ESBuildPackage } from "src/lib/ESBuildPackage";
import { Packager } from "src/lib/Packager";

export class InitialPackager extends Packager {
  pkg: ESBuildPackage;
  async verify(handle: FileSystemDirectoryHandle) {
    this.pkg = await ESBuildPackage.fromDirectory(handle);
    return true;
  }
}
