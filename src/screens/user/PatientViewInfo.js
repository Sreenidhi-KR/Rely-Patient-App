import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, Button } from "react-native";
import {
  getPatients,
  removePatient,
  editPatient,
} from "../../service/PatientService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/AuthContext";
import routes from "../../navigation/routes";

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
    removePatient(patientInfo.patientId);
    setPatientInfo({});
    navigation.navigate(routes.SELECT_PROFILE);
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
    editPatient(patient, patientInfo.patientId);
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
            {editing ? (
              <TextInput
                style={{ flex: 2 }}
                value={firstName}
                onChangeText={setFirstName}
              />
            ) : (
              <Text style={{ flex: 2 }}>{userData.fname}</Text>
            )}
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ flex: 1 }}>Last Name:</Text>
            {editing ? (
              <TextInput
                style={{ flex: 2 }}
                value={lastName}
                onChangeText={setLastName}
              />
            ) : (
              <Text style={{ flex: 2 }}>{userData.lname}</Text>
            )}
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ flex: 1 }}>Sex:</Text>
            {editing ? (
              <TextInput
                style={{ flex: 2 }}
                value={sex}
                onChangeText={setSex}
              />
            ) : (
              <Text style={{ flex: 2 }}>{userData.sex}</Text>
            )}
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ flex: 1 }}>Blood Group:</Text>
            {editing ? (
              <TextInput
                style={{ flex: 2 }}
                value={bloodGroup}
                onChangeText={setBloodGroup}
              />
            ) : (
              <Text style={{ flex: 2 }}>{userData.blood_group}</Text>
            )}
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ flex: 1 }}>City:</Text>
            {editing ? (
              <TextInput
                style={{ flex: 2 }}
                value={city}
                onChangeText={setCity}
              />
            ) : (
              <Text style={{ flex: 2 }}>{userData.city}</Text>
            )}
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ flex: 1 }}>State:</Text>
            {editing ? (
              <TextInput
                style={{ flex: 2 }}
                value={state}
                onChangeText={setState}
              />
            ) : (
              <Text style={{ flex: 2 }}>{userData.state}</Text>
            )}
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ flex: 1 }}>ABDM No:</Text>
            {editing ? (
              <TextInput
                style={{ flex: 2 }}
                value={abdmNo}
                onChangeText={setAbdmNo}
              />
            ) : (
              <Text style={{ flex: 2 }}>{userData.abdm_no}</Text>
            )}
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ flex: 1 }}>Relationship:</Text>
            {editing ? (
              <TextInput
                style={{ flex: 2 }}
                value={relationship}
                onChangeText={setRelationship}
              />
            ) : (
              <Text style={{ flex: 2 }}>{userData.relationship}</Text>
            )}
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ flex: 1 }}>Date of Birth</Text>
            {editing ? (
              <TextInput
                style={{ flex: 2 }}
                value={dob}
                onChangeText={setDob}
              />
            ) : (
              <Text style={{ flex: 2 }}>{userData.dob.slice(0, 10)}</Text>
            )}
          </View>

          <Button
            title={editing ? "Save" : "Edit"}
            onPress={() => {
              setEditing(!editing);
              modifyPatient();
            }}
          />
          <Button title={"Delete Profile"} onPress={() => deletePatient()} />

          <Button title={"Logout"} onPress={() => logout()} />
        </View>
      ) : (
        <Text>Loading user data...</Text>
      )}
    </View>
  );
};

export default PatientViewInfo;
