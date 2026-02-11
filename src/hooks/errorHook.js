import fp from "fastify-plugin"; // Importe o fastify-plugin

const ErrorHook = async (fastify) => {
  fastify.setErrorHandler((error, request, reply) => {
    // Obtém o código de status ou define como 500 por padrão
    var { code, message, ok, api, validation = false } = error;

    console.log("Error details:", error);

    // Formata resposta de erro de forma padronizada
    var errorResponse = {};

    // Se for erro de validação, adiciona detalhes
    if (validation) {
      code = 400;
      errorResponse = {
        ok: false,
        validation: validation,
        message: "Confira o corpo da requisição e tente novamente",
        api: api || "Gatwei",
      };
    } else {
      if (typeof code === "string") code = 500;
      errorResponse = {
        ok: ok || false,
        validation: false,
        message: message || "Internal Server Error",
        api: api || "Gatwei",
      };
    }

    fastify.log.error(errorResponse);

    // Envia resposta com o código de status apropriado
    reply
      .code(code || 500)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(errorResponse);
  });
};

export default fp(ErrorHook);
