import { FastifyInstance } from "fastify";
import * as BolsistaController from "../../controller/FT/BolsistaController.js";
import { getAuth } from "../../controller/FT/FTAuth.js";
import { authJWT } from "../../middleware/authJWT.js";

const bolsistaRouter = async (fastify: FastifyInstance) => {
  // Protege todas as rotas do grupo com JWT
  fastify.addHook("preHandler", authJWT);

  fastify.route({
    method: "GET",
    url: "/",
    // schema: BolsistaSchema.getBolsistaSchema,
    handler: BolsistaController.getBolsistas,
  });

  fastify.route({
    method: "GET",
    url: "/toexpire",
    // schema: BolsistaSchema.getBolsistaSchema,
    handler: BolsistaController.getToExpire,
  });

  fastify.route({
    method: "PUT",
    url: "/prorrogate",
    // schema: BolsistaSchema.getBolsistaSchema,
    handler: BolsistaController.prorrogate,
  });

  fastify.route({
    method: "GET",
    url: "/:id",
    // schema: BolsistaSchema.getOneBolsistaSchema,
    handler: BolsistaController.getOneBolsistas,
  });

  fastify.route({
    method: "POST",
    url: "/",
    // schema: BolsistaSchema.createBolsistaSchema,
    handler: BolsistaController.createBolsistas,
  });

  fastify.route({
    method: "PUT",
    url: "/:id",
    // schema: BolsistaSchema.updateBolsistaSchema,
    handler: BolsistaController.updateBolsistas,
  });

  fastify.route({
    method: "DELETE",
    url: "/:id",
    // schema: BolsistaSchema.deleteBolsistaSchema,
    handler: BolsistaController.deleteBolsistas,
  });

  fastify.route({
    method: "GET",
    url: "/edital/:id",
    // schema: BolsistaSchema.getBolsistaEditalSchema,
    handler: BolsistaController.getBolsistaEdital,
  });

  fastify.route({
    method: "GET",
    url: "/auth",
    // schema: FtAppSchema.getTokenSchema,
    handler: getAuth,
  });

  fastify.route({
    method: "PUT",
    url: "/:bolsista/edital/:edital",
    // schema: BolsistaSchema.toggleBolsistaEditalSchema,
    handler: BolsistaController.toggleBolsistaEdital,
  });
};

export default bolsistaRouter;
