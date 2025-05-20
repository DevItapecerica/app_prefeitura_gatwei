const uploadArchive = require("../utils/uploadArchive.js");
const { getArchive, getOneArchive } = require("../utils/getArchive.js");
const { mimeValidation } = require("../utils/mimeValidation.js");
const removeFile = require("../utils/removeFile.js");
const ftImageDB = require("../db/model/ftImageModel.js");

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

const postDoc = async (request, reply) => {
  let uploadedFiles = [];
  const { id } = request.params;
  let path = null;

  try {
    const DataFile = await request.files();

    // for each file
    for await (const Data of DataFile) {
      path = null;

      // verifica a qual campo pertence
      const type = fieldBD.indexOf(Data.fieldname);
      console.log(type);
      if (type == -1) {
        throw {
          status: 400,
          message: "Tipo de arquivo não encontrado " + Data.fieldname,
        };
      }

      // upload archive
      let file = await uploadArchive(Data);
      path = file.filePath;

      // verify if upload is okay
      await mimeValidation(file.filePath, file.mimeFile, file.fieldname);

      // add on db and remove old file 


      // if okay, push archive to log to user
      uploadedFiles.push(file.fieldname);

      console.log(`File uploaded: ${uploadedFiles}`);
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

    let archivesGeted = await getArchive(files);

    return reply.status(200).send({ archives: archivesGeted, types: fieldBD });
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