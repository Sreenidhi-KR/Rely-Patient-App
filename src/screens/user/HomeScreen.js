//import libraries
import React, { Component, useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import {
  Modal,
  Portal,
  List,
} from "react-native-paper";
import Header from "../../components/Header";
import SpecializationsModal from "../../components/SpecializationsModal";
import SquareTile from "../../components/SquareTile";
import imagePaths from "../../constants/imagePaths";
import routes from "../../navigation/routes";
import { getFollowUp, getQuickDoctor } from "../../service/ConsultationService";
import { AuthContext } from "../../context/AuthContext";

const HomeScreen = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);
  const [data, setData] = useState(null);
  const {  patientInfo,  } = useContext(AuthContext);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const getFollow = async () => {
    const res = await getFollowUp(patientInfo.patientId);
    setData(res);
  };
  // getFollowUp();
  const createAlert = () =>
    Alert.alert("No Doctor is available currently", "Please try later", [
      { text: "OK" },
    ]);

  useEffect(() => {
    getFollow();
  }, []);

  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalStyle}
        >
          <SpecializationsModal navigation={navigation} hideModal={hideModal} />
        </Modal>
      </Portal>
      <Header />
      <View style={styles.squareTiles}>
        <SquareTile
          imgSrc={imagePaths.quick_consultation}
          color={"#ECF9E3"}
          text={"    Quick Consulatation    "}
          onPress={async () => {
            const doc = await getQuickDoctor();
            if (doc.length == 0) {
              createAlert();
            } else {
              navigation.navigate(routes.DOCTOR_WAITING, { doctor: doc });
            }
          }}
        />

        <SquareTile
          imgSrc={imagePaths.specialist_consultation}
          color="#F7F8FF"
          text={"Specialist Consulatation"}
          onPress={showModal}
        />
      </View>
      <View>
        <List.Section
          title="My FollowUp Consultations"
          titleStyle={{
            fontWeight: "bold",
            fontSize: 25,
            color: "gray",
            marginTop: 25,
            marginLeft: 10,
          }}
        />
          <FlatList
            scrollEnabled
            showsVerticalScrollIndicator
            data={data}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={{ padding: 15, flex: 1 }}>
                  Dr. {item.fname} {item.lname}
                </Text>
                <Text style={{ padding: 15, flex: 1 }}>
                  {item && item.followUpDate.split("T")[0]}
                </Text>
              </View>
            )}
            keyExtractor={(item) => item.consultationId}
          />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  modalStyle: {
    backgroundColor: "white",
    padding: 20,
    height: "50%",
    margin: 20,
    borderRadius: 20,
  },
  squareTiles: {
    flexDirection: "row",
    height: 200,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 12,
  },
  card: {
    backgroundColor: "#F7F8FF",
    margin: 5,
    borderRadius: 10,
    marginHorizontal: 20,
    flex: 1,
    flexDirection: "row",
  },
});

export default HomeScreen;
