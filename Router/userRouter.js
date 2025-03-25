const User = require("../controller/User/UserController");
const UserSchema = require("../schema/userSchema");
const auth = require("../middleware/authJWT");

const userRouter = async (fastify, options) => {
  // 📌 Users
  // fastify.get("/user", UserSchema.getUserSchema, User.getAllUser);
  fastify.route({
    method: "GET",
    url: "/user",
    Schema: UserSchema.getUserSchema,
    preHandler: [auth],
    handler: User.getAllUser,
  });

  // fastify.get("/user/:id", UserSchema.getOneUserSchema, User.getOneUser);
  fastify.route({
    method: "GET",
    url: "/user/:id",
    Schema: UserSchema.getOneUserSchema,
    preHandler: [auth],
    handler: User.getOneUser,
  });

  // fastify.post("/user", User.cadastrarUser);
  fastify.route({
    method: "post",
    url: "/user",
    Schema: UserSchema.postUserSchema,
    preHandler: [auth],
    handler: User.cadastrarUser,
  });

  // fastify.delete("/user/:id", UserSchema.deleteUserSchema, User.deletarUser);
  fastify.route({
    method: "delete",
    url: "/user/:id",
    Schema: UserSchema.deleteUserSchema,
    preHandler: [auth],
    handler: User.deletarUser,
  });

  // fastify.put("/user/:id", userSchema.updateUserSchema, User.atualizarUser);
  fastify.route({
    method: "put",
    url: "/user/:id",
    Schema: UserSchema.updateUserSchema,
    preHandler: [auth],
    handler: User.atualizarUser,
  });
};

module.exports = userRouter;
