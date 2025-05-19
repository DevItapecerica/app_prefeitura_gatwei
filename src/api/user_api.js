const { USER_API_HOST, USER_API_KEY } = require("../config/env")
const axios = require("axios");

const USER_API = axios.create({
  baseURL: USER_API_HOST,
  headers: {
  },
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

module.exports = USER_API;
