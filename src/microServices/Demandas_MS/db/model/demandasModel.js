const db = require("../context");
const Sequelize = require('sequelize')

const Demandas = db.define(
    "Demandas",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      setor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      patrimonio: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      prioridade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      responsavel: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null, // Define como null para indicar "sem responsável"
      },
    },
    {
      timestamps: true,
    }
  );

  module.exports =  Demandas;  // Exporta o modelo para uso em outros arquivos