const { DEMANDAS_API_HOST, FT_APP_API_KEY } = require("../config/env")
const axios = require("axios");

const DEMANDAS_API = axios.create({
  baseURL: DEMANDAS_API_HOST,
  headers: {
    // "Content-Type": "application/json",
  },
});

DEMANDAS_API.interceptors.request.use(
  (config) => {
    config.headers["x-api-key"] = FT_APP_API_KEY;
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

module.exports = DEMANDAS_API;
