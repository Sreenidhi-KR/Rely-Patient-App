import axios from "axios";
const urlBase = "https://1403-103-156-19-229.in.ngrok.io/api/v1";
const token =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiaWF0IjoxNjgwMTE0Nzk0LCJleHAiOjE2ODAyMDExOTR9.xVG0jXlxKk81PbJBJgmeO26UzQYEEIfJ-UnlQhkZ7Vm-esU5E59Wq2eJPy5m2inC0Cliv-8TuNc9snw0Bigurw";

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
