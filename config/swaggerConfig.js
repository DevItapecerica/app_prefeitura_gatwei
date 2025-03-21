const config = {
  openapi: {
    openapi: "3.0.0",
    components: {
      securitySchemes: {
        JWTAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    info: {
      title: "Test swagger",
      description: "API principal de consumo de microserviços",
      version: "2.0.0",
    },
    servers: [
      {
        url: "http://192.168.16.13:8000",
        description: "Development server",
      },
      {
        url: "http://192.168.16.80:8000",
        description: "prodution server",
      },
    ],
  },
}

exports.module = config;