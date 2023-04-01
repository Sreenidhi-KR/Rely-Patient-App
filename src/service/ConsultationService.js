import axios from "axios";
import { BASE_URL, token } from "../config";

const urlBase = `${BASE_URL}/api/v1`;

const config = {
  headers: {
    "ngrok-skip-browser-warning": "true",
    Authorization: `Bearer ${token}`,
  },
};

const getAllPreviousConsultations = async (patientId) => {
  console.log("Get All Previous Consultations");
  try {
    const response = await axios.get(
      `${urlBase}/consultation/getPrevConsultations/${patientId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getPrevConsultDetails = async (consultId) => {
  console.log("Get Individual Previous Consultation Details");
  try {
    const response = await axios.get(
      `${urlBase}/consultation/getAllDocumentsByCid/${consultId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const addConsultation = async (patientId, doctorId, startTime) => {
  console.log("Creating new Consultation");
  try {
    const response = await axios.post(
      `${urlBase}/consultation/addConsultation`,
      {
        patient_id: patientId,
        doctor_id: doctorId,
        start_time: startTime,
      },
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getAllPreviousConsultations, getPrevConsultDetails, addConsultation };
