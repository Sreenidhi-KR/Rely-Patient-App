import axios from "axios";
const urlBase = "https://af2f-119-161-98-68.in.ngrok.io/api/auth";
const token =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiaWF0IjoxNjgwMTg1NDE1LCJleHAiOjE2ODAyNzE4MTV9.idmph9LwS35jOjzlhNh1yWh0HNqIFaOF_Mbw7KoeTYnuApFv72zbaE3o6AjsM3Xccg0q4pxpzihsBX85QXPiVQ";

const config = {
  headers: {
    "ngrok-skip-browser-warning": "true",
    Authorization: `Bearer ${token}`,
  },
};

const userLogin = async (username, password) => {
  console.log("userLogin - login service");
  const response = await axios.post(`${urlBase}/signin`, {
    username,
    password,
  });
  return response.data;
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
