import { Slot } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { initDB } from "@/database/init";
import { seedParts } from "@/database/seed";

export default function RootLayout() {
  const scheme = useColorScheme();

  useEffect(() => {
    initDB();
    seedParts();
    console.log("DB Initialized");
  }, []);

  return (
    <ThemeProvider value={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <Slot />
    </ThemeProvider>
  );
}