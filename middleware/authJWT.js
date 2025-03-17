const login_api = require("../service/login_api");

const authJWT = async (request, reply) => {
  try {
    const token = request.headers.authorization?.split(" ")[1] || request.headers.authorization;
    await login_api.post("/authUser", {
      token: token,
    });

  } catch (error) {

    throw error; // Lançar o erro para que o middleware de erro o capture
  }
};

module.exports = authJWT;
