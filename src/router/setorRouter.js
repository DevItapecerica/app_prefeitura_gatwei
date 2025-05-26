import {authJWT} from "../middleware/authJWT.js";
import * as Setor from "../controller/Setor/setorController.js";
import * as setorSchema from "../schema/setoresSchema.js";

const setorRouter = (fastify, options) => {
  fastify.addHook("preHandler", authJWT);

  fastify.route({
    method: "GET",
    url: "/",
    schema: setorSchema.getSetores,
    handler: Setor.getSetores,
  });

  fastify.route({
    method: "GET",
    url: "/:id",
    schema: setorSchema.getOneSetor,
    handler: Setor.getOneSetor,
  });

  fastify.route({
    method: "POST",
    url: "/",
    schema: setorSchema.postSetor,
    handler: Setor.createSetor,
  });

  fastify.route({
    method: "PUT",
    url: "/:id",
    schema: setorSchema.updateSetor,
    handler: Setor.updateSetor,
  });

  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: setorSchema.deleteSetor,
    handler: Setor.deleteSetor,
  });
};

export default setorRouter;
