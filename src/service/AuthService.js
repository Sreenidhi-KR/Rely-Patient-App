import axios from "axios";
import {
  BASE_URL,
  getToken,
  getConfig,
  getRefreshToken,
  setToken,
  getUserId,
} from "../config";
import Toast from "react-native-simple-toast";

const urlBase = `${BASE_URL}/api/auth`;

const userLogin = async (username, password) => {
  console.log("userLogin - login service");
  try {
    const response = await axios.post(`${urlBase}/user/signin`, {
      username,
      password,
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    Toast.show("Login Error", 10);
    throw err;
  }
};

const userRegister = async (username, email, password) => {
  console.log("userRegister - login service");
  try {
    await axios.post(`${urlBase}/user/signup`, {
      username,
      password,
      email,
    });
  } catch (err) {
    Toast.show("Unable to register user", 10);
    throw err;
  }
};

const userLogout = async () => {
  try {
    await refreshToken();
    const userId = await getUserId();
    const response = await axios.post(
      `${urlBase}/user/signout/${userId}`,
      {},
      await getConfig()
    );
    console.log("logged out");
  } catch (error) {
    console.log(error);
    Toast.show("Unable to Logout", 10);
  }
};

const refreshToken = async () => {
  //TODO need to Handle if refresh token expired
  try {
    const token = await getToken();
    const accessToken = JSON.parse(atob(token.split(".")[1]));
    let date = new Date();
    let jwtDate = new Date(accessToken.exp * 1000);
    let difference = jwtDate.getTime() - date.getTime();
    console.log("difference", difference);
    if (difference < 0) {
      const refreshToken = await getRefreshToken();
      const response = await axios.post(
        `${urlBase}/user/refreshtoken`,
        {
          refreshToken,
        },
        await getConfig()
      );
      if (response.data.accessToken) {
        await setToken(response.data.accessToken);
      }
      return response.data;
    }
  } catch (err) {
    console.log("error", err);
  }
};

export { userLogin, userRegister, refreshToken, userLogout };
