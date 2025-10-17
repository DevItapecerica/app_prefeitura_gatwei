import fp from 'fastify-plugin'; // Importe o fastify-plugin

const LoggerResponse = async (fastify, options) => {
  fastify.addHook("onResponse", (request, reply) => {
    const url = request.url;
    const queryData = request.query;
    const remoteAddress = request.ip;
    const metodo = request.method;
    const user = request.user;
    const status = reply.statusCode;
    const dataHora = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date());

    // Acessa o logger e registra as informações
    request.log.info({
      status,
      dataHora,
      metodo,
      url,
      queryData,
      remoteAddress,
      user: {
        id: user?.id || "N/A",
        name: user?.name || request.body.email || "N/A",
        role_id: user?.role_id || "N/A",
      },
      message: "incoming request (custom)",
    });
  });
};

export default fp(LoggerResponse);