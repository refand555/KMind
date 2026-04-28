import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  Alert,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { MotorType } from "@/types/motor";

export default function AddMotorScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const [name, setName] = useState("");
  const [type, setType] = useState<MotorType | "">("");
  const [km, setKm] = useState("");
  const [usage, setUsage] = useState("");

  const inputStyle = {
    backgroundColor: isDark ? "#1e1e1e" : "#fff",
    color: isDark ? "#fff" : "#000",
    borderColor: isDark ? "#333" : "#ccc",
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  };

  const handleNext = () => {
    if (!name || !km || !usage || !type) {
      Alert.alert("Error", "Semua field harus diisi");
      return;
    }

    router.push({
      pathname: "/setup-parts",
      params: {
        name,
        type,
        km,
        usage,
      },
    });
  };

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
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 16,
          color: isDark ? "#fff" : "#000",
        }}
      >
        Tambah Motor
      </Text>

      {/* Nama Motor */}
      <Text style={{ color: isDark ? "#ccc" : "#000" }}>Nama Motor</Text>
      <TextInput
        placeholder="Contoh: Beat 2022"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
        style={inputStyle}
      />

      {/* Jenis Motor (Dropdown) */}
      <Text style={{ color: isDark ? "#ccc" : "#000" }}>Jenis Motor</Text>
      <View
        style={{
          backgroundColor: isDark ? "#1e1e1e" : "#fff",
          borderRadius: 10,
          borderWidth: 1,
          borderColor: isDark ? "#333" : "#ccc",
          marginBottom: 12,
        }}
      >
        <Picker
          selectedValue={type}
          onValueChange={(itemValue) => setType(itemValue)}
          dropdownIconColor={isDark ? "#fff" : "#000"}
          style={{
            color: isDark ? "#fff" : "#000",
          }}
        >
          <Picker.Item label="Pilih jenis motor..." value="" />
          <Picker.Item label="Matic" value="Matic" />
          <Picker.Item label="Manual" value="Manual" />
          <Picker.Item label="Kopling" value="Kopling" />
        </Picker>
      </View>

      {/* KM Sekarang */}
      <Text style={{ color: isDark ? "#ccc" : "#000" }}>KM Sekarang</Text>
      <TextInput
        placeholder="Contoh: 12000"
        placeholderTextColor="#888"
        value={km}
        onChangeText={setKm}
        keyboardType="numeric"
        style={inputStyle}
      />

      {/* KM per hari */}
      <Text style={{ color: isDark ? "#ccc" : "#000" }}>
        Rata-rata KM per hari
      </Text>
      <TextInput
        placeholder="Contoh: 20"
        placeholderTextColor="#888"
        value={usage}
        onChangeText={setUsage}
        keyboardType="numeric"
        style={inputStyle}
      />

      {/* Button */}
      <TouchableOpacity
        onPress={handleNext}
        style={{
          backgroundColor: "#007AFF",
          padding: 16,
          borderRadius: 12,
          marginTop: 10,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Lanjut
        </Text>
      </TouchableOpacity>
    </View>
  );
}