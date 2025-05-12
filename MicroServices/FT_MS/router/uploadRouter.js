const fs = require("fs");
const path = require("path");
const util = require("util");
const pump = util.promisify(require("stream").pipeline);
const Transform = require("stream").Transform;

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
    handler: async (request, reply) => {
      try {
        const filepath = path.join(__dirname, "./uploads", "avatar.png");

        if (!fs.existsSync(filepath)) {
          throw {status: 404, message: "File not found" };
        }

        const file = require("fs").createReadStream(filepath);

        const extname = path.extname(filepath).toLowerCase();

        return reply
          .status(200)
          .type(mimeTypes[extname] || "application/octet-stream")
          .send(file);
      } catch (error) {
        throw error;
      }
    },
  });

  fastify.route({
    method: "POST",
    url: "/documentacao",
    handler: async (request, reply) => {
      const data = await request.file();
      const uploadDir = path.join(__dirname, "uploads");
      fs.mkdirSync(uploadDir, { recursive: true });

      await pump(
        data.file,
        new Transform({
          transform(chunk, encoding, callback) {
            // Transform the chunk if needed
            callback(null, chunk);
          },
        }),
        fs.createWriteStream(path.join(__dirname, "./uploads", `${data.fieldname}`))
      );

      console.log("----------------------");
      console.log(data.file);

      console.log("----------------------");

      reply.status(200).send({
        message: "File uploaded successfully",
        filename: data.filename,
      });
    },
  });
};

module.exports = uploadRouter;
