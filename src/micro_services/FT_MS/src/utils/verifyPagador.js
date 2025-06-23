export const verifyPagador = (target, pagador) => {
  console.log(target)

  const isPagador = pagador.some((pg) => pg.id === target);

  if (!isPagador) {
    throw { status: 403, message: "Pagador não encontrado" };
  }
};