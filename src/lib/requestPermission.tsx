import { Database } from "src/lib/Database";

let database: Database = new Database();
database.load();
export async function requestPermission(id: string) {
  await database.load();
  const pkg = await database.getPackageById(id);
  await pkg.handle.requestPermission({ mode: "read" });
}
