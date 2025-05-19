const Sequelize = require('sequelize');
const db = require("../context");

const Setor = db.define(
  "Setor",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    paranoid: true, // Habilita soft delete

  }
);


module.exports = Setor;