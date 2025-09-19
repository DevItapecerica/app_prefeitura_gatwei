import axios from "axios";
import { LOGIN_API_HOST, LOGIN_API_KEY } from "../config/env.js";

const loginApi = axios.create({
  baseURL: LOGIN_API_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

loginApi.interceptors.request.use(
  (config) => {
    config.headers["x-api-key"] = LOGIN_API_KEY;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default loginApi;
