import { Transform, pipeline } from "stream";
import { promisify } from "util";
import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "../../../uploads");

const pump = promisify(pipeline);
if (!uploadDir) {
  throw {
    code: 500,
    message: "Upload directory path could not be determined.",
    api: "FT_MS",
    ok: false,
  };
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
        err.code = 400;
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
