const fs = require("fs");

const removeFile = (path) => {
  fs.unlink(path, (error) => {
    if (error) {
      console.error("Error deleting file:", error);
    } else {
      console.log("File deleted successfully");
    }
  });
};

module.exports = removeFile;
