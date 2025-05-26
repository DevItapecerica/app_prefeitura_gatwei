import Bolsistas from "../../db/model/bolsistaModel.js";

export const getBolsistaById = async (id) => {
  const bolsista = await Bolsistas.findByPk(id);

  if (!bolsista) {
    throw {
      status: 404,
      message: "Nenhum bolsista encontrado",
    };
  }

  return bolsista;
};
