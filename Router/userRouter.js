const User = require("../controller/User/UserController");
const UserSchema = require("../schema/userSchema");
const auth = require("../middleware/authJWT");

const userRouter = async (fastify, options) => {
  // 📌 Users
  fastify.route({
    method: "GET",
    url: "/user",
    schema: UserSchema.getUserSchema,
    preHandler: [auth],
    handler: User.getAllUser,
  });

  fastify.route({
    method: "GET",
    url: "/user/:id",
    schema: UserSchema.getOneUserSchema,
    preHandler: [auth],
    handler: User.getOneUser,
  });

  fastify.route({
    method: "post",
    url: "/user",
    schema: UserSchema.postUserSchema,
    preHandler: [auth],
    handler: User.cadastrarUser,
  });

  fastify.route({
    method: "delete",
    url: "/user/:id",
    schema: UserSchema.deleteUserSchema,
    preHandler: [auth],
    handler: User.deletarUser,
  });

  fastify.route({
    method: "put",
    url: "/user/:id",
    schema: UserSchema.updateUserSchema,
    preHandler: [auth],
    handler: User.atualizarUser,
  });
};

module.exports = userRouter;
