import login_api from "../../api/login_api.js";

const login = async (request, reply) => {
  const { password, email } = request.body;
  const payload = { email, password };

  try {
    const response = await login_api.post("/login", { ...payload });

    const login = response.data;

    reply.status(200).send(login);
  } catch (error) {
    const data = error.response ? error.response.data : null;

    throw {
      ok: false,
      validation: data.validation,
      message: data.message || "Erro ao conectar com o serviço de login",
      code: error.status || data.code,
      api: data.api || "login",
    }; // O erro será tratado pelo hook onError
  }
};

export default login;
