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
    level: "info",
    file: "./logs/server.log",
    serializers: {
      res(res) {
        // The default
        return {
          statusCode: res.statusCode,
        };
      },
      req(req) {
        return {
          method: req.method,
          url: req.url,
          parameters: req.params,
          body: req.body,
        };
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
fastify.register(errorHook);

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
