const errorResponseSchema = {
  400: {
    description: "Erro no 400: Requisição inválida",
    type: "object",
    properties: {
      statusCode: { type: "integer", example: 400 },
      error: { type: "string", example: "Bad Request" },
      message: { type: "string", example: "Requisição inválida" },
    },
  },
  401: {
    description: "Token de autenticação inválido",
    type: "object",
    properties: {
      statusCode: { type: "integer", example: 401 },
      error: { type: "string", example: "Unauthorized" },
      message: { type: "string", example: "Token de autenticação inválido" },
    },
  },
  403: {
    description: "Ação não permitida",
    type: "object",
    properties: {
      statusCode: { type: "integer", example: 403 },
      error: { type: "string", example: "Forbidden" },
      message: { type: "string", example: "Ação não permitida" },
    },
  },
  500: {
    description: "Erro interno no servidor",
    type: "object",
    properties: {
      statusCode: { type: "integer", example: 500 },
      error: { type: "string", example: "Internal Server Error" },
      message: { type: "string", example: "Erro interno no servidor" },
    },
  },
};

export default errorResponseSchema;
