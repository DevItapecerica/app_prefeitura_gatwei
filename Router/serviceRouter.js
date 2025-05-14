const Service = require("../controller/Service/ServicesController");
const serviceSchema = require("../schema/servicesSchema");
const auth = require("../middleware/authJWT");

const serviceRouter = (fastify, options) => {
fastify.addHook("preHandler",auth);

  fastify.route({
    method: "GET",
    url: "/service",
    schema: serviceSchema.getServices,
    handler: Service.getAllServices,
  });

  fastify.route({
    method: "GET",
    url: "/service/user",
    // schema: serviceSchema.getServices,
    handler: Service.getUserServices,
  });

  

  fastify.route({
    method: "GET",
    url: "/service/:id",
    schema: serviceSchema.getOneService,
    handler: Service.getService,
  });

  fastify.route({
    method: "POST",
    url: "/service",
    schema: serviceSchema.postServices,
    handler: Service.createService,
  });

  fastify.route({
    method: "PUT",
    url: "/service/:id",
    schema: serviceSchema.updateServices,
    handler: Service.updateService,
  })

  fastify.route({
    method: "DELETE",
    url: "/service/:id",
    schema: serviceSchema.deleteService,
    handler: Service.deleteService,
  });

};

module.exports = serviceRouter;
