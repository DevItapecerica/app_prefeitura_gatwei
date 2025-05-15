const fs = require("fs");
const path = require("path");

const getOneArchive = (archive) => {
  const filepath = path.join(__dirname, "../uploads", archive);

  if (!fs.existsSync(filepath)) {
    throw { status: 404, message: "File not found" };
  }

  const file = fs.createReadStream(filepath);

  const extname = filepath.split(".")[1];

  return { file, extname };
};

const getArchive = (archive) => {
    const filepath = path.join(__dirname, "../uploads", archive);
  
    if (!fs.existsSync(filepath)) {
      throw { status: 404, message: "File not found" };
    }
  
    const file = fs.createReadStream(filepath);
  
    const extname = filepath.split(".")[1];
  
    return { file, extname };
  };

module.exports = {getOneArchive, getArchive};
