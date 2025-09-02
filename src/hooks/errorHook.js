export const errorHook = (error, reply) => {
  // Obtém o código de status ou define como 500 por padrão
  const { code, message, ok, api, validation } = error;

  // Constrói uma mensagem de erro apropriada
  let messageError = message || "Erro interno no servidor";

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
    errorResponse = {
      ok: false,
      validation: validation,
      message: messageError,
      api: api || "gatwei",
    };
  } else {
    errorResponse = {
      ok: ok,
      validation: validation,
      message: messageError,
      api: api,
    };
  }

  // Envia resposta com o código de status apropriado
  reply
    .code(code || 500)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(errorResponse);
};
