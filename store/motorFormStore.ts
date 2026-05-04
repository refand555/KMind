import { create } from "zustand";

// 🔹 Definisikan tipe state
interface MotorFormState {
  name: string;
  type: string;
  km: string;
  usage: string;

  setForm: (data: Partial<MotorFormState>) => void;
  resetForm: () => void;
}

// 🔹 Gunakan generic di Zustand
export const useMotorFormStore = create<MotorFormState>((set) => ({
  name: "",
  type: "",
  km: "",
  usage: "",

  setForm: (data: Partial<MotorFormState>) =>
    set((state: MotorFormState) => ({
      ...state,
      ...data,
    })),

  resetForm: () =>
    set({
      name: "",
      type: "",
      km: "",
      usage: "",
    }),
}));