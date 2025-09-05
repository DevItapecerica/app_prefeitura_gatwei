import ft_app_api from "../../api/ft_app_api.js";
import { verifyPermission } from "../../utils/verifyPermission.js";

const SERVICE = 6;

export const getBolsistas = async (request, reply) => {
  try {
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);

    const [
      { data },
      {
        data: { token },
      },
    ] = await Promise.all([
      ft_app_api.get("/ft/bolsista"),
      ft_app_api.get(`/ft/auth/${user}`),
    ]);

    reply.status(200).send({ ...data, uploadToken: token });
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

export const getOneBolsistas = async (request, reply) => {
  try {
    await verifyPermission(request.user, SERVICE, request.method);

    const { id } = request.params;
    const { data } = await ft_app_api.get(`/ft/bolsista/${id}`);
    const bolsistas = data;

    reply.status(200).send(bolsistas);
  } catch (error) {
    const response = error.response ? error.response.data : error;
    throw {
      code: error.status || error.code,
      message: response.message,
      ok: false,
      api: response.api,
    };
  }
};

export const createBolsistas = async (request, reply) => {
  try {
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);

    const { bolsista } = request.body;

    const { data } = await ft_app_api.post(`/ft/bolsista`, {
      bolsista,
    });

    reply.status(200).send({ bolsista: data });
  } catch (error) {
    const response = error.response ? error.response.data : error;
    throw {
      code: error.status || error.code,
      message: response.message,
      ok: false,
      api: response.api,
    };
  }
};

export const updateBolsistas = async (request, reply) => {
  try {
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);
    const { id } = request.params;
    const updatedData = request.body.bolsista;

    const { data } = await ft_app_api.put(`/ft/bolsista/${id}`, updatedData);
    const bolsista = data;

    reply.status(200).send(bolsista);
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

export const deleteBolsistas = async (request, reply) => {
  try {
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);
    const { id } = request.params;

    const { data } = await ft_app_api.delete(`/ft/bolsista/${id}`);
    const message = data.message;

    reply.status(200).send(message);
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

export const getBolsistaEdital = async (request, reply) => {
  try {
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);
    const { id } = request.params;

    const { data } = await ft_app_api.get(`/ft/bolsista/edital/${id}`);
    const bolsista = data;
    reply.status(200).send(bolsista);
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

export const toggleBolsistaEdital = async (request, reply) => {
  try {
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);

    const { bolsista } = request.params;
    const { edital } = request.params;

    const { data } = await ft_app_api.put(
      `/ft/bolsista/${bolsista}/edital/${edital}`,
      {}
    );

    reply.status(200).send(data);
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
