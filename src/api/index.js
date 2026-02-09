import axios from "axios";

const api = axios.create({
  baseURL: "https://json-server-jet-five.vercel.app",
});

export default api;
