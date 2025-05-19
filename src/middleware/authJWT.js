const login_api = require("../api/login_api");

const authJWT = async (request, reply) => {
  try {
    let token = request.headers.authorization?.replace("Bearer ", "") ;
    if (!token) {
      throw { status: 403, message: "Token não informado" };
    }

    let decodedUserResponse = await login_api.post("/authUser", {
      token: token,
    });

    let decodedUser = decodedUserResponse.data.user
    request.user = decodedUser
  } catch (error) {

    throw error; // Lançar o erro para que o middleware de erro o capture
  }
};

module.exports = authJWT;
