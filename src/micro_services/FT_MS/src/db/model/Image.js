import { DataTypes } from "sequelize";
import Sequelize from "../context.js"; // <-- corrigido aqui

const Image = Sequelize.define(
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
      references: {
        model: "Bolsistas",
        key: "id",
      },
      onDelete: "CASCADE",
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
    paranoid: true,
  }
);

export default Image;
