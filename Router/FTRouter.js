const Bolsista = require("../controller/FT/FTController");
const auth = require("../middleware/authJWT");
const BolsistaSchema = require("../schema/bolsistaSchema");

const FTRouter = (fastify, opt) => {
  fastify.route({
    method: "get",
    url: "/bolsista",
    preHandler: [auth],
    schema: BolsistaSchema.getBolsistaSchema,
    handler: Bolsista.getBolsistas,
  });

  fastify.route({
    method: "get",
    url: "/bolsista/:id",
    preHandler: [auth],
    schema: BolsistaSchema.getOneBolsistaSchema,
    handler: Bolsista.getOneBolsistas,
  });

  fastify.route({
    method: "post",
    url: "/bolsista",
    preHandler: [auth],
    schema: BolsistaSchema.createBolsistaSchema,
    handler: Bolsista.createBolsistas,
  });

  fastify.route({
    method: "put",
    url: "/bolsista/:id",
    preHandler: [auth],
    schema: BolsistaSchema.updateBolsistaSchema,
    handler: Bolsista.updateBolsistas,
  });
};

module.exports = FTRouter;
