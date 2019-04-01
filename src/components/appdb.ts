import Dexie from "dexie";

const db = new Dexie("ClicsDB");
db.version(1).stores({clics: "++id, ian, object, activity, days, date"});

export default db;