import { fileTypeFromFile } from "file-type";
import fs from "fs";

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
      throw {
        code: 400,
        message: `Tipo de arquivo inválido: ${fieldname}`,
        ok: false,
        api: "FT_MS",
      };
    }

    if (mimeFile !== fileType.mime) {
      throw {
        code: 400,
        message: "Para de graça, salafrário",
        ok: false,
        api: "FT_MS",
      };
    }

    return fileType;
  } catch (error) {
    throw {
      code: error.code,
      message: error.message,
      ok: false,
      api: "FT_MS",
    };
  }
};

const archiveValidation = (Data) => {
  // verifica a qual campo pertence
  const type = fieldBD.indexOf(Data.fieldname);
  if (type == -1) {
    throw {
      code: 400,
      message: "Tipo de arquivo não encontrado " + Data.fieldname,
      ok: false,
      api: "FT_MS",
    };
  }

  return type;
};

export { mimeValidation, mimeTypes, fieldBD, archiveValidation };
