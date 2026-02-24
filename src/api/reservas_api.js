import { RESERVAS_API_HOST, RESERVAS_API_KEY } from "../config/env.js";
import axios from "axios";

const RESERVAS_API = axios.create({
  baseURL: RESERVAS_API_HOST,
});

RESERVAS_API.interceptors.request.use(
  (config) => {
    config.headers["x-api-key"] = RESERVAS_API_KEY;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default RESERVAS_API;
