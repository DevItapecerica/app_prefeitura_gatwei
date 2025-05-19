const auth = require("../middleware/authJWT");
const Setor = require("../controller/Setor/setorController");
const setorSchema = require("../src/schema/setoresSchema");

const setorRouter = (fastify, options) => {
fastify.addHook("preHandler",auth);

  fastify.route({
    method: "GET",
    url: "/",
    schema: setorSchema.getSetores,
    handler: Setor.getSetores,
  });

  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: setorSchema.getOneSetor,
    handler: Setor.getOneSetor,
  })

  fastify.route({
    method: 'POST',
    url: '/',
    schema: setorSchema.postSetor,
    handler: Setor.createSetor,
  })

  fastify.route({
    method: 'PUT',
    url: '/:id',
    schema: setorSchema.updateSetor,
    handler: Setor.updateSetor,
  })

  fastify.route({
    method: 'DELETE',
    url: '/:id',
    schema: setorSchema.deleteSetor,
    handler: Setor.deleteSetor,
  })
};

module.exports = setorRouter;
