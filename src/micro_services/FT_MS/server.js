// fastify
import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyMultipart from "@fastify/multipart";

// plugins
import loggerPlugin from "./plugins/logger.js";
import { PORT } from "./src/config/env.js";
import { swaggerConfig, swaggerUiConfig } from "./src/config/swaggerConfig.js";
import corsConfig from "./src/config/corsConfig.js";
import errorHook from "./src/hooks/errorHook.js";
import './src/services/schedular/editalVerify.js'

// routers
import bolsistaRouter from "./src/router/bolsistasRouter.js";
import uploadRouter from "./src/router/uploadRouter.js";
import authRouter from "./src/router/authRouter.js";
import editalRouter from "./src/router/editalRouter.js";

// outros
import "./src/db/model/associations.js";

const port = PORT || 8001;

const fastify = Fastify();

// Plugins
await fastify.register(loggerPlugin);
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
  console.log("----------------------------------------------------------");
  console.log("error:", error);
  console.log("----------------------------------------------------------");
  errorHook(error, reply);
});

// Rotas
await fastify.register(bolsistaRouter, { prefix: "/ft/bolsista" });
await fastify.register(uploadRouter, { prefix: "/ft/img" });
await fastify.register(authRouter, { prefix: "/ft/auth" });
await fastify.register(editalRouter, { prefix: "/ft/edital" });

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
