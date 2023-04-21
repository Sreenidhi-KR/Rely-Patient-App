import axios from "axios";
import { BASE_URL, getToken, getConfig } from "../config";

const urlBase = `${BASE_URL}/api/v1`;

const getAllPreviousConsultations = async (patientId) => {
  console.log("Get All Previous Consultations");
  try {
    const response = await axios.get(
      `${urlBase}/consultation/getPrevConsultations/${patientId}`,
      await getConfig()
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
      await getConfig()
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const addConsultation = async (patientId, doctorId, startTime, followUp) => {
  console.log("Creating new Consultation", followUp);
  try {
    const response = await axios.post(
      `${urlBase}/consultation/addConsultation`,
      {
        patient_id: patientId,
        doctor_id: doctorId,
        start_time: startTime,
        followup_id: followUp,
      },
      await getConfig()
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getQuickDoctor = async () => {
  console.log("Get Doctor with least patients for Quick Consultation");
  try {
    const response = await axios.get(
      `${urlBase}/dqueue/getQuickDoctor`,
      await getConfig()
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export { getAllPreviousConsultations, getPrevConsultDetails, addConsultation, getQuickDoctor };
