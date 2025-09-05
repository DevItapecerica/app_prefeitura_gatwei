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
