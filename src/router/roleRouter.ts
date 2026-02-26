import { FastifyInstance } from "fastify";
import * as Role from "../controller/Permissions/rolesController.js";
import { authJWT } from "../middleware/authJWT.js";

const roleRouter = (fastify: FastifyInstance) => {
  fastify.addHook("preHandler", authJWT);

  fastify.route({
    method: "POST",
    url: "/",
    handler: Role.createRoles,
  });

  fastify.route({
    method: "GET",
    url: "/",
    handler: Role.getRoles,
  });

  fastify.route({
    method: "PUT",
    url: "/:id",
    handler: Role.updateRoles,
  });

  fastify.route({
    method: "DELETE",
    url: "/:id",
    handler: Role.deleteRoles,
  });
};

export default roleRouter;