export type MotorType = "Matic" | "Manual" | "Kopling";

export type PartStatus = "baru" | "input_km" | "tidak_tahu";

export interface Motor {
  id?: number;
  name: string;
  type: MotorType;
  km_now: number;
  usage_per_day: number;
}

export interface Part {
  id: number;
  name: string;
  motor_type: MotorType;
}

export interface MotorPart {
  part_id: number;
  status: PartStatus;
  km_terakhir?: number | null;
}