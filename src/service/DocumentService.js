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
    let docsToBeAdded = allDocs.filter(
      (obj2) => !inConsultation.some((obj1) => obj1.id === obj2.id)
    );
    let prescriptionsToBeAdded = allPrescriptions.filter(
      (obj2) => !inConsultation.some((obj1) => obj1.id === obj2.id)
    );

    return [inConsultation, docsToBeAdded, prescriptionsToBeAdded];
  } catch (err) {
    console.log(err);
    Toast.show("Unable to fetch all documents of a consultation", 10);
  }
}

async function downloadDocument(documentId, fileName, fileType) {
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
      RNFetchBlob.android.actionViewIntent(filePath, fileType);
    });

    const android = RNFetchBlob.android;
  } catch (err) {
    console.log(err);
    Toast.show("Document not found ", 10);
  }
}

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
      type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
    });
    const formdata = new FormData();

    formdata.append("file", {
      uri: doc[0].uri,
      type: doc[0].type,
      name: doc[0].name,
      size: doc[0].size,
    });
    if (doc[0].size <= 10000000) {
      await refreshToken();
      let response = await axios.post(
        `${urlBase}/document/upload/${patientId}`,
        formdata,
        config
      );
    } else {
      Toast.show("File size should be less than 10 MB", 10);
    }
  } catch (err) {
    console.log(err);
    Toast.show("Unable to upload document", 10);
  }
}

function enc() {
  var text = "The quick brown fox jumps over the lazy dog. 👻 👻";
  var secret = "René Über";
  var ciphertext = CryptoJS.AES.encrypt(text, secret);
  console.log("Cipher text: " + ciphertext);

  // var cipherForm = CryptoJS.AES.encrypt(
  //   JSON.stringify(formdata),
  //   "&F)J@NcRfTjWnZr4"
  // ).toString();

  // for (const pair of formdata.entries()) {
  //   console.log(`${pair[0]}, ${pair[1]}`);
  //   cryptdata.append();
  // }

  // console.log("encry", cipherForm);

  var decrypt = CryptoJS.AES.decrypt(ciphertext, secret);
  //var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  //console.log("dec", decryptedData);
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
