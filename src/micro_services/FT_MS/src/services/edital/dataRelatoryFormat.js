export const DataFormat = (data) => {
  const headerBlock = [
    ["Edital"],
    ["Id:", data.id],
    ["Nome:", data.name],
    ["Publicação:", data.data_publicacao.toISOString().split("T")[0]],
    ["Vencimento:", data.data_vencimento.toISOString().split("T")[0]],
    ["Pagamento:", data.dia_pagamento],
    ["Valor:", data.valor_bolsa],
    ["Status:", data.status],
    [], // separador
    ["Bolsistas agrupados por local de pagamento"],
  ];

  const bolsistasHeader = [
    "bco",
    "ag",
    "dig_ag",
    "conta",
    "dig_conta",
    "nome",
    "valor",
    "vencimento",
    "cpf",
    "local",
  ];

  // Agrupamento por local de pagamento (pagador)
  const agrupados = {};

  for (const b of data.bolsistas) {
    const local = b.pagador || "SEM_LOCAL";
    if (!agrupados[local]) {
      agrupados[local] = [];
    }
    if (b.status == "ativo") {
      agrupados[local].push([
        b.bco,
        b.ag,
        b.dig_ag,
        b.conta,
        b.dig_conta,
        b.nome,
        data.valor_bolsa,
        data.data_vencimento.toISOString().split("T")[0],
        b.cpf,
        b.pagador,
      ]);
    }
  }

  const bolsistasRows = [];
  let totalGeral = 0;
  let contagemGeral = 0;

  for (const local in agrupados) {
    bolsistasRows.push([]);
    bolsistasRows.push([`Local de pagamento: ${local}`]);
    bolsistasRows.push(bolsistasHeader);

    const rows = agrupados[local];
    bolsistasRows.push(...rows);

    const totalValor = rows.length * data.valor_bolsa;
    bolsistasRows.push([
      "Total de bolsistas local:",
      rows.length,
      "Total do local:",
      totalValor,
    ]);
    totalGeral += totalValor;
    contagemGeral += rows.length;
  }

  bolsistasRows.push([
    "Total de bolsistas geral:",
    contagemGeral,
    "Total do valor geral:",
    totalGeral,
  ]);

  return { headerBlock, bolsistasRows };
};
