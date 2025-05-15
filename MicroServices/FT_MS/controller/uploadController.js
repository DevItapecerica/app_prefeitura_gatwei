
const uploadArchive = require("../utils/uploadArchive.js");
const {getArchive, getOneArchive} = require("../utils/getArchive.js");
const {mimeTypes} = require("../utils/mimeValidation.js");

const postDoc = async (request, reply) => {
  let uploadedFiles = [];

  try {
    const DataFile = await request.files();

    for await (const Data of DataFile) {
      let file = await uploadArchive(Data);
      uploadedFiles.push(file);
      console.log(`File uploaded: ${uploadedFiles}`);
    }

    return reply.status(200).send({
      message: "Upload concluído com sucesso",
    });
  } catch (error) {
    error.message += `. Arquivos upados com sucesso: ${uploadedFiles}`;
    throw error;
  }
};

const getDocs = async (request, reply) => {
  try {
    let archive = await getArchive("1747335859357.jpeg")

    return reply
      .status(200)
      .type(mimeTypes[archive.extname] || "application/octet-stream")
      .send(archive.file);
  } catch (error) {
    throw error;
  }
};

const getOneDoc = async (request, reply) => {
  try {
    const target = request.query.target;

    console.log(target)

    let archive = await getOneArchive(target)

    return reply
      .status(200)
      .type(mimeTypes[archive.extname] || "application/octet-stream")
      .send(archive.file);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  postDoc,
  getDocs,
  getOneDoc,
};
