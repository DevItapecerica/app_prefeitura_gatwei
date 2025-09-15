import Sequelize from "../context.js";
import { DataTypes } from "sequelize";

const PaymentInfo = Sequelize.define(
  "PaymentInfo",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    bolsista_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Bolsistas", // Nome da tabela referenciada
        key: "id", // Chave primária da tabela referenciada
      },
    },
    bco: {
      type: DataTypes.STRING(3), // até 3 caracteres
      allowNull: false,
    },
    pagador_id: {
      type: DataTypes.STRING(50), // até 3 caracteres
      allowNull: false,
      defaultValue: "pendente", // valor padrão
    },
    ag: {
      type: DataTypes.STRING(4), // até 4 caracteres
      allowNull: false,
    },
    dig_ag: {
      type: DataTypes.STRING(1), // até 1 caractere
      allowNull: false,
    },
    conta: {
      type: DataTypes.STRING(11), // até 11 caracteres
      allowNull: false,
    },
    dig_conta: {
      type: DataTypes.STRING(1), // até 1 caractere
      allowNull: false,
    },
  },
  {
    tableName: "payment_info", // Nome da tabela no banco
    timestamps: true,
    paranoid: true,
  }
);

export default PaymentInfo;
