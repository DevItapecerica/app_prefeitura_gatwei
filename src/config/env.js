import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// Utilitário para __dirname em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega o .env na raiz do projeto
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Exporta variáveis de ambiente individualmente
export const LOGIN_API_HOST = process.env.LOGIN_API_HOST;
export const LOGIN_API_KEY = process.env.LOGIN_API_KEY;

export const USER_API_HOST = process.env.USER_API_HOST;
export const USER_API_KEY = process.env.USER_API_KEY;

export const SETOR_API_HOST = process.env.SETOR_API_HOST;
export const SETOR_API_KEY = process.env.SETOR_API_KEY;

export const SERVICE_API_HOST = process.env.SERVICE_API_HOST;
export const SERVICE_API_KEY = process.env.SERVICE_API_KEY;

export const PERMISSION_API_HOST = process.env.PERMISSION_API_HOST;
export const PERMISSION_API_KEY = process.env.PERMISSION_API_KEY;

export const DEMANDAS_API_HOST = process.env.DEMANDAS_API_HOST;
export const DEMANDAS_API_KEY = process.env.DEMANDAS_API_KEY;

export const FT_APP_API_HOST = process.env.FT_APP_API_HOST;
export const FT_APP_API_KEY = process.env.FT_APP_API_KEY;

export const PORT = process.env.APPLICATION_PORT;
