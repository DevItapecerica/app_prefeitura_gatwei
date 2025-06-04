import { DEMANDAS_API_HOST, FT_APP_API_KEY } from "../config/env.js";
import axios from "axios";

const DEMANDAS_API = axios.create({
  baseURL: DEMANDAS_API_HOST,
  headers: {
    // "Content-Type": "application/json",
  },
});

DEMANDAS_API.interceptors.request.use(
  (config) => {
    config.headers["x-api-key"] = FT_APP_API_KEY;
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default DEMANDAS_API;
