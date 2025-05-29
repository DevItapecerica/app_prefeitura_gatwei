import auth from "../middleware/authAPI.js";
import * as Edital from "../controller/editalController.js";
import * as Schema from "../schema/editalSchema.js";

const editalRouter = async (fastify, options) => {
  fastify.addHook("preHandler", auth);

  //get de Edital route
  fastify.route({
    method: "GET",
    url: "/",
    schema: Schema.getEditalSchema,
    handler: Edital.getEdital,
  });

  //get one de Edital route
  fastify.route({
    method: "GET",
    url: "/:id",
    schema: Schema.getEditalById,
    handler: Edital.getEditalById,
  });

  //post de Edital route
  fastify.route({
    method: "POST",
    url: "/",
    schema: Schema.createEdital,
    handler: Edital.postEdital,
  });

  //update de Edital route
  fastify.route({
    method: "PUT",
    url: "/:id",
    schema: Schema.updateEdital,
    handler: Edital.updateEdital,
  });

  //delete de Edital route
  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: Schema.deleteEdital,
    handler: Edital.deleteEdital,
  });

  fastify.route({
    method: "POST",
    url: "/vincularbolsista/:id",
    schema: Schema.vincularBolsista,
    handler: Edital.vincularBolsista,
  });
};

export default editalRouter;
