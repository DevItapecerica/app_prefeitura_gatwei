require("dotenv").config();
const axios = require("axios");

const USER_API = axios.create({
  baseURL: "http://localhost:8002",
  headers: {
  },
});

USER_API.interceptors.request.use(
  (config) => {
    config.headers["x-api-key"] = process.env.USER_API_KEY;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

module.exports = USER_API;
