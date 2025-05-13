
const auth = require("../middleware/authAPI.js");
const bolsistaSchema = require("../schema/bolsistaSchema.js");
const bolsista = require("../controller/bolsistaController.js");


const routes = async (fastify, options) => {
  fastify.addHook("preHandler", auth);

  //get de bolsistas route
  fastify.route({
    method: "GET",
    url: "/",
    schema: bolsistaSchema.getBolsistaSchema,
    handler: bolsista.getBolsista,
  });

    //get one de bolsistas route
    fastify.route({
      method: "GET",
      url: "/:id",
      schema: bolsistaSchema.getOneBolsistaSchema,
      handler: bolsista.getOneBolsista,
    });
  

  //post de bolsistas route
  fastify.route({
    method: "POST",
    url: "/",
    schema: bolsistaSchema.createBolsistaSchema,
    handler: bolsista.createBolsista,
  });

  //update de bolsistas route
  fastify.route({
    method: "PUT",
    url: "/:id",
    schema: bolsistaSchema.updateBolsistaSchema,
    handler: bolsista.updateBolsista,
  });

  //delete de bolsistas route
  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: bolsistaSchema.deleteBolsistaSchema,
    handler: bolsista.deleteBolsista,
  });
};

module.exports = routes;
