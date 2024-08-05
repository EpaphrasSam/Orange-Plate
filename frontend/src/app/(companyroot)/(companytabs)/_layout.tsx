import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FCAF01",
        headerShown: false, // Show header
        headerTitle: () => (
          <View className="flex-row items-center justify-between w-full px-4">
            <View className="w-10 h-10"></View>
            {/* Placeholder matching the menu icon size */}
            <Text className="text-xl font-bold flex-1 text-center ">
              OrangePlate
            </Text>
          </View>
        ),
        headerLeft: () => (
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="clipboard-minus-outline"
              size={25}
              color="#F29D38"
              className="bg-white rounded-full p-2"
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="clipboard-minus-outline"
              size={25}
              color="#F29D38"
              className="bg-white rounded-full p-2"
            />
          </TouchableOpacity>
        ), // Show header
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={23} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={23} name="search" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="delivery"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={23} name="heart" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
