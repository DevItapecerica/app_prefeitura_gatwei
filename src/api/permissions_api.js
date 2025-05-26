import { PERMISSION_API_HOST, PERMISSION_API_KEY } from "../config/env.js";
import axios from "axios";

const PERMISSION_API = axios.create({
  baseURL: PERMISSION_API_HOST,
});

PERMISSION_API.interceptors.request.use(
  (config) => {
    config.headers["x-api-key"] = PERMISSION_API_KEY;
    return config;
  },
  (error) => {
    return Promise.reject(error); // Removido 'teste' extra
  }
);

export default PERMISSION_API;