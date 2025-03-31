require("dotenv").config({path: `${__dirname}/../config/.env`});

const axios = require("axios");

const PERMISSION_API = axios.create({
  baseURL: process.env.PERMISSION_API_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

PERMISSION_API.interceptors.request.use(
  (config) => {
    config.headers["x-api-key"] = process.env.PERMISSION_API_KEY;
    
    return config;
  },
  (error) => {
    return Promise.reject(error, 'teste');
  }
);

module.exports = PERMISSION_API;
