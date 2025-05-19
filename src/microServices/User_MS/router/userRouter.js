const User = require("../controller/adminUserController");
const auth = require("../middleware/authKey");
const schema = require("../schema/userSchema")

async function userRouter(fastify, options) {
  fastify.route({
    method: "GET",
    url: "/user",
    preHandler: [auth],
    schema: schema.getUserSchema,
    handler: User.getAllUser,
  });

  fastify.route({
    method: "GET",
    url: "/user/:id",
    preHandler: [auth],
    schema: schema.getOneUserSchema,
    handler: User.getUser,
  });

  fastify.route({
    method: "post",
    url: "/user",
    preHandler: [auth],
    schema: schema.postUserSchema,
    handler: User.cadastrarUser,
  });

  fastify.route({
    method: "delete",
    url: "/user/:id",
    preHandler: [auth],
    schema: schema.deleteUserSchema,
    handler: User.deletarUser,
  });

  fastify.route({
    method: "PUT",
    url: "/user/:id",
    preHandler: [auth],
    schema: schema.updateUserSchema,
    handler: User.atualizarUser,
  });

  fastify.route({
    method: "delete",
    url: "/user/setor/:id",
    preHandler: [auth],
    schema: schema.deleteUserSchema,
    handler: User.deletarUserSetor,
  });
}

module.exports = userRouter;
