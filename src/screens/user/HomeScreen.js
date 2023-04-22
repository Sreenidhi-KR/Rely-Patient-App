//import libraries
import React, { Component, useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Modal, Portal, List, Avatar, Snackbar } from "react-native-paper";
import Header from "../../components/Header";
import SpecializationsModal from "../../components/SpecializationsModal";
import SquareTile from "../../components/SquareTile";
import imagePaths from "../../constants/imagePaths";
import routes from "../../navigation/routes";
import { getFollowUp, getQuickDoctor } from "../../service/ConsultationService";
import { AuthContext } from "../../context/AuthContext";

const HomeScreen = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackBarText, setSnackBarText] = useState("");
  const { logout, patientInfo, setPatientInfo } = useContext(AuthContext);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const getFollowUp = async() => {
    var data = await getFollowUp(patientInfo.id);
    console.log(data);
  };

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
              console.log("No Doctor is available currently");
              setSnackBarText("No Doctor is available currently");
              setShowSnackbar(true);
              <Snackbar
                visible={showSnackbar}
                duration={4000}
                style={{
                  backgroundColor: "#5e17eb",
                }}
                wrapperStyle={{}}
                onDismiss={() => {
                  setShowSnackbar(false);
                  console.log("dismissed");
                }}
                action={{}}
                onIconPress={() => {}}
              >
                {snackBarText}
              </Snackbar>;
              navigation.navigate(routes.HOME);
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
        <></>
        <List.Section
            title="My Previous Consultations"
            titleStyle={{ fontWeight: "bold", fontSize: 25, color: "grey" }}
          ></List.Section>
       
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
});

export default HomeScreen;
