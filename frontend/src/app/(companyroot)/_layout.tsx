import { Stack } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CompanyLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: () => (
          <View className="flex-1 items-center justify-center">
            <View className="absolute inset-0 flex justify-center">
              <Text className="text-xl font-bold text-center mr-40">
                OrangePlate
              </Text>
            </View>
          </View>
        ),
        headerLeft: () => (
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="clipboard-minus-outline"
              size={25}
              color="#F29D38"
              className="ml-4 bg-white rounded-full p-2"
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="clipboard-minus-outline"
              size={25}
              color="#F29D38"
              className="mr-4 bg-white rounded-full p-2"
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="dashboard"
        options={{
          headerShown: false,
          contentStyle: { paddingTop: 0 },
        }}
      />
    </Stack>
  );
}
