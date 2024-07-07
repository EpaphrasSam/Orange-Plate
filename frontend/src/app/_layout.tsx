import "../global.css";
import "@tamagui/core/reset.css";
import { useEffect, useState } from "react";
import { Slot } from "expo-router";
import { TamaguiProvider } from "tamagui";
import { useFonts } from "expo-font";
import tamaguiConfig from "tamagui.config";
import { StatusBar } from "react-native";
import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(root)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      if (fontsLoaded) {
        setAppIsReady(true);
      }
    };

    prepareApp();
  }, [fontsLoaded]);

  if (!appIsReady) {
    return null;
  }
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <StackLayout />
    </TamaguiProvider>
  );
}
