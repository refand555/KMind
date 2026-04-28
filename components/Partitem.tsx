import { View, Text, TextInput, TouchableOpacity, useColorScheme } from "react-native";

export default function PartItem({ partName, data, onChange }: any) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  return (
    <View
      style={{
        backgroundColor: isDark ? "#1e1e1e" : "#fff",
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
      }}
    >
      <Text style={{ fontWeight: "bold", color: isDark ? "#fff" : "#000" }}>
        {partName}
      </Text>

      <View style={{ flexDirection: "row", marginTop: 8 }}>
        <TouchableOpacity onPress={() => onChange({ ...data, status: "baru" })}>
          <Text style={btn}>Baru</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onChange({ ...data, status: "input_km" })}>
          <Text style={btn}>Tahu KM</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onChange({ ...data, status: "tidak_tahu" })}>
          <Text style={btn}>Tidak Tahu</Text>
        </TouchableOpacity>
      </View>

      {data.status === "input_km" && (
        <TextInput
          placeholder="KM terakhir"
          placeholderTextColor="#888"
          keyboardType="numeric"
          style={{
            backgroundColor: isDark ? "#2a2a2a" : "#eee",
            color: isDark ? "#fff" : "#000",
            padding: 10,
            borderRadius: 8,
            marginTop: 8,
          }}
          onChangeText={(val) =>
            onChange({ ...data, km_terakhir: Number(val) })
          }
        />
      )}
    </View>
  );
}

const btn = {
  marginRight: 10,
  backgroundColor: "#007AFF",
  color: "#fff",
  padding: 6,
  borderRadius: 6,
};