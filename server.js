const { PORT } = require("./src/config/env");

const port = PORT || 8000;

// fastify
const fastify = require("fastify")();
const cors = require("@fastify/cors");
const fastifyCookie = require("@fastify/cookie");
const fastifySwagger = require("@fastify/swagger");
const fastifySwaggerUi = require("@fastify/swagger-ui");

// swagger
const { swaggerConfig, swaggerUiConfig } = require("./src/config/swaggerConfig");
const { corsConfig } = require("./src/config/corsConfig");

// hooks
const { errorHook } = require("./src/hooks/errorHook");

// router
const userRouter = require("./src/router/userRouter");
const setorRouter = require("./src/router/setorRouter");
const serviceRouter = require("./src/router/serviceRouter");
const demandasRouter = require("./src/router/demandasRouter");
const roleRouter = require("./src/router/roleRouter")
const FTRouter = require("./src/router/FTRouter")
const authenticateRouter = require('./src/router/authenticateRouter')

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