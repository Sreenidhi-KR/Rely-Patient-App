//import liraries
import React, { Component, useContext } from "react";
import { Image, StyleSheet, View } from "react-native";
import { List } from "react-native-paper";
import { AuthContext } from "../../context/AuthContext";

// create a component
const Header = () => {
  const { logout, userInfo } = useContext(AuthContext);
  console.log(userInfo);
  return (
    <View>
      <List.Item
        onPress={() => {
          logout();
        }}
        style={{ marginHorizontal: 10 }}
        titleStyle={{ color: "black" }}
        descriptionStyle={{ color: "gray" }}
        title={`Hello Kiran`}
        description={`How are you feeling today !!`}
        left={(props) => (
          <Image
            source={require(`../../../assets/man.png`)}
            style={{ width: 50, height: 50 }}
          />
        )}
      />
    </View>
  );
};

export default Header;
