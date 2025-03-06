const loginSchema = {
  schema: {
    description: "Login de usuário",
    tags: ["Auth"], // Para agrupar no Swagger
    body: {
      type: "object",
      required: ["email", "pwd"],
      properties: {
        email: { type: "string" },
        pwd: { type: "string" },
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
          token: {type: "string", example: 'token'}, 
          ip: {type: "string", example: '127.0.0.1'}, 
          scopo: { type: "string", example: "admin" },
        },
      },
      401: {
        description: "Erro no login",
        type: "object",
        properties: {
          message: { type: "string", example: "Email ou senha incorretos" },
        },
      },
      500: {
        description: "Erro interno",
        type: "object",
        properties: {
          message: { type: "string", example: "Erro interno no servidor" },
          error: { type: "string", example: "Erro interno no servidor" },
        },
      },
    },
  },
};

module.exports = loginSchema;
