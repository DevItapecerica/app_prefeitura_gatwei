const Demandas = require("../controller/DemandasTi/demandasTiController");
const auth = require("../middleware/authJWT");
// const schema = require("../schema/userSchema")

async function demandasRouter(fastify, options) {
  fastify.route({
    method: "GET",
    url: "/demandas",
    preHandler: [auth],
    // schema: schema.getUserDemandas,
    handler: Demandas.getDemandas,
  });

  fastify.route({
    method: "GET",
    url: "/demandas/:id",
    preHandler: [auth],
    // schema: schema.getUserDemandas,
    handler: Demandas.getOneDemandas,
  });

  fastify.route({
    method: "GET",
    url: "/demandas/user",
    preHandler: [auth],
    // schema: schema.getUserDemandas,
    handler: Demandas.getUserDemandas,
  });

  fastify.route({
    method: "GET",
    url: "/demandas/history",
    preHandler: [auth],
    // schema: schema.getOneDemandas,
    handler: Demandas.getHistoryDemandas,
  });

  fastify.route({
    method: "delete",
    url: "/demandas/:id",
    preHandler: [auth],
    // schema: schema.deleteDemandas,
    handler: Demandas.deleteDemandas,
  });

  fastify.route({
    method: "put",
    url: "/demandas/:id/assume",
    preHandler: [auth],
    // schema: schema.deleteDemandas,
    handler: Demandas.assumeDemandas,
  });

  fastify.route({
    method: "put",
    url: "/demandas/:id/finish",
    preHandler: [auth],
    // schema: schema.deleteDemandas,
    handler: Demandas.finishDemandas,
  });

  fastify.route({
    method: "post",
    url: "/demandas",
    preHandler: [auth],
    // schema: schema.postDemandas,
    handler: Demandas.createDemandas,
  });

  fastify.route({
    method: "PUT",
    url: "/demandas/:id",
    preHandler: [auth],
    // schema: schema.updateDemandas,
    handler: Demandas.updateDemandas,
  });
}

module.exports = demandasRouter;