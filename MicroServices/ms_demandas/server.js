const fastify = require("fastify");
const cors = require("@fastify/cors");
const fastifySwagger = require("@fastify/swagger");
const fastifySwaggerUi = require("@fastify/swagger-ui");
require('dotenv').config({path: `${__dirname}/config/.env`});

const {swaggerConfig, swaggerUiConfig} = require('./config/swaggerConfig');
const { corsConfig } = require("./config/corsConfig");

const routes = require("./router/demandasRouter");

const port = process.env.APPLICATION_PORT || 8006;

const app = fastify();

app.register(cors, corsConfig);

app.register(fastifySwagger, swaggerConfig(port));
app.register(fastifySwaggerUi, swaggerUiConfig);


// Usando o hook onError para tratamento global de erros
app.setErrorHandler((error, request, reply) => {
  console.log("--------------------------------------------------")
  console.log(error)
  console.log("--------------------------------------------------")
  const statusCode = error.status || error.statusCode || 500;
  let messageError =
    error.response?.data.message || error.name || error.message || "Erro desconhecido";
  // Verifica o tipo de erro e responde com o status adequado
  
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
        message: "Forbidden " + messageError,
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

app.register(routes);


const start = () => {
  try {
    app.listen({ port, host: "0.0.0.0" });
    console.log(`🚀 Aplicação rodando na porta ${port}`);
  } catch (error) {
    console.log(error);
  }
};

start();
