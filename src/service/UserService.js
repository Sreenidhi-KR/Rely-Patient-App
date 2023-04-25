import axios from "axios";
import { BASE_URL, getConfig, getToken } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DocumentPicker from "react-native-document-picker";
import Toast from "react-native-simple-toast";

const urlBase = `${BASE_URL}/api/v1`;

async function downloadPhoto(patientId) {
  const config = {
    method: "POST",
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${await getToken()}`,
    },
  };
  let response = await axios.get(
    `${urlBase}/user/downloadImage/${patientId}`,
    config
  );
  return response.data;
}
async function uploadPhoto(patientId) {
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
      type: [DocumentPicker.types.images],
    });
    const formdata = new FormData();

    formdata.append("image", {
      uri: doc[0].uri,
      type: doc[0].type,
      name: doc[0].name,
      size: doc[0].size,
    });

    let response = await axios.post(
      `${urlBase}/user/uploadImage/${patientId}`,
      formdata,
      config
    );
  } catch (err) {
    console.log(err);
  }
}
async function getProfilesForUser() {
  try {
    let userInfo = await AsyncStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    const userId = userInfo.id;
    let response = await axios.get(
      `${urlBase}/user/getPatients/${userId}`,
      await getConfig()
    );
    return response.data;
  } catch (err) {
    console.log(err);
    Toast.show("Unable to fetch profiles for User", 10);
  }
}

export { getProfilesForUser, uploadPhoto, downloadPhoto };
