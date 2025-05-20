const errorSchema = require("./errorSchema");

const getServices = {
  description: "Retorna todos os serviços",
  type: "object",
  tags: ["Services"],
  security: [{ APIKey: [] }],
  response: {
    200: {
      description: "Verificação bem sucedido",
      type: "object",
      properties: {
        services: {
          type: "array",
          example: {
            id: 1,
            name: "Serviço 1",
            description: "Descrição do serviço 1",
            url: "/admin",
          },
        },
      },
    },
    ...errorSchema

  },
};

const getOneService = {
  description: "Retorna o serviço pelo ID",
  type: "object",
  tags: ["Services"],
  security: [{ APIKey: [] }],
  response: {
    200: {
      description: "Verificação bem sucedido",
      type: "object",
      properties: {
        service: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Serviço 1" },
            description: { type: "string", example: "Descrição do serviço 1" },
            url: { type: "string", example: "/admin" },
          },
        },
      },
    },

    ...errorSchema

  },
};

const postServices = {
  description: "Cria um serviço",
  type: "object",
  tags: ["Services"],
  security: [{ APIKey: [] }],
  body: {
    type: "object",
    required: ["service"],
    properties: {
      service: {
        required: ["name", "description", "url"],
        type: "object",
        properties: {
          name: { type: "string" },
          description: { type: "string" },
          url: { type: "string" },
        },
      },
    },
  },
  response: {
    201: {
      description: "Post bem sucedido",
      type: "object",
      properties: {
        service: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Serviço 1" },
            description: {
              type: "string",
              example: "Descrição do serviço 1",
            },
            url: { type: "string", example: "/admin" },
          },
        },
      },
    },
    ...errorSchema

  },
};

const updateServices = {
  description: "Atualiza um serviço",
  type: "object",
  tags: ["Services"],
  security: [{ APIKey: [] }],
  body: {
    type: "object",
    required: ["service"],
    properties: {
      service: {
        required: ["name", "description", "url"],
        type: "object",
        properties: {
          name: { type: "string" },
          description: { type: "string" },
          url: { type: "string" },
        },
      },
    },
  },
  response: {
    201: {
      description: "Update bem sucedido",
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "Serviço atualizado com sucesso",
        },
      },
    },
    ...errorSchema
  },
};

const deleteService = {
  description: "Exclude um serviço",
  type: "object",
  tags: ["Services"],
  security: [{ APIKey: [] }],
  response: {
    200: {
      description: "Excluido com sucesso",
      type: "object",
      properties: {
        message: { type: "string", example: "Serviço excluído com sucesso" },
      },
    },

    ...errorSchema
  },
};

module.exports = {
  getServices,
  getOneService,
  postServices,
  updateServices,
  deleteService,
};
