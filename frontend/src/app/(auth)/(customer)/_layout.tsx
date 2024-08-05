import { Stack } from "expo-router";

export default function CustomerAuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signin" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="customeroption" />
      <Stack.Screen name="bothoption" />
    </Stack>
  );
}
