import auth from "../middleware/authAPI.js";
import * as BolsistaSchema from "../schema/bolsistaSchema.js";
import * as Bolsista from "../controller/bolsistaController.js";

const bolsistaRouter = async (fastify, options) => {
  fastify.addHook("preHandler", auth);

  //get de bolsistas route
  fastify.route({
    method: "GET",
    url: "/",
    schema: BolsistaSchema.getBolsistaSchema,
    handler: Bolsista.getBolsista,
  });

  //get one de bolsistas route
  fastify.route({
    method: "GET",
    url: "/:id",
    schema: BolsistaSchema.getOneBolsistaSchema,
    handler: Bolsista.getOneBolsista,
  });

  //post de bolsistas route
  fastify.route({
    method: "POST",
    url: "/",
    schema: BolsistaSchema.createBolsistaSchema,
    handler: Bolsista.createBolsista,
  });

  //update de bolsistas route
  fastify.route({
    method: "PUT",
    url: "/:id",
    schema: BolsistaSchema.updateBolsistaSchema,
    handler: Bolsista.updateBolsista,
  });

  //delete de bolsistas route
  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: BolsistaSchema.deleteBolsistaSchema,
    handler: Bolsista.deleteBolsista,
  });

  fastify.route({
    method: "GET",
    url: "/edital/:id",
    // schema: BolsistaSchema.getEditalSchema,
    handler: Bolsista.getBolsistaEdital,
  });

  fastify.route({
    method: "PUT",
    url: "/:bolsista/edital/:edital",
    // schema:
    handler: Bolsista.toggleBolsistaEdital,
  });
};

export default bolsistaRouter;
