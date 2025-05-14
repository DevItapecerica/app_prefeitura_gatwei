const fastify = require("fastify");
const fastifyCors = require("@fastify/cors");
const fastifyCookie = require("@fastify/cookie");

const fastifySwagger = require("@fastify/swagger");
const fastifySwaggerUi = require("@fastify/swagger-ui");
const SwaggerOptions = require("./config/swaggerConfig");
require('dotenv').config({path: `${__dirname}/config/.env`});

const userRouter = require("./Router/userRouter");
const setorRouter = require("./Router/setorRouter");
const serviceRouter = require("./Router/serviceRouter");
const demandasRouter = require("./Router/demandasRouter");
const roleRouter = require("./Router/roleRouter")
const FTRouter = require("./Router/FTRouter")
const authenticateRouter = require('./Router/authenticateRouter')

const app = fastify();
const port = process.env.APPLICATION_PORT || 8000;


app.register(fastifyCors, {
  origin: true, // Specific allowed origin
  credentials: true, // Permite cookies e cabeçalhos de autenticação
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"], // Métodos permitidos
});

app.register(fastifyCookie);

app.register(fastifySwagger, SwaggerOptions.swaggerConfig(port));

app.register(fastifySwaggerUi, SwaggerOptions.swaggerUiConfig);

// Usando o hook onError para tratamento global de erros
app.setErrorHandler((error, request, reply) => {


  console.log("--------------------------------------------------")
  console.log(error)
  console.log("--------------------------------------------------")
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
        error: "Unauthorized",
        message: "Unauthorized " + messageError,
      });
      break;
    case 403:
      reply.status(statusCode).send({
        statusCode: statusCode,
        error: "Forbiten",
        message: "Ação não permitida " + messageError,
      });
      break;
    case 404:
      reply.status(statusCode).send({
        statusCode: statusCode,
        error: "Not found",
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

app.register(userRouter, {
  prefix: "/user",
});
app.register(setorRouter, {
  prefix: "/setor",
});
app.register(serviceRouter, {
  prefix: "/service",
});
app.register(demandasRouter, {
  prefix: "/demandas",
});
app.register(roleRouter, {
  prefix: "/roles",
});
app.register(FTRouter, {
  prefix: "/ft",
});
app.register(authenticateRouter, {
  prefix: "/auth",
});

const start = () => {
  try {
    app.listen({ port, host: "0.0.0.0" });
    console.log(`🚀 Aplicação rodando na porta ${port}`);
  } catch (error) {
    console.log(error);
  }
};

start();
