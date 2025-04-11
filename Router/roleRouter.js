const Role = require("../controller/Permissions/rolesController");
const auth = require("../middleware/authJWT");

const roleRouter = (fastify, opt) => {
  fastify.route({
    method: "POST",
    url: "/roles",
    preHandler: [auth],
    handler: Role.createRoles,
  });

  fastify.route({
    method: "get",
    url: "/roles",
    preHandler: [auth],
    handler: Role.getRoles,
  });

  fastify.route({
    method: "PUT",
    url: "/roles/:id",
    preHandler: [auth],
    handler: Role.updateRoles,
  });

  fastify.route({
    method: "DELETE",
    url: "/roles/:id",
    preHandler: [auth],
    handler: Role.deleteRoles,
  });


};

module.exports = roleRouter;
