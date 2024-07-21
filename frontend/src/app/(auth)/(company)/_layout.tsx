import { Stack } from "expo-router";

export default function CompanyAuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="register" />
      <Stack.Screen name="login" />
      <Stack.Screen name="option" />
      <Stack.Screen name="dashboard" />
    </Stack>
  );
}
