const Demandas = require("../controller/demandasController");
const auth = require("../middleware/authKey");
// const schema = require("../schema/userSchema")

async function routes(fastify, options) {
  fastify.route({
    method: "GET",
    url: "/demandas/user/:id",
    preHandler: [auth],
    // schema: schema.getUserDemandas,
    handler: Demandas.getUserDemandas,
  });

  fastify.route({
    method: "GET",
    url: "/demandas/history/user/:id",
    preHandler: [auth],
    // schema: schema.getOneDemandas,
    handler: Demandas.getOneDemandas,
  });

  // fastify.route({
  //   method: "post",
  //   url: "/demandas",
  //   preHandler: [auth],
  //   // schema: schema.postDemandas,
  //   handler: Demandas.postDemandas,
  // });

  // fastify.route({
  //   method: "delete",
  //   url: "/demandas/:id",
  //   preHandler: [auth],
  //   // schema: schema.deleteDemandas,
  //   handler: Demandas.deleteDemandas,
  // });

  // fastify.route({
  //   method: "PUT",
  //   url: "/demandas/:id",
  //   preHandler: [auth],
  //   // schema: schema.updateDemandas,
  //   handler: User.updateDemandas,
  // });
}

module.exports = routes;
