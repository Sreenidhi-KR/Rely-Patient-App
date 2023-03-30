import axios from "axios";
const urlBase = "https://af2f-119-161-98-68.in.ngrok.io/api/v1";
const token ="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrcnMiLCJpYXQiOjE2ODAyMTg0NDEsImV4cCI6MTY4MDMwNDg0MX0.8WHVq7mwNMfHl8SbAVzx00pYTtXdDx_hU2J7CM-f7HtCNn61zPezdkJK_CY4_Gm01juDBgQgqDTBKv_-lqYikw";

const config = {
  headers: {
    "ngrok-skip-browser-warning": "true",
    Authorization: `Bearer ${token}`,
  },
};

const getAllPreviousConsultations = async (patientId) => {
    console.log("Get All Previous Consultations");
    try{
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
    try{
        const response =  await axios.get(
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
    try{
        const response = await axios.post(
            `${urlBase}/consultation/addConsultation`,{
                patientId,
                doctorId,
                startTime
            },
            config
        )
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export {
    getAllPreviousConsultations,
    getPrevConsultDetails,
    addConsultation,
};