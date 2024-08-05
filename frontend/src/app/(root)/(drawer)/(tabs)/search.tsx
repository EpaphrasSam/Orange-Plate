import React, { useState } from "react";
import FoodGridComponent from "@/components/CuisineCard";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
  Modal,
  StyleSheet,
  Alert,
  Button,
  FlatList,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RestaurantCard from "@/components/RestaurantCard";
import { Link } from "expo-router";
import DropdownMenu from "@/components/Dropdown";
import { ScrollView } from "react-native-virtualized-view";

const restaurants = [
  {
    id: 1,
    imageUri:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
    title: "Pizzaman",
    rating: 4,
  },
  {
    id: 2,
    imageUri:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
    title: "Chickenman",
    rating: 5,
  },
  {
    id: 3,
    imageUri:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
    title: "Burger Boss",
    rating: 3,
  },
  {
    id: 4,
    imageUri:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
    title: "Sushi Star",
    rating: 5,
  },
  {
    id: 5,
    imageUri:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
    title: "Taco Time",
    rating: 4,
  },
];

const foodItems = [
  {
    id: "1",
    title: "Burger",
    subtitle: "Chicken & Tomato",
    price: "$25.00",
    imageUrl:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
    restaurants: "Pice",
  },
  {
    id: "2",
    title: "Pizza",
    subtitle: "Chicken & Tomato",
    price: "$25.00",
    imageUrl:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
    restaurants: "Pice",
  },
  {
    id: "3",
    title: "Fried Rice",
    subtitle: "Chicken & Tomato",
    price: "$25.00",
    imageUrl:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
    restaurants: "Pice",
  },
  {
    id: "4",
    title: "French Fries",
    subtitle: "Chicken & Tomato",
    price: "$25.00",
    imageUrl:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
    restaurants: "Pice",
  },
];

const Search = () => {
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    { id: "1", label: "Option 1" },
    { id: "2", label: "Option 2" },
    { id: "3", label: "Option 3" },
    // Add more options here
  ];

  const handleSelect = (option: { id: string; label: string }) => {
    console.log("Selected:", option.label);
  };

  const DisplayModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setModalVisible(false); // Optionally close the modal on selection
  };

  const updateSearch = (text) => {
    setSearch(text.toLowerCase());
  };

  // Filter restaurants based on search text
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.title.toLowerCase().includes(search)
  );
  const filteredFoodItems = foodItems.filter((item) =>
    item.title.toLowerCase().includes(search)
  );

  return (
    <View>
      <ScrollView>
        <View className="self-center justify-center w-4/5 flex flex-row mb-10 mt-10">
          <View className="flex flex-row border-2 border-gray-300 w-full justify-between self-center px-10  rounded-3xl">
            <MaterialCommunityIcons
              name="magnify"
              size={24}
              color="#F29D38"
              className="self-center"
            />
            <TextInput
              placeholder="Search for dishes"
              placeholderTextColor="#A9A9A9"
              style={{ flex: 1, padding: 10, fontSize: 16, color: "gray" }}
              className="flex-1 px-8  text-10 text-gray-300"
              onChangeText={updateSearch} // Set the onChangeText prop
              value={search} // Bind the TextInput value to the state
              clearButtonMode="while-editing" // Adds a clear button
            />
          </View>
          <View
            className="self-center
           ml-2"
          >
            <TouchableOpacity onPress={DisplayModal}>
              <MaterialCommunityIcons
                name="menu"
                size={40}
                color="white"
                className="self-center ml-2  bg-yellow-500 rounded-xl"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {modalVisible && (
            <DropdownMenu
              options={items}
              onSelect={handleSelect}
              visible={modalVisible}
              setIsVisible={setModalVisible}
            />
          )}
          {/* {modalVisible && (
            <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible}
              className="h-40 w-60"
              onRequestClose={() => {
                setModalVisible(!modalVisible); // Handle closing of the modal
              }}
            >
              <View
                className="w-40 h-40"
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 5,
                  }}
                >
                  <Text>Modal is open!</Text>
                  <Button
                    title="Close Modal"
                    onPress={() => setModalVisible(false)}
                  />
                </View>
              </View>
            </Modal>
          )} */}
        </View>

        <View className="px-4">
          <Text className="text-black font-bold text-lg">Restaurants</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View>
            <View className="p-4 flex flex-row gap-7">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  imageUri={restaurant.imageUri}
                  title={restaurant.title}
                  rating={restaurant.rating}
                />
              ))}
            </View>
          </View>
        </ScrollView>
        <View className="px-4">
          <Text className="text-black font-bold text-lg">Cuisines</Text>
        </View>
        <Link href="/favorite" asChild>
          <FoodGridComponent items={filteredFoodItems} />
        </Link>
      </ScrollView>
    </View>
  );
};

export default Search;
