import { USER_API_HOST, USER_API_KEY } from "../config/env.js";
import axios from "axios";

const USER_API = axios.create({
  baseURL: USER_API_HOST,
});

USER_API.interceptors.request.use(
  (config) => {
    config.headers["x-api-key"] = USER_API_KEY;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default USER_API;
