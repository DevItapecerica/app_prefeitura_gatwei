import ft_app_api from "../../api/ft_app_api.js";

export const getAuth = async (request, reply) => {
  try {
    const user = request.user.id;

    const response = await ft_app_api.get(`/ft/auth/${user}`);
    const token = response.data.token;

    reply.status(200).send({ token });
  } catch (error) {
    throw {
      code: error.code,
      message: error.message,
      ok: false,
      api: "Gatwei",
    };
  }
};
