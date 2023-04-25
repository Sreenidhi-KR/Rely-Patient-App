//import liraries
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { Button, Chip, FAB } from "react-native-paper";
import routes from "../../navigation/routes";
import { getAllPatientsFromDqueue, getDoctorById } from "../../service/DoctorService";

// create a component
const DoctorDetailsScreen = ({ navigation, route }) => {
  const { doctor, followUp } = route.params;
  const [currDoctor , setCurrDoctor]= useState(doctor)
  const imageUrl = currDoctor.photo_url;
  const [currentlength, setCurrentLength] = useState(10);
  const isFull = currentlength + 1 > currDoctor.limit;

  const getQueueLength = async () => {
    const size = await getAllPatientsFromDqueue(currDoctor.id);
    const length = size.length;
    setCurrentLength(length);
  };

  const getDoc = async (docId) => {
   const doc = await getDoctorById(docId);
   return doc
  }

  //doc = getDoctorById
  //check doc.status 
  //if online 
  //check queue length
  //doctor queue waiting screen
  //if not online 
  //alert doc offline

  useEffect(() => {
    getQueueLength();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image
          source={require(`../../../assets/general-doc.png`)}
          style={{ width: 100, height: 100, marginRight: 50 }}
        />
        <View style={styles.details}>
          <Text style={{ fontSize: 24, fontStyle: "bold" }}>
            Dr.{currDoctor.fname} {currDoctor.lname}
          </Text>
          <Text style={styles.text}>{currDoctor.qualification}</Text>
          <Text style={styles.text}>{currDoctor.email}</Text>
          <Text style={styles.text}>
            Sex: {currDoctor.sex} | Age: {currDoctor.age}
          </Text>
          <View style={styles.detail}>
            <Chip
              textStyle={{ color: "white", fontSize: 13 }}
              style={styles.textdec}
              compact
            >
              {currDoctor.specialization}
            </Chip>
            <Chip
              textStyle={{ color: "white", fontSize: 13 }}
              style={styles.textdec}
              compact
            >
              Rating: {currDoctor.rating.toFixed(1)}/5
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
          {currDoctor.description}
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
          {currDoctor.clinic_address}
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
          {currDoctor.city}, {currDoctor.state}
          {"\n"}
        </Text>
        <Text style={{ fontSize: 18 }}>Timings</Text>
        <Text style={{ fontSize: 15, color: "grey" }}>
          {currDoctor.available_timings}
          {"\n"}
        </Text>
      </View>
      {currDoctor.online_status ? (
        isFull ? (
          <FAB
            mode="flat"
            label="Doctor Queue Is Full"
            size="small"
            color="black"
            style={styles.fab_offline}
            onPress={() => {}}
          />
        ) : (
          <FAB
            mode="flat"
            label="Join Consultation"
            size="small"
            color="white"
            style={styles.fab}
            onPress={async () => {
              const doc = await getDoc(currDoctor.id);
              getQueueLength();
              if (doc.online_status && ((currentlength+1)<=doc.limit)) {
                navigation.navigate(routes.DOCTOR_WAITING, {
                  doctor: currDoctor,
                  followUp,
                });
              } else {
                  Alert.alert("Doctor went offline or queue is full","" ,[
                    { text: "OK" },
                  ])
                  setCurrDoctor(doc)
              }
            }}
          />
        )
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
    right: 0,
    bottom: 0,
  },
  image: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    margin: 10,
    backgroundColor: "#F7F8FF",
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
    backgroundColor: "#4a148c",
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
