const { string } = require("zod");
const User = require("../../db/model/UserModel");

const verifyAuthSchema = {
    schema: {
      description: "Verificação de usuário",
      tags: ["Auth"],
      headers: {
        required: ["authorization"],
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
            User: { type: "object", properties: {
              auth: { type: "boolean", example: true },
              id: { type: "number", example: 1 },
              role: { type: "string", example: "admin" },
            }}
          },
        },
        401: {
          description: "Não autorizado",
          type: "object",
          properties: {
            message: { type: "string", example: "Não autorizado" },
          },
        },
        400: {
          description: "Erro de validação",
          type: "object",
          properties: {
            message: { type: "string", example: "Erro de validação" },
          }
        },
        500: {
          description: "Erro interno",
          type: "object",
          properties: {
            message: { type: "string", example: "Erro interno" },
          },
        },
      },
    },
  };
  
  module.exports = verifyAuthSchema;
  