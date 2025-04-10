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
    handler: Role.getRole,
  });
};

module.exports = roleRouter;
