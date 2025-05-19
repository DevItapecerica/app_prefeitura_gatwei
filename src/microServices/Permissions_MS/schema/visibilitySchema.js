const errorSchema = require("./errorSchema");

const putVisibilitySchema = {
  security: [{ APIKey: [] }],
  tags: ["Service Visibility"],
  description: "Delete Service Visibility for service",
  body: {
    type: "object",
    required: ["visibility"],
    properties: {
      visibility: {
        type: "array",
        items: {
          type: "object",
          required: ["setor_id", "visibility"],
          properties: {
            setor_id: { type: "integer" },
            visibility: { type: "boolean" },
          },
        },
      },
    },
  },
  response: {
    204: {
      description: "Service Visibility updated",
    },
    ...errorSchema,
  },
};

const getVisibilitySchema = {
  security: [{ APIKey: [] }],
  tags: ["Service Visibility"],
  description: "Get Service Visibility",
  response: {
    200: {
      type: "object",
      properties: {
        visibility: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              service_id: { type: "number" },
              setor_id: { type: "number" },
              visibility: { type: "boolean" },
            },
          },
        },
      },
    },
    ...errorSchema,
  },
};

const deleteVisibilitySchema = {
  security: [{ APIKey: [] }],
  tags: ["Service Visibility"],
  description: "Delete Service Visibility for service",
  response: {
    204: {
      description: "Service Visibility deleted",
    },
    ...errorSchema,
  },
};

const postServiceVisibilitySchema = {
  security: [{ APIKey: [] }],
  tags: ["Service Visibility"],
  description: "Create Service Visibility for each setor",
  body: {
    type: "object",
    required: ["setores"],

    properties: {
      setores: {
        type: "array",
        items: {
          type: "object", // Adicionando o tipo para cada item do array
          required: ["id"],
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            description: { type: "string" },
          },
        },
      },
    },
  },
  response: {
    201: {
      description: "Service Visibility created",
    },
    ...errorSchema,
  },
};

const postSetorVisibilitySchema = {
  security: [{ APIKey: [] }],
  tags: ["Service Visibility"],
  description: "Create Service Visibility for each setor",
  body: {
    type: "object",
    required: ["services"],

    properties: {
      services: {
        type: "array",
        items: {
          type: "object", // Adicionando o tipo para cada item do array
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
  response: {
    201: {
      description: "Service Visibility created",
    },
    ...errorSchema,
  },
};

module.exports = {
  putVisibilitySchema,
  getVisibilitySchema,
  deleteVisibilitySchema,
  postServiceVisibilitySchema,
  postSetorVisibilitySchema,
};
