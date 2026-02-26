import loginSchema from "../schema/loginSchema.js";
import authSchema from "../schema/authSchema.js";
import { authUser, AlterPass, Login } from "../controller/Auth/authUser.js";
import { authJWT } from "../middleware/authJWT.js";
import alterPasswordSchema from "../schema/alterPasswordSchema.js";
import { FastifyInstance, FastifyRequest } from "fastify";

const authenticateRouter = (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: "/login",
    schema: loginSchema,
    preHandler: fastify.rateLimit({
      keyGenerator: (request: FastifyRequest) => (request.body as { email: string, password: string })["email"],
    }),
    handler: Login,
  });

  fastify.route({
    method: "GET",
    url: "/",
    schema: authSchema,
    handler: authUser,
  });

  fastify.route({
    method: "put",
    url: "/alterpwd",
    schema: alterPasswordSchema,
    preHandler: authJWT,
    handler: AlterPass,
  });
};

export default authenticateRouter;
