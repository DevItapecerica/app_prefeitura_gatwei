import { FastifyReply, FastifyRequest } from "fastify";
import loginApi from "../api/login_api.js";
export const authJWT = async (request: FastifyRequest<{ Headers: { authorization: string } }>, reply: FastifyReply) => {
  try {
    const token: string = request.headers.authorization?.replace("Bearer ", "");

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

  } catch (error: any) {
    const response = error.response ? error.response.data : error;
    throw {
      validation: response.validation,
      code: error.status || response.code,
      message: response.message,
      ok: false,
      api: response.api,
    };
  }
};
