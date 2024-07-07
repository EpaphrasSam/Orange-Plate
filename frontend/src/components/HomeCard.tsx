import React from "react";
import { View, Image, StyleSheet, Text, FlatList } from "react-native";

type Props = {
  images: Array<{
    uri: string;
    label: string;
  }>;
};

const HomeCard = ({ images }: Props) => {
  return (
    <FlatList
      data={images}
      renderItem={({ item }) => (
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.uri }} style={styles.image} />
          <Text style={styles.label}>{item.label}</Text>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      columnWrapperStyle={styles.row}
    />
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    margin: 5,

    // overflow: "hidden",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 6,
    // elevation: 5,
  },
  image: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
    borderRadius: 10,
  },
  label: {
    backgroundColor: "white",
    color: "black",
    textAlign: "center",
    paddingVertical: 5,
    fontWeight: "bold",
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
  },
});

export default HomeCard;
