import errorResponseSchema from "../../schema/errorSchema.js";
import VeiculoController from "../../controller/reservas/VeiculoController.js";

const veiculoRouter = (fastify) => {
  const vehicleSchema = {
    type: "object",
    required: ["placa", "marca", "modelo", "cor", "ano", "capacidade"],
    properties: {
      placa: { type: "string", pattern: "^([A-Za-z]{3}-\\d{4}|[A-Za-z]{3}[0-9][A-Za-z][0-9]{2})$"},
      marca: { type: "string" },
      modelo: { type: "string" },
      cor: { type: "string" },
      ano: { type: "integer" },
      capacidade: { type: "integer" },
    },
    additionalProperties: false,
  };

  const genericResponse = {
    ok: { type: "boolean" },
    code: { type: "integer" },
    message: { type: "string" },
  };

  const vehicleResponseSchema = {
    type: "object",
    properties: {
      uuid: { type: "string" },
      placa: { type: "string" },
      marca: { type: "string" },
      modelo: { type: "string" },
      cor: { type: "string" },
      ano: { type: "integer" },
      capacidade: { type: "integer" },
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
      }
    },
  };

  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      tags: ["Veiculo"],
      description: "Get all veiculos",
      summary: "Get all veiculos",
      response: {
        200: {
          type: "object",
          properties: {
            veiculo: {
              type: "array",
              items: vehicleResponseSchema,
            },
            count: { type: "integer" },
            ...genericResponse,
          },
        },
        ...errorResponseSchema,
      },
    },
    handler: VeiculoController.getVeiculo,
  });

  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      tags: ["Veiculo"],
      description: "Create veiculo",
      summary: "Create veiculo a partir de valores passados para o JSON, lembre-se, os valores permitidos de de placa são no modelo MARCOSUL(AAA9A99) ou a antiga forma (AAA-9999), qualquer coisa fora disso, será recusado",
      body: vehicleSchema,
      response: {
        200: {
          type: "object",
          properties: {
            ...genericResponse,
            veiculo: vehicleResponseSchema,
          },
        },
        ...errorResponseSchema,
      },
    },
    handler: VeiculoController.createVeiculo,
  });

  fastify.route({
    method: "GET",
    url: "/:uuid",
    schema: {
      tags: ["Veiculo"],
      description: "Get veiculo",
      summary: "Get veiculo",
      params: {
        type: "object",
        properties: {
          uuid: { type: "string" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            ...genericResponse,
            veiculo: vehicleResponseSchema,
          },
        },
        ...errorResponseSchema,
      },
    },
    handler: VeiculoController.getVeiculoById,
  });

  fastify.route({
    method: "PUT",
    url: "/:uuid",
    schema: {
      tags: ["Veiculo"],
      description: "Update veiculo",
      summary: "Update veiculo",
      params: {
        type: "object",
        properties: {
          uuid: { type: "string" },
        },
      },
      body: vehicleSchema,
      response: {
        200: {
          type: "object",
          properties: {
            ...genericResponse,
            veiculo: vehicleResponseSchema,
          },
        },
        ...errorResponseSchema,
      },
    },
    handler: VeiculoController.updateVeiculo,
  });

  fastify.route({
    method: "DELETE",
    url: "/:uuid",
    schema: {
      tags: ["Veiculo"],
      description: "Delete veiculo",
      summary: "Delete veiculo",
      params: {
        type: "object",
        properties: {
          uuid: { type: "string" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            ...genericResponse,
          },
        },
        ...errorResponseSchema,
      },
    },
    handler: VeiculoController.deleteVeiculo,
  });
};

export default veiculoRouter;
