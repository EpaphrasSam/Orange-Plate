import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Image, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FCAF01",
        headerShown: true,
        headerTitle: () => (
          <View className="w-full flex flex-row justify-evenly self-center items-center ">
            <View className="ml-8">
              <Image
                source={require("../../../assets/man.jpg")}
                className="w-10 h-10"
              />
            </View>
            <View>
              <Text className="text-xl font-bold">OrangePlate</Text>
            </View>
            <View>
              <MaterialCommunityIcons
                name="bell"
                size={20}
                color="#F29D38"
                className="bg-white rounded-full"
              />
            </View>
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={23} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={23} name="search" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={23} name="heart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={23} name="shopping-cart" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
