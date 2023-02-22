//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Router from "./src/navigation/Router";
import { Provider as PaperProvider } from "react-native-paper";
const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <PaperProvider>
        <Router />
      </PaperProvider>
    </View>
  );
};

export default App;
