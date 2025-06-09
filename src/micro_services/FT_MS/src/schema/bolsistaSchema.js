import errorSchema from "./errorSchema.js";

const bolsista = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    bco: { type: "string", maxLength: 3 },
    ag: { type: "string", maxLength: 4 },
    dig_ag: { type: "string", maxLength: 1 },
    conta: { type: "string", maxLength: 10 },
    dig_conta: { type: "string", maxLength: 1 },
    nome: { type: "string" },
    bolsa: { type: "number" },
    vencimento: { type: "integer" },
    cpf: { type: "string", maxLength: 11 },
    local: { type: "string" },
    status: { type: "string" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
};

const getBolsistaSchema = {
  tags: ["Bolsista"],
  security: [{ APIKey: [] }],
  description: "get all bolsista",
  summary: "Get all bolsista",
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string", example: "Bolsista geted successfully" },
        bolsista: {
          type: "array",
          items: bolsista,
        },
      },
    },
    ...errorSchema,
  },
};

const getOneBolsistaSchema = {
  tags: ["Bolsista"],
  security: [{ APIKey: [] }],
  description: "get a bolsista",
  summary: "Get a bolsista",
  params: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "bolsista id",
      },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        bolsista,
      },
    },
    ...errorSchema,
  },
};

const createBolsistaSchema = {
  tags: ["Bolsista"],
  security: [{ APIKey: [] }],
  description: "create a bolsista",
  summary: "Create a bolsista",
  body: {
    type: "object",
    required: [
      "bco",
      "ag",
      "dig_ag",
      "conta",
      "dig_conta",
      "nome",
      "cpf",
      "local",
    ],
    properties: {
      bco: { type: "string", maxLength: 3 },
      ag: { type: "string", maxLength: 4 },
      dig_ag: { type: "string", maxLength: 1 },
      conta: { type: "string", maxLength: 10 },
      dig_conta: { type: "string", maxLength: 1 },
      nome: { type: "string" },
      cpf: { type: "string", maxLength: 11 },
      local: { type: "string" },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        message: { type: "string", example: "Bolsista created successfully" },
        bolsista
      },
    },
    ...errorSchema,
  },
};

const updateBolsistaSchema = {
  tags: ["Bolsista"],
  security: [{ APIKey: [] }],
  description: "update a bolsista",
  summary: "Update a bolsista",
  body: {
    type: "object",
    required: [
      "bco",
      "ag",
      "dig_ag",
      "conta",
      "dig_conta",
      "nome",
      "cpf",
      "local",
    ],
    properties: {
      bco: { type: "string", maxLength: 3 },
      ag: { type: "string", maxLength: 4 },
      dig_ag: { type: "string", maxLength: 1 },
      conta: { type: "string", maxLength: 10 },
      dig_conta: { type: "string", maxLength: 1 },
      nome: { type: "string" },
      cpf: { type: "string", maxLength: 11 },
      local: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string", example: "Bolsista updated successfully" },
        bolsista
      },
    },
    ...errorSchema,
  },
};

const deleteBolsistaSchema = {
  tags: ["Bolsista"],
  security: [{ APIKey: [] }],
  description: "delete a bolsista",
  summary: "Delete a bolsista",
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string", example: "Bolsista deleted successfully" },
      },
    },
    ...errorSchema,
  },
};

export {
  createBolsistaSchema,
  getBolsistaSchema,
  updateBolsistaSchema,
  deleteBolsistaSchema,
  getOneBolsistaSchema,
};
