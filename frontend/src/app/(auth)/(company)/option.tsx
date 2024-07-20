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

const Login = () => (
  <View className="">
    <ImageBackground
      source={image}
      resizeMode="cover"
      className="justify-center w-full h-full"
    >
      <View className="self-center w-4/5 h-1/3 bg-slate-50 rounded-lg">
        <Text className="text-black text-xl font-bold  justify-center mt-4  text-center">
          Orange Plate
        </Text>
        <View className="items-center justify-center self-center mt-10 px-3">
          <Text className="">
            Welcome to OrangePlate for Restaurants. Serve more, Grow faster.
          </Text>
        </View>

        <View className="flex flex-row w-full justify-center">
          <View className="w-1/2">
            <TouchableOpacity
              className="bg-yellow-400 w-11/12 self-center rounded-lg flex
  h-12 border-2 border-gray-300 mt-6 items-center justify-center"
            >
              <Text className="text-white">Sign In</Text>
            </TouchableOpacity>
          </View>
          <View className="">
            <TouchableOpacity
              className=" self-center  w-11/12 rounded-lg bg-green-400
          h-12   border-2 border-gray-300 mt-6 items-center justify-center"
            >
              <Text className=" text-white">Registration</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  </View>
);

export default Login;
