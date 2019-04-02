import Dexie from "dexie";

const db = new Dexie("ClicsDB");
db.version(1).stores({clics: "++id, week"});

export default db;