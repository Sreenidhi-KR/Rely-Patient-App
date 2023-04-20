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
  const config = {
    method: "POST",
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    let response = await axios.post(
      `${urlBase}/editPatient/${patientId}`,
      patient,
      config
    );
    console.log("patient added sucessfully");
  } catch (err) {
    console.log(err);
  }
}

async function getPatients(userId) {
  const config = {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    let response = await axios.get(
      `${urlBase}/user/getPatients/${userId}`,
      config
    );
    console.log("data fetched sucessfully:", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

async function removePatient(patientId) {
  const config = {
    method: "DELETE",
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    let response = await axios.delete(
      `${urlBase}/user/deletePatient/${patientId}`,
      config
    );
    console.log("patient removed sucessfully");
  } catch (err) {
    console.log(err);
  }
}

export { addPatient, getPatients, removePatient, editPatient };
