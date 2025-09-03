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
    // Lança o erro para o error handler do Fastify
    throw {
      code: response.status,
      message: response.message,
      ok: false,
      api: response.api,
    };
  }
};
