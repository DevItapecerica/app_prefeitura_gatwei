const Bolsistas = require("../../db/model/bolsistaModel");

const getBolsistaById = async (id) => {
  const bolsista = await Bolsistas.findByPk(id);

  if (!bolsista) {
    throw {
      status: 404,
      message: "Nenhum bolsista encontrado",
    };
  }

  return bolsista;
};

module.exports = {getBolsistaById};
