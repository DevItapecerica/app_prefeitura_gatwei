const errorHook = (error, reply) => {
  const statusCode = error.status || error.statusCode || 500;
  let messageError =
    error.response?.data.message || error.message || "Erro desconhecido";
  // Verifica o tipo de erro e responde com o status adequado
  if (statusCode === 400) {
    reply.status(400).send({
      statusCode: 400,
      error: "Bad Request",
      message: "Bad Request " + messageError,
    });
  } else if (statusCode === 404) {
    reply.status(404).send({
      statusCode: 404,
      error: "Not Found",
      message: "O serviço solicitado não foi encontrada. " + messageError,
    });
  } else if (statusCode === 401) {
    reply.status(401).send({
      statusCode: 401,
      error: "Unauthorized",
      message: "Não está autorizado. " + messageError,
    });
  } else {
    reply.status(500).send({
      statusCode: 500,
      error: "Server Error",
      message: "Erro interno no servidor. " + messageError,
    });
  }
};

module.exports = {errorHook};