import React from "react";
import { View, Text, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DashboardScreen = () => {
  return (
    <ScrollView className="bg-white p-6">
      <OrdersCard />
      <FinancialOverviewCard />
      <StatisticsCard />
      <FavoritesCard />
    </ScrollView>
  );
};

const OrdersCard = () => {
  return (
    <View className="bg-white rounded-3xl shadow-md m-4">
      <View className="bg-yellow-400 rounded-t-3xl p-4">
        <Text className="text-black font-bold text-center text-xl">Orders</Text>
      </View>
      <View className="flex flex-row justify-between items-center px-6 py-4">
        <StatBox number="86" label="Total" icon="package-variant-closed" />
        <Text className="text-gray-300 text-4xl">|</Text>
        <StatBox
          number="48"
          label="Approved"
          icon="check-circle-outline"
          iconColor="green"
        />
      </View>
    </View>
  );
};

const FinancialOverviewCard = () => {
  return (
    <View className="bg-white rounded-3xl shadow-md m-4">
      <View className="bg-yellow-400 rounded-t-3xl p-4">
        <Text className="text-black font-bold text-center text-xl">
          Financial Overview
        </Text>
      </View>
      <View className="flex flex-row justify-between items-center px-6 py-4">
        <StatBox number="29617" label="Total Income" icon="currency-usd" />
        <Text className="text-gray-300 text-4xl">|</Text>
        <StatBox number="29617" label="Revenue" icon="bank" />
      </View>
    </View>
  );
};

const StatBox = ({ number, label, icon, iconColor = "black" }) => {
  return (
    <View className="items-center">
      <Text className="text-3xl font-bold">{number}</Text>
      <Text className="text-gray-600 flex flex-row items-center">
        <MaterialCommunityIcons name={icon} size={24} color={iconColor} />
        {label}
      </Text>
    </View>
  );
};

const StatisticsCard = () => {
  return (
    <View className="bg-white rounded-3xl shadow-md m-4 p-4">
      <Text className="text-black font-bold text-xl mb-2">Statistics</Text>
      {/* Placeholder for statistics graph */}
      <View className="h-40 bg-gray-300 rounded-xl flex items-center justify-center">
        <Text className="text-white text-lg">Graph Placeholder</Text>
      </View>
    </View>
  );
};

const FavoritesCard = () => {
  return (
    <View className="bg-white rounded-3xl shadow-md m-4 p-4">
      <Text className="text-black font-bold text-xl mb-2">Favorites</Text>
      <Text className="text-gray-800 text-lg">Pizza [Chicken]</Text>
      <Text className="text-gray-800 text-lg">Gari & Beans</Text>
      <Text className="text-gray-800 text-lg">Jollof Rice</Text>
    </View>
  );
};

export default DashboardScreen;
