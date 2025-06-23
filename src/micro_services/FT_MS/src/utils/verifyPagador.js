import Bolsistas from "../db/model/Bolsistas.js";

export const verifyPagador = async (target, pagador) => {
  console.log(target)

  const isPagador = pagador.find((pg) => pg.id === target);

  if (!isPagador) {
    throw { status: 403, message: "Pagador não encontrado" };
  }
};

export const verifyQuantityPagador = async (id, max_bolsista) => {
  const bolsistaQuantity = await Bolsistas.count({
    where: { pagador: id, status: "ativo" }
  });

  if (max_bolsista <= bolsistaQuantity) {
    throw { status: 403, message: "Quantidade máxima de bolsistas alcansada" };
  }
}