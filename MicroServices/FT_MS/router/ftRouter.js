
const auth = require("../middleware/authAPI.js");
const bolsistaSchema = require("../schema/bolsistaSchema.js");
const bolsista = require("../controller/bolsistaController.js");


const routes = async (fastify, options) => {
  //get de bolsistas route
  fastify.route({
    method: "GET",
    url: "/bolsista",
    preHandler: [auth],
    schema: bolsistaSchema.getBolsistaSchema,
    handler: bolsista.getBolsista,
  });

    //get one de bolsistas route
    fastify.route({
      method: "GET",
      url: "/bolsista/:id",
      preHandler: [auth],
      schema: bolsistaSchema.getOneBolsistaSchema,
      handler: bolsista.getOneBolsista,
    });
  

  //post de bolsistas route
  fastify.route({
    method: "POST",
    url: "/bolsista",
    preHandler: [auth],
    schema: bolsistaSchema.createBolsistaSchema,
    handler: bolsista.createBolsista,
  });

  //update de bolsistas route
  fastify.route({
    method: "PUT",
    url: "/bolsista/:id",
    preHandler: [auth],
    schema: bolsistaSchema.updateBolsistaSchema,
    handler: bolsista.updateBolsista,
  });

  //delete de bolsistas route
  fastify.route({
    method: "DELETE",
    url: "/bolsista/:id",
    preHandler: [auth],
    schema: bolsistaSchema.deleteBolsistaSchema,
    handler: bolsista.deleteBolsista,
  });
};

module.exports = routes;
