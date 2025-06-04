import errorSchema from './errorSchema.js';

const getSetores = {
  tags: ["Setores"],
  security: [{ APIKey: [], JWTToken: [] }],
  response: {
    200: {
      description: "Lista de setores",
      type: "object",
      properties: {
        setores: {
          type: "array",
          example: {
            id: 1,
            name: "Tecnologia",
            description: "Setor de tecnologia",
          },
        },
      },
    },
    ...errorSchema,
  },
};

const getOneSetor = {
  tags: ["Setores"],
  security: [{ APIKey: [], JWTToken: [] }],
  response: {
    200: {
      description: "Detalhes do setor",
      type: "object",
      properties: {
        setor: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Tecnologia" },
            description: {
              type: "string",
              example: "Setor para gerenciamento do sistema",
            },
          },
        },
      },
    },
    ...errorSchema,
  },
};

const postSetor = {
  tags: ["Setores"],
  description: "Cria um novo setor",
  security: [{ APIKey: [], JWTToken: [] }],
  body: {
    type: "object",
    required: ["setor"],
    properties: {
      setor: {
        type: "object",
        required: ["name", "description"],
        properties: {
          name: { type: "string" },
          description: { type: "string" },
        },
      },
    },
  },
  responses: {
    201: {
      description: "Setor criado com sucesso",
      type: "object",
      properties: {
        setor: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Tecnologia" },
            description: {
              type: "string",
              example: "Setor de tecnologia",
            },
          },
        },
      },
    },
    ...errorSchema,
  },
};

const updateSetor = {
  tags: ["Setores"],
  description: "Atualiza um setor existente",
  security: [{ APIKey: [], JWTToken: [] }],
  body: {
    type: "object",
    required: ["setor"],
    properties: {
      setor: {
        type: "object",
        required: ["name", "description"],
        properties: {
          name: { type: "string" },
          description: { type: "string" },
        },
      },
    },
  },
  responses: {
    204: {
      description: "Setor atualizado com sucesso",
    },
    ...errorSchema,
  },
};

const deleteSetor = {
  tags: ["Setores"],
  security: [{ APIKey: [], JWTToken: [] }],
  response: {
    204: {
      description: "Setor deletado com sucesso",
    },
    ...errorSchema,
  },
};

export {
  getSetores,
  getOneSetor,
  postSetor,
  updateSetor,
  deleteSetor,
};
