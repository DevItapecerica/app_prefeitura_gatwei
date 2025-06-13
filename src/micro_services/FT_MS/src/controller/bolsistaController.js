// import Bolsistas from "../db/model/Bolsistas.js";
import * as Bolsista from "../services/bolsista/bolsistaOperation.js";
import saveBolsista from "../services/bolsista/saveBolsista.js";

export const getBolsista = async (request, reply) => {
  try {
    const { bolsista, pagador } = await Bolsista.getAllBolsistas();

    return reply.status(200).send({
      message: "Bolsista get successfully",
      bolsista,
      pagador,
    });
  } catch (error) {
    throw error;
  }
};

export const getOneBolsista = async (request, reply) => {
  try {
    const { id } = request.params;
    const bolsista = await Bolsista.getBolsistaById(id);

    return reply.status(200).send({
      message: "Bolsista get successfully",
      bolsista,
    });
  } catch (error) {
    throw error;
  }
};

export const createBolsista = async (request, reply) => {
  try {
    const data = request.body;

    let bolsista = await saveBolsista(data);

    return reply.status(201).send({
      message: "Bolsista created successfully",
      bolsista,
    });
  } catch (error) {
    throw error;
  }
};

export const updateBolsista = async (request, reply) => {
  try {
    const { id } = request.params;
    const data = request.body;

    const bolsista = await saveBolsista(data, id);

    return reply.status(200).send({
      message: "Bolsista updated successfully",
      bolsista,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteBolsista = async (request, reply) => {
  try {
    const { id } = request.params;

    await Bolsista.deleteBolsista(id);

    return reply.status(200).send({
      message: "Bolsista deleted successfully",
    });
  } catch (error) {
    throw error;
  }
};

export const getBolsistaEdital = async (request, reply) => {
  try {
    const { id } = request.params;

    const bolsista = await Bolsista.getBolsistaByEditalId(id);

    reply.status(200).send({
      message: "Bolsista get successfully",
      bolsista,
    });
  } catch (error) {
    throw error;
  }
};

export const toggleBolsistaEdital = async (request, reply) => {
  try {
    const { bolsista } = request.params;
    const { edital } = request.params;

    await Bolsista.toggleBolsistaEdital(bolsista, edital);

    reply.status(201).send({ message: "Bolsista alterado com sucesso!" });
  } catch (error) {
    throw error;
  }
};
