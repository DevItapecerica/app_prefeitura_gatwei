const { fileTypeFromFile } = require("file-type");
const fs = require("fs");

const mimeTypes = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  pdf: "application/pdf",
};

const fieldBD = [
  "rg",
  "cpf",
  "inscricao",
  "banco",
  "adesao",
  "prorrogacao",
  "egresso_prisional",
  "pcd",
  "escolaridade",
];

const mimeValidation = async (file, mimeFile, fieldname) => {
  try {
    const fileType = await fileTypeFromFile(file);

    if (!mimeTypes[fileType?.ext]) {
      throw { status: 400, message: `Tipo de arquivo inválido: ${fieldname}` };
    }

    if (mimeFile !== fileType.mime) {
      throw { status: 400, message: "Para de graça, salafrario" };
    }

    return fileType;
  } catch (error) {
    throw error;
  }
};

const archiveValidation = (Data) => {
  // verifica a qual campo pertence
  const type = fieldBD.indexOf(Data.fieldname);
  if (type == -1) {
    throw {
      status: 400,
      message: "Tipo de arquivo não encontrado " + Data.fieldname,
    };
  }

  return type
};

module.exports = {
  mimeValidation,
  mimeTypes,
  fieldBD,
  archiveValidation,
};
