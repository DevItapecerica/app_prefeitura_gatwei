import iptuRouter from "./iptu/iptuRouter.js";
import municipeRouter from "./iptu/municipeRouter.js";

const Router = (fastify) => {
  fastify.register(import("./userRouter.js"), { prefix: "/user" });
  fastify.register(import("./setorRouter.js"), { prefix: "/setor" });
  fastify.register(import("./serviceRouter.js"), { prefix: "/service" });
  fastify.register(import("./roleRouter.js"), { prefix: "/roles" });
  fastify.register(import("./bolsistaRouter.js"), { prefix: "/ft/bolsista" });
  fastify.register(import("./editalRouter.js"), { prefix: "/ft/edital" });
  fastify.register(import("./authenticateRouter.js"), { prefix: "/auth" });
  fastify.register(iptuRouter, { prefix: "/iptu" });
  fastify.register(municipeRouter, { prefix: "/iptu" });
};
export default Router;
