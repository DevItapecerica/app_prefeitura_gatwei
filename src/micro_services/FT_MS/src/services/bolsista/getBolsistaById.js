const Bolsistas = require("../../db/model/bolsistaModel");

const getBolsistaById = async (id) => {
  const bolsista = await Bolsistas.findByPk(id);

  if (!bolsista) {
    throw {
      message: "Nenhum bolsista encontrado",
    };
  }

  return bolsista;
};

module.exports = getBolsistaById;
