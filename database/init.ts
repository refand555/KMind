import { db } from "./db";

export const initDB = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS motors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      type TEXT,
      km_now INTEGER,
      usage_per_day INTEGER
    );

    CREATE TABLE IF NOT EXISTS parts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      motor_type TEXT,
      interval_km INTEGER
    );

    CREATE TABLE IF NOT EXISTS motor_parts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      motor_id INTEGER,
      part_id INTEGER,
      status TEXT,
      km_terakhir INTEGER
    );
  `);
};
  