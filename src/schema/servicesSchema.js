import errorSchema from './errorSchema.js';

const getServices = {
  description: "Retorna todos os serviços",
  type: "object",
  tags: ["Services"],
  security: [{ APIKey: [], JWTToken: [] }],
  response: {
    200: {
      description: "Verificação bem sucedida",
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
        roles: {
          type: "array",
          example: {
            id: 1,
            name: "Papel 1",
          },
        },
        setores: {
          type: "array",
          example: {
            id: 1,
            name: "tecnologia",
          },
        },
      },
    },
    ...errorSchema,
  },
};

const getOneService = {
  description: "Retorna o serviço pelo ID",
  type: "object",
  tags: ["Services"],
  security: [{ APIKey: [], JWTToken: [] }],
  response: {
    200: {
      description: "Verificação bem sucedida",
      type: "object",
      properties: {
        services: {
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
    ...errorSchema,
  },
};

const postServices = {
  description: "Cria um serviço",
  type: "object",
  tags: ["Services"],
  security: [{ APIKey: [], JWTToken: [] }],
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
            description: { type: "string", example: "Descrição do serviço 1" },
            url: { type: "string", example: "/admin" },
          },
        },
        message: {
          type: "string",
          example: "Serviço criado com sucesso.",
        },
      },
    },
    ...errorSchema,
  },
};

const updateServices = {
  description: "Atualiza um serviço",
  type: "object",
  tags: ["Services"],
  security: [{ APIKey: [], JWTToken: [] }],
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
    204: {
      description: "Update bem sucedido",
    },
    ...errorSchema,
  },
};

const deleteService = {
  description: "Exclude um serviço",
  type: "object",
  tags: ["Services"],
  security: [{ APIKey: [], JWTToken: [] }],
  response: {
    204: {
      description: "Excluido com sucesso",
    },
    ...errorSchema,
  },
};

export {
  getServices,
  getOneService,
  postServices,
  updateServices,
  deleteService,
};
