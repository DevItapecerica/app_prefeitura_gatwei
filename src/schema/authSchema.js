import errorSchema from "./errorSchema.js";

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
        user: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            role: { type: "integer", example: 1 },
          },
        },
      },
    },
    ...errorSchema,
  },
};

export default authSchema;
