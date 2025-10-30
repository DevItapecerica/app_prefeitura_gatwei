// Fastify
import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import { NODE_ENV, PORT } from "./config/env.js";

import { swaggerConfig, swaggerUiConfig } from "./config/swaggerConfig.js";
import { corsConfig } from "./config/corsConfig.js";

// router
import Router from "./router/router.js";
import notFound from "./hooks/notFound.js";

// hook
import LoggerResponse from "./hooks/LoggerResponse.js";
import errorHook from "./hooks/errorHook.js";

const port = PORT;

const logg =
  NODE_ENV === "prod"
    ? {
        translateTime: "HH:MM:ss",
        ignore: "hostname",
        colorize: false,
        destination: "logs/server.log",
        mkdir: true,
      }
    : { translateTime: "HH:MM:ss", ignore: "hostname" };

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

// plugins
fastify.register(cors, corsConfig);
fastify.register(fastifyCookie);
fastify.register(fastifySwagger, swaggerConfig(port));
fastify.register(fastifySwaggerUi, swaggerUiConfig);

fastify.register(import("@fastify/rate-limit"), {
  global: false,
  max: 5,
  timeWindow: 300 * 1000, // 5 minutes
  keyGenerator: (request) => request.headers["x-real-ip"] || request.ip,
  errorResponseBuilder: function (req, context) {
    return {
      statusCode: 429,
      message: `Too many requests. Try again into ${context.after}.`,
      validation: false,
      ok: false,
      api: "Gatwei",
    };
  },
});

// hooks
fastify.register(notFound);
fastify.register(errorHook)
fastify.register(LoggerResponse)

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
