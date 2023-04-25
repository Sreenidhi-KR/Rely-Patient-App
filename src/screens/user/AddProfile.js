import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-native-date-picker";
import { addPatient } from "../../service/PatientService";
import routes from "../../navigation/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/AuthContext";
import { getProfilesForUser } from "../../service/UserService";
const AddProfile = ({ navigation, route }) => {
  const { setProfiles } = route.params;
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [dob, setDob] = useState(new Date());
  const [bloodGroup, setBloodGroup] = useState("");
  const [sex, setSex] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [abdmNo, setAbdmNo] = useState("");
  const [relationship, setRelationship] = useState("");

  const showAlert = () => Alert.alert("Error ", "All fields are required");

  const getProfiles = async () => {
    const patients = await getProfilesForUser();
    setProfiles(patients);
  };

  async function handleFormSubmit() {
    let userInfo = await AsyncStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    const userId = userInfo.id;
    console.log(userId);
    let dobString = dob.toISOString().split("T")[0];
    console.log(dobString);
    if (
      fname == "" ||
      lname == "" ||
      bloodGroup == "" ||
      city == "" ||
      state == "" ||
      abdmNo == "" ||
      relationship == ""
    ) {
      showAlert();
    } else {
      let patient = {
        fname: fname,
        lname: lname,
        sex: sex,
        blood_group: bloodGroup,
        city: city,
        state: state,
        abdm_no: abdmNo,
        photo_url: "None",
        relationship: relationship,
        // age: null,
        dob: dobString,
      };
      console.log(patient);
      addPatient(patient, userId);
      await getProfiles();
      navigation.replace(routes.SELECT_PROFILE);
    }
  }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        value={fname}
        onChangeText={setFname}
        textColor="black"
      />

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        value={lname}
        onChangeText={setLname}
        textColor="black"
      />

      <Text style={styles.label}>Date of Birth</Text>
      <DatePicker
        style={styles.input}
        date={dob}
        onDateChange={setDob}
        maximumDate={new Date()}
        textColor="purple"
        androidVariant="iosClone"
        mode="date"
      />
      <Text style={styles.label}>Blood Group</Text>
      <Picker
        selectedValue={bloodGroup}
        style={styles.input}
        onValueChange={(itemValue) => setBloodGroup(itemValue)}
      >
        <Picker.Item label="O +" value="O+" />
        <Picker.Item label="O -" value="O-" />
        <Picker.Item label="A +" value="A+" />
        <Picker.Item label="A -" value="A-" />
        <Picker.Item label="AB +" value="AB+" />
        <Picker.Item label="AB -" value="AB-" />
      </Picker>

      <Text style={styles.label}>Sex</Text>
      <Picker
        selectedValue={sex}
        style={styles.input}
        onValueChange={(itemValue) => setSex(itemValue)}
      >
        <Picker.Item label="Male" value="M" />
        <Picker.Item label="Female" value="F" />
        <Picker.Item label="Prefer Not to Mention" value="O" />
      </Picker>

      <Text style={styles.label}>City</Text>
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={setCity}
        textColor="black"
      />

      <Text style={styles.label}>State</Text>
      <TextInput
        style={styles.input}
        value={state}
        onChangeText={setState}
        textColor="black"
      />

      <Text style={styles.label}>ABDM No.</Text>
      <TextInput
        style={styles.input}
        value={abdmNo}
        onChangeText={setAbdmNo}
        textColor="black"
      />

      <Text style={styles.label}>Relationship</Text>
      <TextInput
        style={styles.input}
        value={relationship}
        onChangeText={setRelationship}
        textColor="black"
      />

      <View style={styles.submitContainer}>
        <Button
          icon="plus"
          title="Submit"
          mode="contained"
          onPress={handleFormSubmit}
          style={styles.submitButton}
        >
          Add Profile
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  submitContainer: {
    marginBottom: 5,
    marginHorizontal: 5,
    paddingBottom: 50,
    paddingTop: 25,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 1,
    marginBottom: 5,
    backgroundColor: "white",
  },
});

export default AddProfile;
