import fastify from "fastify";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyMultipart from "@fastify/multipart";

import { PORT } from "./src/config/env.js";
import { swaggerConfig, swaggerUiConfig } from "./src/config/swaggerConfig.js";
import corsConfig from "./src/config/corsConfig.js";
import errorHook from "./src/hooks/errorHook.js";

import {routes as ftRoutes} from "./src/router/ftRouter.js";
import uploadRouter from "./src/router/uploadRouter.js";
import authRouter from "./src/router/authRouter.js";

const port = PORT || 8001;

const app = fastify();

// Plugins
await app.register(cors, corsConfig);

await app.register(fastifyMultipart, {
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

await app.register(fastifySwagger, swaggerConfig(port));
await app.register(fastifySwaggerUi, swaggerUiConfig);

// Hooks
app.setErrorHandler((error, request, reply) => {
  console.log("----------------------------------------------------------");
  console.log("error:", error);
  console.log("----------------------------------------------------------");
  errorHook(error, reply);
});

// Rotas
await app.register(ftRoutes, { prefix: "/ft/bolsista" });
await app.register(uploadRouter, { prefix: "/ft/img" });
await app.register(authRouter, { prefix: "/ft/auth" });

// Start server
const start = async () => {
  try {
    await app.listen({ port, host: "0.0.0.0" });
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
};

start();
