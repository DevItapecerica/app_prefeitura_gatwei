import { IptuMunicipeController } from "../../controller/iptu/iptuMunicipeController.js";
import errorResponseSchema from "../../schema/errorSchema.js";


const MunicipeResponse = {
  type: "object",
  properties: {
    uuid: { type: "string", example: "uuid" },
    name: { type: "string", example: "João" },
    cpf: { type: "string", example: "12345678900" },
    email: { type: "string", example: "email@dominio.com.br" },
    certs: {
      type: "array",
      items: {
        type: "object",
        properties: {
          uuid: { type: "string" },
          name: { type: "string" },
          archive: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
        },
        example: [],
      },
    },
  },
};

const municipeRouter = (fastify) => {
  fastify.route({
    method: "POST",
    url: "/municipe/login",
    schema: {
      security: [{ APIKey: [] }],
      tags: ["IPTU"],
      description: "Get a municipe cert by login",
      summary: "Login municipe",
        body: {
          type: "object",
          required: ["cpf", "password"],
          properties: {
            cpf: {
              type: "string",
              pattern: "^[0-9]{11}$",
            },
            password: {
              type: "string",
            },
          },
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
    handler: IptuMunicipeController.loginMunicipe,
  });
};

export default municipeRouter;