import jwt from "jsonwebtoken";

const verifyToken = async (request, reply) => {
  try {
    const token = request.headers["x-access-token"]?.split(" ")[1];

    if (!token)
      throw { statusCode: 403, auth: false, message: "No token provided." };

    await jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) throw { status: 401, message: "Incorrect Token." };

      request.user = decoded;
    });
  } catch (error) {
    throw error;
  }
};

export default verifyToken;