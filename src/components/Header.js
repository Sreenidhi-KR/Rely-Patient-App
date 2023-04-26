import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { List } from "react-native-paper";
import imagePaths from "../constants/imagePaths";

import { AuthContext } from "../context/AuthContext";
import routes from "../navigation/routes";
const Header = () => {
  const navigation = useNavigation();
  const { patientInfo, setPatientInfo } = useContext(AuthContext);
  const text = "";
  return (
    <View>
      <List.Item
        style={{ marginHorizontal: 10 }}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        descriptionStyle={{ color: "gray" }}
        title={`Hello ${
          patientInfo.patientName == null ? text : patientInfo.patientName
        }`}
        description={`How are you feeling today !!`}
        left={(props) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(routes.VIEW_PROFILE);
            }}
          >
            <Image
              source={imagePaths.avatar_man}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity>
        )}
        right={(props) => (
          <TouchableOpacity
            onPress={() => {
              setPatientInfo({});
            }}
          >
            <Image
              source={imagePaths.profile2}
              style={{ width: 45, height: 45 }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Header;
