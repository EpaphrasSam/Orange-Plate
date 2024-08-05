import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import CartItem from "@/components/CartCard";
import { SafeAreaView } from "react-native";
import { Link } from "expo-router";

// Example cart items data
const cartItems = [
  {
    id: "1",
    imageUrl:
      "https://img.freepik.com/free-photo/delicious-burger-with-fresh-ingredients_23-2150857908.jpg?t=st=1720285212~exp=1720288812~hmac=ff5e528e6464e5fb8d90c68a4fcd1fb717bd1868268307bae5f19b87e9fb8b3e&w=740",
    name: "Burger",
    detail: "Chicken & Tomato",
    price: 25.0,
    quantity: 2,
  },
  {
    id: "2",
    imageUrl:
      "https://img.freepik.com/free-photo/delicious-burger-with-fresh-ingredients_23-2150857908.jpg?t=st=1720285212~exp=1720288812~hmac=ff5e528e6464e5fb8d90c68a4fcd1fb717bd1868268307bae5f19b87e9fb8b3e&w=740",
    name: "Pizza Fries",
    detail: "Chicken & Tomato",
    price: 25.0,
    quantity: 2,
  },
  {
    id: "3",
    imageUrl:
      "https://img.freepik.com/free-photo/delicious-burger-with-fresh-ingredients_23-2150857908.jpg?t=st=1720285212~exp=1720288812~hmac=ff5e528e6464e5fb8d90c68a4fcd1fb717bd1868268307bae5f19b87e9fb8b3e&w=740",
    name: "Fried Rice",
    detail: "Chicken & Tomato",
    price: 25.0,
    quantity: 2,
  },
  {
    id: "4",
    imageUrl:
      "https://img.freepik.com/free-photo/delicious-burger-with-fresh-ingredients_23-2150857908.jpg?t=st=1720285212~exp=1720288812~hmac=ff5e528e6464e5fb8d90c68a4fcd1fb717bd1868268307bae5f19b87e9fb8b3e&w=740",
    name: "Garli & Beans",
    detail: "Chicken & Tomato",
    price: 25.0,
    quantity: 2,
  },
  {
    id: "5",
    imageUrl:
      "https://img.freepik.com/free-photo/delicious-burger-with-fresh-ingredients_23-2150857908.jpg?t=st=1720285212~exp=1720288812~hmac=ff5e528e6464e5fb8d90c68a4fcd1fb717bd1868268307bae5f19b87e9fb8b3e&w=740",
    name: "Fried Rice",
    detail: "Chicken & Tomato",
    price: 25.0,
    quantity: 2,
  },
];

const CartPage = () => {
  const handleIncrement = (id) => {
    // Logic to increment item quantity
  };

  const handleDecrement = (id) => {};

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="flex-row justify-center items-center p-4">
          <Text className="text-2xl font-bold mb-4 ">Cart</Text>
        </View>
        <View className="flex-row border-t border-gray-400 justify-between items-center px-4 mb-2">
          <TouchableOpacity onPress={() => console.log("Select All")}>
            <Text className="text-black-600 m text-lg mt-2">Select All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Delete All")}>
            <Text className="text-black mt-2 text-lg">Delete All</Text>
          </TouchableOpacity>
        </View>
        <View className="" />
        <ScrollView className="flex-grow">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              name={item.name}
              detail={item.detail}
              price={item.price}
              quantity={item.quantity}
              onIncrement={() => handleIncrement(item.id)}
              onDecrement={() => handleDecrement(item.id)}
            />
          ))}
        </ScrollView>
        <View className="p-4 ">
          <View className="flex-row justify-between mb-4">
            <Text className="text-lg">Items:</Text>
            <Text className="text-lg">₵125.00</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-lg">Discounts:</Text>
            <Text className="text-lg">-₵15.00</Text>
          </View>
          <View className="flex-row justify-between mb-2 border-t border-gray-400 pt-2">
            <Text className="text-lg font-bold">Total:</Text>
            <Text className="text-lg font-bold">₵110.00</Text>
          </View>
        </View>
        <TouchableOpacity
          className="p-4 items-center w-40 h-14 self-center rounded-full"
          style={{ backgroundColor: "#FCAF01" }}
        >
          <Text className="text-white text-md font-bold">Checkout</Text>
        </TouchableOpacity>
        <TouchableOpacity className="p-2 items-center">
          <Text className="text-black text-lg">Add More Food</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartPage;
