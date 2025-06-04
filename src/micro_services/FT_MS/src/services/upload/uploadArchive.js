import { Transform, pipeline } from "stream";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const pump = promisify(pipeline);
const uploadDir = path.join(path.dirname(import.meta.url.split("file:")[1]), "../../../uploads");
if (!uploadDir) {
  throw {statusCode: 500, message: "Upload directory path could not be determined."};
}
// Define the maximum file size (2 MB in this case)

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

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

    console.log("Erro ao escrever o arquivo: " + err);
  });

  await pump(Data.file, transform, writeStream);

  return { filePath, mimeFile, fieldname, filename };
};

export default uploadArchive;
