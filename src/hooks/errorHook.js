export const errorHook = (error, reply) => {
  const statusCode = error.status || error.statusCode || 500;
  const messageError = error.response?.data?.message || error.message || "Erro desconhecido";

  const payload = {
    statusCode,
    error: "",
    message: "",
  };

  switch (statusCode) {
    case 400:
      payload.error = "Bad Request";
      break;
    case 401:
      payload.error = "Unauthorized";
      break;
    case 403:
      payload.error = "Forbidden";
      break;
    case 404:
      payload.error = "Not Found";
      break;
    case 500:
      payload.error = "Internal Server Error";
      break;
    default:
      payload.statusCode = 500;
      payload.error = "Internal Server Error";
  }

  payload.message = `${payload.error} - ${messageError}`;

  reply.status(payload.statusCode).send(payload);
};
