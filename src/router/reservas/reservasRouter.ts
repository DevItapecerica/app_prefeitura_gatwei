import { FastifyInstance } from "fastify";
import { authJWT } from "../../middleware/authJWT.js";

const ResevasRouter = (fastify: FastifyInstance) => {
  fastify.addHook("preHandler", authJWT);

  fastify.register(import("./agendaRouter.js"), { prefix: "/agendamento" });
  fastify.register(import("./motoristaRouter.js"), { prefix: "/motorista" });
  fastify.register(import("./veiculoRouter.js"), { prefix: "/veiculo" });
};

export default ResevasRouter;
