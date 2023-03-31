import axios from "axios";
import { BASE_URL, token } from "../config";

const urlBase = `${BASE_URL}/api/v1`;

const config = {
  headers: {
    "ngrok-skip-browser-warning": "true",
    Authorization: `Bearer ${token}`,
  },
};

const getAllDoctors = async () => {
  console.log("Get ALL Doctors");
  try {
    const response = await axios.get(`${urlBase}/doctor/getAllDoctors`, config);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getDoctorsBySpecialisation = async (specialisation) => {
  console.log("Get ALL Doctors BY Specialisation");
};

const addPatientToQueue = async (doctorId, patientId) => {
  console.log("addPatientToQueue");
  try {
    const response = await axios.get(
      `${urlBase}/dqueue/addPatient/${doctorId}/${patientId}`,
      config
    );
  } catch (err) {
    console.log(err);
  }
};

const removePatientFromQueue = async (doctorId, patientId) => {
  console.log("removePatientFromoQueue");
  try {
    const response = await axios.get(
      `${urlBase}/dqueue/removePatient/${doctorId}/${patientId}`,
      config
    );
  } catch (err) {
    console.log(err);
  }
};

const getPatientIndexFromQueue = async (doctorId, patientId, setIndex) => {
  console.log("getPatientIndexFromQueue");
  try {
    const response = await axios.get(
      `${urlBase}/dqueue/getPatientIndex/${doctorId}/${patientId}`,
      config
    );
    setIndex(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const addAndGetIndexFromQueue = async (doctorId, patientId, setIndex) => {
  try {
    await axios.get(
      `${urlBase}/dqueue/addPatient/${doctorId}/${patientId}`,
      config
    );
    const response = await axios.get(
      `${urlBase}/dqueue/getPatientIndex/${doctorId}/${patientId}`,
      config
    );
    setIndex(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export {
  getAllDoctors,
  addPatientToQueue,
  removePatientFromQueue,
  getPatientIndexFromQueue,
  addAndGetIndexFromQueue,
};
