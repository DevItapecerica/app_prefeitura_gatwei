const errorHook = (error, reply) => {
  // Obtém o código de status ou define como 500 por padrão
  var {
    code = 500,
    message = "Internal Server Error",
    ok = false,
    api = "FT_MS",
    validation = false,
  } = error;

  // Loga o erro em ambiente de desenvolvimento
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "dev"
  ) {
    console.error("Error details:", error);
  }

  // Formata resposta de erro de forma padronizada
  var errorResponse = {};

  // Se for erro de validação, adiciona detalhes
  if (validation) {
    code = 400;
    errorResponse = {
      ok,
      validation: true,
      message: "Confira o corpo da requisição e tente novamente",
      api: api,
    };
  } else {
    fastify.log.error(error);
    errorResponse = {
      ok,
      validation,
      message: message,
      api: api,
    };
  }

  // Envia resposta com o código de status apropriado
  reply
    .code(code)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(errorResponse);
};

export default errorHook;
