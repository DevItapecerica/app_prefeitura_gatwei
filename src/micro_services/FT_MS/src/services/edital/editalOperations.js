import Edital from "../../db/model/Edital.js";
import Bolsistas from "../../db/model/Bolsistas.js";

export const EditalById = async (id) => {
  const edital = await Edital.findByPk(id);
  if (!edital) {
    throw {
      status: 404,
      message: "Edital not found",
    };
  }

  return edital;
};

export const AllEdital = async () => {
  const edital = await Edital.findAll();

  return edital;
};

export const CreateEdital = async (data) => {
  const newEdital = await Edital.create({
    name: data.name,
    data_publicacao: data.data_publicacao,
    data_vencimento: data.data_vencimento,
    dia_pagamento: data.dia_pagamento,
    valor_bolsa: data.valor_bolsa,
  });

  return newEdital;
};

export const UpdateEdital = async (id, data) => {
  const edital = await Edital.findByPk(id);
  if (!edital) {
    throw {
      status: 404,
      message: "Edital not found",
    };
  }

  edital.name = data.name;
  edital.data_publicacao = data.data_publicacao;
  edital.data_vencimento = data.data_vencimento;
  edital.dia_pagamento = data.dia_pagamento;
  edital.valor_bolsa = data.valor_bolsa;

  await edital.save();

  return edital;
};

export const DeleteEdital = async (id) => {
  const edital = await Edital.findByPk(id);
  if (!edital) {
    throw {
      status: 404,
      message: "Edital not found",
    };
  }

  await edital.destroy();

  return;
};

export const vincularBolsista = async (id, data) => {
  const edital = await Edital.findByPk(id);

  if (!edital) {
    throw {
      status: 404,
      message: "Edital not found",
    };
  }

  data.forEach((bolsista) => {
    const isBolsista = Bolsistas.findByPk(bolsista);

    if (!isBolsista) {
      throw {
        status: 404,
        message: "Bolsista not found",
      };
    }
  });

  await edital.addBolsista(data);

  console.log("bolsista adicionado com sucesso");
};

export const getAllWithBolsista = async () => {
  const edital_bolsista = await Edital.findAll({
    attributes: ["name", "id"],
    include: [
      {
        model: Bolsistas,
        as: "bolsistas",
        through: { attributes: [] },
      },
    ],
  });

  return edital_bolsista;
};
