import UserController from "../controller/User/UserController.js";
import * as UserSchema from "../schema/userSchema.js";
import {authJWT} from "../middleware/authJWT.js";
import { FastifyInstance } from "fastify";

const userRouter = async (fastify: FastifyInstance) => {
  fastify.addHook("preHandler", authJWT);

  fastify.route({
    method: "GET",
    url: "/",
    schema: UserSchema.getUserSchema,
    handler: UserController.getAllUser,
  });

  fastify.route({
    method: "GET",
    url: "/:id",
    schema: UserSchema.getOneUserSchema,
    handler: UserController.getOneUser,
  });

  fastify.route({
    method: "POST",
    url: "/",
    schema: UserSchema.postUserSchema,
    handler: UserController.cadastrarUser,
  });

  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: UserSchema.deleteUserSchema,
    handler: UserController.deletarUser,
  });

  fastify.route({
    method: "PUT",
    url: "/:id",
    schema: UserSchema.updateUserSchema,
    handler: UserController.atualizarUser,
  });
};

export default userRouter;
