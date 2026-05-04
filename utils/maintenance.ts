export const calculateMaintenance = ({
  status,
  km_now,
  km_terakhir,
  interval_km,
  usage_per_day,
  reminder_date,
}: {
  status: string;
  km_now: number;
  km_terakhir: number | null;
  interval_km: number;
  usage_per_day: number;
  reminder_date?: string | null;
}) => {
  let sisa_km: number | null = null;
  let sisa_hari: number | null = null;

  // 🔴 Tidak tahu → pakai tanggal
  if (status === "Tidak Tahu" && reminder_date) {
    const today = new Date();
    const reminder = new Date(reminder_date);

    sisa_hari = Math.ceil(
      (reminder.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      sisa_km: null,
      sisa_hari,
      status_label: getStatusLabel(sisa_hari),
    };
  }

  // 🟢 Baru Ganti
  if (status === "Baru Ganti") {
    sisa_km = interval_km;
  }

  // 🟡 Baru Ganti di KM
  if (status === "Baru Ganti di KM" && km_terakhir !== null) {
    const km_pakai = km_now - km_terakhir;
    sisa_km = interval_km - km_pakai;
  }

  // hitung hari
  if (sisa_km !== null) {
    sisa_hari = Math.ceil(sisa_km / usage_per_day);
  }

  return {
    sisa_km,
    sisa_hari,
    status_label: getStatusLabel(sisa_hari),
  };
};

const getStatusLabel = (hari: number | null) => {
  if (hari === null) return "Tidak Diketahui";

  if (hari <= 3) return "Segera Ganti";
  if (hari <= 7) return "Waspada";
  if (hari > 14) return "Aman";

  return "Normal";
};