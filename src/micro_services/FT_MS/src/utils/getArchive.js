import fs from "fs";
import path from "path";
import { mimeTypes } from "../services/upload/validations.js";



const getArchivePath = (archives) => {
  let archivesGeted = [];

  archives.forEach((archive) => {
    const archiveName = archive.dataValues.path;

    const filepath = path.join(path.dirname(import.meta.url.split("file:")[1]), "../../uploads", archive);

    if (!fs.existsSync(filepath)) {
      throw { status: 404, message: "File not found " + archiveName };
    }

    const url = `/ft/img?target=${archiveName}`;

    archivesGeted.push({ filename: archiveName, url });
  });

  return archivesGeted;
};

const getOneArchive = (archive) => {
    const filepath = path.join(path.dirname(import.meta.url.split("file:")[1]), "../../uploads", archive);


    console.log(filepath)


  if (!fs.existsSync(filepath)) {
    throw { status: 404, message: "File not found" };
  }

  const file = fs.createReadStream(filepath);

  const extname = filepath.split(".")[1];

  const type = mimeTypes[extname] || "application/octet-stream";

  return { file, type };
};

export { getOneArchive, getArchivePath };
