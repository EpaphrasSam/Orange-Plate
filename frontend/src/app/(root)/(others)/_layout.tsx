import { Stack } from "expo-router";

export default function OtherLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="cuisine" />
      <Stack.Screen name="detail" />
      <Stack.Screen name="restaurant" />
    </Stack>
  );
}
