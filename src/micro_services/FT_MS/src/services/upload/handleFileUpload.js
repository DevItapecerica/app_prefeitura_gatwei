const uploadArchive = require("./uploadArchive.js");
const {
  archiveValidation,
} = require("./validations.js");

async function handleFileUpload(data, bolsistaFiles) {
  const type = archiveValidation(data);
  const existingFile = bolsistaFiles.find(f => f.dataValues.type_id == type);

  const file = await uploadArchive(data);

  return {file, existingFile, type};
}

module.exports = handleFileUpload;