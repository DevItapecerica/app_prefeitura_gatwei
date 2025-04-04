const Demandas = require("../controller/demandasController");
const auth = require("../middleware/authKey");
// const schema = require("../schema/userSchema")

async function routes(fastify, options) {
  fastify.route({
    method: "GET",
    url: "/demandas",
    preHandler: [auth],
    // schema: schema.getDemandas,
    handler: Demandas.getDemandas,
  });

  fastify.route({
    method: "GET",
    url: "/demandas/:id",
    preHandler: [auth],
    // schema: schema.getOneDemandas,
    handler: Demandas.getOneDemandas,
  });

  fastify.route({
    method: "GET",
    url: "/demandas/history",
    preHandler: [auth],
    // schema: schema.getOneDemandas,
    handler: Demandas.getOneDemandas,
  });

  fastify.route({
    method: "delete",
    url: "/demandas/:id",
    preHandler: [auth],
    // schema: schema.deleteDemandas,
    handler: Demandas.deleteDemandas,
  });

}

module.exports = routes;
