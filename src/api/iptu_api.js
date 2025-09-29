import axios from "axios";
import { IPTU_API_HOST, IPTU_API_KEY } from "../config/env.js";

const IPTU_API = axios.create({
  baseURL: IPTU_API_HOST+"/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

IPTU_API.interceptors.request.use(
  (config) => {
    config.headers["x-api-key"] = IPTU_API_KEY;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default IPTU_API;
