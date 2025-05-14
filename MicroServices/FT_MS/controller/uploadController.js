const fs = require("fs");
const path = require("path");
const { Transform } = require("stream");
const pump = require("util").promisify(require("stream").pipeline);

const { mimeValidation, mimeTypes } = require("../utils/mimeValidation.js");

const MAX_FILE_SIZE = 0 * 1024 * 1024; // 5 MB

const postDoc = async (request, reply) => {
  try {
    const Data = await request.file();
    const filename = `${Date.now()}.${Data.filename.split(".").pop()}`;
    const uploadDir = path.join(__dirname, "../uploads");
    const filePath = path.join(uploadDir, filename);

    let fileSize = 0;

    fs.mkdirSync(uploadDir, { recursive: true });

    const transform = new Transform({
      transform(chunk, encoding, callback) {
        fileSize += chunk.length;

        if (fileSize > MAX_FILE_SIZE) {
          const err = new Error("File size exceeds limit");
          err.statusCode = 400;
          err.file = filePath;
          return callback(err);
        }

        callback(null, chunk);
      },
    });

    // WriteStream

    const writeStream = fs.createWriteStream(filePath);

    writeStream.on("error", (err) => {
      fs.unlink(filePath, (error) => {
        if (error) {
          console.error("Error deleting file:", error);
        } else {
          console.log("File deleted successfully");
        }
      });

      console.log("Erro ao escrever o arquivo:");
    });

    await pump(Data.file, transform, writeStream);

    let typePath = await mimeValidation(filePath);
    console.log(`Upload concluído com sucesso ${JSON.stringify(typePath)}`);

    return reply.status(200).send({
      message: "Upload concluído com sucesso",
      file: filename,
    });

  } catch (error) {

    return reply.code(error.statusCode || error.status || 500).send({
      message: error.message || "Erro interno ao fazer upload",
    });
  }
};

const getDocs = async (request, reply) => {
  try {
    const filepath = path.join(__dirname, "../uploads", "1747151083581.png");

    if (!fs.existsSync(filepath)) {
      throw { status: 404, message: "File not found" };
    }

    const file = fs.createReadStream(filepath);

    const extname = filepath.split(".")[1];

    return reply
      .status(200)
      .type(mimeTypes[extname] || "application/octet-stream")
      .send(file);
  } catch (error) {
    throw error;
  }
};

const getBolsistaDocs = async (request, reply) => {
  try {
    const filepath = path.join(__dirname, "../uploads", "1747151083581.png");

    if (!fs.existsSync(filepath)) {
      throw { status: 404, message: "File not found" };
    }

    const file = fs.createReadStream(filepath);

    const extname = filepath.split(".")[1];

    return reply
      .status(200)
      .type(mimeTypes[extname] || "application/octet-stream")
      .send(file);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  postDoc,
  getDocs,
  getBolsistaDocs,
};
