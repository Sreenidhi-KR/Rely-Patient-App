import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://c5c5-103-156-19-229.ngrok-free.app";

const getToken = async () => {
  let userInfo = await AsyncStorage.getItem("userInfo");
  userInfo = JSON.parse(userInfo);
  return userInfo == null ? null : userInfo.accessToken;
};

const getUserId = async () => {
  let userInfo = await AsyncStorage.getItem("userInfo");
  userInfo = JSON.parse(userInfo);
  return userInfo == null ? null : userInfo.id;
};

const getRefreshToken = async () => {
  let userInfo = await AsyncStorage.getItem("userInfo");
  userInfo = JSON.parse(userInfo);
  return userInfo == null ? null : userInfo.refreshToken;
};

const setToken = async (newToken) => {
  let userInfo = await AsyncStorage.getItem("userInfo");
  userInfo = JSON.parse(userInfo);
  if (userInfo) {
    await AsyncStorage.mergeItem(
      "userInfo",
      JSON.stringify({ accessToken: newToken })
    );
  }
};

const getConfig = async () => {
  return {
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${await getToken()}`,
    },
  };
};

export { BASE_URL, getToken, getConfig, getRefreshToken, setToken, getUserId };
