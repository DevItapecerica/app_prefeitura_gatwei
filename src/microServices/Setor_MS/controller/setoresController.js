const DbSetor = require("../db/model/SetorModel");

const getSetores = async (request, reply) => {
  try {
    let setores = await DbSetor.findAll();
    reply.status(200).send( {setores} );
  } catch (error) {
    throw error;
  }
};

const getOneSetor = async (request, reply) => {
  try {
    let setor = await DbSetor.findOne({
      where: {
        id: request.params.id,
      },
    });
    reply.status(200).send( {setor} );
  } catch (error) {
    throw error;
  }
};

const postSetor = async (request, reply) => {
  try {
    const { name, description } = request.body.setor;
    let setor = await DbSetor.create({
      name: name,
      description: description,
    });

    reply.status(201).send( {setor} );
  } catch (error) {
    throw error;
  }
};

const updateSetor = async (request, reply) => {
  try {
    console.log(request.body.setor);
    console.log(request.params.id);
    const setor = request.body.setor;
    const id = request.params.id;
    await DbSetor.update(
      {
        ...setor
      },
      {
        where: {
          id: id,
        },
      }
    );

    reply.status(204);
  } catch (error) {
    throw error;
  }
};

const deleteSetor = async (request, reply) => {
  try {
    let id = request.params.id;
    if (id == 1) {
      throw {
        statusCode: 403,
        message: "Não é possível deletar o setor principal",
      };
    }

    let setor = await DbSetor.destroy({
      where: {
        id: id,
      },
    });

    if (setor < 1) {
      throw { statusCode: 404, message: "Setor não encontrado" };
    }

    reply.status(204);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getSetores,
  getOneSetor,
  postSetor,
  updateSetor,
  deleteSetor,
};
