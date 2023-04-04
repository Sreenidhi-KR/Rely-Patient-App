//import liraries

import React, { useEffect } from "react";
import { Image, View } from "react-native";
import { List } from "react-native-paper";
import imagePaths from "../constants/imagePaths";

// create a component
const Header = () => {
  return (
    <View>
      <List.Item
        onPress={() => {
          logout();
        }}
        style={{ marginHorizontal: 10 }}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        descriptionStyle={{ color: "gray" }}
        title={`Hello Kiran`}
        description={`How are you feeling today !!`}
        left={(props) => (
          <Image
            source={imagePaths.avatar_man}
            style={{ width: 50, height: 50 }}
          />
        )}
      />
    </View>
  );
};

export default Header;
