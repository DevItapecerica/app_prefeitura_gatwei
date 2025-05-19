const { fileTypeFromFile } = require("file-type");
const fs = require("fs");

const mimeTypes = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  pdf: "application/pdf",
};

const mimeValidation = async (file, mimeFile, fieldname) => {
  try {
    const fileType = await fileTypeFromFile(file);

    if (!mimeTypes[fileType?.ext]) {
      throw { status: 400, message: `Tipo de arquivo inválido: ${fieldname}`};
    }

    if(mimeFile !== fileType.mime) {
      throw { status: 400, message: "Para de graça, salafrario" };
    }

    return fileType;
  } catch (error) {

    throw error;
  }
};

module.exports = {
  mimeValidation,
  mimeTypes,
};
