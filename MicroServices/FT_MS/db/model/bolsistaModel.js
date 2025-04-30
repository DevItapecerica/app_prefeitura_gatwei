const { DataTypes } = require("sequelize");
const db = require("../context");

const Bolsa = db.define(
  "Bolsistas",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    bco: {
      type: DataTypes.STRING(3), // até 3 caracteres
      allowNull: false,
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
    bolsa: {
      type: DataTypes.DECIMAL(10, 2), // número com até 10 dígitos, 2 casas decimais
      allowNull: false,
    },
    vencimento: {
      type: DataTypes.INTEGER, // para armazenar apenas o dia do mês (1-31)
      allowNull: false,
      validate: {
        min: 1,
        max: 31,
      },
    },
    cpf: {
      type: DataTypes.STRING(11), // até 11 caracteres
      allowNull: false,
    },
    local: {
      type: DataTypes.STRING, // VARCHAR
      allowNull: false,
    },
  },
  {
    tableName: "Bolsistas", // Nome da tabela no banco
    timestamps: true, // Se você não quiser campos createdAt e updatedAt
  }
);

module.exports = Bolsa;
