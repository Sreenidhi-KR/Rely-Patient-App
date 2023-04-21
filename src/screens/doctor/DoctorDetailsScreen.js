//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button, Chip, FAB } from "react-native-paper";
import routes from "../../navigation/routes";

// create a component
const DoctorDetailsScreen = ({ navigation, route }) => {
  const { doctor, followUp } = route.params;
  console.log(doctor);
  const imageUrl = doctor.photo_url;
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image
          source={require(`../../../assets/general-doc.png`)}
          style={{ width: 100, height: 100, marginRight: 50 }}
        />
        <View style={styles.details}>
          <Text style={{ fontSize: 24, fontStyle: "bold" }}>
            Dr.{doctor.fname} {doctor.lname}
          </Text>
          <Text style={styles.text}>{doctor.qualification}</Text>
          <Text style={styles.text}>{doctor.email}</Text>
          <Text style={styles.text}>
            Sex: {doctor.sex} | Age:{doctor.age}
          </Text>
          <View style={styles.detail}>
            <Chip
              textStyle={{ color: "white", fontSize: 13 }}
              style={styles.textdec}
              compact
            >
              {doctor.specialization}
            </Chip>
            <Chip
              textStyle={{ color: "white", fontSize: 13 }}
              style={styles.textdec}
              compact
            >
              Rating: {doctor.rating}/5
            </Chip>
          </View>
        </View>
      </View>

      <View style={styles.description}>
        <Text style={{ fontSize: 18 }}>About Doctor</Text>
        <Text
          style={{
            color: "grey",
            fontSize: 15,
            textAlign: "justify",
          }}
        >
          {doctor.description}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={{ fontSize: 18 }}>Clinic Address</Text>
        <Text
          style={{
            fontSize: 15,
            color: "grey",
            textAlign: "justify",
          }}
        >
          {doctor.clinic_address}
          {"\n"}
        </Text>
        <Text style={{ fontSize: 18 }}>Location</Text>
        <Text
          style={{
            fontSize: 15,
            textAlign: "justify",
            lineHeight: 15,
            color: "grey",
          }}
        >
          {doctor.city}, {doctor.state}
          {"\n"}
        </Text>
        <Text style={{ fontSize: 18 }}>Timings</Text>
        <Text style={{ fontSize: 15, color: "grey" }}>
          {doctor.available_timings}
          {"\n"}
        </Text>
      </View>
      {doctor.online_status ? (
        // <Button
        //   style={styles.button}
        //   mode="contained"
        //   onPress={() => {
        //     console.log(doctor.id);
        //     navigation.navigate(routes.DOCTOR_WAITING, {
        //       doctor: doctor,
        //     });
        //   }}
        // >
        //   Join Consultation
        // </Button>
        <FAB
          mode="flat"
          label="Join Consultation"
          size="small"
          color="white"
          style={styles.fab}
          onPress={() => {
            navigation.navigate(routes.DOCTOR_WAITING, {
              doctor: doctor,
              followUp,
            });
          }}
        />
      ) : (
        <FAB
          mode="flat"
          label="Doctor Offline"
          size="small"
          color="black"
          style={styles.fab_offline}
          onPress={() => {}}
        />
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // alignItems: "center",
    backgroundColor: "white",
  },
  fab_offline: {
    position: "absolute",
    margin: 16,
    backgroundColor: "#EBEBE4",
    right: 0,
    bottom: 0,
  },
  fab: {
    position: "absolute",
    margin: 16,
    backgroundColor: "#cfa1f7",
    right: 0,
    bottom: 0,
  },
  image: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    margin: 10,
    backgroundColor: "#F5ECFF",
    borderRadius: 10,
    padding: 20,
  },
  details: {
    flexDirection: "column",
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  text: {
    fontSize: 13,
    color: "grey",
  },
  textdec: {
    backgroundColor: "#cfa1f7",
    fontSize: 14,
    color: "black",
    marginEnd: 15,
  },
  description: {
    justifyContent: "center",
    marginTop: "1%",
    marginHorizontal: "1%",
    padding: "5%",
  },

  info: {
    marginHorizontal: "6%",
    justifyContent: "space-evenly",
  },
});

//make this component available to the app
export default DoctorDetailsScreen;
