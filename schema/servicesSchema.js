const { response } = require("../../Login_MS/schema/authSchema");

const getServices = {
  description: "Retorna todos os serviços",
  type: "object",
  tags: ["Services"],
  security: [{ APIKey: [] }],
  headers: {
    type: "object",
    required: ["x-api-key"],
    properties: {
      "x-api-key": { type: "string" },
    },
  },
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
    400: {
      description: "Erro no 400",
      type: "object",
      properties: {
        statusCode: { type: "integer", example: 400 },
        error: { type: "string", example: "Bad Request" },
        message: { type: "string", example: "Bad Request" },
      },
    },
    401: {
      description: "Erro no 401",
      type: "object",
      properties: {
        statusCode: { type: "integer", example: 400 },
        error: { type: "string", example: "Unauthorized" },
        message: {
          type: "string",
          example: "Você não está autorizado a acessar este serviço.",
        },
      },
    },
    404: {
      description: "Erro no 404",
      type: "object",
      properties: {
        statusCode: { type: "integer", example: 400 },
        error: { type: "string", example: "Not Found" },
        message: {
          type: "string",
          example: "O serviço solicitada não foi encontrada.",
        },
      },
    },
    500: {
      description: "Erro interno",
      type: "object",
      properties: {
        statusCode: { type: "integer", example: 400 },
        error: { type: "string", example: "Server Error" },
        message: { type: "string", example: "Erro interno no Servidor" },
      },
    },
  },
};

const getOneService = {
  description: "Retorna o serviço pelo ID",
  type: "object",
  tags: ["Services"],
  security: [{ APIKey: [] }],
  headers: {
    type: "object",
    required: ["x-api-key"],
    properties: {
      "x-api-key": { type: "string" },
    },
  },
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

    400: {
      description: "Erro no 400",
      type: "object",
      properties: {
        statusCode: { type: "integer", example: 400 },
        error: { type: "string", example: "Bad Request" },
        message: { type: "string", example: "Bad Request" },
      },
    },
    401: {
      description: "Erro no 401",
      type: "object",
      properties: {
        statusCode: { type: "integer", example: 400 },
        error: { type: "string", example: "Unauthorized" },
        message: {
          type: "string",
          example: "Você não está autorizado a acessar este serviço.",
        },
      },
    },
    404: {
      description: "Erro no 404",
      type: "object",
      properties: {
        statusCode: { type: "integer", example: 400 },
        error: { type: "string", example: "Not Found" },
        message: {
          type: "string",
          example: "O serviço solicitada não foi encontrada.",
        },
      },
    },
    500: {
      description: "Erro interno",
      type: "object",
      properties: {
        statusCode: { type: "integer", example: 400 },
        error: { type: "string", example: "Server Error" },
        message: { type: "string", example: "Erro interno no Servidor" },
      },
    },
  },
};

const postServices = {
  description: "Cria um serviço",
  type: "object",
  tags: ["Services"],
  security: [{ APIKey: [] }],
  headers: {
    type: "object",
    required: ["x-api-key"],
    properties: {
      "x-api-key": { type: "string" },
    },
  },
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
      },
    },
    400: {
      description: "Erro no 400",
      type: "object",
      properties: {
        statusCode: { type: "integer", example: 400 },
        error: { type: "string", example: "Bad Request" },
        message: { type: "string", example: "Bad Request" },
      },
    },
    401: {
      description: "Erro no 401",
      type: "object",
      properties: {
        statusCode: { type: "integer", example: 400 },
        error: { type: "string", example: "Unauthorized" },
        message: {
          type: "string",
          example: "Você não está autorizado a acessar este serviço.",
        },
      },
    },
    404: {
      description: "Erro no 404",
      type: "object",
      properties: {
        statusCode: { type: "integer", example: 400 },
        error: { type: "string", example: "Not Found" },
        message: {
          type: "string",
          example: "O serviço solicitada não foi encontrada.",
        },
      },
    },
    500: {
      description: "Erro interno",
      type: "object",
      properties: {
        statusCode: { type: "integer", example: 400 },
        error: { type: "string", example: "Server Error" },
        message: { type: "string", example: "Erro interno no Servidor" },
      },
    },
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
    400: {
      description: "Erro no 400",
      type: "object",
      properties: {
        statusCode: { type: "integer", example: 400 },
        error: { type: "string", example: "Bad Request" },
        message: { type: "string", example: "Bad Request" },
      },
    },
    401: {
      description: "Erro no 401",
      type: "object",
      properties: {
        statusCode: { type: "integer", example: 400 },
        error: { type: "string", example: "Unauthorized" },
        message: {
          type: "string",
          example: "Você não está autorizado a acessar este serviço.",
        },
      },
    },
    404: {
      description: "Erro no 404",
      type: "object",
      properties: {
        statusCode: { type: "integer", example: 400 },
        error: { type: "string", example: "Not Found" },
        message: {
          type: "string",
          example: "O serviço solicitada não foi encontrada.",
        },
      },
    },
    500: {
      description: "Erro interno",
      type: "object",
      properties: {
        statusCode: { type: "integer", example: 400 },
        error: { type: "string", example: "Server Error" },
        message: { type: "string", example: "Erro interno no Servidor" },
      },
    },
  },
};

const deleteService = {
  description: "Exclude um serviço",
  type: "object",
  tags: ["Services"],
  security: [{ APIKey: [] }],
  headers: {
    type: "object",
    required: ["x-api-key"],
    properties: {
      "x-api-key": { type: "string" },
    },
  },
  response: {
    200: {
      description: "Excluido com sucesso",
      type: "object",
      properties: {
        message: { type: "string", example: "Serviço excluído com sucesso" },
      },
    },

    400: {
      description: "Erro no 400",
      type: "object",
      properties: {
        statusCode: { type: "integer", example: 400 },
        error: { type: "string", example: "Bad Request" },
        message: { type: "string", example: "Bad Request" },
      },
    },
    401: {
      description: "Erro no 401",
      type: "object",
      properties: {
        statusCode: { type: "integer", example: 400 },
        error: { type: "string", example: "Unauthorized" },
        message: {
          type: "string",
          example: "Você não está autorizado a acessar este serviço.",
        },
      },
    },
    404: {
      description: "Erro no 404",
      type: "object",
      properties: {
        statusCode: { type: "integer", example: 400 },
        error: { type: "string", example: "Not Found" },
        message: {
          type: "string",
          example: "O serviço solicitada não foi encontrada.",
        },
      },
    },
    500: {
      description: "Erro interno",
      type: "object",
      properties: {
        statusCode: { type: "integer", example: 400 },
        error: { type: "string", example: "Server Error" },
        message: { type: "string", example: "Erro interno no Servidor" },
      },
    },
  },
};

module.exports = { getServices, getOneService, postServices, updateServices, deleteService   };
