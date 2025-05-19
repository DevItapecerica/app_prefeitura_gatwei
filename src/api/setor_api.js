const { SETOR_API_HOST, SETOR_API_KEY } = require("../config/env")
const axios = require("axios");

const SETOR_API = axios.create({
  baseURL: SETOR_API_HOST,
  headers: {
  },
});

SETOR_API.interceptors.request.use(
  (config) => {
    config.headers["x-api-key"] = SETOR_API_KEY;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

module.exports = SETOR_API;