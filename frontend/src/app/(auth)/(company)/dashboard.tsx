import React from "react";
import { View, Text } from "react-native";
// Ensure you have tailwind-rn setup with your project

const OrdersCard = () => {
  return (
    <View className="bg-white rounded-lg  w-10/12 self-center shadow-md mt-10">
      <View className="bg-yellow-400 rounded-t-lg p-2">
        <Text className="text-white font-semibold text-center">Orders</Text>
      </View>
      <View className="flex flex-row justify-between items-center px-4 py-4">
        <View className="items-center">
          <Text className="text-3xl font-bold">86</Text>
          <Text className="text-gray-600">Total</Text>
        </View>
        <Text className="text-gray-300 text-3xl">|</Text>
        <View className="items-center">
          <Text className="text-3xl font-bold">48</Text>
          <Text className="flex flex-row items-center text-green-600">
            <Text className="text-green-500 mr-2">✓</Text>
            Approved
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OrdersCard;
