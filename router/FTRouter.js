const Bolsista = require("../controller/FT/FTController");
const auth = require("../middleware/authJWT");
const BolsistaSchema = require("../schema/bolsistaSchema");

const FTRouter = (fastify, opt) => {
fastify.addHook("preHandler",auth);

  fastify.route({
    method: "get",
    url: "/bolsista",
    schema: BolsistaSchema.getBolsistaSchema,
    handler: Bolsista.getBolsistas,
  });

  fastify.route({
    method: "get",
    url: "/bolsista/:id",
    schema: BolsistaSchema.getOneBolsistaSchema,
    handler: Bolsista.getOneBolsistas,
  });

  fastify.route({
    method: "post",
    url: "/bolsista",
    schema: BolsistaSchema.createBolsistaSchema,
    handler: Bolsista.createBolsistas,
  });

  fastify.route({
    method: "put",
    url: "/bolsista/:id",
    schema: BolsistaSchema.updateBolsistaSchema,
    handler: Bolsista.updateBolsistas,
  });

  fastify.route({
    method: "DELETE",
    url: "/bolsista/:id",
    schema: BolsistaSchema.deleteBolsistaSchema,
    handler: Bolsista.deleteBolsistas,
  });
};

module.exports = FTRouter;
