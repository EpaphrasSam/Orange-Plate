import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";

export default function Layout() {
  const navigation = useNavigation(); // Hook to get navigation object

  const handleLogout = () => {
    // Here you might want to handle any logout logic like clearing tokens
    // navigation.navigate("login"); // Replace 'Login' with your login screen route name
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <Drawer
        screenOptions={{
          headerShown: true,
          headerTitle: () => (
            <View className="flex-row items-center justify-between w-full px-4">
              <View className="w-10 h-10"></View>
              {/* Placeholder matching the menu icon size */}
              <Text className="text-xl font-bold flex-1 text-center mr-10">
                OrangePlate
              </Text>
              <Link href="/bothoption" asChild>
                <TouchableOpacity onPress={handleLogout}>
                  <MaterialCommunityIcons
                    name="logout"
                    size={25}
                    color="#F29D38"
                    className="bg-white rounded-full p-2"
                  />
                </TouchableOpacity>
              </Link>
            </View>
          ),
        }}
      />
    </GestureHandlerRootView>
  );
}
