import getRandomToken from "../controller/authController.js";
import tokenSchema from "../schema/tokenSchema.js";
import auth from "../middleware/authAPI.js";

const authRoutes = async (fastify, options) => {
  fastify.route({
    method: "GET",
    url: "/:id",
    preHandler: [auth],
    schema: tokenSchema,
    handler: getRandomToken,
  });
};

export default authRoutes;
