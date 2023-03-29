import DocumentPicker from "react-native-document-picker";
import axios from "axios";
const urlBase = "https://1403-103-156-19-229.in.ngrok.io/api/v1";
const patientId = 1; //Dummy patient Id for now later should be changed
const token =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiaWF0IjoxNjgwMTA2NzAzLCJleHAiOjE2ODAxOTMxMDN9.vkx7CAeJIFYpujT509TzCOS70sLNLEWWBNbLXsvzakxziipJJ1BA-ytlh4x10wGAZyZr3EGe73nk4hzdulfvmA";
const config = {
  method: "POST",
  headers: {
    "ngrok-skip-browser-warning": "true",
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  },
};

async function uploadDocument() {
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

    let response = await axios.post(
      `${urlBase}/document/upload/${patientId}`,
      formdata,
      config
    );
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

export { uploadDocument };
