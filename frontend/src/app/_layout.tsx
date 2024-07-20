import "../global.css";
import "@tamagui/core/reset.css";
import { useEffect, useState } from "react";
import { Slot } from "expo-router";
import { TamaguiProvider } from "tamagui";
import { useFonts } from "expo-font";
import tamaguiConfig from "tamagui.config";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(root)"
        options={{
          headerShown: false,
          contentStyle: { paddingTop: 0 },
        }}
      />
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
      // Prevent the splash screen from auto-hiding
      await SplashScreen.preventAutoHideAsync();

      if (fontsLoaded) {
        setAppIsReady(true);

        setTimeout(async () => {
          // Hide the splash screen once the app is ready
          await SplashScreen.hideAsync();
        }, 500); // you can control the delay here
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
