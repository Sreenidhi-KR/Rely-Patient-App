import axios from "axios";
const urlBase = "https://af2f-119-161-98-68.in.ngrok.io/api/auth";
const token =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrcnMiLCJpYXQiOjE2ODAyMDQ3NjksImV4cCI6MTY4MDI5MTE2OX0.zGuskbS8KbleltXB-VOWE9CcMkefdZlCGeQckhiP1Cc0JTaqonaICQz74H0zHCZDLr9HNY6Toxu2O6oIUCPrsQ";

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
