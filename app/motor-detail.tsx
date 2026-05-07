import { View, Text, FlatList, useColorScheme } from "react-native";

import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import { getMotorById } from "@/database/repository/motorRepo";
import { getPartsByMotorId } from "@/database/repository/partRepo";

export default function MotorDetail() {
  const { id } = useLocalSearchParams();

  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const [motor, setMotor] = useState<any>(null);
  const [parts, setParts] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;

    const motorData = getMotorById(Number(id));
    const partData = getPartsByMotorId(Number(id));

    console.log("MOTOR:", motorData);
    console.log("PARTS:", partData);

    setMotor(motorData);
    setParts(partData);
  }, [id]);

  // 🔥 GUARD
  if (!motor) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: isDark ? "#fff" : "#000" }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: isDark ? "#121212" : "#f5f5f5",
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          color: isDark ? "#fff" : "#000",
          marginBottom: 4,
        }}
      >
        {motor.name}
      </Text>

      <Text
        style={{
          color: isDark ? "#ccc" : "#333",
          marginBottom: 20,
        }}
      >
        KM Sekarang: {motor.km_now}
      </Text>

      <FlatList
        data={parts}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <Text style={{ color: isDark ? "#aaa" : "#555" }}>
            Belum ada part
          </Text>
        )}
        renderItem={({ item }) => {
          const remaining =
            (item.km_terakhir ?? 0) +
            (item.interval_km ?? 0) -
            (motor.km_now ?? 0);

          let status = "AMAN";

          if (remaining <= 0) {
            status = "HARUS GANTI";
          } else if (remaining < 500) {
            status = "SEGERA";
          }

          return (
            <View
              style={{
                backgroundColor: isDark ? "#1e1e1e" : "#fff",
                padding: 14,
                borderRadius: 12,
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: isDark ? "#fff" : "#000",
                }}
              >
                {item.name}
              </Text>

              <Text style={{ color: isDark ? "#ccc" : "#333" }}>
                Interval: {item.interval_km} km
              </Text>

              <Text style={{ color: isDark ? "#ccc" : "#333" }}>
                Sisa: {remaining} km
              </Text>

              <Text
                style={{
                  marginTop: 6,
                  fontWeight: "bold",
                  color:
                    status === "HARUS GANTI"
                      ? "red"
                      : status === "SEGERA"
                        ? "orange"
                        : "limegreen",
                }}
              >
                {status}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}
