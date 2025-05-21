const uploadArchive = require("./uploadArchive.js");
const {
  archiveValidation,
} = require("./validations.js");const {
  getBolsistaById,
} = require("../bolsista/bolsistaOperation.js");

async function handleFileUpload(data, bolsistaFiles, bolsista) {
  await getBolsistaById(bolsista)
  const type = archiveValidation(data);
  const existingFile = bolsistaFiles.find(f => f.dataValues.type_id == type);

  const file = await uploadArchive(data);

  return {file, existingFile, type};
}

module.exports = handleFileUpload;