import { IptuCertController } from "../../controller/iptu/iptuCertController.js";
import { IptuMunicipeController } from "../../controller/iptu/iptuMunicipeController.js";
import { authJWT } from "../../middleware/authJWT.js";
import errorResponseSchema from "../../schema/errorSchema.js";

const MunicipeProperties = {
  type: "object",
  required: ["municipe"],
  additionalProperties: false,
  properties: {
    municipe: {
      type: "object",
      required: ["name", "cpf", "email"],
      properties: {
        name: { type: "string" },
        cpf: { type: "string" },
        email: { type: "string" },
      },
    },
  },
};

const MunicipeResponse = {
  type: "object",
  properties: {
    uuid: { type: "string", example: "uuid" },
    name: { type: "string", example: "João" },
    cpf: { type: "string", example: "12345678900" },
    email: { type: "string", example: "email@dominio.com.br" },
    password: { type: "string", example: "sua senha aqui" },
    certs: {
      type: "array",
      items: {
        type: "object",
        properties: {
          uuid: { type: "string" },
          name: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
        },
        example: [],
      },
    },
  },
};

const iptuRouter = (fastify, opt) => {
  fastify.addHook("preHandler", authJWT);

  fastify.route({
    method: "GET",
    url: "/cert",
    handler: IptuCertController.getCertidao,
  });

  fastify.route({
    method: "GET",
    url: "/cert/:uuid",
    handler: IptuCertController.getCertidaoById,
  });

  fastify.route({
    method: "POST",
    url: "/cert",
    handler: IptuCertController.postCertidao,
  });

  fastify.route({
    method: "DELETE",
    url: "/cert/:uuid",
    handler: IptuCertController.deleteCertidao,
  });

  // fastify.update({
  //     method: "PUT",
  //     url: "/cert/:id",
  //     handler: IptuCertController.updateCertidao,
  // });

  fastify.route({
    method: "GET",
    url: "/municipe",
    schema: {
      tags: ["IPTU"],
      security: [{ JWTToken: [] }],
      description: "Get municipe BY UUID and filter by name and cpf",
      summary: "Get municipe",
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string", example: "Sucess" },
            count: { type: "number" },
            municipe: {
              type: "array",
              items: MunicipeResponse,
            },
          },
        },
        ...errorResponseSchema,
      },
    },
    handler: IptuMunicipeController.getMunicipe,
  });

  fastify.route({
    method: "POST",
    url: "/municipe",
    schema: {
      tags: ["IPTU"],
      security: [{ JWTToken: [] }],
      description: "Create municipe",
      summary: "Create municipe",
      body: MunicipeProperties,
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string", example: "Sucess" },
            municipe: MunicipeResponse,
          },
        },
        ...errorResponseSchema,
      },
    },
    handler: IptuMunicipeController.createMunicipe,
  });

  fastify.route({
    method: "PUT",
    url: "/municipe/:uuid",
    schema: {
      params: {
        type: "object",
        required: ["uuid"],
        properties: {
          uuid: { type: "string" },
        },
      },
      tags: ["IPTU"],
      security: [{ JWTToken: [] }],
      description: "Update municipe BY UUID",
      summary: "Get municipe",
      body: MunicipeProperties,
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string", example: "Sucess" },
            municipe: MunicipeResponse,
          },
        },
        ...errorResponseSchema,
      },
    },
    handler: IptuMunicipeController.updateMunicipe,
  });

  fastify.route({
    method: "DELETE",
    url: "/municipe/:uuid",
    schema: {
      security: [{ APIKey: [] }],
      tags: ["IPTU"],
      description: "Delete municipe",
      summary: "Delete municipe",
      params: {
        type: "object",
        properties: {
          uuid: { type: "string" },
        },
        required: ["uuid"],
      },
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string", example: "Sucess" },
            municipe: MunicipeResponse,
          },
        },
        ...errorResponseSchema,
      },
    },
    handler: IptuMunicipeController.deleteMunicipe,
  });
};

export default iptuRouter;
