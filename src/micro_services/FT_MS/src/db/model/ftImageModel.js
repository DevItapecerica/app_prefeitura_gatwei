import { DataTypes } from "sequelize";
import Sequelize from "../context.js"; // <-- corrigido aqui

const ftImageDB = Sequelize.define(
  "Image",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    bolsista_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Image",
    timestamps: true,
  }
);

export default ftImageDB;
