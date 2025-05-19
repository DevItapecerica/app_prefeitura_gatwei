const ft_app_api = require("../../src/api/ft_app_api")

const getAuth = async (request, reply) => {
  try {
    const user = request.user.id;

    const response = await ft_app_api.get(`/ft/auth/${user}`);
    const token = response.data.token;

    reply.status(200).send({token})
  } catch (error) {
    throw error;
  }
};

module.exports = getAuth;
