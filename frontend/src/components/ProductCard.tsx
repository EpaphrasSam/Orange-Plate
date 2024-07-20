import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";

type ProductCardProps = {
  imageUri: string;
  detail: string;
  price: number;
};

const ProductCard = ({ imageUri, detail, price }: ProductCardProps) => {
  return (
    <View className="rounded-lg bg-yellow-500 truncate w-4/5 self-center mb-20 shadow-xl">
      <Image source={{ uri: imageUri }} className="w-full h-48" />
      <Text style={styles.detailText}>{detail}</Text>
      <Text style={styles.priceText}>₵{price.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FCAF01",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    width: 250, // Adjust the width as needed
    alignSelf: "center",
    marginBottom: 30,
  },
  image: {
    width: "100%",
    height: 150, // Adjust height as needed
  },
  detailText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginTop: 8,
  },
  priceText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    marginBottom: 8,
  },
});

export default ProductCard;
