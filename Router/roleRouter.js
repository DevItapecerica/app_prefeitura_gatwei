const Role = require("../controller/Permissions/rolesController");
const auth = require("../middleware/authJWT");

const roleRouter = (fastify, opt) => {
fastify.addHook("preHandler",auth);

  fastify.route({
    method: "POST",
    url: "/",
    handler: Role.createRoles,
  });

  fastify.route({
    method: "get",
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

module.exports = roleRouter;
