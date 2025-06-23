import errorSchema from "./errorSchema.js";

const bolsistaProperties = {
  id: { type: "string" }, // caso você use auto-incremento no banco
  bco: { type: "string", maxLength: 3 },
  ag: { type: "string", maxLength: 4 },
  dig_ag: { type: "string", maxLength: 1 },
  conta: { type: "string", maxLength: 10 },
  dig_conta: { type: "string", maxLength: 1 },
  status: { type: "string" },
  pagador: { type: "string", format: "uuid" },
  nome: { type: "string" },
  vencimento: { type: "integer" },
  cpf: {
    type: "string",
    maxLength: 11,
    pattern: "^[0-9]{11}$", // Regex para validar CPF com 11 dígitos
  },
  local: { type: "string" },
  createdAt: { type: "string", format: "date-time" },
  updatedAt: { type: "string", format: "date-time" },
};

const getBolsistaSchema = {
  tags: ["Bolsista"],
  security: [{ APIKey: [], JWTToken: [] }],
  description: "Get all bolsistas",
  summary: "Retrieve all bolsistas",
  response: {
    200: {
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "Bolsistas retrieved successfully",
        },
        bolsista: {
          type: "array",
          items: {
            type: "object",
            properties: bolsistaProperties,
          },
        },
        pagador: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string", format: "uuid" },
              name: { type: "string" },
              max_bolsista: { type: "integer" },
            },
          },
        },
        uploadToken: { type: "string" },
      },
    },
    ...errorSchema,
  },
};

const getOneBolsistaSchema = {
  tags: ["Bolsista"],
  security: [{ APIKey: [], JWTToken: [] }],
  description: "Get a bolsista by ID",
  summary: "Retrieve a single bolsista",
  params: {
    type: "object",
    properties: {
      id: { type: "string", description: "Bolsista ID" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        bolsista: {
          type: "object",
          properties: bolsistaProperties,
        },
      },
    },
    ...errorSchema,
  },
};

const createBolsistaSchema = {
  tags: ["Bolsista"],
  security: [{ APIKey: [], JWTToken: [] }],
  description: "Create a new bolsista",
  summary: "Add a new bolsista to the system",
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
      data_inicio: { type: "string", format: "date-time" },
      nome: { type: "string" },
      cpf: {
        type: "string",
        maxLength: 11,
        pattern: "^[0-9]{11}$", // Regex para validar CPF com 11 dígitos
      },
      local: { type: "string" },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        message: { type: "string", example: "Bolsista created successfully" },
        bolsista: {
          type: "object",
          properties: bolsistaProperties,
        },
      },
    },
    ...errorSchema,
  },
};

const updateBolsistaSchema = {
  tags: ["Bolsista"],
  security: [{ APIKey: [], JWTToken: [] }],
  description: "Update an existing bolsista",
  summary: "Update the details of an existing bolsista",
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
      cpf: {
        type: "string",
        maxLength: 11,
        pattern: "^[0-9]{11}$",
      },
      local: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string", example: "Bolsista updated successfully" },
        bolsista: {
          type: "object",
          properties: bolsistaProperties,
        },
      },
    },
    ...errorSchema,
  },
};

const deleteBolsistaSchema = {
  tags: ["Bolsista"],
  security: [{ APIKey: [], JWTToken: [] }],
  description: "Delete a bolsista",
  summary: "Remove a bolsista from the system",
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
