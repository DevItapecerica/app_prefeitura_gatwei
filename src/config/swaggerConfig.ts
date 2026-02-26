import { SwaggerOptions } from "@fastify/swagger";
import { FastifySwaggerUiConfigOptions, FastifySwaggerUiOptions } from "@fastify/swagger-ui";
import { FastifyRegisterOptions } from "fastify";

const swaggerConfig = (port: number): FastifyRegisterOptions<SwaggerOptions>=> {
  return {
    openapi: {
      openapi: "3.0.0",
      components: {
        securitySchemes: {
          APIKey: {
            type: "apiKey",
            in: "header",
            name: "x-api-key",
            description: "Use a chave de API no cabeçalho como 'x-api-key'",
          },
          JWTToken: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            description:
              "Use o JWT no cabeçalho como 'Authorization: Bearer <token>'",
          },
        },
      },
      info: {
        title: "Login Microservice API",
        description: "API principal de consumo de microserviços",
        version: "2.0.0",
      },
      servers: [
        {
          url: `http://localhost:${port}`,
          description: "localhost",
        },
        {
          url: `http://189.20.193.253:${port}`,
          description: "Development server",
        },
        {
          url: `http://189.20.193.252:${port}`,
          description: "Production server",
        },
      ],
    },
  };
};

const swaggerUiConfig: FastifyRegisterOptions<FastifySwaggerUiOptions> = {
  routePrefix: "/docs",
};

export { swaggerConfig, swaggerUiConfig };
