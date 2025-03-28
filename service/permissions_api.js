require("dotenv").config();
const axios = require("axios");

const LOGIN_API = axios.create({
  baseURL: process.env.PERMISSION_API_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

LOGIN_API.interceptors.request.use(
  (config) => {
    config.headers["x-api-key"] = process.env.PERMISSION_API_KEY;
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

module.exports = LOGIN_API;
