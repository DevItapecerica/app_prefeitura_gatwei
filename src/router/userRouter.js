import * as User from "../controller/User/UserController.js";
import * as UserSchema from "../schema/userSchema.js";
import {authJWT} from "../middleware/authJWT.js";

const userRouter = async (fastify, options) => {
  fastify.addHook("preHandler", authJWT);

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
    method: "POST",
    url: "/",
    schema: UserSchema.postUserSchema,
    handler: User.cadastrarUser,
  });

  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: UserSchema.deleteUserSchema,
    handler: User.deletarUser,
  });

  fastify.route({
    method: "PUT",
    url: "/:id",
    schema: UserSchema.updateUserSchema,
    handler: User.atualizarUser,
  });
};

export default userRouter;
