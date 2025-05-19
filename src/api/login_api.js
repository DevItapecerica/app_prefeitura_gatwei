const { LOGIN_API_HOST, LOGIN_API_KEY } = require("../config/env")
const axios = require("axios");

const LOGIN_API = axios.create({
  baseURL: LOGIN_API_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

LOGIN_API.interceptors.request.use(
  (config) => {
    config.headers["x-api-key"] = LOGIN_API_KEY;
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

module.exports = LOGIN_API;
