import { Op } from "sequelize";
import { schedule } from "node-cron";

import Edital from "../../db/model/Edital.js";
import Bolsistas from "../../db/model/Bolsistas.js";

import logScheduler from "./logManager.js";

let i = 0;

const task = async () => {
  console.log(`Dias sem erros: ${i++}`);
  try {
    const editalExpirado = await Edital.findAll({
      where: {
        data_vencimento: {
          [Op.lt]: new Date(), // Data vencida
        },
        status: "ativo",
      },
      include: [
        {
          model: Bolsistas,
          as: "bolsistas", // alias definido na associação
          attributes: ["id", "nome", "status"],
          through: { attributes: [] }, // ignora colunas da tabela pivô
        },
      ],
    });

    editalExpirado.forEach(async (edital) => {
      edital.status = "inativo";
      await edital.save();

      console.log(
        `Edital ${edital.id} - '${edital.name}' foi marcado como inativo.`
      );

      edital.bolsistas.forEach((bolsista) => {
        bolsista.status = "inativo";
        bolsista.save();

        logScheduler(
          edital.id,
          "Edital expirado, alterado com sucesso",
          i,
          bolsistas,
          null
        );
      });
    });
  } catch (error) {
    console.error("Erro ao atualizar editais expirados:", error);
    i = 0;
    throw error;
  } finally {
    logScheduler();
  }
};

schedule("*/1 * * * *", task);
