const Role = require("../controller/Permissions/rolesController");

const roleRouter = (fastify, opt) => {
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


};

module.exports = roleRouter;
