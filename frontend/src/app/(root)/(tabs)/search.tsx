import React, { useState } from "react";
import FoodGridComponent from "@/components/CuisineCard";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RestaurantCard from "@/components/RestaurantCard";

const restaurants = [
  {
    id: 1,
    imageUri:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
    title: "Pizzaman",
    rating: 4,
  },
  {
    id: 2,
    imageUri:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
    title: "Chickenman",
    rating: 5,
  },
  {
    id: 3,
    imageUri:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
    title: "Burger Boss",
    rating: 3,
  },
  {
    id: 4,
    imageUri:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
    title: "Sushi Star",
    rating: 5,
  },
  {
    id: 5,
    imageUri:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
    title: "Taco Time",
    rating: 4,
  },
];

const foodItems = [
  {
    id: "1",
    title: "Burger",
    subtitle: "Chicken & Tomato",
    price: "$25.00",
    imageUrl:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
    restaurants: "Pice",
  },
  {
    id: "2",
    title: "Pizza",
    subtitle: "Chicken & Tomato",
    price: "$25.00",
    imageUrl:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
    restaurants: "Pice",
  },
  {
    id: "3",
    title: "Fried Rice",
    subtitle: "Chicken & Tomato",
    price: "$25.00",
    imageUrl:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
    restaurants: "Pice",
  },
  {
    id: "4",
    title: "French Fries",
    subtitle: "Chicken & Tomato",
    price: "$25.00",
    imageUrl:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
    restaurants: "Pice",
  },
];

const Search = () => {
  const [search, setSearch] = useState(" ");

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  return (
    <View>
      <ScrollView>
        <View className="self-center justify-center w-4/5 flex flex-row mb-10 mt-10">
          <View className="flex flex-row border-2 border-gray-300 w-full justify-between self-center px-10  rounded-3xl">
            <TextInput
              placeholder="Search for dishes"
              placeholderTextColor="#A9A9A9"
              style={{ flex: 1, padding: 10, fontSize: 16, color: "gray" }}
              className="flex-1 px-8  text-10 text-gray-300"
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
            className="self-center ml-2  bg-yellow-500 rounded-full "
          />
        </View>
        <View className="px-4">
          <Text className="text-black font-bold text-lg">Restaurants</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View>
            <View className="p-4 flex flex-row gap-4">
              {restaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  imageUri={restaurant.imageUri}
                  title={restaurant.title}
                  rating={restaurant.rating}
                />
              ))}
            </View>
          </View>
        </ScrollView>
        <View className="px-4">
          <Text className="text-black font-bold text-lg">Cuisines</Text>
        </View>

        <FoodGridComponent items={foodItems} />
      </ScrollView>
    </View>
  );
};

export default Search;
