import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
} from "react-native";

// Define the type for the option items
interface Option {
  id: string;
  label: string;
}

// Define the props type for the DropdownMenu component
interface DropdownMenuProps {
  options: Option[];
  onSelect: (option: Option) => void;
  visible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  options,
  onSelect,
  visible,
  setIsVisible,
}) => {
  //   const [isVisible, setIsVisible] = useState<boolean>(true);

  // Function to handle option selection
  const handleSelect = (option: Option) => {
    onSelect(option); // Trigger the passed onSelect function with the selected option
    setIsVisible(false); // Close the dropdown
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setIsVisible(!visible)}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
          className="flex-1 items-center justify-center "
          onPress={() => setIsVisible(false)}
        >
          <View className="bg-white p-5 rounded w-[300px]">
            <FlatList
              data={options}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="p-2 border-b border-gray-300"
                  onPress={() => handleSelect(item)}
                >
                  <Text className="text-base">{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dropdown: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
    width: 300,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 16,
  },
});

export default DropdownMenu;
