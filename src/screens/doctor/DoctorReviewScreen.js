//import liraries
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ActivityIndicator, Button, Portal, Modal } from "react-native-paper";
import routes from "../../navigation/routes";
import { MaterialIcons } from "@expo/vector-icons";
import { updateDoctorRating } from "../../service/DoctorService";

// create a component
const DoctorReviewScreen = ({ navigation, route }) => {
  const [starRating, setStarRating] = useState(0);
  const [visible, setVisible] = React.useState(true);
  const { doctor } = route.params;

  const updateRating = async() => {
    await updateDoctorRating(doctor.id, starRating);
  };

  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => {
            navigation.replace(routes.HOME);
          }}
          contentContainerStyle={styles.containerStyle}
        >
          <View style={styles.container}>
            <Text style={styles.heading}>
              {/* {starRating ? `${starRating}*` : "Tap to rate"} */}
              Rate your Consultation
            </Text>
            <View style={styles.stars}>
              <TouchableOpacity onPress={() => setStarRating(1)}>
                <MaterialIcons
                  name={starRating >= 1 ? "star" : "star-border"}
                  size={32}
                  style={
                    starRating >= 1
                      ? styles.starSelected
                      : styles.starUnselected
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setStarRating(2)}>
                <MaterialIcons
                  name={starRating >= 2 ? "star" : "star-border"}
                  size={32}
                  style={
                    starRating >= 2
                      ? styles.starSelected
                      : styles.starUnselected
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setStarRating(3)}>
                <MaterialIcons
                  name={starRating >= 3 ? "star" : "star-border"}
                  size={32}
                  style={
                    starRating >= 3
                      ? styles.starSelected
                      : styles.starUnselected
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setStarRating(4)}>
                <MaterialIcons
                  name={starRating >= 4 ? "star" : "star-border"}
                  size={32}
                  style={
                    starRating >= 4
                      ? styles.starSelected
                      : styles.starUnselected
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setStarRating(5)}>
                <MaterialIcons
                  name={starRating >= 5 ? "star" : "star-border"}
                  size={32}
                  style={
                    starRating >= 5
                      ? styles.starSelected
                      : styles.starUnselected
                  }
                />
              </TouchableOpacity>
            </View>

            <Button
              disabled={starRating <= 0}
              mode="contained"
              style={{ marginTop: 50, paddingHorizontal: 50 }}
              onPress={() => {
                console.log("Submite review");
                setVisible(false);
                updateRating();
                navigation.replace(routes.HOME);
              }}
            >
              Submit
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  containerStyle: {
    alignSelf: "center",
    backgroundColor: "white",
    padding: 20,
    height: "40%",
    width: "75%",
    margin: 10,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  starUnselected: {
    color: "#aaa",
  },
  starSelected: {
    color: "#ffb300",
  },
});

//make this component available to the app
export default DoctorReviewScreen;
