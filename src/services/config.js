import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

API.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default API;
