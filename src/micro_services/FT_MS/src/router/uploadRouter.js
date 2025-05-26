import { postDoc, getDocs, getOneDoc } from "../controller/uploadController.js";
import authJWT from "../middleware/authJWT.js";

const uploadRouter = (fastify, options) => {
  fastify.addHook("preHandler", authJWT);

  fastify.route({
    method: "GET",
    url: "/:img",
    handler: getOneDoc,
  });

  fastify.route({
    method: "GET",
    url: "/bolsista/:id",
    handler: getDocs,
  });

  fastify.route({
    method: "POST",
    url: "/bolsista/:id",
    handler: postDoc,
  });
};

export default uploadRouter;