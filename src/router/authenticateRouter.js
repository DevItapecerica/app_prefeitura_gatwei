import Login from "../controller/Auth/login.js";
import loginSchema from "../schema/loginSchema.js";
import authSchema from "../schema/authSchema.js";
import authUser from "../controller/Auth/authUser.js";

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
};

export default authenticateRouter;
