import FT_API from "../../api/ft_app_api.js";
import { verifyPermission } from "../../utils/verifyPermission.js";

const SERVICE = 6;

export const getEditais = async (request, reply) => {
  try {
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);
    const response = await FT_API.get("/ft/edital");
    const { data } = response;
    console.log(data);
    reply.status(200).send({ ...data });
  } catch (error) {
    throw error;
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
    throw error;
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
    throw error;
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
    throw error;
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
    throw error;
  }
};

export const vincularBolsista = async (request, reply) => {
  try {
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);

    const { id } = request.params;
    const { bolsista } = request.body;

    const response = await FT_API.post(`/ft/edital/vincularbolsista/${id}`, {
      bolsista,
    });

    const { data } = response;
    reply.status(200).send({ ...data });
  } catch (error) {
    throw error;
  }
};
