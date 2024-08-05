import React from "react";
import {
  ImageBackground,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";

const image = require("../../assets/background2.jpg");
const logo = require("../../assets/logo.png");

const RestaurantCustomer = () => (
  <View className="flex-1">
    <ImageBackground
      source={image}
      resizeMode="cover"
      className="w-full h-full justify-center items-center"
    >
      <View className="w-4/5 h-2/5 p-4 bg-slate-50 rounded-lg items-center">
        <Image
          source={logo}
          style={{ height: 50, width: 50, resizeMode: "cover" }}
        />
        <Text className="text-black text-xl font-bold mt-4 text-center">
          Orange Plate
        </Text>
        <Text className="text-center mt-4">
          Welcome to OrangePlate for Restaurants and Customers. Serve more, Grow
          faster.
        </Text>

        <View className="w-full px-2 mt-6 ">
          <TouchableOpacity className="bg-yellow-400 rounded-lg flex h-12 items-center justify-center mb-4 border-2 border-gray-300">
            <Link
              href="/customeroption"
              className=" items-center justify-center"
            >
              <Text className="text-white text-center">Customer</Text>
            </Link>
          </TouchableOpacity>
          <TouchableOpacity className="bg-green-600 rounded-lg flex h-12 items-center justify-center border-2 border-gray-300">
            <Link
              href="/companyoption"
              className=" items-center justify-center"
            >
              <Text className="text-white text-center">Restaurant</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  </View>
);

export default RestaurantCustomer;
