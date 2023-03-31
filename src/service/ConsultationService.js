import axios from "axios";
const urlBase = "https://af2f-119-161-98-68.in.ngrok.io/api/v1";
const token =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiaWF0IjoxNjgwMjA2MDg4LCJleHAiOjE2ODAyOTI0ODh9.7c0jWW7y0-V7W2Eogit_82pfn4nnxxHZXDbPfygGhznW77IOlfXHGkbIY4SYGjvZd3ncbsWNpDkI7ChOmVqung";

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

export { getAllPreviousConsultations, getPrevConsultDetails };
