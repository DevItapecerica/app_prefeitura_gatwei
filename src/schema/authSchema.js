import errorSchema from './errorSchema.js';

const authSchema = {
  description: "Verificação de usuário",
  tags: ["Auth"],
  security: [{ APIKey: [], JWTToken: [] }],

  response: {
    200: {
      description: "Verificação bem sucedido",
      type: "object",
      properties: {
        message: { type: "string", example: "Usuário autenticado" },
        scopo: { type: "string", example: "admin" },
        user: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            role: { type: "string", example: "admin" },
          },
        },
      },
    },
    ...errorSchema,
  },
};

export default authSchema;
