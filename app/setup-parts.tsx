import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  useColorScheme,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";

import PartItem from "@/components/Partitem";
import { MotorPart } from "@/types/motor";

import { getPartsByType } from "@/database/repository/partRepo";
import { createMotorWithParts } from "@/database/service";

export default function SetupPartsScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  // 🔹 STATE
  const [partsList, setPartsList] = useState<any[]>([]);
  const [selectedParts, setSelectedParts] = useState<MotorPart[]>([]);
  const [selectedPartId, setSelectedPartId] = useState<number | null>(null);

  // 🔹 AMBIL PARTS SESUAI JENIS MOTOR
  useEffect(() => {
  if (!params.type) return;

  const type = (params.type as string).trim();

  const data = getPartsByType(type);

  console.log("TYPE:", type);
  console.log("PARTS:", data);

  setPartsList(data);
}, [params.type]);

  // 🔹 FILTER PART YANG BELUM DIPILIH
  const availableParts = partsList.filter(
    (p) => !selectedParts.some((sp) => sp.part_id === p.id)
  );

  // 🔹 TAMBAH PART
  const handleAddPart = () => {
    if (!selectedPartId) return;

    setSelectedParts([
      ...selectedParts,
      {
        part_id: selectedPartId,
        status: "baru",
        km_terakhir: null,
      },
    ]);

    setSelectedPartId(null);
  };

  // 🔹 SIMPAN
  const handleSave = () => {
    if (selectedParts.length === 0) {
      Alert.alert("Error", "Pilih minimal 1 bagian");
      return;
    }

    const motorData = {
      name: params.name,
      type: params.type,
      km: Number(params.km),
      usage: Number(params.usage),
    };

    createMotorWithParts(motorData, selectedParts);

    Alert.alert("Berhasil", "Motor berhasil disimpan");
    router.replace("/");
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
        Setup Bagian ({params.type})
      </Text>

      {/* 🔽 DROPDOWN PILIH PART */}
      <View
        style={{
          backgroundColor: isDark ? "#1e1e1e" : "#fff",
          borderRadius: 10,
          borderWidth: 1,
          borderColor: isDark ? "#333" : "#ccc",
          marginBottom: 10,
        }}
      >
        <Picker
          selectedValue={selectedPartId}
          onValueChange={(val) => setSelectedPartId(val)}
          dropdownIconColor={isDark ? "#fff" : "#000"}
          style={{ color: isDark ? "#fff" : "#000" }}
        >
          <Picker.Item label="Pilih Bagian..." value={null} />

          {availableParts.map((p) => (
            <Picker.Item key={p.id} label={p.name} value={p.id} />
          ))}
        </Picker>
      </View>

      {/* ➕ BUTTON TAMBAH */}
      <TouchableOpacity
        onPress={handleAddPart}
        style={{
          backgroundColor: "#007AFF",
          padding: 12,
          borderRadius: 10,
          marginBottom: 16,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          + Tambah Bagian
        </Text>
      </TouchableOpacity>

      {/* 📋 LIST PART DIPILIH */}
      <FlatList
        data={selectedParts}
        keyExtractor={(item) => item.part_id.toString()}
        ListEmptyComponent={() => (
          <Text style={{ color: isDark ? "#aaa" : "#555" }}>
            Belum ada bagian dipilih
          </Text>
        )}
        renderItem={({ item, index }) => {
          const part = partsList.find((p) => p.id === item.part_id);

          return (
            <PartItem
              partName={part?.name}
              data={item}
              onChange={(d: MotorPart) => {
                const newData = [...selectedParts];
                newData[index] = d;
                setSelectedParts(newData);
              }}
            />
          );
        }}
      />

      {/* 💾 SIMPAN */}
      <TouchableOpacity
        onPress={handleSave}
        style={{
          backgroundColor: "#28a745",
          padding: 16,
          borderRadius: 12,
          marginTop: 10,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Simpan Motor
        </Text>
      </TouchableOpacity>
    </View>
  );
}