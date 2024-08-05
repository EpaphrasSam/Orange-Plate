import React, { useRef, useState } from "react";
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
import { ScrollView } from "tamagui";
import PhoneInput from "react-native-phone-number-input";

const image = require("../../../assets/background2.jpg");

const SignUp = () => {
  const phoneInput = useRef<PhoneInput>(null);
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  return (
    <View className="">
      <ImageBackground
        source={image}
        resizeMode="cover"
        className="justify-center w-full h-full "
      >
        <View className="h-11/12">
          <ScrollView maxHeight={"100%"} className="self-center px-3">
            <View
              className="self-center w-4/5 align-middle h-[580] bg-slate-50 rounded-xl"
              // style={{ height: 590 }}
            >
              <Text className="text-black text-2xl font-bold  justify-center mt-4  text-center">
                Sign Up
              </Text>
              <View>
                <Text className="text-black text-md   ml-6 mt-4  ">
                  Full name
                </Text>
                <TextInput
                  className="text-black text-xl   justify-center mt-2 px-3  rounded-lg
          h-12 border-2 border-gray-300 w-5/6 self-center"
                ></TextInput>
                <Text className="text-black text-md  ml-6 mt-4  ">Email</Text>
                <TextInput
                  className="text-black text-xl   justify-center mt-2   px-3  rounded-lg
          h-12 border-2 border-gray-300 w-5/6 self-center"
                ></TextInput>
                <Text className="text-black text-md   ml-6 mt-4  ">
                  Password
                </Text>
                <TextInput
                  className="text-black text-xl   justify-center mt-2    px-3 rounded-lg
          h-12 border-2 border-gray-300 w-5/6 self-center"
                ></TextInput>
                <Text className="text-black text-md   ml-6 mt-4  ">
                  Confirm Password
                </Text>
                <TextInput
                  className="text-black text-xl   justify-center mt-2   px-3 rounded-lg
          h-12 border-2 border-gray-300 w-5/6 self-center"
                ></TextInput>
                <Text className="text-black text-md   ml-6 mt-4  ">
                  Phone Number
                </Text>
                <PhoneInput
                  ref={phoneInput}
                  defaultValue={value}
                  defaultCode="DM"
                  layout="first"
                  onChangeText={(text) => {
                    setValue(text);
                  }}
                  onChangeFormattedText={(text) => {
                    setFormattedValue(text);
                  }}
                  withDarkTheme
                  // withShadow
                  // autoFocus
                  containerStyle={{
                    width: "83.3%",
                    justifyContent: "center",
                    alignSelf: "center",
                    borderRadius: 8,
                    borderColor: "#D9D9D9",
                    borderWidth: 2,
                    height: 55,
                    marginTop: 5,
                  }}
                  textInputStyle={{}}
                  // flagButtonStyle={{
                  //   width: 40,
                  //   height: 0,
                  // }}
                  placeholder="Number"
                />
              </View>
              <TouchableOpacity
                className="bg-yellow-400 w-11/12 self-center rounded-lg
          h-12   border-2 border-gray-300 mt-6 items-center justify-items-center"
              >
                <Text className=" text-white text-xl self-center justify-center">
                  Register
                </Text>
              </TouchableOpacity>
              <View className="self-contain items-center mt-3">
                <Text>
                  Already have an account?{" "}
                  <Link href="/login" className="text-yellow-500">
                    Sign in
                  </Link>
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};
export default SignUp;
