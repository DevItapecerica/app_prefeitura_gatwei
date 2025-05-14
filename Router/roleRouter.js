const Role = require("../controller/Permissions/rolesController");
const auth = require("../middleware/authJWT");

const roleRouter = (fastify, opt) => {
fastify.addHook("preHandler",auth);

  fastify.route({
    method: "POST",
    url: "/roles",
    handler: Role.createRoles,
  });

  fastify.route({
    method: "get",
    url: "/roles",
    handler: Role.getRoles,
  });

  fastify.route({
    method: "PUT",
    url: "/roles/:id",
    handler: Role.updateRoles,
  });

  fastify.route({
    method: "DELETE",
    url: "/roles/:id",
    handler: Role.deleteRoles,
  });


};

module.exports = roleRouter;
