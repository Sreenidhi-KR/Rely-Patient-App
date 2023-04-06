import React, { useEffect } from "react";
import { ActivityIndicator, Text, View, Image } from "react-native";
import imagePaths from "../../constants/imagePaths";

const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <Image source={imagePaths.logobg} style={{ width: 400, height: 200 }} />
    </View>
  );
};

export default SplashScreen;
