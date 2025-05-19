const {
    createRole,
    getRoles,
    getRoleById,
    updateRole,
    deleteRole,
  } = require("../controller/rolesController");
const auth = require("../middleware/authKey");
  
  // Configuração das rotas para roles
  const rolesRouter = (fastify, options) => {
    fastify.route({
      method: "POST",
      url: "/roles",
    preHandler: [auth],
    handler: createRole,
    });
    fastify.route({
      method: "GET",
      url: "/roles",
    preHandler: [auth],
    handler: getRoles,
    });
    fastify.route({
      method: "GET",
      url: "/roles/:id",
    preHandler: [auth],
    handler: getRoleById,
    });
    fastify.route({
      method: "PUT",
      url: "/roles/:id",
    preHandler: [auth],
    handler: updateRole,
    });
    fastify.route({
      method: "DELETE",
      url: "/roles/:id",
    preHandler: [auth],
    handler: deleteRole,
    });
  };
  
  module.exports = rolesRouter;  