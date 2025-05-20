const Setores = require('../controller/setoresController')
const auth = require('../middleware/authKey')
const setoresSchema = require('../schema/setoresSchema')

const router = (fastify, options) => {
  fastify.route({
    method: "GET",
    url: "/setor",
    schema: setoresSchema.getSetores,
    preHandler: [auth],
    handler: Setores.getSetores,
  });
  fastify.route({
    method: "GET",
    url: "/setor/:id",
    schema: setoresSchema.getOneSetor,
    preHandler: [auth],
    handler: Setores.getOneSetor,
  });

  fastify.route({
    method: "POST",
    url: "/setor",
    schema: setoresSchema.postSetor,
    preHandler: [auth],
    handler: Setores.postSetor,
  });

  fastify.route({
    method: "PUT",
    url: "/setor/:id",
    schema: setoresSchema.updateSetor,
    preHandler: [auth],
    handler: Setores.updateSetor,
  });

  fastify.route({
    method: "DELETE",
    url: "/setor/:id",
    schema: setoresSchema.deleteSetor,
    preHandler: [auth],
    handler: Setores.deleteSetor,
  });
};

module.exports = router;