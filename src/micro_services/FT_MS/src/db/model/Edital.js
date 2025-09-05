import { DataTypes } from "sequelize";
import Sequelize from "../context.js";

const Edital = Sequelize.define(
  "Edital",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data_publicacao: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data_vencimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dia_pagamento: {
      type: DataTypes.INTEGER, // para armazenar apenas o dia do mês (1-31)
      allowNull: false,
      validate: {
        min: 1,
        max: 31,
      },
    },
    valor_bolsa: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("ativo", "inativo"),
      defaultValue: "ativo",
    },
  },
  {
    tableName: "Edital", // Nome da tabela no banco (pode personalizar)
    timestamps: true, // Desativa createdAt/updatedAt se não forem usados
    paranoid: true,
  }
);

export default Edital;
