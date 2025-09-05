import Edital from "../../db/model/Edital.js";
import Bolsistas from "../../db/model/Bolsistas.js";

export const EditalById = async (id) => {
  const edital = await Edital.findByPk(id);
  if (!edital) {
    return {
      code: 200,
      ok: true,
      api: "FT_MS",
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
      code: 404,
      ok: false,
      api: "FT_MS",
      message: "Edital not found",
    };
  }

  await edital.destroy();

  return;
};

export const vincularBolsista = async (id, bolsistas, data_vinculo) => {
  let edital = await Edital.findByPk(id);

  if (!edital) {
    throw {
      code: 404,
      ok: false,
      api: "FT_MS",
      message: "Edital not found",
    };
  }

  if (edital.status === "inativo") {
    throw {
      code: 400,
      ok: false,
      api: "FT_MS",
      message: "Edital inativo",
    };
  }

  for (let bolsista of bolsistas) {
    let isBolsista = await Bolsistas.findByPk(bolsista);

    if (!isBolsista) {
      throw {
        code: 404,
        ok: false,
        api: "FT_MS",
        message: "Bolsista not found",
      };
    }

    if (isBolsista.status == "pendente" || isBolsista.status == "ativo") {
      throw {
        code: 403,
        ok: false,
        api: "FT_MS",
        message:
          "Bolsista com documentos pendentes ou já ativo em outro edital",
      };
    }

    isBolsista.status = "ativo";
    await isBolsista.save();

    await edital.addBolsista(isBolsista, {
      through: { data_vinculo: data_vinculo },
    });
  }

  console.log("bolsista adicionado com sucesso");

  return;
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

export const getWithBolsista = async (id) => {
  const edital_bolsista = await Edital.findByPk(id, {
    include: [
      {
        model: Bolsistas,
        as: "bolsistas",
        through: {
          attributes: ["data_vinculo", "prorrogated", "status", "expire_at"],
        },
      },
    ],
  });

  return edital_bolsista;
};
