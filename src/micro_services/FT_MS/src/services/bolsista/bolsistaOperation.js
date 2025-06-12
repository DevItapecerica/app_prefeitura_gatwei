import Bolsistas from "../../db/model/Bolsistas.js";
import Edital from "../../db/model/Edital.js";
import BolsistasEdital from "../../db/model/BolsistasEdital.js";
import { searchArchive } from "../upload/archiveDBManipulation.js";
import { handleFileBulkRemove } from "../upload/handleFileOperations.js";
import removeFile from "../../utils/removeFile.js";

const pagador = [];

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
    pagador: data.pagador,
    cpf: data.cpf,
    local: data.local,
  });

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
  bolsista.pagador = data.pagador;
  bolsista.cpf = data.cpf;
  bolsista.local = data.local;

  bolsista.save();

  return bolsista;
};

export const deleteBolsista = async (id) => {
  const bolsista = await getBolsistaById(id);
  const bolsistaFiles = await searchArchive(id);

  if (!bolsista) {
    throw {
      status: 404,
      message: "Bolsista não encontrado",
    };
  }

  const paths = await handleFileBulkRemove(bolsistaFiles);

  for (const path of paths) {
    removeFile(path);
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
        through: {
          attributes: ["status"], // não traz dados da tabela intermediária
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

export const toggleBolsistaEdital = async (bolsista, edital) => {
  let bolsistaTarget = await Bolsistas.findByPk(bolsista);
  const editalTarget = await Edital.findByPk(edital);
  let vinculo = await BolsistasEdital.findOne({
    where: {
      bolsista_id: bolsista,
      edital_id: edital,
    },
  });

  if (
    !bolsistaTarget ||
    !editalTarget ||
    (vinculo.status != "ativo" && vinculo.status != "inativo") ||
    (editalTarget.status != "ativo" && editalTarget.status != "inativo")
  ) {
    throw {
      status: 404,
      message: "Bolsista ou Edital não válido para essa operação",
    };
  }

  bolsistaTarget.status =
    bolsistaTarget.status == "ativo" ? "inativo" : "ativo";
  bolsistaTarget.save();
  vinculo.status = vinculo.status == "ativo" ? "inativo" : "ativo";
  vinculo.save();

  return;
};
