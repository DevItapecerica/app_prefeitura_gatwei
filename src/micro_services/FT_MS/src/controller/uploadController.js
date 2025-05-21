const handleFileUpload = require("../services/upload/handleFileUpload.js");
const { getArchivePath, getOneArchive } = require("../utils/getArchive.js");
const {
  mimeValidation,
  fieldBD,
} = require("../services/upload/validations.js");
const removeFile = require("../utils/removeFile.js");
const {
  saveArchive,
  searchArchive,
  updateArchive,
} = require("../services/upload/archiveDBManipulation.js.js");
const ftImageDB = require("../db/model/ftImageModel.js");


const postDoc = async (request, reply) => {
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
      let response = await handleFileUpload(Data, bolsistaFiles)

      console.log(response)
      path = response.file.filePath
      
      // verify if upload is okay
      await mimeValidation(response.file.filePath, response.file.mimeFile, response.file.fieldname);

      // caso seja updateArchive, atualiza e remove o antigo
      if (response.existingFile) {
        await updateArchive(response.file, id, response.type);
        removeFile(response.existingFile.path);
      } else {
        await saveArchive(response.file, id, response.type);
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
    if (path) removeFile(path);

    error.message += `. Arquivos upados com sucesso: ${
      uploadedFiles.length > 0 ? uploadedFiles : "anyone"
    }`;
    throw error;
  }
};

const getDocs = async (request, reply) => {
  try {
    const { id } = request.params;

    const files = await ftImageDB.findAll({
      where: {
        bolsista_id: id,
      },
      attributes: ["path"],
    });

    let archivesPath = await getArchivePath(files);

    return reply.status(200).send({ archives: archivesPath, types: fieldBD });
  } catch (error) {
    throw error;
  }
};

const getOneDoc = async (request, reply) => {
  try {
    const target = request.query.target;

    console.log(target);

    let archive = await getOneArchive(target);

    return reply.status(200).type(archive.type).send(archive.file);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  postDoc,
  getDocs,
  getOneDoc,
};
