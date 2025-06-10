import { DataTypes } from "sequelize";
import Sequelize from "../context.js";

const BolsistasEdital = Sequelize.define(
  "BolsistasEdital",
  {
    bolsista_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "Bolsistas",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    edital_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "Edital",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    data_vinculo: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    data_vencimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    prorrogado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("ativo", "inativo", "concluido", "expirado"),
      allowNull: false,
      defaultValue: "ativo",
    },
  },
  {
    tableName: "BolsistasEdital",
    timestamps: false,
    paranoid: true,
  }
);

export default BolsistasEdital;
