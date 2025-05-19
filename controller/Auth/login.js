const login_api = require("../../src/api/login_api");

const login = async (request, reply) => {
  const payload = request.body.credentials;
  try {
    const response = await login_api.post("/login", {
      ...payload
    });

    let login = response.data;

    reply.status(200).send(login);
  } catch (error) {
    // O erro será tratado pelo hook onError
    throw error; // Lançar o erro para que o middleware de erro o capture
  }
};

module.exports = { login };
