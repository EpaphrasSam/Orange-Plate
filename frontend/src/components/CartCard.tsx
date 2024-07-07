import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type CartItemProps = {
  id: string;
  imageUrl: string;
  name: string;
  detail: string;
  price: number;
  quantity: number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
};

const CartItem: React.FC<CartItemProps> = ({
  id,
  imageUrl,
  name,
  detail,
  price,
  quantity,
  onIncrement,
  onDecrement,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View className="flex-row items-center p-2  border-gray-300">
      <TouchableOpacity onPress={toggleCheckbox} className="mr-2">
        <MaterialCommunityIcons
          name={isChecked ? "checkbox-marked" : "checkbox-blank-outline"}
          size={24}
          color={isChecked ? "orange" : "gray"}
          className="mr-2"
        />
      </TouchableOpacity>
      <Image
        style={{ borderRadius: 20 }}
        source={{ uri: imageUrl }}
        className="w-20 h-20 rounded-2xl mr-4 object-contain"
      />
      <View className="flex-1">
        <Text className="text-lg font-bold">{name}</Text>
        <Text className="text-gray-500 text-sm">{detail}</Text>
        <Text className="text-black font-bold" style={{ color: "#FCAF01" }}>
          ₵ {price.toFixed(2)}
        </Text>
      </View>
      <View
        className="flex-row items-center gap-2 justify-evenly rounded-[10px] "
        style={{ backgroundColor: "#D9D9D9", height: 30 }}
      >
        <TouchableOpacity onPress={() => onDecrement(id)} className="px-1">
          <MaterialCommunityIcons
            name="minus"
            size={15}
            color="black"
            className="bg-white rounded-full"
          />
        </TouchableOpacity>
        <Text className=" bg-white px-1 rounded-full">{quantity}</Text>
        <TouchableOpacity onPress={() => onIncrement(id)} className="px-1">
          <MaterialCommunityIcons
            name="plus"
            size={15}
            color="black"
            className="bg-white rounded-full"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;
