import errorSchema from "./errorSchema.js";

const alterPasswordSchema = {
  description: "Verificação de usuário",
  tags: ["Auth"],
  security: [{ APIKey: [], JWTToken: [] }],
  body: {
    type: "object",
    required: ["password", "new_password"],
    properties: {
      password: {
        type: "string",
      },
      new_password: {
        type: "string",
      },
    },
  },
  response: {
    200: {
      description: "Verificação bem sucedido",
      type: "object",
      properties: {
        message: { type: "string", example: "Senha alterada com sucesso" },
        ok: { type: "boolean", example: true },
        api: { type: "string", example: "auth" },
        validation: { type: "boolean", example: false },
      },
    },
    ...errorSchema,
  },
};

export default alterPasswordSchema;
