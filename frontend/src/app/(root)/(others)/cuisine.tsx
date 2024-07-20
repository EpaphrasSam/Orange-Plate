import React, { useState } from "react";
import FoodGridComponent from "@/components/CuisineCard";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const foodItems = [
  {
    id: "1",
    title: "Burger",
    subtitle: "Chicken & Tomato",
    price: "$25.00",
    imageUrl:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
  },
  {
    id: "2",
    title: "Pizza",
    subtitle: "Chicken & Tomato",
    price: "$25.00",
    imageUrl:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
  },
  {
    id: "3",
    title: "Fried Rice",
    subtitle: "Chicken & Tomato",
    price: "$25.00",
    imageUrl:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
  },
  {
    id: "4",
    title: "French Fries",
    subtitle: "Chicken & Tomato",
    price: "$25.00",
    imageUrl:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
  },
];

const Cuisine = () => {
  const [search, setSearch] = useState(" ");

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  return (
    <View>
      <Text className="text-black text-2xl font-bold  justify-center mt-10 mb-10 text-center ">
        Cuisine
      </Text>
      <View className="flex flex-row justify-evenly mb-10">
        <TouchableOpacity>
          <Text className="bg-yellow-500 px-6 py-2 rounded-full text-white">
            Popular
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="font-bold">Burgers</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="font-bold">Chicken</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="font-bold">Fries</Text>
        </TouchableOpacity>
      </View>
      <View className="self-center justify-center w-4/5 flex flex-row">
        <View className="flex flex-row border-2 border-gray-300 w-full justify-between self-center px-10 rounded-3xl">
          <TextInput
            placeholder="Search for dishes"
            placeholderTextColor="#A9A9A9"
            style={{ flex: 1, padding: 10, fontSize: 16, color: "gray" }}
            className="flex-1 px-8 text-10 text-gray-300"
          />
          <MaterialCommunityIcons
            name="magnify"
            size={24}
            color="#F29D38"
            className="self-center"
          />
        </View>
        <MaterialCommunityIcons
          name="menu"
          size={30}
          color="white"
          className="self-center ml-2 bg-yellow-500 rounded-full "
        />
      </View>

      <FoodGridComponent items={foodItems} />
    </View>
  );
};

export default Cuisine;
