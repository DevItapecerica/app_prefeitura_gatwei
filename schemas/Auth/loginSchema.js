const loginSchema = {
  schema: {
    description: "Login de usuário",
    tags: ["Auth"], // Para agrupar no Swagger
    body: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: { type: "string" },
        password: { type: "string" },
      },
    },
    response: {
      200: {
        description: "Login bem-sucedido",
        type: "object",
        properties: {
          firstLogin: { type: "integer", example: 1 },
          message: { type: "string", example: "Login Bem sucedido" },
          name: { type: "string", example: "kadoia" },
          token: { type: "string", example: "token" },
          ip: { type: "string", example: "127.0.0.1" },
          scopo: { type: "string", example: "admin" },
        },
      },
      400: {
        description: "Erro no login",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Bad Request" },
          message: { type: "string", example: "Bad Request" },
        },
      },
      401: {
        description: "Erro no login",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 401 },
          error: { type: "string", example: "Unauthorized" },
          message: { type: "string", example: "Você não está autorizado a acessar este serviço." },
        },
      },
      404: {
        description: "Erro no login",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 404 },
          error: { type: "string", example: "Not Found" },
          message: { type: "string", example: "A serviço solicitada não foi encontrada." },
        },
      },
      500: {
        description: "Erro interno",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 500 },
          error: { type: "string", example: "Server Error" },
          message: { type: "string", example: "Erro interno no Servidor" },
        },
      },
    },
  },
};

module.exports = loginSchema;
