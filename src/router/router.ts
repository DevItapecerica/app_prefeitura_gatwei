import { FastifyInstance } from "fastify";

const Router = (fastify: FastifyInstance) => {
  fastify.register(import("./userRouter.js"), { prefix: "/user" });
  fastify.register(import("./setorRouter.js"), { prefix: "/setor" });
  fastify.register(import("./serviceRouter.js"), { prefix: "/service" });
  fastify.register(import("./roleRouter.js"), { prefix: "/roles" });
  fastify.register(import("./FT/bolsistaRouter.js"), { prefix: "/ft/bolsista" });
  fastify.register(import("./FT/editalRouter.js"), { prefix: "/ft/edital" });
  fastify.register(import("./authenticateRouter.js"), { prefix: "/auth" });

  fastify.register(import("./reservas/reservasRouter.js"), { prefix: "/reservas" });
};
export default Router;
