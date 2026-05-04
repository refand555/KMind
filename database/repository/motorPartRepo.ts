import { db } from "../db";
import { MotorPart } from "@/types/motor";

export const insertMotorParts = (
  motorId: number,
  parts: MotorPart[]
) => {
  parts.forEach((p) => {
    db.runSync(
  `INSERT INTO motor_parts 
   (motor_id, part_id, status, km_terakhir, reminder_date)
   VALUES (?, ?, ?, ?, ?)`,
  [
    motorId,
    p.part_id,
    p.status,
    p.km_terakhir,
    p.reminder_date ?? null,
  ]
);
  });
};

