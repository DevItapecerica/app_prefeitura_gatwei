require("dotenv").config();
const axios = require("axios");

const LOGIN_API = axios.create({
  baseURL: "http://localhost:8001",
  headers: {
    "Content-Type": "application/json",
  },
});

LOGIN_API.interceptors.request.use(
  (config) => {
    config.headers["x-api-key"] = process.env.LOGIN_API_KEY;
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

module.exports = LOGIN_API;
