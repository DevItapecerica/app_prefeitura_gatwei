require("dotenv").config({ path: `${__dirname}/config/.env` });

const port = process.env.APPLICATION_PORT || 8006;

// fastify
const fastify = require("fastify")();
const cors = require("@fastify/cors");
const fastifySwagger = require("@fastify/swagger");
const fastifySwaggerUi = require("@fastify/swagger-ui");

// swagger
const {swaggerConfig, swaggerUiConfig} = require('./config/swaggerConfig');
const { corsConfig } = require("./config/corsConfig");

// hooks 
const { errorHook } = require("./hooks/errorHook");

// routes
const routes = require("./router/demandasRouter");

// plugins
fastify.register(cors, corsConfig);

fastify.register(fastifySwagger, swaggerConfig(port));
fastify.register(fastifySwaggerUi, swaggerUiConfig);

// hooks register
fastify.setErrorHandler((error, request, reply) => {
  ("----------------------------------------------------------");
  "Error: ", error;
  ("----------------------------------------------------------");
  errorHook(error, reply);
});

// routes register
fastify.register(routes);

// fastify instance
const start = async () => {
  try {
    fastify.listen({ port, host: "0.0.0.0" });
    console.log(`🚀 Aplicação rodando na porta ${port}`);
  } catch (error) {
    console.log(error);
  }
};

start();
