import handleFileUpload from "../services/upload/handleFileOperations.js";
import { getArchivePath, getOneArchive } from "../utils/getArchive.js";
import { mimeValidation, fieldBD } from "../services/upload/validations.js";
import removeFile from "../utils/removeFile.js";
import {
  saveArchive,
  searchArchive,
  updateArchive,
} from "../services/upload/archiveDBManipulation.js";
import ftImageDB from "../db/model/Image.js";

export const postDoc = async (request, reply) => {
  let uploadedFiles = [];
  const { id } = request.params;
  let path = null;

  try {
    const bolsistaFiles = await searchArchive(id);
    const DataFile = await request.files();

    // for each file
    for await (const Data of DataFile) {
      path = null;

      // upload archive
      let response = await handleFileUpload(Data, bolsistaFiles, id);

      path = response.file.filePath;

      // verify if upload is okay
      const mime = await mimeValidation(
        path,
        response.file.mimeFile,
        response.file.fieldname
      );

      // caso seja updateArchive, atualiza e remove o antigo
      if (response.existingFile) {
        console.log("Arquivo já existe, atualizando...");
        await updateArchive(response.file, id, response.type, mime.ext);
        await removeFile(response.existingFile.path);
      } else {
        await saveArchive(response.file, id, response.type, mime.ext);
      }

      // if okay, push archive to log to user
      uploadedFiles.push(response.file.fieldname);
    }
    // end for each file

    // return to user
    return reply.status(200).send({
      message: "Upload concluído com sucesso " + uploadedFiles,
    });
  } catch (error) {

    if (path) await removeFile(path);

    error.message += `. Arquivos upados com sucesso: ${
      uploadedFiles.length > 0 ? uploadedFiles : "anyone"
    }`;
    throw error;
  }
};

export const getDocs = async (request, reply) => {
  try {
    const { id } = request.params;

    const files = await ftImageDB.findAll({
      where: {
        bolsista_id: id,
      },
      attributes: ["path", "type_id", "mime"],
    });

    // let archivesPath = await getArchivePath(files);

    return reply.status(200).send({ archives: files, types: fieldBD });
  } catch (error) {
    throw error;
  }
};

export const getOneDoc = async (request, reply) => {
  try {
    const target = request.params.img;

    console.log(target);

    let archive = await getOneArchive(target);

    return reply.status(200).type(archive.type).send(archive.file);
  } catch (error) {
    throw error;
  }
};
