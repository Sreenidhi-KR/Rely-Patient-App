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
import SpecializationsModal from "../../components/user/SpecializationsModal";
import SquareTile from "../../components/user/SquareTile";
import routes from "../../navigation/routes";

const HomeScreen = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalStyle}
        >
          <SpecializationsModal navigation={navigation} hideModal={hideModal} />
        </Modal>
      </Portal>
      <List.Item
        style={{ margin: 10, marginTop: 35 }}
        title={`Hello Kiran`}
        description={`How are you feeling today !!`}
        left={(props) => (
          <Image
            source={require(`../../../assets/man.png`)}
            style={{ width: 50, height: 50 }}
          />
        )}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SquareTile
          imgSrc={require("../../../assets/general-doc.png")}
          color={"#ECF9E3"}
          text={"Quick Consulatation"}
          onPress={() => {}}
        />
        <SquareTile
          imgSrc={require("../../../assets/special-doc.png")}
          color={"#F9E3E3"}
          text={"Specialist Consulatation"}
          onPress={showModal}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },
  modalStyle: {
    backgroundColor: "white",
    padding: 20,
    height: "50%",
    margin: 20,
    borderRadius: 20,
  },
  text: {
    fontSize: 12,
  },
});

export default HomeScreen;
