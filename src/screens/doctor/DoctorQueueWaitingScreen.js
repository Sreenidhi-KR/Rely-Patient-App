//import liraries
import React, { Component, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { addAndGetIndexFromQueue } from "../../service/DoctorService";
import routes from "../../navigation/routes";

// create a component
const DoctorQueueWaitingScreen = ({ navigation, route }) => {
  const { doctor } = route.params;
  const [index, setIndex] = useState(0);
  const patientId = 1;

  useEffect(() => {
    addAndGetIndexFromQueue(doctor.id, patientId, setIndex);
  }, []);
  return (
    <View style={styles.container}>
      <Text>Position in the Queue</Text>
      <Text style={{ fontSize: 25 }}>{index}</Text>
      {index == 1 ? (
        <Button
          onPress={() => {
            console.log(doctor.id);
            navigation.navigate(routes.VIDEO, {
              doctor: doctor,
            });
          }}
        >
          {" "}
          JOIN
        </Button>
      ) : null}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    fontSize: 25,
  },
});

//make this component available to the app
export default DoctorQueueWaitingScreen;
