import { DataTypes } from "sequelize";
import Sequelize from "../context.js";

const AlterationsBolsistas = Sequelize.define(
  "Bolsistas",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    observation: {
      type: DataTypes.STRING, // VARCHAR (sem limite explícito, padrão do Sequelize)
      allowNull: false,
    },
    bolsista_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "alterations_bolsistas", // Nome da tabela no banco
    timestamps: true,
  }
);

export default AlterationsBolsistas;
