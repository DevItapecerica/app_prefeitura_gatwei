const DBDemandas = require("../../db/model/demandasModel");
const DBUser = require("../../db/model/UserModel");
const DBSetor = require("../../db/model/SetorModel");
const { Op } = require("sequelize");

exports.create = async (target, userTarget) => {
  try {
    const user = await DBUser.findOne({
      where: {
        id: userTarget,
      },
      attributes: { exclude: ["password"] },
    });

    await DBDemandas.create({
      user_id: user.id,
      patrimonio: target.patrimonio,
      description: target.description,
      prioridade: target.prioridade,
      status: 0,
    });
  } catch (error) {
    throw {
      error: error.status || 500,
      message: error.message || "Problemas internos no servidor",
    };
  }
};

exports.update = async (target, dataTarget) => {};
