import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { useMotorFormStore } from "@/store/motorFormStore";

export default function AddMotorScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const { name, type, km, usage, setForm } = useMotorFormStore();

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
    if (!name || !type || !km || !usage) {
      Alert.alert("Error", "Semua field harus diisi");
      return;
    }

    router.push("/setup-parts");
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: isDark ? "#121212" : "#f5f5f5",
      }}
    >

      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 40, marginRight: 6, color : "#007AFF" }}>←</Text>

      </TouchableOpacity>

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

      {/* Nama */}
      <Text style={{ color: isDark ? "#ccc" : "#000" }}>
        Nama Motor
      </Text>
      <TextInput
        placeholder="Contoh: Beat 2022"
        placeholderTextColor="#888"
        value={name}
        onChangeText={(val) => setForm({ name: val })}
        style={inputStyle}
      />

      {/* Jenis */}
      <Text style={{ color: isDark ? "#ccc" : "#000" }}>
        Jenis Motor
      </Text>
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
          onValueChange={(val) => setForm({ type: val })}
          dropdownIconColor={isDark ? "#fff" : "#000"}
          style={{ color: isDark ? "#fff" : "#000" }}
        >
          <Picker.Item label="Pilih jenis motor..." value="" />
          <Picker.Item label="Matic" value="Matic" />
          <Picker.Item label="Manual" value="Manual" />
          <Picker.Item label="Kopling" value="Kopling" />
        </Picker>
      </View>

      {/* KM */}
      <Text style={{ color: isDark ? "#ccc" : "#000" }}>
        KM Sekarang
      </Text>
      <TextInput
        placeholder="Contoh: 12000"
        placeholderTextColor="#888"
        value={km}
        onChangeText={(val) => setForm({ km: val })}
        keyboardType="numeric"
        style={inputStyle}
      />

      {/* Usage */}
      <Text style={{ color: isDark ? "#ccc" : "#000" }}>
        Rata-rata KM per hari
      </Text>
      <TextInput
        placeholder="Contoh: 20"
        placeholderTextColor="#888"
        value={usage}
        onChangeText={(val) => setForm({ usage: val })}
        keyboardType="numeric"
        style={inputStyle}
      />

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