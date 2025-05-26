import * as Service from "../controller/ServicesApplication/ServicesController.js";
import * as serviceSchema from "../schema/servicesSchema.js";
import {authJWT} from "../middleware/authJWT.js";

const serviceRouter = (fastify, options) => {
  fastify.addHook("preHandler", authJWT);

  fastify.route({
    method: "GET",
    url: "/",
    schema: serviceSchema.getServices,
    handler: Service.getAllServices,
  });

  fastify.route({
    method: "GET",
    url: "/user",
    // schema: serviceSchema.getServices,
    handler: Service.getUserServices,
  });

  fastify.route({
    method: "GET",
    url: "/:id",
    schema: serviceSchema.getOneService,
    handler: Service.getService,
  });

  fastify.route({
    method: "POST",
    url: "/",
    schema: serviceSchema.postServices,
    handler: Service.createService,
  });

  fastify.route({
    method: "PUT",
    url: "/:id",
    schema: serviceSchema.updateServices,
    handler: Service.updateService,
  });

  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: serviceSchema.deleteService,
    handler: Service.deleteService,
  });
};

export default serviceRouter;
