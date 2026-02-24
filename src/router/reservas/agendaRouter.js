import AgendamentoController from "../../controller/reservas/agendamentoController.js";
import postAgendamento from "../../controller/reservas/postAgendamentoController.js";
import { authJWT } from "../../middleware/authJWT.js";
import errorResponseSchema from "../../schema/errorSchema.js";

const AgendamentoRouter = (fastify) => {
    fastify.addHook("preHandler", authJWT);

const agendamentoSchema = {
    type: "object",
    properties: {
      uuid: { type: "string", example: "uuid" },
      data_agendamento: { type: "string", format: "date" },
      hora_inicio: { type: "string", format: "time" },
      hora_fim: { type: "string", format: "time" },
      origem: { type: "string", example: "origem" },
      destino: { type: "string", example: "destino" },
      observacao: { type: "string", example: "*observação chaves*" },
      status: { type: "string", example: "pendente" },
      ownner_uuid: { type: "string", example: "uuid" },
      responsible_uuid: { type: "string", example: "uuid" },
      motorista: {
        type: "object",
        properties: {
          uuid: { type: "string", example: "uuid" },
          nome: { type: "string", example: "joao" },
          email: { type: "string", example: "teste@teste.sp.gov.br" },
          telefone: { type: "string", example: "1199999999" },
        },
      },
      veiculo: {
        type: "object",
        properties: {
          uuid: { type: "string", example: "uuid" },
          placa: { type: "string", example: "ABC-1234" },
          marca: { type: "string", example: "Fiat" },
          modelo: { type: "string", example: "Palio" },
          cor: { type: "string", example: "Preto" },
          ano: { type: "integer", example: 2020 },
          capacidade: { type: "string", example: 5 },
          status: { type: "string", example: "ativo" },
        },
      },
    },
  };

  const agendamentoRequired = {
    type: "object",
    required: [
      "data_agendamento",
      "hora_inicio",
      "hora_fim",
      "origem",
      "destino",
    ],
    properties: {
      data_agendamento: { type: "string" },
      hora_inicio: { type: "string" },
      hora_fim: { type: "string" },
      origem: { type: "string" },
      destino: { type: "string" },
      observacao: { type: "string" },
    },
    additionalProperties: false,
  };

  const genericResponse = {
    ok: { type: "boolean" },
    code: { type: "integer" },
    message: { type: "string" },
  };

  // ===================== GET ======================
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      tags: ["Agendamento"],
      summary: "Get all agendamentos",
      description: "Get all agendamentos",
      response: {
        200: {
          type: "object",
          properties: {
            ...genericResponse,
            agendamento: {
              type: "array",
              items: agendamentoSchema,
            },
            count: { type: "integer" },
          },
        },
        ...errorResponseSchema,
      },
    },
    handler: AgendamentoController.getAgenda,
  });

  
    fastify.route({
      method: "GET",
      url: "/disponiveis",
      schema: {
        tags: ["Agendamento"],
        summary: "Get motoristas e veiculos disponiveis",
        description:
          "Get motoristas e veiculos disponiveis em uma data e horário a partir de uma query. Ex: GET /disponiveis?data=2026-02-02&inicio=08:00&fim=10:00, por padrão a ordenação será do mais recente primeiro e posteriormente os mais antigos.",
        querystring: {
          type: "object",
          required: ["data", "inicio", "fim"],
          properties: {
            data: {
              type: "string",
              description: "Data do agendamento (YYYY-MM-DD)",
            },
            inicio: {
              type: "string",
              pattern: "^([01]\\d|2[0-3]):([0-5]\\d):([0-5]\\d)$",
              description: "Horário de início (HH:mm)",
            },
            fim: {
              type: "string",
              pattern: "^([01]\\d|2[0-3]):([0-5]\\d):([0-5]\\d)$",
              description: "Horário de término (HH:mm)",
            },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              ...genericResponse,
              motorista: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    uuid: { type: "string" },
                    nome: { type: "string" },
                  },
                },
              },
              veiculo: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    uuid: { type: "string" },
                    placa: { type: "string" },
                  },
                },
              },
            },
          },
          ...errorResponseSchema,
        },
      },
      handler: AgendamentoController.verificarDisponiveis,
    });

//   ====== by motorista e veiculo =======
//   fastify.route({
//     method: "GET",
//     url: "/veiculo/:uuid",
//     schema: {
//       tags: ["Agendamento"],
//       summary: "Get all agendamentos by vehicule",
//       description: "Get all agendamentos by vehicule",
//       response: {
//         200: {
//           type: "object",
//           properties: {
//             ...genericResponse,
//             agendamento: {
//               type: "array",
//               items: agendamentoSchema,
//             },
//             count: { type: "integer" },
//           },
//         },
//         ...errorResponseSchema,
//       },
//     },
//     handler: AgendamentoController.getByVeiculo,
//   });

//   fastify.route({
//     method: "GET",
//     url: "/motorista/:uuid",
//     schema: {
//       tags: ["Agendamento"],
//       summary: "Get all agendamentos by motorista",
//       description: "Get all agendamentos by motorista uuid",
//       response: {
//         200: {
//           type: "object",
//           properties: {
//             ...genericResponse,
//             agendamento: {
//               type: "array",
//               items: agendamentoSchema,
//             },
//             count: { type: "integer" },
//           },
//         },
//         ...errorResponseSchema,
//       },
//     },
//     handler: AgendamentoController.getByMotorista,
//   });

//   fastify.route({
//     method: "GET",
//     url: "/:motorista_uuid::veiculo_uuid",
//     schema: {
//       tags: ["Agendamento"],
//       summary: "Get all agendamentos by vehicule and drivers",
//       description: "Get all agendamentos by vehicule and drivers",
//       response: {
//         200: {
//           type: "object",
//           properties: {
//             ...genericResponse,
//             agendamento: {
//               type: "array",
//               items: agendamentoSchema,
//             },
//             count: { type: "integer" },
//           },
//         },
//         ...errorResponseSchema,
//       },
//     },
//     handler: AgendamentoController.getByVehiculoAndMotorista,
//   });

  // ===================== POST ======================

  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      tags: ["Agendamento"],
      summary: "Create new agendamento",
      description: "Create new agendamento",
      body: agendamentoRequired,
      response: {
        201: {
          type: "object",
          properties: {
            ...genericResponse,
            agendamento: agendamentoSchema,
          },
        },
        ...errorResponseSchema,
      },
    },
    handler: AgendamentoController.postAgenda,
  });

  fastify.route({
    method: "POST",
    url: "/user",
    schema: {
      tags: ["Agendamento"],
      summary: "Create new agendamento",
      description: "Create new agendamento",
      body: agendamentoRequired,
      response: {
        201: {
          type: "object",
          properties: {
            ...genericResponse,
            agendamento: agendamentoSchema,
          },
        },
        ...errorResponseSchema,
      },
    },
    handler: postAgendamento,
  });

  // ===================== UPDATE ======================

  fastify.route({
    method: "PUT",
    url: "/:uuid/confirmar",
    schema: {
      tags: ["Agendamento"],
      summary: "Aceitar agendamento",
      description: "Update agendamento",
      body: {
        type: "object",
        required: ["veiculo_uuid", "motorista_uuid"],
        properties: {
          motorista_uuid: { type: "string" },
          veiculo_uuid: { type: "string" },
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
    handler: AgendamentoController.ConfirmarAgendamento,
  });

  fastify.route({
    method: "PUT",
    url: "/:uuid/cancelar",
    schema: {
      tags: ["Agendamento"],
      summary: "Cancelar agendamento",
      description: "Update agendamento",
      body: {
        type: "object",
        required: ["observacao"],
        properties: {
          observacao: { type: "string" },
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
    handler: AgendamentoController.CancelarAgendamento,
  });
}

export default AgendamentoRouter