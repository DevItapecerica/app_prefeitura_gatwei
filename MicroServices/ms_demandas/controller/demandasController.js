const db_demandas = require("../db/model/demandasModel");

const getDemandas = (request, reply) => {
  try {
    let demandas = db_demandas.findAll();

    reply.status(200).send({ demandas });
  } catch (error) {
    throw error;
  }
};

const getOneDemandas = (request, reply) => {
  let id = request.params.id;
  let demandas = db_demandas.findAll({
    where: {
      id: id,
    },
  });

  reply.status(200).send({ demandas });
};

const getUserDemandas = (request, reply) => {
  let id = request.params.id;
  let demandas = db_demandas.findAll({
    where: {
      user_id: id,
    },
  });

  reply.status(200).send({ demandas });
};

const getSetorDemandas = (request, reply) => {
    let id = request.params.id;
    let demandas = db_demandas.findAll({
      where: {
        setor_id: id,
      },
    });
  
    reply.status(200).send({ demandas });
  };

module.exports = {
  getDemandas,
  getOneDemandas,
  getUserDemandas,
  getSetorDemandas
};
