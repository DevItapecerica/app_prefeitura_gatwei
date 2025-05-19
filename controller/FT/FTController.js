const ft_app_api = require("../../service/ft_app_api.js");
const { verifyPermission } = require("../../utils/verifyPermission");

const SERVICE = 6;

const getBolsistas = async (request, reply) => {
  try {
    let user = request.user;

    const [{data}, {data: {token}}] = await Promise.all([
      ft_app_api.get("/ft/bolsista"),
      ft_app_api.get(`/ft/auth/${user}`),
    ]);

    console.log(data, token)

    reply.status(200).send({ ...data, uploadToken: token });
  } catch (error) {
    throw error;
  }
};

const getOneBolsistas = async (request, reply) => {
  try {
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);
    const { id } = request.params;
    const response = await ft_app_api.get(`/ft/bolsista/${id}`);
    const bolsistas = response.data;

    console.log(bolsistas);

    reply.status(200).send(bolsistas);
  } catch (error) {
    throw error;
  }
};

const createBolsistas = async (request, reply) => {
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
    } = request.body;

    const response = await ft_app_api.post(`/ft/bolsista`, {
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
    } = request.body;

    const response = await ft_app_api.put(`/ft/bolsista/${id}`, {
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

const deleteBolsistas = async (request, reply) => {
  try {
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);
    const { id } = request.params;

    const response = await ft_app_api.delete(`/ft/bolsista/${id}`);
    console.log(response.data);
    const message = response.data.message;

    reply.status(200).send(message);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getBolsistas,
  getOneBolsistas,
  createBolsistas,
  updateBolsistas,
  deleteBolsistas,
};
