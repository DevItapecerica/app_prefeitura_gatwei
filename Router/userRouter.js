const User = require("../controller/AdminUser/adminUserController");
const UserSchema = require("../schemas/User/userSchema");
const auth = require("../middleware/authJWT");

const userRouter = async (fastify, options) => {
  // 📌 Users
  // fastify.get("/user", UserSchema.getUserSchema, User.getAllUser);
  fastify.route({
    method: "GET",
    url: "/user",
    preHandler: [auth],
    handler: User.getAllUser,
  });

  // fastify.get("/user/:id", UserSchema.getOneUserSchema, User.getOneUser);
  fastify.route({
    method: "GET",
    url: "/user/:id",
    preHandler: [auth],
    handler: User.getOneUser,
  });

  // fastify.post("/user", User.cadastrarUser);
  fastify.route({
    method: "post",
    url: "/user",
    preHandler: [auth],
    handler: User.cadastrarUser,
  });

  // fastify.delete("/user/:id", UserSchema.deleteUserSchema, User.deletarUser);
  fastify.route({
    method: "delete",
    url: "/user/:id",
    preHandler: [auth],
    handler: User.deletarUser,
  });

  // fastify.put("/user/:id", userSchema.updateUserSchema, User.atualizarUser);
  fastify.route({
    method: "put",
    url: "/user/:id",
    preHandler: [auth],
    handler: User.atualizarUser,
  });
};

module.exports = userRouter;
