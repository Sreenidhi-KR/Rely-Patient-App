import axios from "axios";
import { BASE_URL, token } from "../config";
import Toast from "react-native-simple-toast";

const urlBase = `${BASE_URL}/api/auth`;

const userLogin = async (username, password) => {
  console.log("userLogin - login service");
  try {
    const response = await axios.post(`${urlBase}/signin`, {
      username,
      password,
    });
    return response.data;
  } catch (err) {
    Toast.show("Error", 10);
    throw err;
  }
  
};

const userRegister = async (username, email, password) => {
  console.log("userRegister - login service");
  await axios.post(`${urlBase}/signup`, {
    username,
    password,
    email,
  });
};

export { userLogin, userRegister };
