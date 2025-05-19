const fs = require("fs");
const path = require("path");
const { mimeTypes } = require("./mimeValidation");

const getArchive = (archives) => {
  let archivesGeted = [];


  archives.forEach((archive) => {
    archiveName = archive.dataValues.path;

    const filepath = path.join(__dirname, "../uploads", archiveName);

    if (!fs.existsSync(filepath)) {
      throw { status: 404, message: "File not found " + archiveName};
    }

    const url = `/ft/img?target=${archiveName}`;

    archivesGeted.push({filename: archiveName, url}) 
  });

  return archivesGeted;
};

const getOneArchive = (archive) => {
  const filepath = path.join(__dirname, "../uploads", archive);

  if (!fs.existsSync(filepath)) {
    throw { status: 404, message: "File not found" };
  }

  const file = fs.createReadStream(filepath);

  const extname = filepath.split(".")[1];

  const type = mimeTypes[extname] || "application/octet-stream"

  return { file, type };
};

module.exports = { getOneArchive, getArchive };
