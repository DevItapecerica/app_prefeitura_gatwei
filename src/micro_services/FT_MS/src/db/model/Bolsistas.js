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
    cep: {
      type: DataTypes.STRING(8), // até 8 caracteres
      allowNull: false,
      defaultValue: "Nao definido",
    },
    numero: {
      type: DataTypes.STRING, // VARCHAR
      allowNull: false,
      defaultValue: "Nao definido",
    },
    logradouro: {
      type: DataTypes.STRING, // VARCHAR
      allowNull: false,
      defaultValue: "Nao definido",
    },
    bairro: {
      type: DataTypes.STRING, // VARCHAR
      allowNull: false,
      defaultValue: "Nao definido",
    },
    cidade: {
      type: DataTypes.STRING, // VARCHAR
      allowNull: false,
      defaultValue: "Nao definido",
    },
    uf: {
      type: DataTypes.STRING(2), // até 2 caracteres
      allowNull: false,
      defaultValue: "Nao definido",
    },
    telefone: {
      type: DataTypes.STRING(11), // até 11 caracteres
      allowNull: true,
    },
  },
  {
    tableName: "bolsistas", // Nome da tabela no banco
    timestamps: true,
  }
);

export default Bolsistas;
