import uploadArchive from "./uploadArchive.js";
import { archiveValidation } from "./validations.js";
import { getBolsistaById } from "../bolsista/bolsistaOperation.js";

async function handleFileUpload(data, bolsistaFiles, bolsista, name) {
  await getBolsistaById(bolsista);
  const type = archiveValidation(data);
  const existingFile = bolsistaFiles.find(f => f.dataValues.type_id == type);

  const file = await uploadArchive(data, name);

  return { file, existingFile, type };
}

export default handleFileUpload;
