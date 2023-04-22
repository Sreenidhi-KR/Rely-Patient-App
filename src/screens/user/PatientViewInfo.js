import React, { useState, useEffect, useContext } from "react";
// import { View, Text, TextInput, Button } from "react-native";
import { View, Button } from "react-native";
import { Text, TextInput } from "react-native-paper";
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

  useEffect(() => {
    getPatient();
  }, []);

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
    let id = patientInfo.patientId;
    setUserData(null);
    await editPatient(patient, patientInfo.patientId);
    getPatient();
    setPatientInfo({
      patientId: id,
      patientName: firstName,
    });
  }

  return (
    <View>
      {userData ? (
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ flex: 1 }}>First Name:</Text>

            <TextInput
              style={{ flex: 2 }}
              value={firstName}
              onChangeText={setFirstName}
              editable={editing ? true : false}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ flex: 1 }}>Last Name:</Text>
            <TextInput
              style={{ flex: 2 }}
              value={lastName}
              onChangeText={setLastName}
              editable={editing ? true : false}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ flex: 1 }}>Sex:</Text>
            <TextInput style={{ flex: 2 }} value={sex} onChangeText={setSex} />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ flex: 1 }}>Blood Group:</Text>
            <TextInput
              style={{ flex: 2 }}
              value={bloodGroup}
              onChangeText={setBloodGroup}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ flex: 1 }}>City:</Text>
            <TextInput
              style={{ flex: 2 }}
              value={city}
              onChangeText={setCity}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ flex: 1 }}>State:</Text>
            <TextInput
              style={{ flex: 2 }}
              value={state}
              onChangeText={setState}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ flex: 1 }}>ABDM No:</Text>
            <TextInput
              style={{ flex: 2 }}
              value={abdmNo}
              onChangeText={setAbdmNo}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ flex: 1 }}>Relationship:</Text>
            <TextInput
              style={{ flex: 2 }}
              value={relationship}
              onChangeText={setRelationship}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ flex: 1 }}>Date of Birth</Text>
            <TextInput style={{ flex: 2 }} value={dob} onChangeText={setDob} />
          </View>

          <Button
            title={editing ? "Save" : "Edit"}
            onPress={() => {
              setEditing(!editing);
              modifyPatient();
            }}
          />
          <Button title={"Delete Profile"} onPress={() => deletePatient()} />

          <Button
            title={"Logout"}
            onPress={() => {
              setPatientInfo({});
              logout();
            }}
          />
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default PatientViewInfo;
