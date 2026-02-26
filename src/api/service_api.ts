import axios from "axios";
import { SERVICE_API_HOST, SERVICE_API_KEY } from "../config/env.js";

const SERVICE_API = axios.create({
  baseURL: SERVICE_API_HOST,
  headers: {},
});

SERVICE_API.interceptors.request.use(
  (config) => {
    config.headers["x-api-key"] = SERVICE_API_KEY;
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default SERVICE_API;
