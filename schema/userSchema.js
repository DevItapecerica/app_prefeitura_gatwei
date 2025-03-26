const getUserSchema = {
  tags: ["Users"],
  security: [{ APIKey: [], JWTToken: [] }],
  response: {
    200: {
      description: "requisição bem sucedida",
      type: "object",
      properties: {
        users: {
          type: "array",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "kadoia" },
            email: { type: "string", example: "email@dominio.com.br" },
            ramal: { type: "string", example: "1234" },
            setor_id: { type: "integer", example: 1 },
            role: { type: "string", example: "admin" },
            firstLogin: { type: "boolean", example: true },
          },
        },
        roles: {
          type: "array",
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
      description: "Token de autenticação inválido",
      type: "object",
      properties: {
        message: { type: "string", example: "Token de autenticação inválido" },
      },
    },
    403: {
      description: "Ação Não permitida",
      type: "object",
      properties: {
        message: { type: "string", example: "Ação não permitida" },
      },
    },
    500: {
      description: "Erro ao buscar setores",
      type: "object",
      properties: {
        message: { type: "string", example: "Erro ao buscar setor" },
      },
    },
  },
};

const postUserSchema = {
  description: "Pegue todos os usuários",
  tags: ["Users"],
  security: [{ APIKey: [], JWTToken: [] }],
  body: {
    type: "object",
    required: ["user"],
    properties: {
      user: {
        type: "object",
        required: ["name", "email", "ramal", "setor_id", "role"],
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          ramal: { type: "string" },
          setor_id: { type: "integer" },
          role: { type: "string" },
        },
      },
    },
  },
  response: {
    200: {
      description: "Ususário criado com sucesso",
      type: "object",
      properties: {
        user: {
          type: "object",
          properties: {
            name: { type: "string", example: "kadoia" },
            email: { type: "string", example: "kadoia@gmail.com" },
            ramal: { type: "string", example: "1234" },
            setor_id: { type: "integer", example: 1 },
            role: { type: "string", example: "admin" },
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
      description: "Token de autenticação inválido",
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "Token de autenticação inválido",
        },
      },
    },
    403: {
      description: "Ação Não permitida",
      type: "object",
      properties: {
        message: { type: "string", example: "Ação não permitida" },
      },
    },
    500: {
      description: "Erro ao buscar setores",
      type: "object",
      properties: {
        message: { type: "string", example: "Erro ao buscar setor" },
      },
    },
  },
};

const getOneUserSchema = {
  tags: ["Users"],
  security: [{ APIKey: [], JWTToken: [] }],
  response: {
    200: {
      description: "requisição bem sucedida",
      type: "object",
      properties: {
        user: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "kadoia" },
            email: { type: "string", example: "email@dominio.com.br" },
            ramal: { type: "string", example: "1234" },
            setor_id: { type: "integer", example: 1 },
            role: { type: "string", example: "admin" },
            password: { type: "string", example: "sua senha aqui" },
            firstLogin: { type: "boolean", example: true },
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
      description: "Token de autenticação inválido",
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "Token de autenticação inválido",
        },
      },
    },
    403: {
      description: "Ação Não permitida",
      type: "object",
      properties: {
        message: { type: "string", example: "Ação não permitida" },
      },
    },
    500: {
      description: "Erro ao buscar setores",
      type: "object",
      properties: {
        message: { type: "string", example: "Erro ao buscar setor" },
      },
    },
  },
};

const updateUserSchema = {
  description: "Atualizar usuário",
  tags: ["Users"],
  security: [{ APIKey: [], JWTToken: [] }],
  body: {
    required: ["user"],
    type: "object",
    properties: {
      user: {
        required: ["name", "email", "ramal", "setor_id", "role"],
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          ramal: { type: "string" },
          setor_id: { type: "integer" },
          role: { type: "string" },
        },
      },
    },
  },

  response: {
    200: {
      description: "Usuário atualizado com sucesso",
      type: "object",
      properties: {
        message: { type: "string", example: "Usuário salvo com sucesso" },
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
      description: "Token de autenticação inválido",
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "Token de autenticação inválido",
        },
      },
    },
    403: {
      description: "Ação Não permitida",
      type: "object",
      properties: {
        message: { type: "string", example: "Ação não permitida" },
      },
    },
    500: {
      description: "Erro ao buscar setores",
      type: "object",
      properties: {
        message: { type: "string", example: "Erro ao buscar setor" },
      },
    },
  },
};

const deleteUserSchema = {
  description: "Deleta um usuário",
  tags: ["Users"],
  security: [{ APIKey: [], JWTToken: [] }],
  response: {
    200: {
      description: "Usuário deletado com sucesso",
      type: "object",
      properties: {
        message: { type: "string", example: "Usuário deletado com sucesso" },
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
      description: "Token de autenticação inválido",
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "Token de autenticação inválido",
        },
      },
    },
    403: {
      description: "Ação Não permitida",
      type: "object",
      properties: {
        message: { type: "string", example: "Ação não permitida" },
      },
    },
    500: {
      description: "Erro ao buscar setores",
      type: "object",
      properties: {
        message: { type: "string", example: "Erro ao buscar setor" },
      },
    },
  },
};

module.exports = {
  getUserSchema,
  postUserSchema,
  getOneUserSchema,
  deleteUserSchema,
  updateUserSchema,
};
