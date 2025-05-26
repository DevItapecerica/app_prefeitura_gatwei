import * as Demandas from "../controller/DemandasTi/demandasTiController.js";
import {authJWT} from "../middleware/authJWT.js";
// import * as schema from "../schema/userSchema.js";

export default async function demandasRouter(fastify, options) {
  fastify.addHook("preHandler", authJWT);

  fastify.route({
    method: "GET",
    url: "/",
    // schema: schema.getUserDemandas,
    handler: Demandas.getDemandas,
  });

  fastify.route({
    method: "GET",
    url: "/:id",
    // schema: schema.getUserDemandas,
    handler: Demandas.getOneDemandas,
  });

  fastify.route({
    method: "GET",
    url: "/user",
    // schema: schema.getUserDemandas,
    handler: Demandas.getUserDemandas,
  });

  fastify.route({
    method: "GET",
    url: "/history",
    // schema: schema.getOneDemandas,
    handler: Demandas.getHistoryDemandas,
  });

  fastify.route({
    method: "DELETE",
    url: "/:id",
    // schema: schema.deleteDemandas,
    handler: Demandas.deleteDemandas,
  });

  fastify.route({
    method: "PUT",
    url: "/:id/assume",
    // schema: schema.deleteDemandas,
    handler: Demandas.assumeDemandas,
  });

  fastify.route({
    method: "PUT",
    url: "/:id/finish",
    // schema: schema.deleteDemandas,
    handler: Demandas.finishDemandas,
  });

  fastify.route({
    method: "POST",
    url: "/",
    // schema: schema.postDemandas,
    handler: Demandas.createDemandas,
  });

  fastify.route({
    method: "PUT",
    url: "/:id",
    // schema: schema.updateDemandas,
    handler: Demandas.updateDemandas,
  });
}
