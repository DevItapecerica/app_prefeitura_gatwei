import fs from "fs";
import path from "path";

// const UPLOAD_DIR = path.join(path.dirname(import.meta.url.split("file:")[1]), "../../uploads");

const removeFile = (filename) => {
  try {
    // const arch = path.join(UPLOAD_DIR, filename);
    fs.unlink(filename, (error) => {
      if (error) {
        console.error("Error deleting file:", error);
      } else {
        console.log("File deleted successfully");
      }
    });
  } catch (error) {
    console.error("Error in removeFile:", error);
    throw {
      code: 500,
      message: "Error in removeFile",
      ok: false,
      api: "FT_MS",
    };
  }
};

export default removeFile;
