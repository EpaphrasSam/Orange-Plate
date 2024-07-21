import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

type FoodItem = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  imageUrl: string;
};

type Props = {
  items: FoodItem[];
};

const FoodGridComponent: React.FC<Props> = ({ items }) => {
  console.log(items);
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.imageUrl }}
        style={{
          width: "100%",
          height: 150,
          resizeMode: "cover",
        }}
      />
      <View style={{ position: "absolute", top: 10, right: 10 }}>
        <Feather name="heart" size={24} color="red" />
      </View>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 16,
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        {item.title}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: "gray",
          marginHorizontal: 10,
        }}
      >
        {item.restaurants}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: "#FF6347",
            fontWeight: "bold",
          }}
        >
          {item.price}
        </Text>
        {/* <TouchableOpacity>
          <MaterialCommunityIcons name="menu-down" size={24} color="black" />
        </TouchableOpacity> */}
      </View>
    </View>
  );

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  card: {
    width: "45%",
    backgroundColor: "#FCAF01",
    borderRadius: 10,
    margin: 10,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
});

export default FoodGridComponent;
