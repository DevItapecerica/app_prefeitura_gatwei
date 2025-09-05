import Bolsistas from "../db/model/Bolsistas.js";
import PaymentInfo from "../db/model/Payment_Info.js";

export const verifyPagador = async (target, pagador) => {
  const isPagador = pagador.find((pg) => pg.id === target);

  if (!isPagador) {
    throw {
      code: 403,
      api: "FT_MS",
      ok: false,
      message: "Pagador não encontrado",
    };
  }
};

export const verifyQuantityPagador = async (id, max_bolsista) => {
  const bolsistaQuantity = await Bolsistas.count({
    where: { status: "ativo" },
    include: [
      {
        model: PaymentInfo,
        as: "paymentInfo",
        where: { pagador: id },
      },
    ],
  });

  if (max_bolsista <= bolsistaQuantity) {
    throw {
      code: 403,
      api: "FT_MS",
      ok: false,
      message: "Quantidade máxima de bolsistas alcansada",
    };
  }
};
