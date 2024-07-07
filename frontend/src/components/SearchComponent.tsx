import React, { useRef, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useSearchBox } from "react-instantsearch-hooks-web";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00000080",
    padding: 14,
  },
  input: {
    height: 48,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D9D9D9",
  },
});

export const SearchComponent = (props: any) => {
  const { query, refine } = useSearchBox(props);
  const [searchValue, setSearchValue] = useState(query);
  const inputRef = useRef(null);

  const updateQuery = (newQuery) => {
    setSearchValue(newQuery);
    refine(newQuery);
  };

  if (query !== searchValue && !inputRef.current?.isFocused()) {
    setSearchValue(query);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        ref={inputRef}
        value={searchValue}
        onChangeText={updateQuery}
        clearButtonMode="while-editing"
        placeholder="Search"
      />
    </View>
  );
};
