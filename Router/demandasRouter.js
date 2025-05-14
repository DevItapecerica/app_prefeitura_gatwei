const Demandas = require("../controller/DemandasTi/demandasTiController");
const auth = require("../middleware/authJWT");
// const schema = require("../schema/userSchema")

async function demandasRouter(fastify, options) {
  fastify.addHook("preHandler",auth);
  
  fastify.route({
    method: "GET",
    url: "/demandas",
    // schema: schema.getUserDemandas,
    handler: Demandas.getDemandas,
  });

  fastify.route({
    method: "GET",
    url: "/demandas/:id",
    // schema: schema.getUserDemandas,
    handler: Demandas.getOneDemandas,
  });

  fastify.route({
    method: "GET",
    url: "/demandas/user",
    // schema: schema.getUserDemandas,
    handler: Demandas.getUserDemandas,
  });

  fastify.route({
    method: "GET",
    url: "/demandas/history",
    // schema: schema.getOneDemandas,
    handler: Demandas.getHistoryDemandas,
  });

  fastify.route({
    method: "delete",
    url: "/demandas/:id",
    // schema: schema.deleteDemandas,
    handler: Demandas.deleteDemandas,
  });

  fastify.route({
    method: "put",
    url: "/demandas/:id/assume",
    // schema: schema.deleteDemandas,
    handler: Demandas.assumeDemandas,
  });

  fastify.route({
    method: "put",
    url: "/demandas/:id/finish",
    // schema: schema.deleteDemandas,
    handler: Demandas.finishDemandas,
  });

  fastify.route({
    method: "post",
    url: "/demandas",
    // schema: schema.postDemandas,
    handler: Demandas.createDemandas,
  });

  fastify.route({
    method: "PUT",
    url: "/demandas/:id",
    // schema: schema.updateDemandas,
    handler: Demandas.updateDemandas,
  });
}

module.exports = demandasRouter;