import { DataTypes } from "sequelize";
import Sequelize from "../context.js";

const BolsistasEditais = Sequelize.define(
  "BolsistasEditais",
  {
    bolsista_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Bolsistas",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    edital_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Editais",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "BolsistasEditais",
    timestamps: false,
  }
);

export default BolsistasEditais;
