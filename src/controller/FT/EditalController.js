import FT_API from "../../api/ft_app_api.js";
import { verifyPermission } from "../../utils/verifyPermission.js";

const SERVICE = 6;

export const getEditais = async (request, reply) => {
  try {
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);
    const response = await FT_API.get("/ft/edital");
    const { data } = response;
    reply.status(200).send({ ...data });
  } catch (error) {
    const response = error.response ? error.response.data : error;
    throw {
      code: error.status || response.code,
      message: response.message,
      ok: false,
      api: response.api,
    };
  }
};

export const getEditalById = async (request, reply) => {
  try {
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);
    const { id } = request.params;
    const response = await FT_API.get(`/ft/edital/${id}`);
    const { data } = response;

    reply.status(200).send({ ...data });
  } catch (error) {
    const response = error.response ? error.response.data : error;
    throw {
      code: error.status || response.code,
      message: response.message,
      ok: false,
      api: response.api,
    };
  }
};

export const postEdital = async (request, reply) => {
  try {
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);

    const { edital } = request.body;

    const response = await FT_API.post(`/ft/edital`, {
      edital,
    });

    const { data } = response;

    reply.status(200).send({ ...data });
  } catch (error) {
    const response = error.response ? error.response.data : error;
    throw {
      code: error.status || response.code,
      message: response.message,
      ok: false,
      api: response.api,
    };
  }
};

export const updateEdital = async (request, reply) => {
  try {
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);
    const { id } = request.params;
    const { edital } = request.body;

    const response = await FT_API.put(`/ft/edital/${id}`, {
      edital,
    });
    const { data } = response;

    reply.status(200).send({ ...data });
  } catch (error) {
    const response = error.response ? error.response.data : error;
    throw {
      code: error.status || response.code,
      message: response.message,
      ok: false,
      api: response.api,
    };
  }
};

export const deleteEdital = async (request, reply) => {
  try {
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);
    const { id } = request.params;

    const response = await ft_app_api.delete(`/ft/edital/${id}`);

    const { data } = response;

    reply.status(200).send({ ...data });
  } catch (error) {
    const response = error.response ? error.response.data : error;
    throw {
      code: error.status || response.code,
      message: response.message,
      ok: false,
      api: response.api,
    };
  }
};

export const vincularBolsista = async (request, reply) => {
  try {
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);

    const { id } = request.params;
    const { bolsista } = request.body;
    const { data_vinculo } = request.body;

    const { data } = await FT_API.post(`/ft/edital/vincularbolsista/${id}`, {
      bolsista,
      data_vinculo,
    });

    reply.status(200).send({ ...data });
  } catch (error) {
    const response = error.response ? error.response.data : error;
    throw {
      code: error.status || response.code,
      message: response.message,
      ok: false,
      api: response.api,
    };
  }
};

export const getEditalWithBolsista = async (request, response) => {
  try {
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);

    const { id } = request.params;

    const { data } = await FT_API.get(`/ft/edital/${id}/bolsista`);

    error.status(200).send({ ...data });
  } catch (error) {
    const response = error.response ? error.response.data : error;
    throw {
      code: error.status || response.code,
      message: response.message,
      ok: false,
      api: response.api,
    };
  }
};

export const getAllWithBolsista = async (request, response) => {
  try {
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);

    const { data } = await FT_API.get(`/ft/edital/bolsista`);

    error.status(200).send({ ...data });
  } catch (error) {
    const response = error.response ? error.response.data : error;
    throw {
      code: error.status || response.code,
      message: response.message,
      ok: false,
      api: response.api,
    };
  }
};
