import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, ScrollView, View, Alert } from "react-native";
import { Text, TextInput, Portal, Modal, Button } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-native-date-picker";
import {
  getPatients,
  removePatient,
  editPatient,
} from "../../service/PatientService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/AuthContext";
import routes from "../../navigation/routes";
import { ActivityIndicator } from "react-native-paper";

const PatientViewInfo = ({ navigation }) => {
  const { logout, patientInfo, setPatientInfo } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sex, setSex] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [abdmNo, setAbdmNo] = useState("");
  const [relationship, setRelationship] = useState("");
  const [dob, setDob] = useState("");
  const [portal, setPortal] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    getPatient();
  }, []);

  const showAlert = () => Alert.alert("Error ", "All fields are required");

  useEffect(() => {
    let dobString = date.toISOString().split("T")[0];
    setDob(dobString);
  }, [date]);

  function portalDismiss() {
    setEditing(true);
    setPortal(false);
  }

  async function getPatient() {
    let userInfo = await AsyncStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    const userId = userInfo.id;
    let patients = await getPatients(userId);
    let data = patients.find((patient) => patient.id == patientInfo.patientId);
    setUserData(data);
    setFirstName(data.fname);
    setLastName(data.lname);
    setSex(data.sex);
    setBloodGroup(data.blood_group);
    setCity(data.city);
    setState(data.state);
    setAbdmNo(data.abdm_no);
    setRelationship(data.relationship);
    setDob(data.dob);
  }

  async function deletePatient() {
    await removePatient(patientInfo.patientId);
    setPatientInfo({});
    navigation.replace(routes.SELECT_PROFILE);
  }

  async function modifyPatient() {
    let patient = {
      fname: firstName,
      lname: lastName,
      blood_group: bloodGroup,
      city,
      state,
      abdm_no: abdmNo,
      relationship: relationship,
      dob,
      sex,
    };
    if (
      firstName == "" ||
      lastName == "" ||
      bloodGroup == "" ||
      city == "" ||
      state == "" ||
      abdmNo == "" ||
      relationship == ""
    ) {
      setEditing(true);
      showAlert();
    } else {
      let id = patientInfo.patientId;
      setUserData(null);
      await editPatient(patient, patientInfo.patientId);
      getPatient();
      setPatientInfo({
        patientId: id,
        patientName: firstName,
      });
    }
  }

  return (
    <ScrollView>
      {userData ? (
        <View>
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>First Name</Text>

            <TextInput
              style={styles.itemValue}
              value={firstName}
              onChangeText={setFirstName}
              editable={editing ? true : false}
              textColor="black"
              mode="outlined"
              activeOutlineColor="purple"
            />
          </View>

          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Last Name</Text>
            <TextInput
              style={styles.itemValue}
              value={lastName}
              onChangeText={setLastName}
              editable={editing ? true : false}
              textColor="black"
              mode="outlined"
              activeOutlineColor="purple"
            />
          </View>

          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Sex</Text>
            <Picker
              selectedValue={sex}
              style={styles.itemValue}
              onValueChange={(itemValue) => setSex(itemValue)}
              enabled={editing ? true : false}
            >
              <Picker.Item label="Male" value="M" />
              <Picker.Item label="Female" value="F" />
              <Picker.Item label="Prefer Not to Mention" value="O" />
            </Picker>
          </View>

          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Blood Group</Text>
            <Picker
              selectedValue={bloodGroup}
              style={styles.itemValue}
              enabled={editing ? true : false}
              onValueChange={(itemValue) => setBloodGroup(itemValue)}
            >
              <Picker.Item label="O +" value="O+" />
              <Picker.Item label="O -" value="O-" />
              <Picker.Item label="A +" value="A+" />
              <Picker.Item label="A -" value="A-" />
              <Picker.Item label="AB +" value="AB+" />
              <Picker.Item label="AB -" value="AB-" />
            </Picker>
          </View>

          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>City</Text>
            <TextInput
              style={styles.itemValue}
              value={city}
              onChangeText={setCity}
              editable={editing ? true : false}
              textColor="black"
              mode="outlined"
              activeOutlineColor="purple"
            />
          </View>

          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>State</Text>
            <TextInput
              style={styles.itemValue}
              value={state}
              onChangeText={setState}
              editable={editing ? true : false}
              textColor="black"
              mode="outlined"
              activeOutlineColor="purple"
            />
          </View>

          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>ABDM No</Text>
            <TextInput
              style={styles.itemValue}
              value={abdmNo}
              onChangeText={setAbdmNo}
              editable={editing ? true : false}
              textColor="black"
              mode="outlined"
              activeOutlineColor="purple"
            />
          </View>

          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Relationship</Text>
            <TextInput
              style={styles.itemValue}
              value={relationship}
              onChangeText={setRelationship}
              editable={editing ? true : false}
              textColor="black"
              mode="outlined"
              activeOutlineColor="purple"
            />
          </View>

          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Date of Birth</Text>
            <TextInput
              style={styles.itemValue}
              value={dob}
              editable={editing ? true : false}
              textColor="black"
              mode="outlined"
              activeOutlineColor="purple"
              onTouchStart={() => {
                setEditing(false);
                setPortal(true);
              }}
            />
          </View>

          <View>
            <Portal>
              <Modal
                style={styles.dateInput}
                visible={portal}
                onDismiss={portalDismiss}
              >
                <DatePicker
                  date={date}
                  onDateChange={setDate}
                  mode="date"
                  androidVariant="iosClone"
                  maximumDate={new Date()}
                  style={styles.input}
                  textColor="purple"
                />
              </Modal>
            </Portal>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* <Button
              style={{ flex: 1 }}
              title={editing ? "Save" : "Edit"}
              onPress={() => {
                setEditing(!editing);
                modifyPatient();
              }}
            /> */}
            {editing ? (
              <Button
                icon="account-check"
                mode="contained"
                style={{ flex: 1 }}
                onPress={() => {
                  setEditing(false);
                  modifyPatient();
                }}
              >
                Save
              </Button>
            ) : (
              <Button
                icon="account-edit"
                mode="contained"
                style={{ flex: 1 }}
                onPress={() => {
                  setEditing(true);
                }}
              >
                Edit
              </Button>
            )}
            <Button
              style={{ flex: 1 }}
              icon="delete-empty"
              mode="contained"
              buttonColor="red"
              onPress={() => deletePatient()}
            >
              Delete
            </Button>
          </View>
          <Button
            style={{ marginVertical: 10 }}
            icon="logout"
            buttonColor="#ccc"
            mode="contained"
            onPress={() => {
              setPatientInfo({});
              logout();
            }}
          >
            Logout
          </Button>
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dateInput: {
    alignContent: "center",
    padding: 20,
    margin: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  itemTitle: {
    flex: 1,
    color: "black",
    fontSize: 17,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  itemValue: {
    flex: 3,
    padding: 5,
    border: 5,
    borderBottomColor: "purple",
    margin: 10,
    backgroundColor: "#ccc",
  },
});

export default PatientViewInfo;
