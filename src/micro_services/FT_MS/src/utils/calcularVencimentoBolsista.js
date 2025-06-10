export function calcularDataVencimento(dataVinculo, prorrogado) {
  const venc = new Date(dataVinculo);
  venc.setFullYear(venc.getFullYear() + (prorrogado ? 2 : 1)); // Ex: prorrogação dá +1 ano
  return venc;
}