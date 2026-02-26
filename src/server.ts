// Fastify
import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import { PORT } from "./config/env.js";

import { swaggerConfig, swaggerUiConfig } from "./config/swaggerConfig.js";
import { corsConfig } from "./config/corsConfig.js";

// router
import Router from "./router/router.js";
import notFound from "./hooks/notFound.js";

// hook
import LoggerResponse from "./hooks/LoggerResponse.js";
import errorHook from "./hooks/errorHook.js";
import { rateLimitConfig } from "./plugins/rateLimit.js";

const port: number = Number(PORT);

const logg = { translateTime: "HH:MM:ss", ignore: "hostname" };

const fastify = Fastify({
  disableRequestLogging: true,
  logger: {
    level: "info",
    transport: {
      target: "pino-pretty",
      options: logg,
    },
  },
});

//decorator
fastify.decorateRequest('user', {
  id: '',
  name: '',
  role_id: ''
});


// plugins
fastify.register(cors, corsConfig);
fastify.register(fastifyCookie);
fastify.register(fastifySwagger, swaggerConfig(port));
fastify.register(fastifySwaggerUi, swaggerUiConfig);

fastify.register(rateLimitConfig);

// hooks
fastify.register(notFound);
fastify.register(errorHook);
fastify.register(LoggerResponse);

// rotas
fastify.register(Router, { prefix: "/api" });

// server
const start = async () => {
  try {
    await fastify.listen({ port, host: "0.0.0.0" });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
};

start();
