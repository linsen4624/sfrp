import axios from "axios";
import ACCESS_TOKEN from "./constants";
import { baseUrl } from "./env";

axios.create({
  baseURL: baseUrl,
  timeout: 15000,
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    config.headers["authorization"] = token;
  }
  return config;
});

axios.interceptors.response.use((response) => {
  return response.data;
});

export default axios;
