import { authJWT } from "../../middleware/authJWT.js";

const ResevasRouter = (fastify) => {
  fastify.addHook("preHandler", authJWT);

  // fastify.register(import("./reservasRouter.js"), { prefix: "/reservas" });
  fastify.register(import("./motoristaRouter.js"), { prefix: "/motorista" });
  // fastify.register(import("./veiculoRouter.js"), { prefix: "/veiculo" });
};

export default ResevasRouter;
