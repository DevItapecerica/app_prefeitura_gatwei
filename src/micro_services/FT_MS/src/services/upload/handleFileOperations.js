import uploadArchive from "./uploadArchive.js";
import { archiveValidation } from "./validations.js";
import { getBolsistaById } from "../bolsista/bolsistaOperation.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOAD_DIR = path.join(__dirname, "../../../uploads");

console.log(UPLOAD_DIR);
async function handleFileUpload(data, bolsistaFiles, bolsista, name) {
  await getBolsistaById(bolsista);
  const type = archiveValidation(data);
  const existingFile = bolsistaFiles.find((f) => f.dataValues.type_id == type);

  const file = await uploadArchive(data, name);

  if (existingFile) {
    existingFile.path = path.join(UPLOAD_DIR, existingFile.path);
  }

  console.log("File uploaded:", existingFile);

  return { file, existingFile, type };
}

export async function handleFileBulkRemove(bolsistaFiles) {
  const filePaths = [];

  for (const file of bolsistaFiles) {
    // for..of correto aqui
    console.log(file);
    const filePath = path.join(UPLOAD_DIR, file.path);
    filePaths.push(filePath);
  }

  return filePaths;
}

export default handleFileUpload;
