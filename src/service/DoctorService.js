import axios from "axios";
import { BASE_URL, getConfig } from "../config";

const urlBase = `${BASE_URL}/api/v1`;

const getAllDoctors = async () => {
  console.log("Get ALL Doctors");
  try {
    const response = await axios.get(
      `${urlBase}/doctor/getAllDoctors`,
      await getConfig()
    );
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
      await getConfig()
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
      await getConfig()
    );
  } catch (err) {
    console.log(err);
  }
};

const getPatientIndexFromQueue = async (
  doctorId,
  patientId,
  setIndex,
  setAccept
) => {
  console.log("getPatientIndexFromQueue");
  try {
    const response = await axios.get(
      `${urlBase}/dqueue/getPatientIndex/${doctorId}/${patientId}`,
      await getConfig()
    );
    setIndex(response.data.index);
    setAccept(response.data.accept);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const addAndGetIndexFromQueue = async (
  doctorId,
  patientId,
  setIndex,
  setAccept
) => {
  try {
    await axios.get(
      `${urlBase}/dqueue/addPatient/${doctorId}/${patientId}`,
      await getConfig()
    );
    const response = await axios.get(
      `${urlBase}/dqueue/getPatientIndex/${doctorId}/${patientId}`,
      await getConfig()
    );
    setIndex(response.data.index);
    setAccept(response.data.accept);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const updateDoctorRating = async(doctorId, starRating) => {
  try {
    const response = await axios.get(
      `${urlBase}/doctor/removePatient/updateDoctorRating/${doctorId}/${starRating}`,
      await getConfig()
    );
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
  updateDoctorRating,
};
