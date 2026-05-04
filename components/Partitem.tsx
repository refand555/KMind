import { View, Text, TouchableOpacity, TextInput, useColorScheme } from "react-native";
import { PartStatus, MotorPart } from "@/types/motor";

interface Props {
  partName: string;
  data: MotorPart;
  onChange: (data: MotorPart) => void;
}

export default function PartItem({ partName, data, onChange }: Props) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const statuses: { label: string; value: PartStatus }[] = [
  { label: "Baru Ganti", value: "Baru Ganti" },
  { label: "Baru Ganti di KM", value: "Baru Ganti di KM" },
  { label: "Tidak Tahu", value: "Tidak Tahu" },
];

  const handleSelect = (value: PartStatus) => {
  onChange({
    ...data,
    status: value,
    km_terakhir:
      value === "Baru Ganti di KM" ? data.km_terakhir : null,
  });
};

  return (
    <View
      style={{
        backgroundColor: isDark ? "#1e1e1e" : "#fff",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
      }}
    >
      {/* Nama Part */}
      <Text
        style={{
          fontWeight: "bold",
          marginBottom: 10,
          color: isDark ? "#fff" : "#000",
        }}
      >
        {partName}
      </Text>

      {/* STATUS BUTTON */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {statuses.map((s) => {
          const active = data.status === s.value;

          return (
            <TouchableOpacity
              key={s.value}
              onPress={() => handleSelect(s.value)}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 8,
                backgroundColor: active
                  ? "#333"
                  : isDark
                  ? "#2a2a2a"
                  : "#eee",
                borderWidth: 1,
                borderColor: active ? "#555" : "#ccc",
              }}
            >
              <Text
                style={{
                  color: active ? "#fff" : isDark ? "#ccc" : "#333",
                  fontSize: 12,
                }}
              >
                {s.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* INPUT KM (HANYA JIKA TAHU KM) */}
      {data.status === "Baru Ganti di KM" && (
        <TextInput
          placeholder="Masukkan KM terakhir"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={data.km_terakhir?.toString() ?? ""}
          onChangeText={(val) =>
            onChange({
              ...data,
              km_terakhir: val ? Number(val) : null,
            })
          }
          style={{
            marginTop: 12,
            backgroundColor: isDark ? "#2a2a2a" : "#fff",
            borderRadius: 8,
            borderWidth: 1,
            borderColor: isDark ? "#444" : "#ccc",
            padding: 10,
            color: isDark ? "#fff" : "#000",
          }}
        />
      )}
    </View>
  );
}