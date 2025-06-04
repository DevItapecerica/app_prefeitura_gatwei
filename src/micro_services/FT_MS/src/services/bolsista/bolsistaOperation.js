import Bolsistas from "../../db/model/Bolsistas.js";
import Edital from "../../db/model/Edital.js";

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

export const createBolsista = async (data) => {
  const newBolsista = await Bolsistas.create({
    bco: data.bco,
    ag: data.ag,
    dig_ag: data.dig_ag,
    conta: data.conta,
    dig_conta: data.dig_conta,
    nome: data.nome,
    vencimento: data.vencimento,
    cpf: data.cpf,
    local: data.local,
  });

  console.log(newBolsista);

  return newBolsista;
};

export const updateBolsista = async (data, id) => {
  const bolsista = await getBolsistaById(id);

  if (!bolsista) {
    throw {
      status: 404,
      message: "Bolsista não encontrado",
    };
  }

  bolsista.bco = data.bco;
  bolsista.ag = data.ag;
  bolsista.dig_ag = data.dig_ag;
  bolsista.conta = data.conta;
  bolsista.dig_conta = data.dig_conta;
  bolsista.nome = data.nome;
  bolsista.vencimento = data.vencimento;
  bolsista.cpf = data.cpf;
  bolsista.local = data.local;

  bolsista.save();

  return bolsista;
};

export const deleteBolsista = async (id) => {
  const bolsista = await getBolsistaById(id);

  if (!bolsista) {
    throw {
      status: 404,
      message: "Bolsista não encontrado",
    };
  }
  await bolsista.destroy();
  return {
    message: "Bolsista deletado com sucesso",
  };
};
export const getAllBolsistas = async () => {
  const bolsistas = await Bolsistas.findAll();
  return bolsistas;
};

export const getBolsistaByEditalId = async (id) => {
  const bolsista = await Bolsistas.findAll({
    include: [
      {
        model: Edital,
        as: "edital", // mesmo alias usado na associação
        where: { id: id },
        attributes: [], // opcional: evita trazer dados do edital
        through: {
          attributes: [], // não traz dados da tabela intermediária
        },
      },
    ],
  });

  return bolsista;
};
export const getBolsistaByCpf = async (cpf) => {
  const bolsista = await Bolsistas.findOne({
    where: { cpf: cpf },
  });

  if (!bolsista) {
    throw {
      status: 404,
      message: "Nenhum bolsista encontrado com esse CPF",
    };
  }

  return bolsista;
};

export const getBolsistaByName = async (name) => {
  const bolsista = await Bolsistas.findOne({
    where: { nome: name },
  });

  if (!bolsista) {
    throw {
      status: 404,
      message: "Nenhum bolsista encontrado com esse nome",
    };
  }

  return bolsista;
};
