import { DataTypes } from "sequelize";
import Sequelize from "../context.js";

const Editais = Sequelize.define(
  "Editais",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    abertura: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fechamento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "Editais", // Nome da tabela no banco (pode personalizar)
    timestamps: false, // Desativa createdAt/updatedAt se não forem usados
    paranoid: true,

  }
);

export default Editais;
