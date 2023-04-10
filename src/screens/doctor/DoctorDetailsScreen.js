//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button, Chip } from "react-native-paper";
import routes from "../../navigation/routes";

// create a component
const DoctorDetailsScreen = ({ navigation, route }) => {
  const { doctor } = route.params;
  console.log(doctor);
  const imageUrl = doctor.photo_url;
  return (
    <View style={styles.container}>
      <View style={styles.image}>
          <Image
              source={imageUrl ? {uri: imageUrl} : require(`../../../assets/general-doc.png`)}
              style={{ width: 100, height: 100 , marginRight:50 }}/>
          <View style={styles.details}>
            <Text style={{fontSize:24, fontStyle:"bold"}}>Dr.{doctor.fname} {doctor.lname}</Text>
            <Text style={styles.text}>{doctor.qualification}</Text>
            <Text style={styles.text}>{doctor.email}</Text>
            <Text style={styles.text}>Sex: {doctor.sex}    Age:{doctor.age}</Text> 
            <View style={styles.detail}>
            <Chip style={styles.textdec} compact>{doctor.specialization}</Chip>
            <Chip style={styles.textdec} compact>Rating: {doctor.rating}/5</Chip>
          </View>
          </View>
      </View>
      <View style={styles.description}>
        <Text style={{fontSize: 16, fontFamily: "Sans-sherif", textAlign: "justify"}}>{doctor.description}</Text>
      </View>
      <View style={styles.info}>
        <Text style={{fontSize: 16, fontFamily: "Sans-sherif", textAlign: "justify"}}>{doctor.clinic_address}{'\n'}</Text>
        <Text style={{fontSize: 16, fontFamily: "Sans-sherif", textAlign: "justify", lineHeight: 15}}>Location: {doctor.city}, {doctor.state}</Text>
        <Text style={{fontSize: 16, fontFamily: "Sans-sherif"}}>Timings: {doctor.available_timings}</Text>
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
    // alignItems: "center",
    backgroundColor: "white",
    
  },
  image:{
    flexDirection:"row",
    alignItems: "center",
    justifyContent: "space-around",
    margin:10,
    backgroundColor: "#F5ECFF",
    borderRadius: 10,
    padding: 20,
  },
  details: {
    flexDirection: "column",
  },
  detail:{
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  text: {
    fontSize:14,
    fontStyle:"bold", 
  },
  textdec: {
     backgroundColor: "#cfa1f7",
     fontSize: 14,
     fontStyle: "bold",
     color: "black",
     marginEnd: 15,
  },
  description: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1%",
    marginHorizontal: "1%",
    padding: "5%",
  },
  button: {
    marginTop: "15%",
    alignItems: "center",
    marginHorizontal: 100
  },
  info: {
    marginHorizontal: "6%",
    justifyContent: "space-evenly"
  }
});

//make this component available to the app
export default DoctorDetailsScreen;
