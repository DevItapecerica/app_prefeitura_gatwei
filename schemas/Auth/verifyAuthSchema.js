const { string } = require("zod");
const User = require("../../db/model/UserModel");

const verifyAuthSchema = {
  schema: {
    description: "Verificação de usuário",
    tags: ["Auth"],
    headers: {
      required: ["Authorization"],
      type: "object",
      properties: {
        authorization: {
          type: "string",
        },
      },
    },
    security: [
      {
        JWTAuth: [],
      },
    ],
    response: {
      200: {
        description: "Verificação bem sucedido",
        type: "object",
        properties: {
          message: { type: "string", example: "Usuário okay" },
          scopo: { type: "string", example: "admin" },
          User: {
            type: "object",
            properties: {
              auth: { type: "boolean", example: true },
              id: { type: "number", example: 1 },
              role: { type: "string", example: "admin" },
            },
          },
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
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Unauthorized" },
          message: {
            type: "string",
            example: "Você não está autorizado a acessar este serviço.",
          },
        },
      },
      404: {
        description: "Erro no login",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Not Found" },
          message: {
            type: "string",
            example: "A serviço solicitada não foi encontrada.",
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
  },
};

module.exports = verifyAuthSchema;
