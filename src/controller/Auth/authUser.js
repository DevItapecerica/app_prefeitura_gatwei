import login_api from "../../api/login_api.js";

export const authUser = async (request, reply) => {
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
      code: error.status || response.code,
      message: response.message,
      ok: response.ok,
      api: response.api,
    };
  }
};

export const Login = async (request, reply) => {
  const { password, email } = request.body;
  const payload = { email, password };

  try {
    const response = await login_api.post("/login", { ...payload });

    const login = response.data;

    // mudar para session cookie
    reply.status(200).send(login);
  } catch (error) {
    const data = error.response?.data || error;

    throw {
      ok: false,
      validation: data.validation,
      message: data.message || "Erro ao conectar com o serviço de login",
      code: error.status || data.code,
      api: data.api || "login",
    }; // O erro será tratado pelo hook onError
  }
};

export const AlterPass = async (request, reply) => {
  try {
    const user = request.user;
    const { password, new_password } = request.body;

    const { data } = await login_api.put(`user/${user.id}/password`, {
      password,
      new_password,
    });

    reply.status(200).send(data);
  } catch (error) {
    const response = error.response?.data || error;

    throw {
      code: error.status || response.code,
      message: response.message,
      ok: response.ok,
      api: response.api,
      validation: response.validation || false,
    };
  }
};
