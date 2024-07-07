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

const image = require("../../assets/background.jpg");

const SignUp = () => (
  <View className=" justify-center">
    <ImageBackground
      source={image}
      resizeMode="cover"
      className="justify-center w-full h-full"
    >
      {/* <Text className="text-white text-5xl font-bold text-sx justify-center ">
        Inside
      </Text> */}
      <View className="self-center w-4/5 h-3/4 bg-slate-50 rounded-lg">
        <Text className="text-black text-2xl font-bold  justify-center mt-4  text-center">
          Sign Up
        </Text>
        <View>
          <Text className="text-black text-md   ml-6 mt-4  ">Full name</Text>
          <TextInput
            className="text-black text-xl   justify-center mt-2   rounded-lg
          h-12 border-2 border-gray-300 w-5/6 self-center"
          ></TextInput>
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
          <Text className="text-black text-md   ml-6 mt-4  ">
            Confirm Password
          </Text>
          <TextInput
            className="text-black text-xl   justify-center mt-2   rounded-lg
          h-12 border-2 border-gray-300 w-5/6 self-center"
          ></TextInput>
          <Text className="text-black text-md   ml-6 mt-4  ">Phone Number</Text>
          <TextInput
            className="text-black text-xl   justify-center mt-2   rounded-lg
          h-12 border-2 border-gray-300 w-5/6 self-center "
          ></TextInput>
        </View>
        <TouchableOpacity
          className="bg-yellow-400 w-11/12 self-center rounded-lg
          h-12   border-2 border-gray-300 mt-6 items-center justify-items-center"
        >
          <Text className=" text-white text-xl">Register</Text>
        </TouchableOpacity>
        <Text className="ml-6 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-yellow-500">
            {" "}
            Sign in
          </Link>
        </Text>
      </View>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});

export default SignUp;
