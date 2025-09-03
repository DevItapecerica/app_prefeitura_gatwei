import login_api from "../../api/login_api.js";

const authUser = async (request, reply) => {
  try {
    let token = request.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      throw {
        code: 401,
        message: "Token não fornecido",
        ok: false,
        api: "Gatwei",
      };
    }

    let response = await login_api.post("/authUser", {
      token: token,
    });

    let user = response.data;

    reply.status(200).send(user);
  } catch (error) {
    const response = error.response?.data || error;
    throw {
      code: error.status || error.code,
      message: response.message,
      ok: response.ok,
      api: response.api,
    };
  }
};

export default authUser;
