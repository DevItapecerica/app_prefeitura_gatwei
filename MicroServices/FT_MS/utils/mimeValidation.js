const { fileTypeFromFile } = require("file-type");
const fs = require("fs");

const mimeTypes = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  pdf: "application/pdf",
};

const mimeValidation = async (file, mimeFile) => {
  try {
    const fileType = await fileTypeFromFile(file);

    if (!mimeTypes[fileType?.ext]) {
      fs.unlink(file, (error) => {
        if (error) {
          console.error("Error deleting file:", error);
        } else {
          console.log("File deleted successfully");
        }
      });

      throw { status: 400, message: "Tipo de arquivo inválido" };
    }

    if(mimeFile !== fileType.mime) {
      fs.unlink(file, (error) => {
        if (error) {
          console.error("Error deleting file:", error);
        } else {
          console.log("File deleted successfully");
        }
      });

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
