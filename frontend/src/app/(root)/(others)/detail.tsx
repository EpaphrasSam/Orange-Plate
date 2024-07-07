import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

const detail = {
  id: "1",
  imageUrl:
    "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
  name: "Burger",
  subTitle: "Chicken & Tomato",
  description:
    "It consist of chicken and tomato source; It comes in different packages based on customers taste; Ingredients: Juicy tomatoes, Roasted chicken,",
  price: 25.0,
  readyTime: "20min",
  ingredients: "8 needed",
  serves: "1-2 person",
};

const DetailPage = () => {
  return (
    <ScrollView className="bg-white flex-1">
      <Text className="text-3xl font-bold text-center mt-8 mb-4">Burger</Text>
      <Image
        source={{ uri: detail.imageUrl }}
        className="w-full h-80 rounded-xl"
      />
      <Text className="text-2xl font-bold text-center mt-4">
        {detail.subTitle}
      </Text>
      <Text className="text-xl px-2 mt-2 mx-4">{detail.description}</Text>

      <View className="flex-row justify-evenly items-center mt-4 mb-8">
        <View className="items-center">
          <Text className="text-lg font-semibold">Ready in</Text>
          <Text className="text-lg">{detail.readyTime}</Text>
        </View>
        <View className="items-center">
          <Text className="text-lg font-semibold">Ingredients</Text>
          <Text className="text-lg">{detail.ingredients}</Text>
        </View>
        <View className="items-center">
          <Text className="text-lg font-semibold">Serves</Text>
          <Text className="text-lg">{detail.serves}</Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center mx-6 my-2 p-4">
        <View>
          <Text className="text-lg font-bold">Total Price</Text>
          <Text className="text-2xl font-bold">€{detail.price.toFixed(2)}</Text>
        </View>
        <TouchableOpacity className="bg-yellow-500 px-6 py-2 rounded-full">
          <Text className="text-white text-lg font-bold">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DetailPage;
