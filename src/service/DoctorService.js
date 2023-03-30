import axios from "axios";
const urlBase = "https://5ef4-119-161-98-68.in.ngrok.io/api/v1";
const token =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiaWF0IjoxNjgwMTgyNjk4LCJleHAiOjE2ODAyNjkwOTh9.ZAnXb4c_ra5Nu8KvSVwYBfyOobm7S83OojDqNf0cXHO33hV7s6yAw3P2YlTdjdE_i8dTef5ItIWEphP7yPO4TQ";

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
    const response = await fetch(
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
    await fetch(
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
