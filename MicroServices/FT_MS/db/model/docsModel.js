const { DataTypes } = require("sequelize");
const db = require("../context");

const Docs = db.define(
  "Docs",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    bolsista_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING, // VARCHAR
      allowNull: true,
      defaultValue: null,
    },
    rg: {
      type: DataTypes.STRING, // VARCHAR
      allowNull: true,
      defaultValue: null,
    },
    inscricao: {
      type: DataTypes.STRING, // VARCHAR
      allowNull: true,
      defaultValue: null,
    },
    banco: {
      type: DataTypes.STRING, // VARCHAR
      allowNull: true,
      defaultValue: null,
    },
    adesao: {
      type: DataTypes.STRING, // VARCHAR
      allowNull: true,
      defaultValue: null,
    },
    prorrogacao: {
      type: DataTypes.STRING, // VARCHAR
      allowNull: true,
      defaultValue: null,
    },
    egresso_prisional: {
      type: DataTypes.STRING, // VARCHAR
      allowNull: true,
      defaultValue: null,
    },
    pcd: {
      type: DataTypes.STRING, // VARCHAR
      allowNull: true,
      defaultValue: null,
    },
    comp_escolaridade: {
      type: DataTypes.STRING, // VARCHAR
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "Docs", // Nome da tabela no banco
    timestamps: true,
  }
);

module.exports = Docs;
