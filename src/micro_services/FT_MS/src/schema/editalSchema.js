import errorSchema from "./errorSchema.js";

const editalProperties = {
  name: { type: "string" },
  data_publicacao: { type: "string", format: "date-time" },
  data_vencimento: { type: "string", format: "date-time" },
  dia_pagamento: { type: "integer" },
  valor_bolsa: { type: "number" },
};

const edital = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    ...editalProperties,
  },
  required: [
    "name",
    "data_publicacao",
    "data_vencimento",
    "dia_pagamento",
    "valor_bolsa",
  ],
};

export const getEditalSchema = {
  tags: ["edital"],
  security: [{ APIKey: [] }],
  description: "Get Edital",
  summary: "Get Edital",
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
        edital: {
          type: "array",
          items: edital,
        },
      },
    },
  },
};

export const getEditalById = {
  tags: ["edital"],
  security: [{ APIKey: [] }],
  description: "Get Edital by Id",
  summary: "Get Edital by Id",
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
        edital,
      },
    },
  },
};

export const createEdital = {
  tags: ["edital"],
  security: [{ APIKey: [] }],
  description: "Create Edital",
  summary: "Create Edital",
  body: {
    type: "object",
    properties: {
      edital: {
        type: "object",
        required: [
          "name",
          "data_publicacao",
          "data_vencimento",
          "dia_pagamento",
          "valor_bolsa",
        ],
        properties: editalProperties,
      },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        message: { type: "string" },
        edital,
      },
    },
    ...errorSchema,
  },
};

export const updateEdital = {
  tags: ["edital"],
  security: [{ APIKey: [] }],
  description: "Create Edital",
  summary: "Create Edital",
  body: {
    type: "object",
    properties: {
      edital: {
        type: "object",
        required: [
          "name",
          "data_publicacao",
          "data_vencimento",
          "dia_pagamento",
          "valor_bolsa",
        ],
        properties: editalProperties,
      },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
        edital,
      },
    },
    ...errorSchema,
  },
};

export const deleteEdital = {
  tags: ["edital"],
  security: [{ APIKey: [] }],
  description: "Delete Edital",
  summary: "Delete Edital",
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
      required: ["message"],
    },
    ...errorSchema,
  },
};

export const vincularBolsista = {
  tags: ["edital"],
  security: [{ APIKey: [] }],
  description: "Vincular bolsistas a um edital",
  summary: "Vincular bolsistas a um edital",
  body: {
    type: "object",
    required: ["bolsista"],
    properties: {
      bolsista: {
        type: "array",
        items: {
          type: "string",
          format: "uuid",
        },
      },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
      required: ["message"],
    },
    ...errorSchema,
  },
};
