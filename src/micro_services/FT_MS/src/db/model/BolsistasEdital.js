import { DataTypes } from "sequelize";
import Sequelize from "../context.js";

const BolsistasEdital = Sequelize.define(
  "BolsistasEdital",
  {
    bolsista_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "Bolsistas",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    edital_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "Edital",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    data_vinculo: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: () => new Date(), // melhor usar função para pegar o momento de criação
    },
    data_vencimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    prorrogado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("ativo", "inativo", "concluido", "expirado"),
      allowNull: false,
      defaultValue: "ativo",
    },
  },
  {
    tableName: "BolsistasEdital",
    timestamps: false,
    paranoid: true,

    hooks: {
      beforeCreate: (bolsistaEdital) => {
        if (!bolsistaEdital.data_vencimento) {
          const vencimento = new Date(bolsistaEdital.data_vinculo);
          vencimento.setFullYear(vencimento.getFullYear() + 1);
          bolsistaEdital.data_vencimento = vencimento;
        }
      },
    },
  }
);

BolsistasEdital.beforeBulkCreate((records, options) => {
  records.forEach((record) => {
    if (!record.data_vencimento) {
      const dataVinculo = record.data_vinculo || new Date();
      const dataVencimento = new Date(dataVinculo);
      dataVencimento.setFullYear(dataVinculo.getFullYear() + 1);
      record.data_vinculo = dataVinculo; // caso não venha
      record.data_vencimento = dataVencimento;
    }
  });
});

export default BolsistasEdital;
