import loginSchema from "../schema/loginSchema.js";
import authSchema from "../schema/authSchema.js";
import { authUser, AlterPass, Login } from "../controller/Auth/authUser.js";
import { authJWT } from "../middleware/authJWT.js";
import alterPasswordSchema from "../schema/alterPasswordSchema.js";

const authenticateRouter = (fastify, options) => {
  fastify.route({
    method: "POST",
    url: "/login",
    schema: loginSchema,
    preHandler: fastify.rateLimit({
      keyGenerator: (request) => request.body["email"],
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
