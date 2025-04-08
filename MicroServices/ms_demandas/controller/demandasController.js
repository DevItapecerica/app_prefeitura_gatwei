const { Op, where } = require("sequelize");
const db_demandas = require("../db/model/demandasModel");

const getDemandas = async (request, reply) => {
  try {
    let demandas = await db_demandas.findAll({
      where: {
        status: {
          [Op.ne]: 3, // status diferente de 3
        },
      },
    });

    reply.status(200).send(demandas);
  } catch (error) {
    throw error;
  }
};

const getOneDemandas = async (request, reply) => {
  let id = request.params.id;
  let demandas = await db_demandas.findByPk(id);

  if (!demandas) {
    throw {
      status: 404,
      message: "Demanda não encontrada.",
    };
  }

  reply.status(200).send(demandas);
};

const getUserDemandas = async (request, reply) => {
  let id = request.params.id;
  const demandas = await db_demandas.findAll({
    where: {
      [Op.and]: [
        {
          [Op.or]: [{ user_id: id }, { responsavel: id }],
        },
        {
          status: {
            [Op.ne]: 3, // status diferente de 3
          },
        },
      ],
    },
  });

  reply.status(200).send(demandas);
};

const getSetorDemandas = async (request, reply) => {
  let id = request.params.id;
  
  const demandas = await db_demandas.findAll({
    where: {
      [Op.and]: [
        { setor_id: id },
        {
          status: {
            [Op.ne]: 3, // Exclui status 3
          },
        },
      ],
    },
  });

 
  console.log('---------------------------------------------------')

  console.log('as demandas são: ', demandas);

  console.log('---------------------------------------------------')


  reply.status(200).send({demandas});
};

const getHistoryDemandas = async (request, reply) => {
  try {
    let demandas = await db_demandas.findAll({
      where: {
        status: 3,
      },
    });

    reply.status(200).send(demandas);
  } catch (error) {
    throw error;
  }
};

const getUserHistoryDemandas = async (request, reply) => {
  let id = request.params.id;
  let demandas = await db_demandas.findAll({
    where: {
      [Op.and]: [
        {
          [Op.or]: [{ responsavel: id }, { user_id: id }],
        },
        {
          status: 3,
        },
      ],
    },
  });

  reply.status(200).send(demandas);
};

const getSetorHistoryDemandas = async (request, reply) => {
  try {
    let id = request.params.id;

    let demandas = await db_demandas.findAll({
      where: {
        [Op.and]: [{ setor_id: id }, { status: 3 }],
      },
    });
    reply.status(200).send(demandas);
  } catch (error) {
    throw error;
  }
};

const deleteDemandas = async (request, reply) => {
  let id = request.params.id;
  let demandas = await db_demandas.destroy({
    where: {
      id: id,
    },
  });

  reply.status(200).send(demandas);
};

const assumeDemandas = async (request, reply) => {
  try {
    let demandaId = request.params.id;
    let responsavel = request.body.responsavel;

    let demanda = await db_demandas.findByPk(demandaId);

    if (demanda.responsavel != null) {
      throw { status: 403, message: "Demanda já está atribuída a outro setor" };
    }

    await db_demandas.update(
      {
        responsavel: responsavel,
        status: 1,
      },
      {
        where: {
          id: demandaId,
        },
      }
    );

    reply.status(204);
  } catch (error) {
    throw error;
  }
};

const finishDemandas = async (request, reply) => {
  let id = request.params.id;
  let user = request.body.user;

  let demanda = await db_demandas.findByPk(id);

  if (demanda.responsavel != user && demanda.user_id != user) {
    throw {
      status: 401,
      message: "Essa demanda não está sob sua responsabilidade",
    };
  }

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
  let { patrimonio, description, prioridade } = request.body.demanda;
  let user = request.body.user;

  console.log("user", user);
  console.log("demanda", request.body.demanda);

  const newDemanda = await db_demandas.create({
    user_id: user.id,
    setor_id: user.setor_id,
    patrimonio,
    description,
    prioridade,
    status: 0,
  });

  reply.status(201).send(newDemanda);
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

  reply.status(204);
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
