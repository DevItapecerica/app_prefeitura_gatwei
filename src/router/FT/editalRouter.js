import * as Edital from "../../controller/FT/EditalController.js";
import { authJWT } from "../../middleware/authJWT.js";
import * as Schema from "../../schema/editalSchema.js"

const editalRouter = async (fastify, _options) => {
  // Protege todas as rotas do grupo com JWT
  fastify.addHook("preHandler", authJWT);

  fastify.route({
    method: "GET",
    url: "/",
    schema: Schema.getEditalSchema,
    handler: Edital.getEditais,
  });

  fastify.route({
    method: "GET",
    url: "/:id",
    schema: Schema.getEditalById,
    handler: Edital.getEditalById,
  });

  fastify.route({
    method: "POST",
    url: "/",
    schema: Schema.createEdital,
    handler: Edital.postEdital,
  });

  fastify.route({
    method: "PUT",
    url: "/:id",
    schema: Schema.updateEdital,
    handler: Edital.updateEdital,
  });

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
  })

    fastify.route({
    method: "GET",
    url: "/:id/bolsista",
    // schema: Schema.vincularBolsista,
    handler: Edital.getEditalWithBolsista,
  })

      fastify.route({
    method: "GET",
    url: "/bolsista",
    // schema: Schema.vincularBolsista,
    handler: Edital.getAllWithBolsista,
  })
};

export default editalRouter;
