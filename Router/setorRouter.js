const auth = require("../middleware/authJWT");
const Setor = require("../controller/Setor/setorController");
const setorSchema = require("../schema/setoresSchema");

const setorRouter = (fastify, options) => {
  fastify.route({
    method: "GET",
    url: "/setor",
    schema: setorSchema.getSetores,
    preHandler: [auth],
    handler: Setor.getSetores,
  });

  fastify.route({
    method: 'GET',
    url: '/setor/:id',
    schema: setorSchema.getOneSetor,
    preHeandler: [auth],
    handler: Setor.getOneSetor,
  })

  fastify.route({
    method: 'POST',
    url: '/setor',
    schema: setorSchema.postSetor,
    preHandler: [auth],
    handler: Setor.createSetor,
  })

  fastify.route({
    method: 'PUT',
    url: '/setor/:id',
    schema: setorSchema.updateSetor,
    preHandler: [auth],
    handler: Setor.updateSetor,
  })

  fastify.route({
    method: 'DELETE',
    url: '/setor/:id',
    schema: setorSchema.deleteSetor,
    preHandler: [auth],
    handler: Setor.deleteSetor,
  })
};

module.exports = setorRouter;
