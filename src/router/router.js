const Router = (fastify) => {
  fastify.register(import("./userRouter.js"), { prefix: "/user" });
  fastify.register(import("./setorRouter.js"), { prefix: "/setor" });
  fastify.register(import("./serviceRouter.js"), { prefix: "/service" });
  fastify.register(import("./roleRouter.js"), { prefix: "/roles" });
  fastify.register(import("./ft/bolsistaRouter.js"), { prefix: "/ft/bolsista" });
  fastify.register(import("./ft/editalRouter.js"), { prefix: "/ft/edital" });
  fastify.register(import("./authenticateRouter.js"), { prefix: "/auth" });

  fastify.register(import("./reservas/reservasRouter.js"), { prefix: "/reservas" });
};
export default Router;
