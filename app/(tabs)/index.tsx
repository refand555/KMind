import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { getMotors } from "@/database/repository/motorRepo";

export default function HomeScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const [data, setData] = useState<any[]>([]);

  // ✅ REFRESH SETIAP SCREEN FOKUS
  useFocusEffect(
    useCallback(() => {
      const motors = getMotors();
      setData(motors);
      console.log("DATA LOADED:", motors);
    }, [])
  );

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: isDark ? "#121212" : "#f5f5f5",
      }}
    >
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <Text style={{ color: isDark ? "#fff" : "#000" }}>
            Belum ada motor
          </Text>
        )}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: isDark ? "#1e1e1e" : "#fff",
              padding: 16,
              borderRadius: 12,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: isDark ? "#fff" : "#000",
              }}
            >
              {item.name}
            </Text>

            <Text style={{ color: isDark ? "#ccc" : "#333" }}>
              KM: {item.km_now}
            </Text>

            <Text style={{ color: isDark ? "#ccc" : "#333" }}>
              Tipe: {item.type}
            </Text>
          </View>
        )}
      />

      <TouchableOpacity
        onPress={() => router.push("/add-motor")}
        style={{
          backgroundColor: "#007AFF",
          padding: 16,
          borderRadius: 12,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          + Tambah Motor
        </Text>
      </TouchableOpacity>
    </View>
  );
}