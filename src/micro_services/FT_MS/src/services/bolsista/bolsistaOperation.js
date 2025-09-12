import Bolsistas from "../../db/model/Bolsistas.js";
import Edital from "../../db/model/Edital.js";
import BolsistasEdital from "../../db/model/BolsistasEdital.js";
import { searchArchive } from "../upload/archiveDBManipulation.js";
import { handleFileBulkRemove } from "../upload/handleFileOperations.js";
import removeFile from "../../utils/removeFile.js";
import {
  verifyPagador,
  verifyQuantityPagador,
} from "../../utils/verifyPagador.js";
import PaymentInfo from "../../db/model/Payment_Info.js";

const pagador = [
  {
    id: "9d0f3aa1-1143-48d2-9cc2-45d38998fe36",
    name: "Secretaria de Esporte e Lazer",
    max_bolsista: 12,
  },
  {
    id: "e3f162d8-6187-456c-b85d-fc9243dcbce8",
    name: "Secretaria de Planejamento e Meio Ambiente",
    max_bolsista: 20,
  },
  {
    id: "22bb6f70-e3fe-49ac-bd62-1fb25afe0a4a",
    name: "Secretaria de Turismo",
    max_bolsista: 5,
  },
  {
    id: "a763d7f0-8d38-45c6-b985-e9143ca7f4d1",
    name: "Secretaria do Desenvolvimento Social e Relacoes do Trabalho",
    max_bolsista: 20,
  },
  {
    id: "20e5601e-d3e8-4e63-8991-68d03a14ba2f",
    name: "Secretaria de Servicos Urbanos",
    max_bolsista: 193,
  },
  {
    id: "d5f9db73-ea63-442d-9aec-05dd5edcd990",
    name: "Secretaria de Educacao",
    max_bolsista: 100,
  },
  {
    id: "290d6314-54d9-4879-8220-0deb321ef892",
    name: "Secretaria de Cultura",
    max_bolsista: 5,
  },
];

export const getBolsistaById = async (id) => {
  const bolsista = await Bolsistas.findByPk(id, {
    include: [
      {
        model: PaymentInfo,
        as: "payment_info",
        attributes: { exclude: ["bolsista_id"] },
      },
    ],
  });

  if (!bolsista) {
    return {
      ok: false,
      code: 404,
      message: "Bolsista not found",
    };
  }

  return {
    bolsista,
    ok: true,
    message: "Bolsista retrieved successfully",
    code: 200,
  };
};

export const createBolsista = async (data) => {
  try {
    const pay_info = data.payment_info;
    await verifyPagador(data.payment_info.pagador_id, pagador);

    await Bolsistas.findOne({ where: { cpf: data.cpf } }).then((repeated) => {
      if (repeated) {
        throw {
          code: 403,
          message: "Bolsista already exists",
          ok: false,
          api: "FT_MS",
        };
      }
    });

    const newBolsista = await Bolsistas.create({
      nome: data.nome,
      cpf: data.cpf,
      telefone: data.telefone,
      local: data.local,
      cep: data.cep,
      numero: data.numero,
      logradouro: data.logradouro,
      bairro: data.bairro,
      cidade: data.cidade,
      uf: data.uf,
    });

    const newPaymentInfo = await PaymentInfo.create({
      bolsista_id: newBolsista.id,
      bco: pay_info.bco,
      ag: pay_info.ag,
      dig_ag: pay_info.dig_ag,
      conta: pay_info.conta,
      dig_conta: pay_info.dig_conta,
      pagador_id: pay_info.pagador,
    });

    return {
      ...newBolsista.dataValues,
      payment_info: newPaymentInfo.dataValues,
      ok: true,
      message: "Bolsista created successfully",
    };
  } catch (error) {
    console.error(error);
    throw {
      code: error.code || 500,
      message: error.message,
      ok: false,
      api: "FT_MS",
    };
  }
};

export const updateBolsista = async (data, id) => {
  const { bolsista } = await getBolsistaById(id);

  await verifyPagador(data.payment_info.pagador_id, pagador);

  if (
    bolsista.status == "ativo" &&
    bolsista.payment_info.pagador_id != data.payment_info.pagador_id
  ) {
    await verifyQuantityPagador(
      data.payment_info.pagador_id,
      pagador.find((pg) => pg.id === data.payment_info.pagador_id).max_bolsista
    );
  }

  bolsista.nome = data.nome;
  bolsista.cpf = data.cpf;
  bolsista.telefone = data.telefone;
  bolsista.local = data.local;
  bolsista.cep = data.cep;
  bolsista.numero = data.numero;
  bolsista.logradouro = data.logradouro;
  bolsista.bairro = data.bairro;
  bolsista.cidade = data.cidade;
  bolsista.uf = data.uf;

  // Atualiza dados de pagamento
  let paymentInfo = bolsista.payment_info;
  paymentInfo.bco = data.payment_info.bco;
  paymentInfo.ag = data.payment_info.ag;
  paymentInfo.dig_ag = data.payment_info.dig_ag;
  paymentInfo.conta = data.payment_info.conta;
  paymentInfo.dig_conta = data.payment_info.dig_conta;
  paymentInfo.pagador_id = data.payment_info.pagador_id;

  await bolsista.save();
  await paymentInfo.save();

  return bolsista;
};

export const deleteBolsista = async (id) => {
  const { bolsista } = await getBolsistaById(id);
  const bolsistaFiles = await searchArchive(id);

  if (!bolsista) {
    throw {
      code: 404,
      message: "Bolsista não encontrado",
      ok: false,
      api: "FT_MS",
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
  const bolsista = await Bolsistas.findAll({
    include: [
      {
        model: PaymentInfo,
        as: "payment_info",
        attributes: { exclude: ["bolsista_id"] },
      },
    ],
  });

  pagador.forEach((pg) => {
    pg.quantity = bolsista.filter(
      (b) => b.payment_info.pagador_id === pg.id && b.status == "ativo"
    ).length;
  });

  return {
    code: 200,
    bolsista,
    pagador,
    message: "Bolsistas retrieved successfully",
    ok: true,
  };
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

  if (!bolsista) {
    throw {
      code: 404,
      ok: false,
      api: "FT_MS",
      message: "Nenhum bolsista encontrado para esse edital",
    };
  }

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
  let bolsistaTarget = await Bolsistas.findByPk(bolsista, {
    include: [{ model: PaymentInfo, as: "payment_info" }],
  });
  const editalTarget = await Edital.findByPk(edital);

  let vinculo = await BolsistasEdital.findOne({
    where: {
      bolsista_id: bolsista,
      edital_id: edital,
    },
  });

  if (!bolsistaTarget || !editalTarget) {
    throw {
      code: 404,
      message: "Bolsista ou Edital não encontrados",
      ok: false,
      api: "FT_MS",
    };
  }

  if (bolsistaTarget.status == "inativo") {
    await verifyQuantityPagador(
      bolsistaTarget.payment_info.pagador_id,
      pagador.find((pg) => pg.id === bolsistaTarget.payment_info.pagador_id)
        .max_bolsista
    );
  }

  if (
    (vinculo.status != "ativo" && vinculo.status != "inativo") ||
    (editalTarget.status != "ativo" && editalTarget.status != "inativo")
  ) {
    throw {
      code: 403,
      message: "Bolsista ou Edital inválidos",
      ok: false,
      api: "FT_MS",
    };
  }

  if (vinculo.status != "ativo" && bolsistaTarget.status == "ativo") {
    throw {
      status: 403,
      message: "Bolsista já ativo em outro edital",
      ok: false,
      api: "FT_MS",
    };
  }

  bolsistaTarget.status =
    bolsistaTarget.status == "ativo" ? "inativo" : "ativo";
  bolsistaTarget.save();
  vinculo.status = vinculo.status == "ativo" ? "inativo" : "ativo";
  vinculo.save();

  return;
};
