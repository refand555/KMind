import { insertMotor } from "./repository/motorRepo";
import { insertMotorParts } from "./repository/motorPartRepo";
import { MotorPart } from "@/types/motor";

export const createMotorWithParts = (
  motor: any,
  parts: MotorPart[]
) => {
  const motorId = insertMotor(motor);
  insertMotorParts(motorId, parts);
};