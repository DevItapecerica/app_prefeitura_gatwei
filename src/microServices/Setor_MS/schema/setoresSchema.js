const errorSchema = require("./errorSchema");

const getSetores = {
  tags: ["Setores"],
  security: [{ APIKey: [] }],
  response: {
    200: {
      description: "Lista de setores",
      type: "object",
      properties: {
        setores: {
          type: "array",
          items: {
            type: "object",  // Adicionando o tipo para cada item do array
            properties: {
              id: { type: "integer", example: 1 },
              name: { type: "string", example: "Tecnologia" },
              description: { type: "string", example: "Setor de tecnologia" },
            }
          }
        }
      }
    },
    ...errorSchema
  },
};

const getOneSetor = {
  tags: ["Setores"],
  security: [{ APIKey: [] }],
  response: {
    200: {
      description: "Lista de setores",
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
    ...errorSchema
  },
};

const postSetor = {
  tags: ["Setores"],
  description: "Cria um novo setor",
  security: [{ APIKey: [] }],
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
    ...errorSchema
  },
};

const updateSetor = {
  tags: ["Setores"],
  description: "Cria um novo setor",
  security: [{ APIKey: [] }],
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
    ...errorSchema
  },
};

const deleteSetor = {
  tags: ["Setores"],
  security: [{ APIKey: [] }],
  response: {
    204: {
      description: "Setor deletado com sucesso",
    },
    ...errorSchema
  },
};

module.exports = {
  getSetores,
  getOneSetor,
  postSetor,
  updateSetor,
  deleteSetor,
};
