import { getMotors } from "@/database/repository/motorRepo";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

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
    }, []),
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
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/motor-detail",
                params: { id: item.id },
              })
            }
          >
            <View
              style={{
                backgroundColor: isDark ? "#1e1e1e" : "#fff",
                padding: 16,
                borderRadius: 12,
                marginBottom: 10,
              }}
            >
              <Text style={{ color: isDark ? "#fff" : "#000" }}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        onPress={() => router.push("/add-motor")}
        style={{
          backgroundColor: "#007AFF",
          padding: 16,
          borderRadius: 12,
          marginTop: 16,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          + Tambah Motor
        </Text>
      </TouchableOpacity>
    </View>
  );
}
