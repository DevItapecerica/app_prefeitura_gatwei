import { Op } from "sequelize";
import { schedule } from "node-cron";

import Edital from "../../db/model/Edital.js";
import Bolsistas from "../../db/model/Bolsistas.js";

import logScheduler from "./logManager.js";

let i = 0;
const task = async () => {
  // Log para saber quantos dias sem erro
  console.log(`Dias sem erros: ${i++}`);
  try {
    const editalExpirado = await Edital.findAll({
      where: {
        data_vencimento: { [Op.lt]: new Date() },
        status: "ativo",
      },
      include: [
        {
          model: Bolsistas,
          as: "bolsistas",
          through: { attributes: ["bolsista_id", "edital_id", "status"] },
        },
      ],
    });

    for (const edital of editalExpirado) {
      // Altera status do edital quando vencer
      edital.status = "inativo";
      await edital.save();

      logScheduler(
        `Edital ${edital.id} - '${edital.name}' foi marcado como inativo.`,
        "scheduler.log"
      );

      for (const bolsista of edital.bolsistas) {
        // Altera status do Bolsista no fim do relacionamento
        bolsista.status = "inativo";
        await bolsista.save();

        logScheduler(
          `Bolsista ${bolsista.nome} (ID ${bolsista.id}) foi marcado como inativo`,
          "scheduler.log"
        );

        // Altera status do relacionamento do edita com o bolsista
        bolsista.BolsistasEdital.status = "concluido";
        await bolsista.BolsistasEdital.save();

        logScheduler(
          `Relacionamento Bolsista ${bolsista.id} - Edital ${edital.id} (${edital.name}) foi marcado como concluído`,
          "scheduler.log"
        );

        logScheduler(
          "--------------------------------------------------------------",
          "scheduler.log"
        );
      }
    }
  } catch (error) {
    console.error("Erro ao atualizar editais expirados:", error);
    i = 0;
    throw error;
  }
};

// cronometro do agendador
schedule("0 1 */1 * *", task);
