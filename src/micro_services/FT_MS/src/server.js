// fastify
import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyMultipart from "@fastify/multipart";

// Porta
import { PORT } from "./config/env.js";

// plugins
import { swaggerConfig, swaggerUiConfig } from "./config/swaggerConfig.js";
import corsConfig from "./config/corsConfig.js";
import errorHook from "./hooks/errorHook.js";
import "./services/schedular/editalVerify.js";

// routers
import router from "./router/router.js";

// outros
import "./db/model/associations.js";

const port = PORT;

const fastify = Fastify({
  logger: {
    level: "info",
    file: "logs/server.log", // Will use pino.destination()
  },
});

// Plugins
await fastify.register(cors, corsConfig);

await fastify.register(fastifyMultipart, {
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

await fastify.register(fastifySwagger, swaggerConfig(port));
await fastify.register(fastifySwaggerUi, swaggerUiConfig);

// Hooks
fastify.setErrorHandler((error, request, reply) => {
  errorHook(error, reply);
});

// Rotas
fastify.register(router, { prefix: "/ft" });

// Start server
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
