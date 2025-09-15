import jwt from "jsonwebtoken";

const verifyToken = async (request, reply) => {
  try {
    const token = request.headers["x-access-token"]?.split(" ")[1];

    if (!token)
      throw {
        code: 401,
        message: "No token provided.",
        ok: false,
        api: "FT_MS",
      };

    await jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err)
        throw {
          code: 401,
          message: "Token is not valid.",
          ok: false,
          api: "FT_MS",
        };

      request.user = decoded;
    });
  } catch (error) {
    throw error;
  }
};

export default verifyToken;
