const authController = require("../controller/authController.js");
const tokenSchema = require("../schema/tokenSchema.js");
const auth = require("../middleware/authAPI.js");

const authRoutes = async (fastify, options) => {
  fastify.route({
    method: "GET",
    url: "/:id",
    preHandler: [auth],
    schema: tokenSchema,
    handler: authController.getRandomToken,
  });
};

module.exports = authRoutes;
