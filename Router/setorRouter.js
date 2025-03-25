const auth = require("../middleware/authJWT");
const Setor = require("../controller/Setor/setorController");

const setorRouter = (fastify, options) => {
  fastify.route({
    method: "GET",
    url: "/setor",
    preHandler: [auth],
    handler: Setor.getSetores,
  });

  fastify.route({
    method: 'GET',
    url: '/setor/:id',
    preHeandler: [auth],
    handler: Setor.getOneSetor,
  })
};

module.exports = setorRouter;
