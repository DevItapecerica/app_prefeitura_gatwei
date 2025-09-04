// import Bolsistas from "../db/model/Bolsistas.js";
import * as Bolsista from "../services/bolsista/bolsistaOperation.js";
import saveBolsista from "../services/bolsista/saveBolsista.js";

export const getBolsista = async (request, reply) => {
  try {
    const { bolsista, pagador, message } = await Bolsista.getAllBolsistas();

    return reply.status(200).send({
      message,
      bolsista,
      pagador,
    });
  } catch (error) {
    throw { code: error.code, message: error.message, ok: false, api: "FT_MS" };
  }
};

export const getOneBolsista = async (request, reply) => {
  try {
    const { id } = request.params;
    const response = await Bolsista.getBolsistaById(id);

    if (!response.ok) {
      throw {
        code: response.code,
        message: response.message,
        ok: false,
        api: "FT_MS",
      };
    }

    return reply.status(200).send({
      message: response.message,
      bolsista: response.bolsista,
    });
  } catch (error) {
    throw { code: error.code, message: error.message, ok: false, api: "FT_MS" };
  }
};

export const createBolsista = async (request, reply) => {
  try {
    const { bolsista } = request.body;

    let newBolsista = await saveBolsista(bolsista);

    return reply.status(201).send({
      message: "Bolsista created successfully",
      newBolsista,
    });
  } catch (error) {
    throw { code: error.code, message: error.message, ok: false, api: "FT_MS" };
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
    throw { code: error.code, message: error.message, ok: false, api: "FT_MS" };
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
    throw { code: error.code, message: error.message, ok: false, api: "FT_MS" };
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
    throw {
      code: error.code,
      message: error.message,
      ok: false,
      api: error.api,
    };
  }
};

export const toggleBolsistaEdital = async (request, reply) => {
  try {
    const { bolsista } = request.params;
    const { edital } = request.params;

    await Bolsista.toggleBolsistaEdital(bolsista, edital);

    reply.status(201).send({ message: "Bolsista alterado com sucesso!" });
  } catch (error) {
    throw { code: error.code, message: error.message, ok: false, api: "FT_MS" };
  }
};
