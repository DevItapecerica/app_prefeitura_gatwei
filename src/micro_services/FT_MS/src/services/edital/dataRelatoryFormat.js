export const DataFormat = (data) => {
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
      name: "Secretaria do Desenvolvimento Social e Relações do Trabalho",
      max_bolsista: 20,
    },
    {
      id: "20e5601e-d3e8-4e63-8991-68d03a14ba2f",
      name: "Secretaria de Serviços Urbanos",
      max_bolsista: 193,
    },
    {
      id: "d5f9db73-ea63-442d-9aec-05dd5edcd990",
      name: "Secretaria de Educação",
      max_bolsista: 100,
    },
    {
      id: "290d6314-54d9-4879-8220-0deb321ef892",
      name: "Secretaria de Cultura",
      max_bolsista: 5,
    },
  ];

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
    if (b.status === "ativo") {
      b.pagador =
        pagador.find((pag) => b.pagador == pag.id).name || "SEM LOCAL";
      const local = b.pagador;
      if (!agrupados[local]) {
        agrupados[local] = [];
      }
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
