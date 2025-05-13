const fs = require("fs");
const path = require("path");
const util = require("util");
const pump = util.promisify(require("stream").pipeline);
const Transform = require("stream").Transform;
const FileType = require("file-type");
const { postDoc, getDoc } = require("../controller/uploadController.js");

const mimeTypes = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".pdf": "application/pdf",
};

const uploadRouter = (fastify, options) => {
  fastify.route({
    method: "GET",
    url: "/documentacao",
    handler: getDoc,
  });

  fastify.route({
    method: "POST",
    url: "/documentacao",
    handler: postDoc,
  });
};

module.exports = uploadRouter;
