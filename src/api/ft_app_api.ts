import { FT_APP_API_HOST, FT_APP_API_KEY } from "../config/env.js";
import axios from "axios";

const FT_API = axios.create({
  baseURL: FT_APP_API_HOST,
  headers: {
    // "Content-Type": "application/json",
  },
});

FT_API.interceptors.request.use(
  (config) => {
    config.headers["x-api-key"] = FT_APP_API_KEY;
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default FT_API;
