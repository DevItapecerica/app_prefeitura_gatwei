import { SETOR_API_HOST, SETOR_API_KEY } from "../config/env.js";
import axios from "axios";

const SETOR_API = axios.create({
  baseURL: SETOR_API_HOST,
});

SETOR_API.interceptors.request.use(
  (config) => {
    config.headers["x-api-key"] = SETOR_API_KEY;
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default SETOR_API;
