import MotoristaController from "../../controller/reservas/motoristaController.js";
import errorResponseSchema from "../../schema/errorSchema.js";

const MotoristaRouter = (fastify) => {
  const genericMotoristaSchema = {
    type: "object",
    properties: {
      uuid: { type: "string" },
      nome: { type: "string" },
      cnh: { type: "string" },
      telefone: { type: "string" },
      email: { type: "string" },
      status: { type: "string" },
      agendamentos: {
        type: "array",
        items: {
          type: "object",
          properties: {
            uuid: { type: "string" },
            data_agendamento: { type: "string", format: "date" },
            hora_inicio: { type: "string", format: "time" },
            hora_fim: { type: "string", format: "time" },
            origem: { type: "string" },
            destino: { type: "string" },
            observacao: { type: "string" },
            status: { type: "string" },
            ownner_uuid: { type: "string" },
            responsible_uuid: { type: "string" },
          },
        },
      },
    },
  };

  const genericResponse = {
    ok: { type: "boolean" },
    code: { type: "integer" },
    message: { type: "string" },
  };

  const requiredMotorista = {
    type: "object",
    required: ["nome", "cnh", "email", "status"],
    properties: {
      nome: { type: "string" },
      cnh: { type: "string" },
      email: { type: "string", format: "email" },
      telefone: { type: "string" },
      status: { type: "string" },
    },
    additionalProperties: false,
  };

  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      tags: ["Motorista"],
      description: "Get all motoristas",
      summary: "Get all motoristas",
      response: {
        200: {
          type: "object",
          properties: {
            ...genericResponse,
            motorista: {
              type: "array",
              items: genericMotoristaSchema,
            },
            count: { type: "integer" },
          },
        },
        ...errorResponseSchema,
      },
    },
    handler: MotoristaController.getMotoristas,
  });

  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      tags: ["Motorista"],
      description: "Create new motorista",
      summary: "Create new motorista",
      body: requiredMotorista,
      response: {
        201: {
          type: "object",
          properties: {
            ...genericResponse,
            motorista: genericMotoristaSchema,
          },
        },
        ...errorResponseSchema,
      },
    },
    handler: MotoristaController.createMotorista,
  });

  fastify.route({
    method: "GET",
    url: "/:uuid",
    schema: {
      tags: ["Motorista"],
      description: "Get motorista by uuid",
      summary: "Get motorista by uuid",
      response: {
        200: {
          type: "object",
          properties: {
            ...genericResponse,
            motorista: genericMotoristaSchema,
          },
        },
        ...errorResponseSchema,
      },
    },
    handler: MotoristaController.getById,
  });

  fastify.route({
    method: "PUT",
    url: "/:uuid",
    schema: {
      tags: ["Motorista"],
      description: "Update motorista by uuid",
      summary: "Update motorista by uuid",
      response: {
        200: {
          type: "object",
          properties: {
            ...genericResponse,
            motorista: genericMotoristaSchema,
          },
        },
        ...errorResponseSchema
      },
    },
    handler: MotoristaController.updateMotorista,
  });

  fastify.route({
    method: "DELETE",
    url: "/:uuid",
    schema: {
      tags: ["Motorista"],
      description: "Delete motorista by uuid",
      summary: "Delete motorista by uuid",
      response: {
        200: {
          type: "object",
          properties: {
            ...genericResponse,
            motorista: genericMotoristaSchema,
          },
        },
        ...errorResponseSchema
      },
    },
    handler: MotoristaController.deleteMotorista,
  });
};

export default MotoristaRouter;
