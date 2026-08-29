import { useEffect } from "react";
import { useFonts, Fraunces_700Bold } from "@expo-google-fonts/fraunces";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import { connectStreamUser } from "@/lib/stream";
import { currentUser } from "@/lib/matches";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View, Platform } from "react-native";
import { colors } from "@/lib/theme";
import { AppStateProvider } from "@/lib/app-state";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Fraunces_700Bold,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  useEffect(() => {
    connectStreamUser(currentUser).catch((e) =>
      console.warn("[stream] connect failed:", e?.message),
    );
  }, []);

  useEffect(() => {
    if (Platform.OS === "web") {
      const root = document.getElementById("root");
      if (root) {
        root.style.height = "100%";
        root.style.overflow = "auto";
        root.style.display = "flex";
        root.style.flex = "1";
      }
      document.body.style.overflow = "auto";
      document.body.style.height = "100%";
      document.documentElement.style.height = "100%";
    }
  }, []);

  if (!fontsLoaded)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.paper,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator color={colors.forest} />
      </View>
    );
  return (
    <AppStateProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.paper,
          },
        }}
      />
    </AppStateProvider>
  );
}
