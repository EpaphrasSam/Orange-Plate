import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, Card } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const dishes = [
  {
    id: "1",
    imageUrl:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
    name: "Regular Jollof with Grilled Chicken",
    price: "GHC53.20",
    originalPrice: "GHC76.00",
    discount: "-30%",
  },
  {
    id: "2",
    imageUrl:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
    name: "Regular Jollof with Fried Chicken",
    price: "GHC53.20",
    originalPrice: "GHC76.00",
    discount: "-30%",
  },
  {
    id: "3",
    imageUrl:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
    name: "Regular Assorted Jollof",
    price: "GHC53.20",
    originalPrice: "GHC76.00",
    discount: "-30%",
  },
  {
    id: "4",
    imageUrl:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
    name: "Regular Assorted Jollof",
    price: "GHC53.20",
    originalPrice: "GHC76.00",
    discount: "-30%",
  },
  {
    id: "5",
    imageUrl:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
    name: "Regular Assorted Jollof",
    price: "GHC53.20",
    originalPrice: "GHC76.00",
    discount: "-30%",
  },
];

const RestaurantPage = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header with Image and Restaurant Info */}
      <View className="bg-white ">
        <Image
          source={{
            uri: "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
          }}
          className="w-full h-56 "
          resizeMode="cover"
        />
        <View className="p-4 bg-white mt-[-50px] rounded-3xl">
          <Text className="text-2xl font-bold mt-2">Jollof Restaurant</Text>
          <Text className="text-gray-500">
            4.2 (500+) ⭐ Delivery • Scheduling
          </Text>
          <Text className="text-red-600 font-bold">30% off everything</Text>
          <Text className="text-gray-700 mt-1">GH₵0.00 - GH₵9.00</Text>
          <Text className="text-gray-500">25-40 min</Text>
        </View>
      </View>

      {/* Dish List */}
      <View className="px-2">
        {dishes.map((dish) => (
          <View
            key={dish.id}
            className="bg-white rounded-lg shadow mt-4 p-4 flex-row items-center justify-between"
          >
            <Image
              source={{ uri: dish.imageUrl }}
              className="w-20 h-20 rounded-full"
            />
            <View className="flex-1 ml-4">
              <Text className="font-bold text-lg">{dish.name}</Text>
              <Text className="text-green-600">{dish.price}</Text>
              <Text className="text-gray-400 line-through">
                {dish.originalPrice}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default RestaurantPage;
