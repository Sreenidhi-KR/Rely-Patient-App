import axios from "axios";
const urlBase = "https://af2f-119-161-98-68.in.ngrok.io/api/auth";
const token =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrcnMiLCJpYXQiOjE2ODAyMTg0NDEsImV4cCI6MTY4MDMwNDg0MX0.8WHVq7mwNMfHl8SbAVzx00pYTtXdDx_hU2J7CM-f7HtCNn61zPezdkJK_CY4_Gm01juDBgQgqDTBKv_-lqYikw";

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
