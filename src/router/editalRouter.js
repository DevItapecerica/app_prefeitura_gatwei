import * as Edital from "../controller/FT/EditalController.js";
import { authJWT } from "../middleware/authJWT.js";


const editalRouter = async (fastify, _options) => {
  // Protege todas as rotas do grupo com JWT
  fastify.addHook("preHandler", authJWT);

  fastify.route({
    method: "GET",
    url: "/edital",
    handler: Edital.getEditais,
  });

  fastify.route({
    method: "GET",
    url: "/edital/:id",
    handler: Edital.getEditalById,
  });

  fastify.route({
    method: "POST",
    url: "/edital",
    handler: Edital.postEdital,
  });

  fastify.route({
    method: "PUT",
    url: "/edital/:id",
    handler: Edital.updateEdital,
  });

  fastify.route({
    method: "DELETE",
    url: "/edital/:id",
    handler: Edital.deleteEdital,
  });
};

export default editalRouter;
