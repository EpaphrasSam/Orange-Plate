import { Stack } from "expo-router";

export default function CompanyAuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(company)" />
      <Stack.Screen name="(customer)" />
    </Stack>
  );
}
