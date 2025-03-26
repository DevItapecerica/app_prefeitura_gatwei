const login_api = require("../service/login_api");

const authJWT = async (request, reply) => {
  try {
    let token = request.headers.authorization?.replace("Bearer ", "") ;
    
    if (!token) {
      throw { status: 401, message: "Token não informado" };
    }

    await login_api.post("/authUser", {
      token: token,
    });

  } catch (error) {

    throw error; // Lançar o erro para que o middleware de erro o capture
  }
};

module.exports = authJWT;
