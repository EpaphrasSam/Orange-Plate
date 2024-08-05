import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeCard from "@/components/HomeCard";
// import { ScrollView } from "tamagui";
import { ScrollView } from "react-native-virtualized-view";
import RestaurantCard from "@/components/RestaurantCard";

type Category = {
  id: string;
  title: string;
  Icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

const categories: Category[] = [
  { id: "1", title: "Popular", Icon: "star" },
  { id: "2", title: "Western", Icon: "pizza" },
  { id: "3", title: "Desserts", Icon: "glass-flute" },
  { id: "4", title: "Local", Icon: "food-steak" },
];
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
const imageData = [
  {
    id: "1",
    uri: "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
    label: "Fried Rice",
  },
  {
    id: "2",
    uri: "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
    label: "Jollof Rice",
  },
  {
    id: "3",
    uri: "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
    label: "Pizza",
  },
  {
    id: "4",
    uri: "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
    label: "Burger",
  },
];

// You can now pass `imageData` to the GridImageComponent as follows:

const CategoryMenu = () => (
  <View className="flex flex-row p-3 justify-between">
    {categories.map((category, index) => (
      <View
        key={category.id}
        className="flex flex-col justify-center items-center mb-7"
      >
        <TouchableOpacity
          key={category.id}
          className=" rounded-full w-10 h-10 justify-center items-center border-2  border-yellow-400"
        >
          <MaterialCommunityIcons
            name={category.Icon}
            size={20}
            color="#F29D38"
            className="bg-white rounded-full"
          />
        </TouchableOpacity>
        <Text className="text-center">{category.title}</Text>
      </View>
    ))}
  </View>
);

// App component
const Home = () => {
  const renderItem = ({ item }) => (
    <RestaurantCard
      imageUri={item.imageUri}
      title={item.title}
      rating={item.rating}
    />
  );
  return (
    <SafeAreaView className="bg-white h-full flex ">
      <ScrollView>
        <View className="p-3">
          <View className="w-full h-[180px] rounded-3xl self-center justify-center px-3 mb-2">
            <LinearGradient
              colors={["#F29D38", "rgba(242, 157, 56, 0.5)", "#F29D38"]}
              start={{ x: 0, y: 0 }} // Start of gradient (left side)
              end={{ x: 1, y: 0 }} // End of
              style={{
                alignItems: "center",
                borderRadius: 20,
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Image
                source={require("../../../../assets/img1.png")}
                className="w-3/5 h-full
             self-center  justify-center mb-1 "
                resizeMode="contain"
              />
            </LinearGradient>
          </View>
          <View className="px-4">
            <CategoryMenu />
          </View>
          <View className="px-2">
            <HomeCard images={imageData} />
          </View>
          <View className="px-4">
            <Text className="text-black font-bold text-lg">Restaurants</Text>
          </View>
          <View className="flex-row flex-wrap justify-between mr-2">
            {restaurants.map((item) => (
              <View key={item.id} className="w-6/12  ">
                <RestaurantCard
                  imageUri={item.imageUri}
                  title={item.title}
                  rating={item.rating}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#fff",
  },
  scrollView: {
    marginHorizontal: 10,
  },

  category: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#F29D38",
  },

  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },

  itemContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
  },
});

export default Home;
