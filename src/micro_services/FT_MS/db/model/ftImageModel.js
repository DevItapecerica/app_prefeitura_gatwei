const { DataTypes } = require("sequelize");
const db = require("../context");

const Image = db.define(
  "Image",
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
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: "Image", // Nome da tabela no banco
    timestamps: true,
  }
);

module.exports = Image;
