import loginApi from "../api/login_api.js";

export const authJWT = async (request, reply) => {
  try {
    const token = request.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      throw {
        code: 401,
        message: "Token not provided",
        ok: false,
        api: "Gatwei",
      };
    }

    const decodedUserResponse = await loginApi.post("/authUser", { token });

    request.user = decodedUserResponse.data.user;
  } catch (error) {
    const response = error.response ? error.response.data : error;
    response.code = error.response ? error.response.status : error.code;
    // Lança o erro para o error handler do Fastify
    throw {
      code: response.code,
      message: response.message,
      ok: false,
      api: response.api,
    };
  }
};
