import { View, Text, FlatList, useColorScheme } from "react-native";
import { calculateMaintenance } from "@/utils/maintenance"; // ✅ tambah ini

// ✅ helper warna (tidak mengganggu UI lain)
const getColor = (status: string) => {
  if (status === "Segera Ganti") return "#ff4d4f";
  if (status === "Waspada") return "#faad14";
  if (status === "Aman") return "#52c41a";
  return "#ccc";
};

export default function MotorDetailScreen({ motor, parts }: any) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: isDark ? "#121212" : "#f5f5f5",
      }}
    >
      {/* ===== LIST PART ===== */}
      <FlatList
        data={parts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          // ✅ HITUNG (INI INTI TAMBAHAN)
          const result = calculateMaintenance({
            status: item.status,
            km_now: motor.km_now,
            km_terakhir: item.km_terakhir,
            interval_km: item.interval_km,
            usage_per_day: motor.usage_per_day,
            reminder_date: item.reminder_date,
          });

          return (
            <View
              style={{
                backgroundColor: isDark ? "#1e1e1e" : "#fff",
                padding: 16,
                borderRadius: 12,
                marginBottom: 10,
              }}
            >
              {/* === UI LAMA (TIDAK DIUBAH) === */}
              <Text
                style={{
                  fontWeight: "bold",
                  color: isDark ? "#fff" : "#000",
                }}
              >
                {item.name}
              </Text>

              {/* === TAMBAHAN (HASIL PERHITUNGAN) === */}
              <Text style={{ color: isDark ? "#ccc" : "#555" }}>
                Sisa KM: {result.sisa_km ?? "-"}
              </Text>

              <Text style={{ color: isDark ? "#ccc" : "#555" }}>
                Sisa Hari: {result.sisa_hari ?? "-"}
              </Text>

              <Text style={{ color: getColor(result.status_label) }}>
                Status: {result.status_label}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}