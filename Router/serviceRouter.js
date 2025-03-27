const Service = require("../controller/Service/ServicesController");
const serviceSchema = require("../schema/servicesSchema");
const auth = require("../middleware/authJWT");

const serviceRouter = (fastify, options) => {
  fastify.route({
    method: "GET",
    url: "/service",
    schema: serviceSchema.getServices,
    preHandler: [auth],
    handler: Service.getAllServices,
  });

  fastify.route({
    method: "GET",
    url: "/service/:id",
    schema: serviceSchema.getOneService,
    preHandler: [auth],
    handler: Service.getService,
  });

  fastify.route({
    method: "POST",
    url: "/service",
    schema: serviceSchema.postServices,
    preHandler: [auth],
    handler: Service.createService,
  });

  fastify.route({
    method: "PUT",
    url: "/service/:id",
    schema: serviceSchema.updateServices,
    preHandler: [auth],
    handler: Service.updateService,
  })

  fastify.route({
    method: "DELETE",
    url: "/service/:id",
    schema: serviceSchema.deleteService,
    preHandler: [auth],
    handler: Service.deleteService,
  });

};

module.exports = serviceRouter;
