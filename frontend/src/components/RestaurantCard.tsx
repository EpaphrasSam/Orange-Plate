import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "tamagui";
import { Link } from "expo-router";
// Ensure you have tailwind-rn setup with your project

const RestaurantCard = ({ imageUri, title, rating }) => {
  // Convert rating to stars
  const renderStars = () => {
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push("⭐");
    }
    return stars.join("");
  };

  return (
    <ScrollView>
      <Link href="/restaurant" asChild>
        <TouchableOpacity>
          <View className="flex flex-row items-center bg-white  rounded-lg drop-shadow-md w-full p-3 ">
            <Image
              source={{ uri: imageUri }}
              style={{ width: 50, height: 50, borderRadius: 25 }} // Circle image
              className="mr-2"
            />
            <View>
              <Text className="text-black font-bold">{title}</Text>
              <Text className="text-yellow-500">{renderStars()}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    </ScrollView>
  );
};

export default RestaurantCard;
