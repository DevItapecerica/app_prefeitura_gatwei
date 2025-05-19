const { Transform } = require("stream");
const pump = require("util").promisify(require("stream").pipeline);
const fs = require("fs");
const path = require("path");
const uploadDir = path.join(__dirname, "../uploads");
const { mimeValidation } = require("./mimeValidation.js");

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 5 MB

const uploadArchive = async (Data) => {
  const filename = `${Date.now()}.${Data.filename.split(".").pop()}`;
  const fieldname = Data.fieldname;
  const filePath = path.join(uploadDir, filename);
  const mimeFile = Data.mimetype;

  let fileSize = 0;

  fs.mkdirSync(uploadDir, { recursive: true });

  const transform = new Transform({
    transform(chunk, encoding, callback) {
      fileSize += chunk.length;

      if (fileSize > MAX_FILE_SIZE) {
        const err = new Error(`File size exceeds limit ${fieldname}`);
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

  return {filePath, mimeFile, fieldname, filename}
};

module.exports = uploadArchive;