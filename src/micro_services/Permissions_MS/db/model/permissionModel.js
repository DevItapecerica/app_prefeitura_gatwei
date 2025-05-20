const Sequelize = require("sequelize");
const db = require("../context");
const Role = require('./rolesModel')

const Permission = db.define(
  'Permission',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    // Role do usuário
    role_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    // Serviço ao qual as permissões se aplicam
    service_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    // Permissões individuais
    read: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },

    write: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },

    edit: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },

    del: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true, // Adiciona createdAt e updatedAt
    paranoid: true, // Habilita soft delete
  }
);

module.exports = Permission;