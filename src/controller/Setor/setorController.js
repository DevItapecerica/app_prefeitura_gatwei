import setor_api from "../../api/setor_api.js";
import user_api from "../../api/user_api.js";
import services_api from "../../api/service_api.js";
import permission_api from "../../api/permissions_api.js";
import { verifyPermission } from "../../utils/verifyPermission.js";

const SERVICE = 2;

export const getSetores = async (request, reply) => {
  try {
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);

    const response = await setor_api.get("/setor");
    let setores = response.data;

    reply.status(200).send(setores);
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

export const getOneSetor = async (request, reply) => {
  try {
    let id = request.params.id;
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);

    const response = await setor_api.get(`/setor/${id}`);
    let setor = response.data;

    reply.status(200).send(setor);
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

export const createSetor = async (request, reply) => {
  try {
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);

    let setor = request.body.setor;
    const response = await setor_api.post("/setor", { setor });

    let responseServices = await services_api.get("/service");
    let services = responseServices.data.services;

    await permission_api.post(`/visibility/setor/${response.data.setor.id}`, {
      services,
    });

    reply.status(200).send(response.data);
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

export const updateSetor = async (request, reply) => {
  try {
    let id = request.params.id;
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);

    let setor = request.body.setor;
    await setor_api.put(`/setor/${id}`, { setor });

    reply.status(204);
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

export const deleteSetor = async (request, reply) => {
  try {
    let id = request.params.id;
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);

    if (id === 1) {
      throw { status: 400, message: "You cannot delete the default setor." };
    }

    await setor_api.delete(`/setor/${id}`);
    await user_api.delete(`/user/setor/${id}`);
    await permission_api.delete(`/visibility/setor/${id}`);

    reply.status(204);
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
