const notFound = async (fastify, options) => {
  fastify.setNotFoundHandler(
    {
      preHandler: fastify.rateLimit(),
    },
    function (request, reply) {
      throw { code: 404, message: "Route not found", ok: false, api: "Gatwei" };
    }
  );
};

export default notFound;
