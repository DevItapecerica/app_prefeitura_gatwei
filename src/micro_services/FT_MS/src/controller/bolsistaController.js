// import Bolsistas from "../db/model/Bolsistas.js";
import * as Bolsista from "../services/bolsista/bolsistaOperation.js";
import saveBolsista from "../services/bolsista/saveBolsista.js";

export const getBolsista = async (request, reply) => {
  const bolsistas = await Bolsista.getAllBolsistas();

  return reply.status(200).send({
    message: "Bolsista get successfully",
    bolsistas,
  });
};

export const getOneBolsista = async (request, reply) => {
  const { id } = request.params;
  const bolsista = await Bolsista.getBolsistaById(id);

  return reply.status(200).send({
    message: "Bolsista get successfully",
    bolsista,
  });
};

export const createBolsista = async (request, reply) => {
  const data = request.body;

  let bolsista = await saveBolsista(data);

  return reply.status(201).send({
    message: "Bolsista created successfully",
    bolsista,
  });
};

export const updateBolsista = async (request, reply) => {
  const { id } = request.params;
  const data = request.body;

  const bolsista = await saveBolsista(data, id);


  return reply.status(200).send({
    message: "Bolsista updated successfully",
    bolsista,
  });
};

export const deleteBolsista = async (request, reply) => {
  const { id } = request.params;

  await Bolsista.deleteBolsista(id);

  return reply.status(200).send({
    message: "Bolsista deleted successfully",
  });
};
