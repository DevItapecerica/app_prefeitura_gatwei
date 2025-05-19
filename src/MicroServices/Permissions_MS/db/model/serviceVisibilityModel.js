const Sequelize = require('sequelize');
const db = require('../context');

const ServiceSetor = db.define('ServiceVisibility', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  setor_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  service_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  visibility: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  }
});

module.exports = ServiceSetor;