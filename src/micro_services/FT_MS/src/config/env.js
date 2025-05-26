import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// Resolver __dirname no ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carregar .env
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Exportar variáveis
export const DATABASE_USER = process.env.DATABASE_USER;
export const DATABASE_KEY = process.env.DATABASE_KEY;
export const DATABASE_NAME = process.env.DATABASE_NAME;
export const DATABASE_HOST = process.env.DATABASE_HOST;

export const API_KEY = process.env.API_KEY;

export const PORT = process.env.APPLICATION_PORT;
export const SECRET_KEY = process.env.SECRET_KEY;
