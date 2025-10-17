const swaggerConfig = (port) => {
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

const swaggerUiConfig = {
  routePrefix: "/docs",
  exposeRoute: true,
};

export { swaggerConfig, swaggerUiConfig };
