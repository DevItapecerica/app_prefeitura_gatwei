const getSetores = {
  tags: ["Setores"],
  security: [{ APIKey: [], JWTToken: [] }],
  response: {
    200: {
      description: "Lista de setores",
      type: "object",
      properties: {
        setores: {
          type: "array",
          example: {
            id: 1,
            name: "Tecnologia",
            description: "Setor de tecnologia",
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

const getOneSetor = {
  tags: ["Setores"],
  security: [{ APIKey: [], JWTToken: [] }],
  response: {
    200: {
      description: "Lista de setores",
      type: "object",
      properties: {
        setor: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Tecnologia" },
            description: {
              type: "string",
              example: "Setor para gerenciamento do sistema",
            },
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

const postSetor = {
  tags: ["Setores"],
  description: "Cria um novo setor",
  security: [{ APIKey: [], JWTToken: [] }],
  body: {
    type: "object",
    required: ["setor"],
    properties: {
      setor: {
        type: "object",
        required: ["name", "description"],
        properties: {
          name: { type: "string" },
          description: { type: "string" },
        },
      },
    },
  },
  responses: {
    201: {
      description: "Setor criado com sucesso",
      type: "object",
      properties: {
        setor: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Tecnologia" },
            description: {
              type: "string",
              example: "Setor de tecnologia",
            },
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

const updateSetor = {
  tags: ["Setores"],
  description: "Cria um novo setor",
  security: [{ APIKey: [], JWTToken: [] }],
  body: {
    type: "object",
    required: ["setor"],
    properties: {
      setor: {
        type: "object",
        required: ["name", "description"],
        properties: {
          name: { type: "string" },
          description: { type: "string" },
        },
      },
    },
  },
  responses: {
    204: {
      description: "Setor atualizado com sucesso",
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

const deleteSetor = {
  tags: ["Setores"],
  security: [{ APIKey: [], JWTToken: [] }],
  response: {
    204: {
      description: "Lista de setores",
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

module.exports = {
  getSetores,
  getOneSetor,
  postSetor,
  updateSetor,
  deleteSetor,
};
