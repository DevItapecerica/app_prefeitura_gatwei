import fs from "fs";
import path from "path";
import { mimeTypes } from "../services/upload/validations.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOAD_DIR = path.join(__dirname, "../../uploads");

const getArchivePath = (archives) => {
  let archivesGeted = [];

  archives.forEach((archive) => {
    const archiveName = archive.dataValues.path;

    const filepath = path.join(UPLOAD_DIR, archive);

    if (!fs.existsSync(filepath)) {
      throw {
        code: 404,
        message: "Arquivo não encontrado" + archiveName,
        api: "FT_MS",
        ok: false,
      };
    }

    const url = `/ft/img?target=${archiveName}`;

    archivesGeted.push({ filename: archiveName, url });
  });

  return archivesGeted;
};

const getOneArchive = (archive) => {
  const filepath = path.join(UPLOAD_DIR, archive);

  // if (!fs.existsSync(filepath)) {
  //   throw { status: 404, message: "File not found" };
  // }

  const file = fs.createReadStream(filepath);

  const extname = path.extname(filepath).slice(1); // mais seguro que split(".")[1]

  const type = mimeTypes[extname] || "application/octet-stream";

  return { file, type };
};

export { getOneArchive, getArchivePath };
