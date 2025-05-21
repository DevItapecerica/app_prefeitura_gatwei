const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require("../config/env");

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
    error.message += " Error generating token";
    throw error;
  }
};

module.exports = {
  getRandomToken,
};
