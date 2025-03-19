const login_api = require("../../service/login_api");

exports.login = async (request, reply) => {
  const { email, password } = request.body;
  try {
    const response = await login_api.post("/login", {
      email: email,
      password: password,
    });
    
    let login = response.data;

    reply.status(200).send(login);
  } catch (error) {
    // O erro será tratado pelo hook onError
    throw error; // Lançar o erro para que o middleware de erro o capture
  }
};
