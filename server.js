// Fastify
import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

// pluggins
import loggerPlugin from "./plugins/logger.js";
import { PORT } from "./src/config/env.js";
import { swaggerConfig, swaggerUiConfig } from "./src/config/swaggerConfig.js";
import { corsConfig } from "./src/config/corsConfig.js";
import { errorHook } from "./src/hooks/errorHook.js";

// router
import userRouter from "./src/router/userRouter.js";
import setorRouter from "./src/router/setorRouter.js";
import serviceRouter from "./src/router/serviceRouter.js";
// import demandasRouter from './src/router/demandasRouter.js';
import roleRouter from "./src/router/roleRouter.js";
import bolsistaRouter from "./src/router/bolsistaRouter.js";
import editalRouter from "./src/router/editalRouter.js";
import authenticateRouter from "./src/router/authenticateRouter.js";

const port = PORT || 8000;
const fastify = Fastify();

// plugins
await fastify.register(loggerPlugin);
await fastify.register(cors, corsConfig);
await fastify.register(fastifyCookie);
await fastify.register(fastifySwagger, swaggerConfig(port));
await fastify.register(fastifySwaggerUi, swaggerUiConfig);

// hooks
fastify.setErrorHandler((error, request, reply) => {
  console.log("----------------------------------------------------------");
  console.log("error: " + error);
  console.log("----------------------------------------------------------");
  errorHook(error, reply);
});

// rotas
fastify.register(userRouter, { prefix: "/user" });
fastify.register(setorRouter, { prefix: "/setor" });
fastify.register(serviceRouter, { prefix: "/service" });
// fastify.register(demandasRouter, { prefix: "/demandas" });
fastify.register(roleRouter, { prefix: "/roles" });
fastify.register(bolsistaRouter, { prefix: "/ft/bolsista" });
fastify.register(editalRouter, { prefix: "/ft/edital" });
fastify.register(authenticateRouter, { prefix: "/auth" });

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
