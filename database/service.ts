import { insertMotor } from "./repository/motorRepo";
import { insertMotorParts } from "./repository/motorPartRepo";
import { MotorPart } from "@/types/motor";

export const createMotorWithParts = (motor: any, parts: MotorPart[]) => {
  const motorId = insertMotor(motor);

  const fixedParts = parts.map((p) => ({
    ...p,
    km_terakhir: p.km_terakhir ?? motor.km,
  }));

  insertMotorParts(motorId, fixedParts);
};
