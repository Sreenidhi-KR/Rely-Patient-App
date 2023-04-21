import axios from "axios";
import { BASE_URL, getConfig } from "../config";
const urlBase = `${BASE_URL}/api/v1/user`;

//Patient is the js object containing all the fields required by the patient
async function addPatient(patient, userId) {
  try {
    console.log(`${urlBase}/addPatient/${userId}`);
    let response = await axios.post(
      `${urlBase}/addPatient/${userId}`,
      patient,
      await getConfig()
    );
    console.log("patient added sucessfully");
  } catch (err) {
    console.log(err);
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
  }
}

async function removePatient(patientId) {
  try {
    let response = await axios.delete(
      `${urlBase}/deletePatient/${patientId}`,
      await getConfig()
    );
    console.log("patient removed sucessfully");
  } catch (err) {
    console.log(err);
  }
}

export { addPatient, getPatients, removePatient, editPatient };
