import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5065/api",
  withCredentials: true,
});

export default API;
