const User = require("../controller/User/UserController");
const UserSchema = require("../schema/userSchema");
const auth = require("../middleware/authJWT");

const userRouter = async (fastify, options) => {
fastify.addHook("preHandler",auth);

  fastify.route({
    method: "GET",
    url: "/user",
    schema: UserSchema.getUserSchema,
    handler: User.getAllUser,
  });

  fastify.route({
    method: "GET",
    url: "/user/:id",
    schema: UserSchema.getOneUserSchema,
    handler: User.getOneUser,
  });

  fastify.route({
    method: "post",
    url: "/user",
    schema: UserSchema.postUserSchema,
    handler: User.cadastrarUser,
  });

  fastify.route({
    method: "delete",
    url: "/user/:id",
    schema: UserSchema.deleteUserSchema,
    handler: User.deletarUser,
  });

  fastify.route({
    method: "put",
    url: "/user/:id",
    schema: UserSchema.updateUserSchema,
    handler: User.atualizarUser,
  });
};

module.exports = userRouter;
