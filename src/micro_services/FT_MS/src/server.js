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
import "./services/schedular/editalVerify.js";

// routers
import router from "./router/router.js";

// outros
import "./db/model/associations.js";

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

// Plugins
fastify.register(cors, corsConfig);

fastify.register(fastifyMultipart, {
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

fastify.register(fastifySwagger, swaggerConfig(port));
fastify.register(fastifySwaggerUi, swaggerUiConfig);

// Hooks
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
  fastify.log.error("Error details:", error);

  // Formata resposta de erro de forma padronizada
  var errorResponse = {};

  // Se for erro de validação, adiciona detalhes
  if (validation) {
    code = 400;
    errorResponse = {
      ok: false,
      validation: validation,
      message: "Confira o corpo da requisição e tente novamente",
      api: api || "ft_app",
    };
  } else {
    if (typeof code === "string") code = 500;
    errorResponse = {
      ok: ok || false,
      validation: false,
      message: message || "Internal Server Error",
      api: api || "ft_app",
    };
  }

  // Envia resposta com o código de status apropriado
  reply
    .code(code || 500)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(errorResponse);
});

// Rotas
fastify.register(router, { prefix: "/ft" });

// Start server
const start = async () => {
  try {
    fastify.listen({ port, host: "0.0.0.0" });
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
};

start();
