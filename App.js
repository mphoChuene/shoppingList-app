import React from "react";
import { Provider } from "react-redux"; // Import Provider from react-redux
import { StatusBar } from "expo-status-bar";
import ItemsListScreen from "./Screens/itemsListScreen";
import { StyleSheet, Text, View } from "react-native";
import store from "./Redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <View>
        <ItemsListScreen />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}
