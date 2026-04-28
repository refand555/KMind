import { db } from "../db";

export const getPartsByType = (type: string) => {
  return db.getAllSync(
    "SELECT * FROM parts WHERE LOWER(motor_type) = LOWER(?)",
    [type],
  );
};

export const getPartsByMotorId = (motorId: number) => {
  return db.getAllSync(
    "SELECT p.id, p.name, p.interval_km, mp.km_terakhir, mp.status FROM motor_parts mp JOIN parts p ON p.id = mp.part_id WHERE mp.motor_id = ?",
    [motorId],
  );
};
