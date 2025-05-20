const Permission = require("../controller/servicePermissionController");
const ServicePermissionSchema = require("../schema/permissionSchema")
const auth = require("../middleware/authKey");

const router = (fastify, options) => {
  fastify.route({
    method: "GET",
    url: "/permission/service/:id",
    preHandler: [auth],
    handler: Permission.getServicePermission,
  });
  fastify.route({
    method: "GET",
    url: "/permission/service",
    schema: ServicePermissionSchema.getRolePermissionSchema,
    preHandler: [auth],
    handler: Permission.getAllServicesPermissions,
  });
  
  fastify.route({
    method: "POST",
    url: "/permission/service",
    schema: ServicePermissionSchema.postPermissionServiceSchema,
    preHandler: [auth],
    handler: Permission.createServicePermission,
  });

  fastify.route({
    method: "PUT",
    url: "/permission/service/:id",
    schema: ServicePermissionSchema.putPermissionServiceSchema,
    preHandler: [auth],
    handler: Permission.putServicePermission,
  });

  fastify.route({
    method: "DELETE",
    url: "/permission/service/:id",
    schema: ServicePermissionSchema.deletePermissionServiceSchema,
    preHandler: [auth],
    handler: Permission.deleteServicePermission,
  });

  fastify.route({
    method: "DELETE",
    url: "/permission/role/:id",
    schema: ServicePermissionSchema.deletePermissionServiceSchema,
    preHandler: [auth],
    handler: Permission.deleteRolePermission,
  });
};

module.exports = router;
