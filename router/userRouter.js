const User = require("../controller/User/UserController");
const UserSchema = require("../src/schema/userSchema");
const auth = require("../middleware/authJWT");

const userRouter = async (fastify, options) => {
fastify.addHook("preHandler",auth);

  fastify.route({
    method: "GET",
    url: "/",
    schema: UserSchema.getUserSchema,
    handler: User.getAllUser,
  });

  fastify.route({
    method: "GET",
    url: "/:id",
    schema: UserSchema.getOneUserSchema,
    handler: User.getOneUser,
  });

  fastify.route({
    method: "post",
    url: "/",
    schema: UserSchema.postUserSchema,
    handler: User.cadastrarUser,
  });

  fastify.route({
    method: "delete",
    url: "/:id",
    schema: UserSchema.deleteUserSchema,
    handler: User.deletarUser,
  });

  fastify.route({
    method: "put",
    url: "/:id",
    schema: UserSchema.updateUserSchema,
    handler: User.atualizarUser,
  });
};

module.exports = userRouter;
