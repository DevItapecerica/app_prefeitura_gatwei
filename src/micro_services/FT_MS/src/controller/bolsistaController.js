const Bolsistas = require("../db/model/bolsistaModel.js");

const getBolsista = async (request, reply) => {
  const bolsistas = await Bolsistas.findAll();

  return reply.status(200).send({
    message: "Bolsista get successfully",
    bolsistas,
  });
};

const getOneBolsista = async (request, reply) => {
  const { id } = request.params;
  const bolsista = await Bolsistas.findByPk(id);

  if (!bolsista) {
    return reply.status(404).send({
      message: "Nenhum bolsista encontrado",
    });
  }

  return reply.status(200).send({
    message: "Bolsista get successfully",
    bolsista,
  });
};

const createBolsista = async (request, reply) => {
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
  } = request.body;

  const newBolsista = await Bolsistas.create({
    bco: bco,
    ag: ag,
    dig_ag: dig_ag,
    conta: conta,
    dig_conta: dig_conta,
    nome: nome,
    bolsa: bolsa,
    vencimento: vencimento,
    cpf: cpf,
    local: local,
  });

  return reply.status(201).send({
    message: "Bolsista created successfully",
    bolsista: newBolsista,
  });
};

const updateBolsista = async (request, reply) => {
  const { id } = request.params;
  const bolsista = await Bolsistas.findByPk(id);

  if (!bolsista) {
    return reply.status(404).send({
      message: "Nenhum bolsista encontrado",
    });
  }

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
  } = request.body;

  await bolsista.update({
    bco: bco,
    ag: ag,
    dig_ag: dig_ag,
    conta: conta,
    dig_conta: dig_conta,
    nome: nome,
    bolsa: bolsa,
    vencimento: vencimento,
    cpf: cpf,
    local: local,
  });

  return reply.status(200).send({
    message: "Bolsista updated successfully",
    bolsista,
  });
};

const deleteBolsista = async (request, reply) => {
  const { id } = request.params;
  const bolsista = await Bolsistas.findByPk(id);

  if (!bolsista) {
    return reply.status(404).send({
      message: "Nenhum bolsista encontrado",
    });
  }

  await bolsista.destroy();

  return reply.status(200).send({
    message: "Bolsista deleted successfully",
  });
};

module.exports = {
  getBolsista,
  getOneBolsista,
  createBolsista,
  updateBolsista,
  deleteBolsista
};