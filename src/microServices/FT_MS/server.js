require("dotenv").config({ path: `${__dirname}/config/.env` });

const port = process.env.APPLICATION_PORT || 8001;

// fastify
const fastify = require("fastify")();
const cors = require("@fastify/cors");
const fastifySwagger = require("@fastify/swagger");
const fastifySwaggerUi = require("@fastify/swagger-ui");

// swagger
const { swaggerConfig, swaggerUiConfig } = require("./config/swaggerConfig");
const { corsConfig } = require("./config/corsConfig");

// hooks
const { errorHook } = require("./hooks/errorHook");

// router
const ftRoutes = require("./router/ftRouter");
const uploadRouter = require("./router/uploadRouter");
const authRouter = require("./router/authRouter");

// plugins
fastify.register(cors, corsConfig);

fastify.register(require("@fastify/multipart"), {
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

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
fastify.register(ftRoutes, {
  prefix: "/ft/bolsista",
});
fastify.register(uploadRouter, {
  prefix: "/ft/img",
});
fastify.register(authRouter, {
  prefix: "/ft/auth",
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