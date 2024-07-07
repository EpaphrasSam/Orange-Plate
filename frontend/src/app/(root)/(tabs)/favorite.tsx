import React from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import ProductCard from "@/components/ProductCard";
import { Divider } from "react-native-paper";

interface Product {
  imageUri: string;
  detail: string;
  price: number;
}
const products: Product[] = [
  {
    imageUri:
      "https://img.freepik.com/free-photo/burger_1339-1577.jpg?t=st=1719941803~exp=1719945403~hmac=d66834beffc092b48e2307e3db4994527823a35404924c95d169bcbe343b887b&w=1380",
    detail: "Cheese Burger - Chicken & Tomato",
    price: 25.0,
  },
  {
    imageUri:
      "https://img.freepik.com/free-photo/burger_1339-1577.jpg?t=st=1719941803~exp=1719945403~hmac=d66834beffc092b48e2307e3db4994527823a35404924c95d169bcbe343b887b&w=1380",
    detail: "Veggie Burger - Lettuce & Tomato",
    price: 22.0,
  },
  {
    imageUri:
      "https://img.freepik.com/free-photo/burger_1339-1577.jpg?t=st=1719941803~exp=1719945403~hmac=d66834beffc092b48e2307e3db4994527823a35404924c95d169bcbe343b887b&w=1380",
    detail: "Fish Burger - Tartar Sauce & Lettuce",
    price: 27.0,
  },
];
const Favorite = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text className="text-black text-2xl font-bold  justify-center mt-4 mb-10 text-center">
          Favorite
        </Text>
        <Divider bold className="mb-3 " />
        {products.map((product, index) => (
          <ProductCard
            key={index}
            imageUri={product.imageUri}
            detail={product.detail}
            price={product.price}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Favorite;
