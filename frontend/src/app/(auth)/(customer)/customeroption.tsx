import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Link } from "expo-router";

const image = require("../../../assets/background2.jpg");
const logo = require("../../../assets/logo.png");

const CustomerOption = () => (
  <View className="">
    <ImageBackground
      source={image}
      resizeMode="cover"
      className="justify-center w-full h-full"
    >
      <View className="self-center w-4/5 h-1/3 p-4 bg-slate-50 rounded-lg">
        <Image
          height={25}
          width={25}
          source={logo}
          resizeMode="cover"
          className="self-center "
        />
        <Text className="text-black text-xl font-bold  justify-center mt-2 text-center">
          Orange Plate
        </Text>
        <View className="items-center justify-center self-center mt-2 px-4 mb-4">
          <Text className="">
            Welcome to OrangePlate for Customers. Serve more, Grow faster.
          </Text>
        </View>

        <View className="flex flex-row w-full justify-between gap-4 items-center px-4">
          <View className="flex-1">
            <TouchableOpacity className="bg-yellow-400 w-full rounded-lg flex h-12 border-2 border-gray-300 items-center justify-center">
              <Link href="/signin" className="text-white">
                Sign In
              </Link>
            </TouchableOpacity>
          </View>
          <View className="flex-1">
            <TouchableOpacity className="bg-green-600 w-full rounded-lg flex h-12 border-2 border-gray-300 items-center justify-center">
              <Link href="/signup" className="text-white">
                Registration
              </Link>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  </View>
);

export default CustomerOption;
