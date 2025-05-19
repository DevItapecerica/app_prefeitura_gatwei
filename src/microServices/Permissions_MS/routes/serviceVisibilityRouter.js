const auth = require("../middleware/authKey");
const serviceVisibility = require("../controller/setorPermissionController");
const visibilitySchema = require("../schema/visibilitySchema")

const serviceVisibilityRoutes = (fastify, opt) => {
  fastify.route({
    method: "GET",
    url: "/visibility",
    schema: visibilitySchema.getVisibilitySchema,
    preHandler: [auth],
    handler: serviceVisibility.getServiceVisibility,
  });

  fastify.route({
    method: "GET",
    url: "/visibility/setor/:id",
    schema: visibilitySchema.getVisibilitySchema,
    preHandler: [auth],
    handler: serviceVisibility.getVisibilitySetor,
  });

  fastify.route({
    method: "POST",
    url: "/visibility/setor/:id",
    schema: {
      security: [{ APIKey: [] }],
      tags: ["Service Visibility"],
      description: "Create Service Visibility for each service",
      body: {
        type: "object",
        required: ["services"],
        properties: {
          services: {
            type: "array",
            items: {
              type: "object",
              required: ["id"],
              properties: {
                id: { type: "integer" },
                name: { type: "string" },
                url: { type: "string" },
              },
            },
          },
        },
      },
    },
    preHandler: [auth],
    handler: serviceVisibility.createSetorVisibility,
  });

  fastify.route({
    method: "POST",
    url: "/visibility/service/:id",
    schema: visibilitySchema.postServiceVisibilitySchema,
    preHandler: [auth],
    handler: serviceVisibility.createServiceVisibility,
  });

  fastify.route({
    method: "DELETE",
    url: "/visibility/service/:id",
    schema: visibilitySchema.deleteVisibilitySchema,
    preHandler: [auth],
    handler: serviceVisibility.deleteServiceVisibility,
  });

  fastify.route({
    method: "DELETE",
    url: "/visibility/setor/:id",
    schema: visibilitySchema.deleteVisibilitySchema,
    preHandler: [auth],
    handler: serviceVisibility.deleteSetorVisibility,
  });

  fastify.route({
    method: "PUT",
    url: "/visibility/service/:id",
    schema: visibilitySchema.putVisibilitySchema,
    preHandler: [auth],
    handler: serviceVisibility.updateServiceVisibility,
  });
};

module.exports = serviceVisibilityRoutes;
