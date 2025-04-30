require("dotenv").config({path: `${__dirname}/../config/.env`});

const axios = require("axios");

const DEMANDAS_API = axios.create({
  baseURL: process.env.FT_APP_API_HOST,
  headers: {
    // "Content-Type": "application/json",
  },
});

DEMANDAS_API.interceptors.request.use(
  (config) => {
    config.headers["x-api-key"] = process.env.FT_APP_API_KEY;
    
    return config;
  },
  (error) => {
    return Promise.reject(error, 'teste');
  }
);

module.exports = DEMANDAS_API;
