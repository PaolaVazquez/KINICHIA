import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../global.css";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    NexaHeavy: require("../assets/fonts/Nexa-Heavy.ttf"),
    NexaExtraLight: require("../assets/fonts/Nexa-ExtraLight.ttf"),
    MontserratRegular: require("../assets/fonts/Montserrat-Regular.otf"),
    MontserratMedium: require("../assets/fonts/Montserrat-Medium.otf"),
    MontserratBold: require("../assets/fonts/Montserrat-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
