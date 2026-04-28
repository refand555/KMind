import { db } from "../db";

export const insertMotor = (motor: any) => {
  const result = db.runSync(
    `INSERT INTO motors (name, type, km_now, usage_per_day)
     VALUES (?, ?, ?, ?)`,
    [motor.name, motor.type, motor.km, motor.usage],
  );

  return result.lastInsertRowId;
};

export const getMotors = () => {
  return db.getAllSync("SELECT * FROM motors");
};

export const getMotorById = (id: number) => {
  return db.getFirstSync("SELECT * FROM motors WHERE id = ?", [id]);
};