import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/env.js";

const TOKEN_EXPIRATION = "1h"; // Token expiration time

const getRandomToken = async (request, reply) => {
  try {
    const { id } = request.params;
    const payload = {
      id: id,
      timestamp: Date.now(),
    };
    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: TOKEN_EXPIRATION,
    });
    return reply.send({ token });
  } catch (error) {
    error.message += "Error generating token";
    throw {
      code: error.code,
      message: error.message,
      ok: false,
      api: "FT_MS",
    };
  }
};

export default getRandomToken;
