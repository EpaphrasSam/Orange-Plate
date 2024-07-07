import React, { useState } from "react";
import FoodGridComponent from "@/components/CuisineCard";
import { Text, View } from "react-native";

import { SearchComponent } from "@/components/SearchComponent";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-hooks";

const searchClient = algoliasearch("ApplicationID", "SearchOnlyAPIKey");

const foodItems = [
  {
    id: "1",
    title: "Burger",
    subtitle: "Chicken & Tomato",
    price: "$25.00",
    imageUrl:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
  },
  {
    id: "2",
    title: "Pizza",
    subtitle: "Chicken & Tomato",
    price: "$25.00",
    imageUrl:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
  },
  {
    id: "3",
    title: "Fried Rice",
    subtitle: "Chicken & Tomato",
    price: "$25.00",
    imageUrl:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
  },
  {
    id: "4",
    title: "French Fries",
    subtitle: "Chicken & Tomato",
    price: "$25.00",
    imageUrl:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
  },
];

const Cuisine = () => {
  const [search, setSearch] = useState(" ");

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  return (
    <View>
      <Text className="justify-center self-center">Cuisine</Text>
      <View className="flex flex-row justify-evenly">
        <Text>Popular</Text>
        <Text>Burgers</Text>
        <Text>Chicken</Text>
        <Text>Fries</Text>
        <Text></Text>
      </View>

      <FoodGridComponent items={foodItems} />
    </View>
  );
};

export default Cuisine;
