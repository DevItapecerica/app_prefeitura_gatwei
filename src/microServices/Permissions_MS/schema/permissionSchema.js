const errorSchema = require("./errorSchema");

const getRolePermissionSchema = {
  description: "MS to get role permissions on services",
  tags: ["rolePermission"],
  security: [{ APIKey: [] }],
  response: {
    200: {
      description: "Role permissions retrieved successfully",
      type: "object",
      properties: {
        permissions: {
          type: "array",

          items: {
            type: "object",

            properties: {
              id: { type: "integer" },

              role_id: { type: "integer" },

              service_id: { type: "integer" },

              read: { type: "boolean" },

              write: { type: "boolean" },

              edit: { type: "boolean" },

              del: { type: "boolean" },

              createdAt: { type: "string", format: "date-time" },

              updatedAt: { type: "string", format: "date-time" },

              deletedAt: {
                type: "string",
                format: "date-time",
                nullable: true,
              },
            },
          },
        },
      },
    },
    ...errorSchema,
  },
};

const postPermissionServiceSchema = {
  tags: ["rolePermission"],
  security: [{ APIKey: [] }],
  description: "MS to post role permissions on all services",

  body: {
    type: "object",

    required: ["service"],

    properties: {
      service: {
        type: "object",

        required: ["service_id"],

        properties: {
          service_id: { type: "integer" },
        },
      },
    },
  },
  response: {
    200: {
      type: "object",

      properties: {
        message: { type: "string" },
      },
    },
    ...errorSchema,
  },
};

const putPermissionServiceSchema = {
  tags: ["rolePermission"],
  security: [{ APIKey: [] }],
  description: "MS to put role permissions",

  body: {
    type: "object",

    required: ["permissions"],

    properties: {
      permissions: {
        type: "array",

        items: {
          type: "object",

          properties: {
            role_id: { type: "integer" },

            read: { type: "boolean" },

            write: { type: "boolean" },

            edit: { type: "boolean" },

            del: { type: "boolean" },
          },

          required: ["role_id", "read", "write", "edit", "del"],
        },
      },
    },
  },
  response: {
    204: {
      type: "object",

    },
    ...errorSchema,
  },
};


const deletePermissionServiceSchema = {
  tags: ["rolePermission"],
  security: [{ APIKey: [] }],
  description: "MS to delete role permissions",

  response: {
    204: {
      type: "object",

    },
    ...errorSchema,
  },
};

module.exports = {
  getRolePermissionSchema,
  postPermissionServiceSchema,
  putPermissionServiceSchema,
  deletePermissionServiceSchema
};
