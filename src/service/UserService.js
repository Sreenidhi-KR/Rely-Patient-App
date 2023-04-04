import axios from "axios";
import { BASE_URL, token } from "../config";

const urlBase = `${BASE_URL}/api/v1`;

const config = () => {
  return {
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${token}`,
    },
  };
};
