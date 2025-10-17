import fp from 'fastify-plugin'; // Importe o fastify-plugin

const LoggerResponse = async (fastify, options) => {
  fastify.addHook("onResponse", (request, reply) => {
    const url = request.url;
    const queryData = request.query;
    const remoteAddress = request.ip;
    const metodo = request.method;
    const user = request.user;
    const status = reply.statusCode;

    // Acessa o logger e registra as informações
    request.log.info({
      status,
      metodo,
      url,
      queryData,
      remoteAddress,
      user: {
        id: user.id,
        name: user.name,
        role_id: user.role_id,
      },
      message: "incoming request (custom)",
    });
  });
};

export default fp(LoggerResponse);