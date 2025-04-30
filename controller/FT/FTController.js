const Bolsista = require("../../service/ft_app_api.js");

const SERVICE = 6;

const getBolsistas = async (request, reply) => {
  try {
    const response = await Bolsista.get("/bolsista");
    const bolsistas = response.data;

    console.log(bolsistas);

    reply.status(200).send(bolsistas);
  } catch (error) {
    throw error;
  }
};

const getOneBolsistas = async (request, reply) => {
  try {
    const { id } = request.params;
    const response = await Bolsista.get(`/bolsista/${id}`);
    const bolsistas = response.data;

    console.log(bolsistas);

    reply.status(200).send(bolsistas);
  } catch (error) {
    throw error;
  }
};

const createBolsistas = async (request, reply) => {
  try {
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

    const response = await Bolsista.post(`/bolsista`, {
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
    const bolsista = response.data;

    console.log(bolsista);

    reply.status(200).send(bolsista);
  } catch (error) {
    throw error;
  }
};

const updateBolsistas = async (request, reply) => {
  try {
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
    } = request.body;

    const response = await Bolsista.put(`/bolsista/${id}`, {
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
    const bolsista = response.data;

    console.log(bolsista);

    reply.status(200).send(bolsista);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getBolsistas,
  getOneBolsistas,
  createBolsistas,
  updateBolsistas,
};
