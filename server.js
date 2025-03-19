const fastify = require("fastify");
const fastifyCors = require("@fastify/cors");
const fastifyCookie = require("@fastify/cookie");

const fastifySwagger = require("@fastify/swagger");
const fastifySwaggerUi = require("@fastify/swagger-ui");

const router = require("./Router/Router");

const app = fastify();

app.register(fastifyCors, {
  origin: true, // Specific allowed origin
  credentials: true, // Permite cookies e cabeçalhos de autenticação
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"], // Métodos permitidos
});

app.register(fastifyCookie);

app.register(fastifySwagger, {
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
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
  exposeRoute: true,
});

// Usando o hook onError para tratamento global de erros
app.setErrorHandler((error, request, reply) => {

  console.log(error)
  const statusCode = error?.status || 500;

  let messageError =
    error?.response?.data.message || error?.message || "Erro desconhecido";
  switch (statusCode) {
    case 400:
      reply.status(statusCode).send({
        statusCode: statusCode,
        error: "Server Error",
        message: "Bad Request " + messageError,
      });
      break;
    case 401:
      reply.status(statusCode).send({
        statusCode: statusCode,
        error: "Server Error",
        message: "Unauthorized " + messageError,
      });
      break;
    case 403:
      reply.status(statusCode).send({
        statusCode: statusCode,
        error: "Server Error",
        message: "Ação não permitida " + messageError,
      });
      break;
    case 404:
      reply.status(statusCode).send({
        statusCode: statusCode,
        error: "Server Error",
        message: "Not found " + messageError,
      });
      break;
    case 500:
      reply.status(statusCode).send({
        statusCode: statusCode,
        error: "Server Error",
        message: "Internal server error " + messageError,
      });
      break;
    default:
      reply.status(statusCode).send({
        statusCode: statusCode,
        error: "Server Error",
        message: "Internal server error " + messageError,
      });
  }
});

app.register(router);

const port = 8000;

const start = () => {
  try {
    app.listen({ port, host: "0.0.0.0" });
    console.log(`🚀 Aplicação rodando na porta ${port}`);
  } catch (error) {
    console.log(error);
  }
};

start();
