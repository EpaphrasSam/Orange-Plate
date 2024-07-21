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
  <View className=" ">
    <ImageBackground
      source={image}
      resizeMode="cover"
      className="justify-center w-full h-full"
    >
      <View className="self-center w-4/5 h-[320] bg-slate-50 rounded-lg">
        <Text className="text-black text-2xl font-bold  justify-center mt-4  text-center">
          Sign In
        </Text>
        <View>
          <Text className="text-black text-md  ml-6 mt-4  ">Email</Text>
          <TextInput
            className="text-black text-xl   justify-center mt-2   rounded-lg
          h-12 border-2 border-gray-300 w-5/6 self-center"
          ></TextInput>
          <Text className="text-black text-md   ml-6 mt-4  ">Password</Text>
          <TextInput
            className="text-black text-xl   justify-center mt-2   rounded-lg
          h-12 border-2 border-gray-300 w-5/6 self-center"
          ></TextInput>
        </View>
        <TouchableOpacity className="bg-yellow-400 w-11/12 self-center rounded-lg h-12 border-2 border-gray-300 mt-6 flex items-center justify-center">
          <Text className="text-white text-xl">Log In</Text>
        </TouchableOpacity>

        <Text className="ml-6 mt-4">
          Don't have an account?{" "}
          <Link href="/signup" className="text-yellow-500">
            Sign Up
          </Link>
        </Text>
      </View>
    </ImageBackground>
  </View>
);

export default Login;
