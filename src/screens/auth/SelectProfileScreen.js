import React, { Component, useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Button,
  List,
  Modal,
  Portal,
  TextInput,
} from "react-native-paper";
import SquareTile from "../../components/SquareTile";
import { AuthContext } from "../../context/AuthContext";
import { getProfilesForUser } from "../../service/UserService";
import imagePaths from "../../constants/imagePaths";
import routes from "../../navigation/routes";
import { verticalScale } from "../../constants/metrics";
import Toast from "react-native-simple-toast";

const SelectProfileScreen = ({ navigation, route }) => {
  const { setBottomBarVisible, setPatientInfo, logout, patientInfo } =
    useContext(AuthContext);
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = React.useState(false);
  const [pin, setPin] = useState(null);
  const [patient, setPatient] = useState(null);
  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    setPin("");
  };

  useEffect(() => {
    getProfiles();
    setBottomBarVisible(false);
    setPatientInfo({});
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });

    return () => {
      setBottomBarVisible(true);
    };
  }, [navigation]);

  const getProfiles = async () => {
    const patients = await getProfilesForUser();
    setProfiles(patients);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={{ marginTop: 30 }}>
          <List.Section
            title="Choose Profile"
            titleStyle={{ fontWeight: "bold", fontSize: 25, color: "grey" }}
          ></List.Section>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={styles.modalStyle}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{ fontWeight: "bold", fontSize: 25, color: "grey" }}
                >
                  {patient ? `Enter ${patient.fname} PIN` : null}
                </Text>
                <TextInput
                  mode="outlined"
                  style={styles.input}
                  value={pin}
                  inputMode="numeric"
                  keyboardType="number-pad"
                  maxLength={6}
                  placeholder="PIN"
                  textColor="black"
                  onChangeText={(pin) => setPin(pin)}
                  secureTextEntry
                />
                <Button
                  style={styles.button}
                  textColor="white"
                  onPress={() => {
                    console.log(patient.pinCode);
                    if (pin === patient.pinCode) {
                      setPatientInfo({
                        patientId: patient.id,
                        patientName: patient.fname,
                      });
                    } else {
                      Toast.show("Wrong PIN", 10);
                    }
                  }}
                >
                  OK
                </Button>
              </View>
            </Modal>
          </Portal>
          <View style={styles.squareTiles}>
            {profiles ? (
              profiles.map((patient) => {
                return (
                  <SquareTile
                    key={patient.id}
                    imgSrc={imagePaths.avatar_man}
                    color={"#ECF9E3"}
                    text={patient.fname}
                    onPress={() => {
                      setPatient(patient);
                      showModal();
                    }}
                  />
                );
              })
            ) : (
              <Button
                onPress={() => {
                  setPatientInfo({});
                  logout();
                }}
              >
                Logout
              </Button>
            )}
            {profiles && profiles.length < 4 ? (
              <SquareTile
                imgSrc={imagePaths.add_Patient}
                color={"#F7F8FF"}
                text="Add Patient Profile"
                onPress={() => {
                  navigation.navigate(routes.ADD_PROFILE, { setProfiles });
                }}
              />
            ) : null}
          </View>
        </View>
      )}
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
  input: {
    margin: 20,
    borderRadius: 5,
    width: 150,
    paddingHorizontal: 14,
    backgroundColor: "white",
  },
  button: {
    paddingVertical: 3,
    width: 150,
    backgroundColor: "#5e17eb",
  },
  squareTiles: {
    margin: 10,
    flexDirection: "row",
    height: verticalScale(180),
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default SelectProfileScreen;
