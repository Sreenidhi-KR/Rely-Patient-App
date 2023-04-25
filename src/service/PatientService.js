import axios from "axios";
import { BASE_URL, getConfig } from "../config";
const urlBase = `${BASE_URL}/api/v1/user`;
import Toast from "react-native-simple-toast";

//Patient is the js object containing all the fields required by the patient
async function addPatient(patient, userId) {
  try {
    let response = await axios.post(
      `${urlBase}/addPatient/${userId}`,
      patient,
      await getConfig()
    );
  } catch (err) {
    console.log(err);
    Toast.show("Unable to add patient", 10);
  }
}

//Patient is the js object containing all the fields required by the patient
async function editPatient(patient, patientId) {
  try {
    let response = await axios.post(
      `${urlBase}/editPatient/${patientId}`,
      patient,
      await getConfig()
    );
  } catch (err) {
    console.log(err);
    Toast.show("Unable to edit patient", 10);
  }
}

async function getPatients(userId) {
  try {
    let response = await axios.get(
      `${urlBase}/getPatients/${userId}`,
      await getConfig()
    );
    return response.data;
  } catch (err) {
    console.log(err);
    Toast.show("Unable to fetch patients", 10);
  }
}

async function removePatient(patientId) {
  try {
    let response = await axios.delete(
      `${urlBase}/deletePatient/${patientId}`,
      await getConfig()
    );
  } catch (err) {
    console.log(err);
    Toast.show("Unable to remove patient", 10);
  }
}

export { addPatient, getPatients, removePatient, editPatient };
