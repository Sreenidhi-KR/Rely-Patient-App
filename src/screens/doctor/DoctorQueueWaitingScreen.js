//import liraries
import React, { Component, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import {
  addAndGetIndexFromQueue,
  getPatientIndexFromQueue,
  removePatientFromQueue,
} from "../../service/DoctorService";
import routes from "../../navigation/routes";
import SquareTile from "../../components/user/SquareTile";

// create a component
const DoctorQueueWaitingScreen = ({ navigation, route }) => {
  const { doctor } = route.params;
  const [index, setIndex] = useState(null);
  const patientId = 1;
  var interval;

  const refreshPatientIndex = () => {
    getPatientIndexFromQueue(doctor.id, patientId, setIndex);
  };

  const removePatient = () => {
    removePatientFromQueue(doctor.id, patientId);
  };

  useEffect(() => {
    addAndGetIndexFromQueue(doctor.id, patientId, setIndex);

    interval = setInterval(() => {
      getPatientIndexFromQueue(doctor.id, patientId, setIndex);
    }, 30000);

    return () => {
      console.log("Interval Cleared");
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.squareTiles}>
        <SquareTile
          imgSrc={null}
          imgAlt={index}
          color={"#F5EDF8"}
          text={"Position in Queue"}
          onPress={() => {
            refreshPatientIndex();
          }}
        />
      </View>
      {index == 1 ? (
        <Button
          mode="contained"
          style={{ width: 150 }}
          onPress={() => {
            console.log("Interval Cleared");
            clearInterval(interval);
            navigation.navigate(routes.VIDEO, {
              doctor: doctor,
            });
          }}
        >
          Join Video Call
        </Button>
      ) : (
        <View>
          <Text> Please wait for your turn </Text>
        </View>
      )}
      <Button
        mode="contained"
        style={{ width: 150, marginTop: 10 }}
        buttonColor="red"
        textColor="white"
        onPress={() => {
          console.log("Interval Cleared");
          clearInterval(interval);
          removePatient();
          navigation.navigate(routes.HOME, {
            doctor: doctor,
          });
        }}
      >
        Leave Queue
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
    backgroundColor: "white",
    fontSize: 25,
  },
  squareTiles: {
    flexDirection: "row",
    width: "100%",
    height: "30%",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});

//make this component available to the app
export default DoctorQueueWaitingScreen;
