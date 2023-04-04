//import liraries
import React, { Component, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AuthContext } from "../../context/AuthContext";

// create a component
const ProfilesScreen = () => {
  const { setBottomBarVisible, patientInfo, setPatientInfo } =
    useContext(AuthContext);

  useEffect(() => {
    setPatientInfo({
      patientId: 1,
    });
    setBottomBarVisible(false);

    return () => {
      setBottomBarVisible(true);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>ProfilesScreen</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default ProfilesScreen;
