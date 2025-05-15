require('dotenv').config({path: `${__dirname}/config/.env`});
const port = process.env.APPLICATION_PORT || 8000;

// fastify
const fastify = require("fastify")();
const cors = require("@fastify/cors");
const fastifyCookie = require("@fastify/cookie");
const fastifySwagger = require("@fastify/swagger");
const fastifySwaggerUi = require("@fastify/swagger-ui");

// swagger
const { swaggerConfig, swaggerUiConfig } = require("./config/swaggerConfig");
const { corsConfig } = require("./config/corsConfig");

// hooks
const { errorHook } = require("./hooks/errorHook");

// router
const userRouter = require("./router/userRouter");
const setorRouter = require("./router/setorRouter");
const serviceRouter = require("./router/serviceRouter");
const demandasRouter = require("./router/demandasRouter");
const roleRouter = require("./router/roleRouter")
const FTRouter = require("./router/FTRouter")
const authenticateRouter = require('./router/authenticateRouter')

// plugins
fastify.register(cors, corsConfig);

fastify.register(fastifyCookie);

fastify.register(fastifySwagger, swaggerConfig(port));
fastify.register(fastifySwaggerUi, swaggerUiConfig);

// hooks register
fastify.setErrorHandler((error, request, reply) => {
  console.log("----------------------------------------------------------");
  console.log("error: " + error)
  console.log("----------------------------------------------------------");
  errorHook(error, reply);
});

// routes register
fastify.register(userRouter, {
  prefix: "/user",
});
fastify.register(setorRouter, {
  prefix: "/setor",
});
fastify.register(serviceRouter, {
  prefix: "/service",
});
fastify.register(demandasRouter, {
  prefix: "/demandas",
});
fastify.register(roleRouter, {
  prefix: "/roles",
});
fastify.register(FTRouter, {
  prefix: "/ft",
});
fastify.register(authenticateRouter, {
  prefix: "/auth",
});

// fastify instance
const start = async () => {
  try {
    await fastify.listen({ port, host: "0.0.0.0" });
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
};

start();