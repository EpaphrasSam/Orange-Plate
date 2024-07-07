import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeCard from "@/components/HomeCard";

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

const data = [
  {
    id: "1",
    title: "Fried Rice",
    imageUrl:
      "https://img.freepik.com/free-photo/grilled-gourmet-burger-with-cheese-tomato-onion-french-fries-generated-by-artificial-intelligence_25030-63181.jpg?t=st=1720015786~exp=1720019386~hmac=f70eb9316d5b98a2abb3e350b0d0d78ca79db534a66a56751f88c340dbee9b9e&w=1380",
  },
  {
    id: "2",
    title: "Jollof Rice",
    imageUrl:
      "C:Users\vamoaDesktopAppsOrange-Plate\frontendsrcassetssplash.png",
  },
  {
    id: "3",
    title: "Pizza",
    imageUrl:
      "C:Users\vamoaDesktopAppsOrange-Plate\frontendsrcassetssplash.png",
  },
  {
    id: "4",
    title: "Burger",
    imageUrl:
      "C:Users\vamoaDesktopAppsOrange-Plate\frontendsrcassetssplash.png",
  },
];

// Header component
const Header = ({ title }: { title: string }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>{title}</Text>
  </View>
);

// Category menu component
const CategoryMenu = () => (
  <View style={styles.menuContainer}>
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

// Cuisine list component
const CuisineList = () => (
  <FlatList
    data={data}
    renderItem={({ item }) => (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    )}
    keyExtractor={(item) => item.id}
  />
);

// App component
const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView style={styles.scrollView}> */}

      <View className="w-full h-[180px] rounded-3xl self-center justify-center px-3 mb-4 ">
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
            source={require("../../../assets/img1.png")}
            className="w-3/5 h-full
             self-center  justify-center mb-1 "
            resizeMode="contain"
          />
        </LinearGradient>
      </View>
      <CategoryMenu />
      <HomeCard images={imageData} />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    marginHorizontal: 10,
  },
  headerContainer: {
    padding: 20,
    backgroundColor: "orange",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  button: {
    borderWidth: 2,
    borderColor: "#F29D38",
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: "black",
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
