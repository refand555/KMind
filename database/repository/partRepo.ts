import { db } from "../db";

export const getPartsByType = (type: string) => {
  return db.getAllSync(
    `SELECT * FROM parts WHERE LOWER(motor_type) = LOWER(?)`,
    [type]
  );
};