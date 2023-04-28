import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, ScrollView, View, Alert, Image } from "react-native";
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
import { uploadPhoto, downloadPhoto } from "../../service/UserService";

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
  const [photoUrl, setPhotoUrl] = useState("");
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    getPatient();
  }, []);

  const showAlert = (message) => Alert.alert("Error ", message);

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
    setPhotoUrl(data.photo_url);
    if (data.photo_url && data.photo_url != "") {
      let id = patientInfo.patientId;
      data = await downloadPhoto(id);
      setPhoto(data);
    }
  }

  async function deletePatient() {
    await removePatient(patientInfo.patientId);
    setPatientInfo({});
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
      photo_url: photoUrl,
    };
    if (photoUrl == null || photoUrl == "") {
      setEditing(true);
      showAlert("Patient photo must be added first");
    } else if (
      firstName == "" ||
      lastName == "" ||
      bloodGroup == "" ||
      city == "" ||
      state == "" ||
      abdmNo == "" ||
      relationship == "" ||
      sex == ""
    ) {
      setEditing(true);
      showAlert("All fields are required");
    } else {
      console.log(photoUrl);
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
    <ScrollView style={{ backgroundColor: "white" }}>
      {userData ? (
        <View>
          <View style={{ alignItems: "center", backgroundColor: "white" }}>
            {photo && (
              <Image
                source={{
                  uri: `data:image/png;base64,${photo}`,
                }}
                style={{ height: 150, width: 150, borderRadius: 75 }}
              />
            )}
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Profile Photo</Text>
            <TextInput
              style={styles.itemValue}
              value={photoUrl ? "Profile Photo availible" : "No profile photo"}
              editable={false}
              textColor={photoUrl ? "green" : "red"}
              mode="outlined"
              activeOutlineColor="purple"
            />
          </View>
          <View style={styles.itemContainer}>
            {(editing || !photoUrl) && (
              <Button
                icon="account-edit-outline"
                mode="contained"
                style={{ flex: 1 }}
                onPress={async () => {
                  let id = patientInfo.patientId;
                  await uploadPhoto(id);
                  await getPatient();
                }}
              >
                {photoUrl ? "Change Photo" : "Add Photo"}
              </Button>
            )}
          </View>

          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>First Name</Text>

            <TextInput
              style={styles.itemValue}
              value={firstName}
              onChangeText={(text) => {
                text = text.trim();
                if (/^[A-Za-z]+$/.test(text) || text == "") {
                  setFirstName(text);
                } else {
                  showAlert("Invalid input for First Name");
                }
              }}
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
              onChangeText={(text) => {
                text = text.trim();
                if (/^[A-Za-z]+$/.test(text) || text == "") {
                  setLastName(text);
                } else {
                  showAlert("Invalid input for Last Name");
                }
              }}
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
              <Picker.Item label="B -" value="B-" />
              <Picker.Item label="B +" value="B+" />
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
              onChangeText={(text) => {
                text = text.trim();
                if (/^[A-Za-z]+$/.test(text) || text == "") {
                  setCity(text);
                } else {
                  showAlert(
                    "Invalid input for City:Should contain only Letters"
                  );
                }
              }}
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
              onChangeText={(text) => {
                text = text.trim();
                if (/^[A-Za-z]+$/.test(text) || text == "") {
                  setState(text);
                } else {
                  showAlert(
                    "Invalid input for State:Should contain only Letters"
                  );
                }
              }}
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
              onChangeText={(text) => {
                text = text.trim();
                if (/^[0-9]+$/.test(text) || text == "") {
                  setAbdmNo(text);
                } else {
                  showAlert(
                    "Invalid input for ABDM No: Should contain only Numbers"
                  );
                }
              }}
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
              onChangeText={(text) => {
                text = text.trim();
                if (/^[A-Za-z]+$/.test(text) || text == "") {
                  setRelationship(text);
                } else {
                  showAlert(
                    "Invalid input for Relationship:Should contain only Letters"
                  );
                }
              }}
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
                  fadeToColor="white"
                />
              </Modal>
            </Portal>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 5,
              margin: 5,
            }}
          >
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
              textColor="white"
              onPress={() => deletePatient()}
            >
              Delete
            </Button>
          </View>
        </View>
      ) : (
        <ActivityIndicator />
      )}
      <Button
        style={{
          marginVertical: 10,
          margin: 10,
          backgroundColor: "#4a148c",
        }}
        textColor="white"
        icon="logout"
        mode="contained"
        onPress={() => {
          setPatientInfo({});
          logout();
        }}
      >
        Logout
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dateInput: {
    alignContent: "center",
    padding: 20,
    marginTop: "50%",
    marginHorizontal: 30,
    backgroundColor: "white",
    height: "50%",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    margin: 5,
    borderRadius: 20,
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
    backgroundColor: "#F7F8FF",
    borderRadius: 20,
  },
});

export default PatientViewInfo;
