//import liraries
import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Modal, Portal, List, Avatar } from "react-native-paper";
import Header from "../../components/Header";
import SpecializationsModal from "../../components/SpecializationsModal";
import SquareTile from "../../components/SquareTile";
import imagePaths from "../../constants/imagePaths";
import routes from "../../navigation/routes";
import { getQuickDoctor } from "../../service/ConsultationService";
import { verticalScale } from "../../constants/metrics";

const HomeScreen = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

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
          text={"Quick Consulatation"}
          onPress={async () => {
            const doc = await getQuickDoctor();
            navigation.navigate(routes.DOCTOR_WAITING, { doctor: doc });
            if (doc == undefined)
              console.log("No Doctor is available currently");
          }}
        />
        <SquareTile
          imgSrc={imagePaths.specialist_consultation}
          color="#F7F8FF"
          text={"Specialist Consulatation"}
          onPress={showModal}
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
    height: verticalScale(200),
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 12,
  },
});

export default HomeScreen;
