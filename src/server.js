// Fastify
import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import rateLimit from "@fastify/rate-limit";

import { PORT } from "./config/env.js";

import { swaggerConfig, swaggerUiConfig } from "./config/swaggerConfig.js";
import { corsConfig } from "./config/corsConfig.js";
import { errorHook } from "./hooks/errorHook.js";

// router
import Router from "./router/router.js";
import notFound from "./hooks/notFound.js";

const port = PORT;

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss",
        ignore: "hostname",
        colorize: false,
        destination: "logs/server.log",
        mkdir: true,
      },
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
      ok: false,
      api: "Gatwei",
    };
  },
});

// rotas
fastify.register(Router, { prefix: "/api" });

// hooks
fastify.register(notFound);
fastify.setErrorHandler((error, request, reply) => {
  // Obtém o código de status ou define como 500 por padrão
  var { code, message, ok, api, validation = false } = error;

  // Loga o erro em ambiente de desenvolvimento
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "dev"
  ) {
    console.log("Error details:", error);
  }

  // Formata resposta de erro de forma padronizada
  var errorResponse = {};

  // Se for erro de validação, adiciona detalhes
  if (validation) {
    code = 400;
    errorResponse = {
      ok: false,
      validation: validation,
      message: "Confira o corpo da requisição e tente novamente",
      api: api || "Gatwei",
    };
  } else {
    errorResponse = {
      ok: ok || false,
      validation: false,
      message: message || "Internal Server Error",
      api: api || "Gatwei",
    };
  }

  fastify.log.warn(`Error details: `);
  fastify.log.error(errorResponse);

  // Envia resposta com o código de status apropriado
  reply
    .code(code || 500)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(errorResponse);
});

// server
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
