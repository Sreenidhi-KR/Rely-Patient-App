import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://ae4e-103-156-19-229.ngrok-free.app";

const getToken = async () => {
  let userInfo = await AsyncStorage.getItem("userInfo");
  userInfo = JSON.parse(userInfo);
  return userInfo == null ? null : userInfo.accessToken;
};

const getConfig = async () => {
  return {
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${await getToken()}`,
    },
  };
};

export { BASE_URL, getToken, getConfig };
