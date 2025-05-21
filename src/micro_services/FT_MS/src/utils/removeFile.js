const fs = require("fs");
const path = require("path");
const UPLOAD_DIR = path.join(__dirname, "../../uploads")

const removeFile = (filename) => {
  fs.unlink(`${UPLOAD_DIR}/${filename}`, (error) => {
    if (error) {
      console.error("Error deleting file:", error);
    } else {
      console.log("File deleted successfully");
    }
  });
};

module.exports = removeFile;
