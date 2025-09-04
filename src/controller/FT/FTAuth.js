import ft_app_api from "../../api/ft_app_api.js";

export const getAuth = async (request, reply) => {
  try {
    const user = request.user.id;

    const response = await ft_app_api.get(`/ft/auth/${user}`);
    const token = response.data.token;

    reply.status(200).send({ token });
  } catch (error) {
    const response = error.response ? error.response.data : error;
    throw {
      code: response.status || response.code,
      message: response.message,
      ok: false,
      api: response.api,
    };
  }
};
