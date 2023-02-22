//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Routes from "./src/navigation/Router";
const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Routes />
    </View>
  );
};

export default App;
