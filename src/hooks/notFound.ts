import fp from 'fastify-plugin'; // Importe o fastify-plugin
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const notFound = async (fastify: FastifyInstance) => {
  fastify.setNotFoundHandler(
    {
      preHandler: fastify.rateLimit(),
    },
    function (request: FastifyRequest, reply: FastifyReply) {
      throw { code: 404, message: "Route not found", ok: false, api: "Gatwei" };
    }
  );
};

export default fp(notFound);