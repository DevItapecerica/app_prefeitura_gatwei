const Bolsista = require("../controller/FT/FTController");
const getAuth = require("../controller/FT/FTAuth");
const auth = require("../middleware/authJWT");
const BolsistaSchema = require("../schema/bolsistaSchema");
const Ft_AppSchema = require("../service/ft_app_api")

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

  fastify.route({
    method: "GET",
    url: "/auth",
    schema: Ft_AppSchema.getTokenSchema,
    handler: getAuth,
  })
};

module.exports = FTRouter;
