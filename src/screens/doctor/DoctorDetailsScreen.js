//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import routes from "../../navigation/routes";

// create a component
const DoctorDetailsScreen = ({ navigation, route }) => {
  const { doctor } = route.params;
  return (
    <View style={styles.container}>
      <Text>DoctorDetailScreen</Text>
      <Button
        onPress={() => {
          console.log(doctor.id);
          navigation.navigate(routes.DOCTOR_WAITING, {
            doctor: doctor,
          });
        }}
      >
        Join
      </Button>
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
export default DoctorDetailsScreen;
