import { DataTypes } from "sequelize";
import Sequelize from "../context.js";

const BolsistasEdital = Sequelize.define(
  "BolsistasEdital",
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
        model: "Edital",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "BolsistasEdital",
    timestamps: false,
    paranoid: true,

  }
);

export default BolsistasEdital;
