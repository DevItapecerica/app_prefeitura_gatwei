import Editais from "./Editais.js";

export const EditaisById = async (id) => {
  const edital = await Editais.findByPk(id);
  if (!edital) {
    throw {
      status: 404,
      message: "Edital not found",
    };
  }

  return edital;
};

export const AllEditais = async () => {
  const editais = await Editais.findAll();
  if (!editais || editais.length === 0) {
    throw {
      status: 404,
      message: "No editais found",
    };
  }

  return editais;
};

export const CreateEdital = async (data) => {
  const newEdital = await Editais.create({
    name: data.titulo,
    abertura: data_publicacao,
    fechamento: data_vencimento,
  });

  return newEdital;
};

export const UpdateEdital = async (id, data) => {
  const edital = await Editais.findByPk(id);
  if (!edital) {
    throw {
      status: 404,
      message: "Edital not found",
    };
  }

  edital.name = data.titulo;
  edital.abertura = data.data_publicacao;
  edital.fechamento = data.data_vencimento;

  await edital.save();

  return edital;
}

export const DeleteEdital = async (id) => {
  const edital = await Editais.findByPk(id);
  if (!edital) {
    throw {
      status: 404,
      message: "Edital not found",
    };
  }

  await edital.destroy();

  return { message: "Edital deleted successfully" };
}