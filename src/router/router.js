import iptuRouter from "./iptu/iptuRouter.js";
import municipeRouter from "./iptu/municipeRouter.js";
import bolsistaRouter from "./ft/bolsistaRouter.js";
import editalRouter from "./ft/editalRouter.js";

const Router = (fastify) => {
  fastify.register(import("./userRouter.js"), { prefix: "/user" });
  fastify.register(import("./setorRouter.js"), { prefix: "/setor" });
  fastify.register(import("./serviceRouter.js"), { prefix: "/service" });
  fastify.register(import("./roleRouter.js"), { prefix: "/roles" });
  fastify.register(bolsistaRouter, { prefix: "/ft/bolsista" });
  fastify.register(editalRouter, { prefix: "/ft/edital" });
  fastify.register(import("./authenticateRouter.js"), { prefix: "/auth" });
  fastify.register(iptuRouter, { prefix: "/iptu" });
  fastify.register(municipeRouter, { prefix: "/iptu" });
};
export default Router;
