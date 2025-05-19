const { SERVICE_API_HOST, SERVICE_API_KEY } = require("../config/env")
const axios = require("axios");

const USER_API = axios.create({
  baseURL: SERVICE_API_HOST,
  headers: {
  },
});

USER_API.interceptors.request.use(
  (config) => {
    config.headers["x-api-key"] = SERVICE_API_KEY;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

module.exports = USER_API;