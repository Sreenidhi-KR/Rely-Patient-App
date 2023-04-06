//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button, Badge } from "react-native-paper";
import routes from "../../navigation/routes";

// create a component
const DoctorDetailsScreen = ({ navigation, route }) => {
  const { doctor } = route.params;
  console.log(doctor);
  const imageUrl = doctor.photo_url;
  const description = "Hi I'm an experienced and highly qualified physician with a passion for providing top-notch medical care to patients, I believe in open and honest communication with patients to achieve the best possible health outcomes."
  return (
    <View style={styles.container}>
      <View style={styles.image}>
      <Image
          source={imageUrl ? {uri: imageUrl} : require(`../../../assets/general-doc.png`)}
          style={{ width: 100, height: 100 }}/>
          <View style={styles.details}>
            <Text style={{fontSize:24, fontStyle:"bold"}}>Dr.{doctor.fname} {doctor.lname}</Text>
            <Text style={styles.text}>{doctor.qualification}</Text>
            <Text style={styles.text}>{doctor.email}</Text>
            <View style={styles.detail}>
            <Badge style={styles.textdec}>{doctor.specialization}</Badge>
            <Badge style={styles.textdec}>Rating: {doctor.rating}/5</Badge>
          </View>
          </View>
      </View>
      
      <View style={styles.description}>
        <Text style={{fontSize: 16, fontFamily: "Sans-sherif"}}>{description}</Text>
      </View>
      <Button style={styles.button}
        mode="contained"
        onPress={() => {
          console.log(doctor.id);
          navigation.navigate(routes.DOCTOR_WAITING, {
            doctor: doctor,
          });
        }}
      >
        Join For Consultation
      </Button>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    backgroundColor: "white",
    fontSize: 25,
  },
  image:{
    flexDirection:"row",
    flexWrap: "wrap",
    alignItems: "stretch",
    marginStart: "-5%",
    marginTop: "10%",
    marginRight: "-5%",
    // marginBottom: "5%",
    backgroundColor: "#F5ECFF",
    borderRadius: 10,
    padding: "3%",
  },
  details: {
    flexDirection: "column",
    marginStart: "8%",
    marginRight: "5%",
  },
  detail:{
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: "5%",
    // paddingEnd: "5%"
  },
  text: {
    fontSize:16,
    fontStyle:"bold", 
  },
  textdec: {
     backgroundColor: "#cfa1f7",
     fontSize: 14,
     fontStyle: "bold",
     color: "black",
     size: 25,
     marginEnd: 15,
  },
  description: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
    marginRight: "1%",
    // marginBottom: "5%",
    // backgroundColor: "#F5ECFF",
    borderRadius: 10,
    padding: "5%",
    color: "black",
    fontSize: 24,
  },
  button: {
    // justifyContent: "center",
    marginTop: "15%",
    alignItems: "center",
  }
});

//make this component available to the app
export default DoctorDetailsScreen;
