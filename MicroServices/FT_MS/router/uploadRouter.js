const { postDoc, getDocs, getBolsistaDocs } = require("../controller/uploadController.js");
const authJWT = require("../middleware/authJWT.js");

const uploadRouter = (fastify, options) => {

  fastify.addHook("preHandler", authJWT);

  fastify.route({
    method: "GET",
    url: "/",
    handler: getDocs,
  });

  fastify.route({
    method: "GET",
    url: "/bolsista/:id",
    handler: getBolsistaDocs,
  });

  fastify.route({
    method: "POST",
    url: "/bolsista/:id",
    handler: postDoc,
  });
};

module.exports = uploadRouter;
