import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-native-date-picker";
import { addPatient } from "../../service/PatientService";
import routes from "../../navigation/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/AuthContext";
const PatientInfo = ({ navigation }) => {
  const { isUpdate, setUpdate } = useContext(AuthContext);
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

  async function handleFormSubmit() {
    let userInfo = await AsyncStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    const userId = userInfo.id;
    console.log(userId);
    let dobString = dob.toISOString().split("T")[0];
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
        dob: dob,
      };
      console.log(patient);
      addPatient(patient, userId);
      setUpdate(true);
      navigation.navigate(routes.SELECT_PROFILE);
    }
  }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>First Name</Text>
      <TextInput style={styles.input} value={fname} onChangeText={setFname} />

      <Text style={styles.label}>Last Name</Text>
      <TextInput style={styles.input} value={lname} onChangeText={setLname} />

      <Text style={styles.label}>Date of Birth</Text>
      <DatePicker
        style={styles.input}
        date={dob}
        onDateChange={setDob}
        maximumDate={new Date()}
        textColor="black"
        mode="date"
      />
      <Text style={styles.label}>Blood Group</Text>
      <TextInput
        style={styles.input}
        value={bloodGroup}
        onChangeText={setBloodGroup}
      />

      <Text style={styles.label}>Sex</Text>
      <Picker
        selectedValue={sex}
        style={styles.input}
        onValueChange={(itemValue) => setSex(itemValue)}
      >
        <Picker.Item label="Prefer Not to Mention" value="O" />
        <Picker.Item label="Male" value="M" />
        <Picker.Item label="Female" value="F" />
      </Picker>

      <Text style={styles.label}>City</Text>
      <TextInput style={styles.input} value={city} onChangeText={setCity} />

      <Text style={styles.label}>State</Text>
      <TextInput style={styles.input} value={state} onChangeText={setState} />

      <Text style={styles.label}>ABDM No.</Text>
      <TextInput style={styles.input} value={abdmNo} onChangeText={setAbdmNo} />

      <Text style={styles.label}>Relationship</Text>
      <TextInput
        style={styles.input}
        value={relationship}
        onChangeText={setRelationship}
      />

      <View style={styles.submitContainer}>
        <Button
          title="Submit"
          onPress={handleFormSubmit}
          style={styles.submitButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  submitContainer: {
    marginBottom: 20,
    marginHorizontal: 16,
  },
  submitButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
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
    padding: 10,
    marginBottom: 10,
  },
});

export default PatientInfo;
