import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, useColorScheme, View } from "react-native";

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

    const m = getMotorById(Number(id));
    const p = getPartsByMotorId(Number(id));

    setMotor(m);
    setParts(p);
    console.log("PARAM ID:", id);
  }, [id]);

  if (!motor) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{motor?.name}</Text>

      <Text>KM sekarang: {motor?.km_now}</Text>

      <FlatList
        data={parts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const remaining =
            (item.km_terakhir ?? 0) +
            (item.interval_km ?? 0) -
            (motor?.km_now ?? 0);

          let status = "AMAN";
          if (remaining < 0) status = "HARUS GANTI";
          else if (remaining < 500) status = "SEGERA";

          return (
            <View
              style={{
                padding: 12,
                marginBottom: 10,
                backgroundColor: isDark ? "#1e1e1e" : "#fff",
                borderRadius: 10,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
              <Text>Sisa: {remaining} km</Text>
              <Text>Status: {status}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}
