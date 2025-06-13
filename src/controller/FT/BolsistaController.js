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
    throw error;
  }
};

export const getOneBolsistas = async (request, reply) => {
  try {
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);
    const { id } = request.params;
    const response = await ft_app_api.get(`/ft/bolsista/${id}`);
    const bolsistas = response.data;

    reply.status(200).send(bolsistas);
  } catch (error) {
    throw error;
  }
};

export const createBolsistas = async (request, reply) => {
  try {
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);

    const {
      bco,
      ag,
      dig_ag,
      conta,
      dig_conta,
      nome,
      bolsa,
      vencimento,
      cpf,
      local,
      pagador,
    } = request.body;

    const response = await ft_app_api.post(`/ft/bolsista`, {
      bco,
      ag,
      dig_ag,
      conta,
      dig_conta,
      nome,
      bolsa,
      vencimento,
      cpf,
      local,
      pagador,
    });
    const bolsista = response.data;

    reply.status(200).send(bolsista);
  } catch (error) {
    throw error;
  }
};

export const updateBolsistas = async (request, reply) => {
  try {
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);
    const { id } = request.params;
    const {
      bco,
      ag,
      dig_ag,
      conta,
      dig_conta,
      nome,
      bolsa,
      vencimento,
      cpf,
      local,
      pagador,
    } = request.body;

    const { data } = await ft_app_api.put(`/ft/bolsista/${id}`, {
      bco,
      ag,
      dig_ag,
      conta,
      dig_conta,
      nome,
      bolsa,
      vencimento,
      cpf,
      local,
      pagador,
    });
    const bolsista = data;

    reply.status(200).send(bolsista);
  } catch (error) {
    throw error;
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
    throw error;
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
    throw error;
  }
};

export const toggleBolsistaEdital = async (request, reply) => {
  try {
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);

    const { bolsista } = request.params;
    const { edital } = request.params;

    const { data } = await ft_app_api.put(`/ft/bolsista/${bolsista}/edital/${edital}`, {});

    reply.status(200).send(data);
  } catch (error) {
    throw error;
  }
};

