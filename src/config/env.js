import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// Emular __dirname em ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carregar variáveis do .env
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

function must(name) {
  const val = process.env[name];
  if (!val) throw new Error(`Env ${name} is missing`);
  return val;
}

// Exporta variáveis de ambiente individualmente
export const LOGIN_API_HOST = must("LOGIN_API_HOST");
export const LOGIN_API_KEY = must("LOGIN_API_KEY");

export const USER_API_HOST = must("USER_API_HOST");
export const USER_API_KEY = must("USER_API_KEY");

export const SETOR_API_HOST = must("SETOR_API_HOST");
export const SETOR_API_KEY = must("SETOR_API_KEY");

export const SERVICE_API_HOST = must("SERVICE_API_HOST");
export const SERVICE_API_KEY = must("SERVICE_API_KEY");

export const PERMISSION_API_HOST = must("PERMISSION_API_HOST");
export const PERMISSION_API_KEY = must("PERMISSION_API_KEY");

export const FT_APP_API_HOST = must("FT_APP_API_HOST");
export const FT_APP_API_KEY = must("FT_APP_API_KEY");

export const IPTU_API_HOST = must("IPTU_API_HOST");
export const IPTU_API_KEY = must("IPTU_API_KEY");

export const PORT = must("APPLICATION_PORT");
