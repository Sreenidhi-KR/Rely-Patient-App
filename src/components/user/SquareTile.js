import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const SquareTile = ({ imgSrc, color, text, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View
        style={{
          height: 200,
          width: 170,
          padding: 10,
          margin: 10,
          borderRadius: 20,
          opacity: 10,
          backgroundColor: color,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={imgSrc} style={{ width: 70, height: 70, margin: 20 }} />
        <Text style={{ fontSize: 12 }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

export default SquareTile;
