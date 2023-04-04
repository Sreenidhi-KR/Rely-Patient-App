//import liraries

import React, { useContext } from "react";
import { Image, View } from "react-native";
import { List } from "react-native-paper";
import imagePaths from "../constants/imagePaths";

import { AuthContext } from "../context/AuthContext";
// create a component
const Header = () => {
  const { logout, patientInfo } = useContext(AuthContext);
  return (
    <View>
      <List.Item
        onPress={() => {
          logout();
        }}
        style={{ marginHorizontal: 10 }}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        descriptionStyle={{ color: "gray" }}
        title={`Hello ${patientInfo.patientName}`}
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
