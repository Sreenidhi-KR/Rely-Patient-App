import DocumentPicker from "react-native-document-picker";
import axios from "axios";
import RNFetchBlob from "rn-fetch-blob";
const { fs } = RNFetchBlob;
import { BASE_URL, getConfig, getToken } from "../config";
const urlBase = `${BASE_URL}/api/v1`;
import Toast from "react-native-simple-toast";
import { refreshToken } from "./AuthService";

//returns a array contains 2 seperate arrays where the first array contains all the documents of the patient that are in the consultation and second array contains all the documents of patient that are not in current consultation.

async function removeDocFromConsultation(documentId, consultationId) {
  try {
    await refreshToken();
    await axios.get(
      `${urlBase}/consultation/removeDocumentByCid_Docuid/${consultationId}/${documentId}`,
      await getConfig()
    );
    console.log("Document removed from  consultation");
  } catch (err) {
    console.log(err);
    Toast.show("Unable to remove doc from consultation", 10);
  }
}

async function addDocToConsultation(documentId, consultationId) {
  try {
    await refreshToken();
    await axios.get(
      `${urlBase}/consultation/addDocumentByCid_Docuid/${consultationId}/${documentId}`,
      await getConfig()
    );
    console.log("Document added to consultation");
  } catch (err) {
    console.log(err);
    Toast.show("Unable to add document to consultation", 10);
  }
}
async function docsForConsultation(consultationId, patientId) {
  try {
    await refreshToken();
    let response = await axios.get(
      `${urlBase}/consultation/getAllDocumentsByCid/${consultationId}`,
      await getConfig()
    );
    let inConsultation = response.data;
    let allDocs = await getAllDocumentsList(patientId);
    let allPrescriptions = await getAllPrescriptionsList(patientId);
    let canBeAdded = allDocs.filter(
      (obj2) => !inConsultation.some((obj1) => obj1.id === obj2.id)
    );
    let canBeAdded2 = allPrescriptions.filter(
      (obj2) => !inConsultation.some((obj1) => obj1.id === obj2.id)
    );

    return [inConsultation, canBeAdded, canBeAdded2];
  } catch (err) {
    console.log(err);
    Toast.show("Unable to fetch all documents of a consultation", 10);
  }
}

async function downloadDocument(documentId, fileName) {
  const config = {
    method: "GET",
    "Content-Type": "multipart/form-data",
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${await getToken()}`,
      Accept: "application/json",
    },
  };
  try {
    await refreshToken();
    let response = await axios.get(
      `${urlBase}/document/download/${documentId}`,
      config
    );

    const pdfstr = response.data;
    const DownloadDir = RNFetchBlob.fs.dirs.DownloadDir;

    let pdfLocation = DownloadDir + "/" + fileName;
    console.log(pdfLocation);
    RNFetchBlob.fs.writeFile(pdfLocation, pdfstr, "base64").then(() => {
      const filePath = `${DownloadDir}/${fileName}`;
      RNFetchBlob.android.addCompleteDownload({
        title: fileName,
        description: "Download complete",
        mime: "base64",
        path: filePath,
        showNotification: true,
      });
      RNFetchBlob.android.actionViewIntent(filePath, "application/pdf");
    });

    const android = RNFetchBlob.android;
  } catch (err) {
    console.log(err);
    Toast.show("Document not found ", 10);
  }
}

// async function viewDocument(documentId) {
//   const config = {
//     method: "GET",
//     "Content-Type": "multipart/form-data",
//     headers: {
//       "ngrok-skip-browser-warning": "true",
//       Authorization: `Bearer ${await getToken()}`,
//       Accept: "application/json",
//     },
//   };
//   try {
//  await refreshToken();
//     let response = await axios.get(
//       `${urlBase}/document/download/${documentId}`,
//       config
//     );
//     const pdfstr = response.data;
//     return pdfstr;
//   } catch (err) {
//     Toast.show("Unable to view document", 10);
//     console.log(err);
//   }
// }

async function removeDocument(docId) {
  try {
    await refreshToken();
    let response = await axios.delete(
      `${urlBase}/document/delete/${docId}`,
      await getConfig()
    );
  } catch (err) {
    console.log(err);
    Toast.show("Unable to remove document", 10);
  }
}

async function getAllDocumentsList(patientId) {
  try {
    await refreshToken();
    let response = await axios.get(
      `${urlBase}/document/getAll/${patientId}`,
      await getConfig()
    );
    let documents = response.data;
    documents = documents.filter((item) => item.isAvailible);
    return documents;
  } catch (err) {
    console.log(err);
    Toast.show("Unable to fetch all documents of the patient", 10);
  }
}

async function getAllPrescriptionsList(patientId) {
  try {
    await refreshToken();
    let response = await axios.get(
      `${urlBase}/document/getAllPrescriptions/${patientId}`,
      await getConfig()
    );
    let prescriptions = response.data;
    prescriptions = prescriptions.filter((item) => item.isAvailible);
    return prescriptions;
  } catch (err) {
    console.log(err);
    Toast.show("Unable to fetch all prescriptions of a patient", 10);
  }
}

async function uploadDocument(patientId) {
  const config = {
    method: "POST",
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${await getToken()}`,
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const doc = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf],
    });
    const formdata = new FormData();

    formdata.append("file", {
      uri: doc[0].uri,
      type: doc[0].type,
      name: doc[0].name,
      size: doc[0].size,
    });
    await refreshToken();
    let response = await axios.post(
      `${urlBase}/document/upload/${patientId}`,
      formdata,
      config
    );
  } catch (err) {
    console.log(err);
    Toast.show("Unable to upload document", 10);
  }
}

export {
  uploadDocument,
  getAllDocumentsList,
  removeDocument,
  downloadDocument,
  docsForConsultation,
  addDocToConsultation,
  removeDocFromConsultation,
};
