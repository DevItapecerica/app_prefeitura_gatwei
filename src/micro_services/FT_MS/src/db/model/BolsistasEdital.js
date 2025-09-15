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
    status: {
      type: DataTypes.ENUM("ativo", "inativo", "concluido", "expirado"),
      allowNull: false,
      defaultValue: "ativo",
    },

    expire_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    prorrogated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "bolsistas_edital",
    timestamps: true,
    paranoid: true,

    hooks: {
      beforeCreate: (bolsistaEdital) => {
        if (!bolsistaEdital.expire_at) {
          const vencimento = new Date(bolsistaEdital.data_vinculo);
          vencimento.setFullYear(vencimento.getFullYear() + 1);
          bolsistaEdital.expire_at = vencimento;
        }
      },
    },
  }
);

BolsistasEdital.beforeBulkCreate((records, options) => {
  records.forEach((record) => {
    if (!record.expire_at) {
      const dataVinculo = record.data_vinculo || new Date();
      const dataVencimento = new Date(dataVinculo);
      dataVencimento.setFullYear(dataVinculo.getFullYear() + 1);
      record.data_vinculo = dataVinculo; // caso não venha
      record.expire_at = dataVencimento;
    }
  });
});

export default BolsistasEdital;
