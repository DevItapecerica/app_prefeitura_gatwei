const db_demandas = require("../db/model/demandasModel");

const getDemandas = async (request, reply) => {
  try {
    let demandas = await db_demandas.findAll();

    reply.status(200).send({ demandas });
  } catch (error) {
    throw error;
  }
};

const getOneDemandas = async (request, reply) => {
  let id = request.params.id;
  let demandas = await db_demandas.findByPk(id);

  reply.status(200).send({ demandas });
};

const getUserDemandas = async (request, reply) => {
  let id = request.params.id;
  let demandas = await db_demandas.findAll({
    where: {
      user_id: id,
    },
  });

  reply.status(200).send({ demandas });
};

const getSetorDemandas = async (request, reply) => {
  let id = request.params.id;
  let demandas = await db_demandas.findAll({
    where: {
      setor_id: id,
    },
  });

  reply.status(200).send({ demandas });
};

const getHistoryDemandas = async (request, reply) => {
  let demandas = await db_demandas.findAll({
    where: {
      status: 3,
    },
  });

  reply.status(200).send({ demandas });
}

const getUserHistoryDemandas = async (request, reply) => {
  let id = request.params.id;
  let demandas = await db_demandas.findAll({
    where: {
      user_id: id,
      status: 3,
    },
  });

  reply.status(200).send({ demandas });
}

const getSetorHistoryDemandas = async (request, reply) => {
  let id = request.params.id;
  let demandas = await db_demandas.findAll({
    where: {
      setor_id: id,
      status: 3,
    },
  });

  reply.status(200).send({ demandas });
}

const deleteDemandas = async (request, reply) => {
  let id = request.params.id;
  let demandas = await db_demandas.destroy({
    where: {
      setor_id: id,
    },
  });

  reply.status(200).send({ demandas });
};

const assumeDemandas = async (request, reply) => {
  let demandaId = request.params.demandaid;
  let userId = request.params.userid;

  await db_demandas.update(
    {
      responsavel: userId,
    },
    {
      where: {
        id: demandaId,
      },
    }
  );

  reply.status(204);
};

const finishDemandas = (request, reply) => {
  let id = request.params.id;
  db_demandas.update(
    {
      status: 3,
    },
    {
      where: {
        id: id,
      },
    }
  );

  reply.status(204);
};

const postDemandas = async (request, reply) => {
  let { patrimonio, description, prioridade } = request.body;
  let user = request.body.user;

  await db_demandas.create({
    user_id: user.id,
    setor_id: user.setor_id,
    patrimonio,
    description,
    prioridade,
    status: 0,
  });

  reply.status(201).send("Demanda criada");
};

const updateDemandas = async (request, reply) => {
  let id = request.params.id;
  let { patrimonio, description, prioridade } = request.body.demanda;
  let user = request.body.user;

  await db_demandas.update(
    {
      user_id: user.id,
      setor_id: user.setor_id,
      patrimonio,
      description,
      prioridade,
    },
    {
      where: {
        id: id,
      },
    }
  );

  reply.status(200).send("Demanda atualizada");
};


module.exports = {
  getDemandas,
  getOneDemandas,
  getUserDemandas,
  getSetorDemandas,

  getHistoryDemandas,
  getUserHistoryDemandas,
  getSetorHistoryDemandas,

  deleteDemandas,

  assumeDemandas,

  finishDemandas,

  postDemandas,
  updateDemandas,
};
