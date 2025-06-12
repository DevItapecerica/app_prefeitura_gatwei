import { DataTypes } from "sequelize";
import Sequelize from "../context.js";

const Bolsistas = Sequelize.define(
  "Bolsistas",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    bco: {
      type: DataTypes.STRING(3), // até 3 caracteres
      allowNull: false,
    },
    pagador: {
      type: DataTypes.STRING(50), // até 3 caracteres
      allowNull: false,
      // defaultValue: "pendente", // valor padrão
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
      type: DataTypes.STRING(10), // até 10 caracteres
      allowNull: false,
    },
    dig_conta: {
      type: DataTypes.STRING(1), // até 1 caractere
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING, // VARCHAR (sem limite explícito, padrão do Sequelize)
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(11), // até 11 caracteres
      allowNull: false,
      unique: true,
    },
    local: {
      type: DataTypes.STRING, // VARCHAR
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("ativo", "inativo", "pendente"), // valores possíveis
      allowNull: false,
      defaultValue: "inativo", // valor padrão
      // defaultValue: "pendente", // valor padrão
    },
  },
  {
    tableName: "Bolsistas", // Nome da tabela no banco
    timestamps: true,
  }
);

export default Bolsistas;
