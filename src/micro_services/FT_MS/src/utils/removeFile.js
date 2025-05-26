import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(path.dirname(import.meta.url), "../../uploads");

const removeFile = (filename) => {
  fs.unlink(`${UPLOAD_DIR}/${filename}`, (error) => {
    if (error) {
      console.error("Error deleting file:", error);
    } else {
      console.log("File deleted successfully");
    }
  });
};

export default removeFile;
