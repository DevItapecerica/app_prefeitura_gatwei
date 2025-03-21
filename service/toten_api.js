require("dotenv").config({path: `${__dirname}/../config/.env`});

const axios = require("axios");

const TOTEN_API = axios.create({
  baseURL: "http://localhost:8001",
  headers: {
    "Content-Type": "application/json",
  },
});

TOTEN_API.interceptors.request.use(
  (config) => {
    config.headers["x-api-key"] = process.env.TOTEN_API_KEY;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

module.exports = TOTEN_API;
