import errorSchema from './errorSchema.js';

export const getUserSchema = {
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
            role_id: { type: "integer", example: 1 },
            firstLogin: { type: "boolean", example: true },
          },
        },
        setores: { type: "array" },
        roles: { type: "array" },
      },
    },
    ...errorSchema,
  },
};

export const postUserSchema = {
  description: "Pegue todos os usuários",
  tags: ["Users"],
  security: [{ APIKey: [], JWTToken: [] }],
  body: {
    type: "object",
    required: ["user"],
    properties: {
      user: {
        type: "object",
        required: ["name", "email", "ramal", "setor_id", "role_id"],
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          ramal: { type: "string" },
          setor_id: { type: "integer" },
          role_id: { type: "integer" },
        },
      },
    },
  },
  response: {
    200: {
      description: "Usuário criado com sucesso",
      type: "object",
      properties: {
        user: {
          type: "object",
          properties: {
            name: { type: "string", example: "kadoia" },
            email: { type: "string", example: "kadoia@gmail.com" },
            ramal: { type: "string", example: "1234" },
            setor_id: { type: "integer", example: 1 },
            role_id: { type: "integer", example: 1 },
          },
        },
      },
    },
    ...errorSchema,
  },
};

export const getOneUserSchema = {
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
            role_id: { type: "integer", example: 1 },
            password: { type: "string", example: "sua senha aqui" },
            firstLogin: { type: "boolean", example: true },
          },
        },
      },
    },
    ...errorSchema,
  },
};

export const updateUserSchema = {
  description: "Atualizar usuário",
  tags: ["Users"],
  security: [{ APIKey: [], JWTToken: [] }],
  body: {
    required: ["user"],
    type: "object",
    properties: {
      user: {
        required: ["name", "email", "ramal", "setor_id", "role_id"],
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          ramal: { type: "string" },
          setor_id: { type: "integer" },
          role_id: { type: "integer" },
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
    ...errorSchema,
  },
};

export const deleteUserSchema = {
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
    ...errorSchema,
  },
};
