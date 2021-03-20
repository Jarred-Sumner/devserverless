import * as IDB from "idb";

export async function openDB() {
  return await IDB.openDB("handles", 9, {
    upgrade(database, oldVersion, newVersion, transaction) {
      if (!database.objectStoreNames.contains("packages"))
        database.createObjectStore("packages");

      if (!database.objectStoreNames.contains("dirs"))
        database.createObjectStore("dirs");
    },
  });
}
