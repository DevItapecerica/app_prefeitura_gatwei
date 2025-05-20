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
        },
      },
      info: {
        title: "Services Microservice API",
        description: "API principal para o gerenciamento de serviços",
        version: "2.0.0",
      },
      servers: [
        {
          url: `http://192.168.16.13:${port}`,
          description: "Development server",
        },
        {
          url: `http://192.168.16.80:${port}`,
          description: "prodution server",
        },
      ],
    },
  };
};

const swaggerUiConfig = {
  routePrefix: "/docs",
  exposeRoute: true,
};

module.exports = { swaggerConfig, swaggerUiConfig };
