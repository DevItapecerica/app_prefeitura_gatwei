const demandasGetSchema = {
  schema: {
    description: "Obtém todas as demandas",
    tags: ["Demandas"],
    response: {
      200: {
        description: "Requisição bem sucedida",
        type: "object",
        properties: {
          demandas: {
            type: "array",
            example: [
              {
                id: 3,
                patrimonio: "teste",
                description: "teste",
                prioridade: 2,
                status: 0,
                responsavel: null,
                createdAt: "2025-02-17T13:06:53.000Z",
                updatedAt: "2025-02-17T13:06:53.000Z",
                user: {
                  name: "kadoia",
                  ramal: "1234",
                  email: "kadoia",
                  setor_id: 1,
                },
                setor: {
                  name: "tecnologia",
                },
                responsavel_user: null,
              },
            ],
          },
        },
      },
      400: {
        description: "Erro no 400",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Bad Request" },
          message: { type: "string", example: "Bad Request" },
        },
      },
      401: {
        description: "Erro no 401",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Unauthorized" },
          message: {
            type: "string",
            example: "Você não está autorizado a acessar este serviço.",
          },
        },
      },
      404: {
        description: "Erro no 404",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Not Found" },
          message: {
            type: "string",
            example: "A serviço solicitada não foi encontrada.",
          },
        },
      },
      500: {
        description: "Erro interno",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Server Error" },
          message: { type: "string", example: "Erro interno no Servidor" },
        },
      },
    },
  },
};

const demandasPostSchema = {
  schema: {
    description: "Post de demandas, utilizado para cadastrar novas demandas",
    tags: ["Demandas"],

    body: {
      type: "object",
      required: ["patrimonio"],
      properties: {
        description: { type: "string" },
        patrimonio: { type: "string" },
        prioridade: { type: "integer" },
      },
    },

    response: {
      200: {
        description: "Cadastro feito com sucesso",
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Demanda cadastrada com sucesso.",
          },
        },
      },
      400: {
        description: "Erro no 400",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Bad Request" },
          message: { type: "string", example: "Bad Request" },
        },
      },
      401: {
        description: "Erro no 401",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Unauthorized" },
          message: {
            type: "string",
            example: "Você não está autorizado a acessar este serviço.",
          },
        },
      },
      404: {
        description: "Erro no 404",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Not Found" },
          message: {
            type: "string",
            example: "A serviço solicitada não foi encontrada.",
          },
        },
      },
      500: {
        description: "Erro interno",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Server Error" },
          message: { type: "string", example: "Erro interno no Servidor" },
        },
      },
    },
  },
};

const getUserDemandas = {
  schema: {
    description:
      "Obtém todas as demandas com o user como criador ou responsável",
    tags: ["Demandas"],

    response: {
      200: {
        description: "Requisição bem sucedida",
        type: "object",
        properties: {
          userDemandas: {
            type: "array",
            example: [
              {
                id: 3,
                patrimonio: "teste",
                description: "teste",
                prioridade: 2,
                status: 0,
                responsavel: null,
                createdAt: "2025-02-17T13:06:53.000Z",
                updatedAt: "2025-02-17T13:06:53.000Z",
                user: {
                  name: "kadoia",
                  ramal: "1234",
                  email: "kadoia",
                  setor_id: 1,
                },
                setor: {
                  name: "tecnologia",
                },
                responsavel_user: "kadoia",
              },
            ],
          },
        },
      },
      400: {
        description: "Erro no 400",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Bad Request" },
          message: { type: "string", example: "Bad Request" },
        },
      },
      401: {
        description: "Erro no 401",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Unauthorized" },
          message: {
            type: "string",
            example: "Você não está autorizado a acessar este serviço.",
          },
        },
      },
      404: {
        description: "Erro no 404",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Not Found" },
          message: {
            type: "string",
            example: "A serviço solicitada não foi encontrada.",
          },
        },
      },
      500: {
        description: "Erro interno",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Server Error" },
          message: { type: "string", example: "Erro interno no Servidor" },
        },
      },
    },
  },
};

const demandasDeleteSchema = {
  schema: {
    description: "Rota para exclusão de demandas (chamados), somente adm",
    tags: ["Demandas"],

    response: {
      200: {
        description: "demanda excluída com sucesso",
        properties: {
          message: {
            type: "string",
            message: "Demanda Excluída com sucesso",
          },
        },
      },
      400: {
        description: "Erro no 400",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Bad Request" },
          message: { type: "string", example: "Bad Request" },
        },
      },
      401: {
        description: "Erro no 401",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Unauthorized" },
          message: {
            type: "string",
            example: "Você não está autorizado a acessar este serviço.",
          },
        },
      },
      404: {
        description: "Erro no 404",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Not Found" },
          message: {
            type: "string",
            example: "A serviço solicitada não foi encontrada.",
          },
        },
      },
      500: {
        description: "Erro interno",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Server Error" },
          message: { type: "string", example: "Erro interno no Servidor" },
        },
      },
    },
  },
};

const assumirDemandasSchema = {
  schema: {
    description:
      "Rota para assumir a responsabilidade do atendimento de demandas.",
    tags: ["Demandas"],

    response: {
      200: {
        description: "Demanda assumida com sucesso",
        type: "object",
        properties: {
          message: { type: "string", message: "Demanda assumida com sucesso" },
        },
      },
      400: {
        description: "Erro no 400",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Bad Request" },
          message: { type: "string", example: "Bad Request" },
        },
      },
      401: {
        description: "Erro no 401",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Unauthorized" },
          message: {
            type: "string",
            example: "Você não está autorizado a acessar este serviço.",
          },
        },
      },
      404: {
        description: "Erro no 404",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Not Found" },
          message: {
            type: "string",
            example: "A serviço solicitada não foi encontrada.",
          },
        },
      },
      500: {
        description: "Erro interno",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Server Error" },
          message: { type: "string", example: "Erro interno no Servidor" },
        },
      },
    },
  },
};

const updateUserDemandas = {
  schema: {
    description:
      "atualiza as informações da demanda dependendo da role do usuário / adm pode editar tudo, tecnico somente",
    tags: ["Demandas"],

    body: {
      type: "object",
      required: ["patrimonio", "description", "prioridade", "status"],
      properties: {
        description: { type: "string" },
        patrimonio: { type: "string" },
        prioridade: { type: "integer" },
        status: { type: "integer" },
      },
    },
    response: {
      200: {
        description: "Demanda Atualizada com sucesso",
        type: "object",
        properties: {
          message: {
            type: "string",
            message: "Demanda Atualizada com sucesso",
          },
        },
      },
      400: {
        description: "Erro no 400",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Bad Request" },
          message: { type: "string", example: "Bad Request" },
        },
      },
      401: {
        description: "Erro no 401",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Unauthorized" },
          message: {
            type: "string",
            example: "Você não está autorizado a acessar este serviço.",
          },
        },
      },
      404: {
        description: "Erro no 404",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Not Found" },
          message: {
            type: "string",
            example: "A serviço solicitada não foi encontrada.",
          },
        },
      },
      500: {
        description: "Erro interno",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Server Error" },
          message: { type: "string", example: "Erro interno no Servidor" },
        },
      },
    },
  },
};

const finalizarDemandaSchema = {
  schema: {
    description: "Rota para finalizada chamado de demanda específica.",
    tags: ["Demandas"],

    response: {
      200: {
        description: "Demanda finalizada com sucesso",
        type: "object",
        properties: {
          message: {
            type: "string",
            message: "Demanda finalizada com sucesso",
          },
        },
      },
      400: {
        description: "Erro no 400",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Bad Request" },
          message: { type: "string", example: "Bad Request" },
        },
      },
      401: {
        description: "Erro no 401",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Unauthorized" },
          message: {
            type: "string",
            example: "Você não está autorizado a acessar este serviço.",
          },
        },
      },
      404: {
        description: "Erro no 404",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Not Found" },
          message: {
            type: "string",
            example: "A serviço solicitada não foi encontrada.",
          },
        },
      },
      500: {
        description: "Erro interno",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Server Error" },
          message: { type: "string", example: "Erro interno no Servidor" },
        },
      },
    },
  },
};

//arrumar daqui para baixo

const demandasGetHistory = {
  schema: {
    description:
      "Obtém todas as demandas finalizadas, caso seja admin ou tecnico, pega todas, caso contrário, somente as com o user como criador ou responsável",
    tags: ["Demandas"],

    response: {
      200: {
        description: "Requisição bem sucedida",
        type: "object",
        properties: {
          demandasHistory: {
            type: "array",
            example: [
              {
                id: 3,
                patrimonio: "teste",
                description: "teste",
                prioridade: 2,
                status: 3,
                responsavel: null,
                createdAt: "2025-02-17T13:06:53.000Z",
                updatedAt: "2025-02-17T13:06:53.000Z",
                user: {
                  name: "kadoia",
                  ramal: "1234",
                  email: "kadoia",
                  setor_id: 1,
                },
                setor: {
                  name: "tecnologia",
                },
                responsavel_user: null,
              },
            ],
          },
          scopo: {
            type: "string",
            example: "admin",
          },
        },
      },

      400: {
        description: "Erro no 400",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Bad Request" },
          message: { type: "string", example: "Bad Request" },
        },
      },
      401: {
        description: "Erro no 401",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Unauthorized" },
          message: {
            type: "string",
            example: "Você não está autorizado a acessar este serviço.",
          },
        },
      },
      404: {
        description: "Erro no 404",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Not Found" },
          message: {
            type: "string",
            example: "A serviço solicitada não foi encontrada.",
          },
        },
      },
      500: {
        description: "Erro interno",
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Server Error" },
          message: { type: "string", example: "Erro interno no Servidor" },
        },
      },
    },
  },
};

module.exports = {
  demandasGetSchema,
  demandasPostSchema,
  demandasDeleteSchema,
  assumirDemandasSchema,
  getUserDemandas,
  updateUserDemandas,
  demandasGetHistory,
  finalizarDemandaSchema,
};
