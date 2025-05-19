const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

module.exports = {
  LOGIN_API_HOST: process.env.LOGIN_API_HOST,
  LOGIN_API_KEY: process.env.LOGIN_API_KEY,

  USER_API_HOST: process.env.USER_API_HOST,
  USER_API_KEY: process.env.USER_API_KEY,

  SETOR_API_HOST: process.env.SETOR_API_HOST,
  SETOR_API_KEY: process.env.SETOR_API_KEY,

  SERVICE_API_HOST: process.env.SERVICE_API_HOST,
  SERVICE_API_KEY: process.env.SERVICE_API_KEY,

  PERMISSION_API_HOST: process.env.PERMISSION_API_HOST,
  PERMISSION_API_KEY: process.env.PERMISSION_API_KEY,

  DEMANDAS_API_HOST: process.env.DEMANDAS_API_HOST,
  DEMANDAS_API_KEY: process.env.DEMANDAS_API_KEY,

  FT_APP_API_HOST: process.env.FT_APP_API_HOST,
  FT_APP_API_KEY: process.env.FT_APP_API_KEY,

  PORT: process.env.APPLICATION_PORT,
  // adicione o que precisar
};
