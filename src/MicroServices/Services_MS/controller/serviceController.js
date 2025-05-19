const {
  getAll,
  getOne,
  getAllUserService,
  create,
  update,
  deleteOne,
} = require("./service");

const getService = async (request, reply) => {
  try {
    const services = await getAll();
    return reply.status(201).send({services});
  } catch (error) {
    throw error;
  }
};

const getOneService = async (request, reply) => {
  try {
    id = request.params.id;
    const services = await getOne(id);

    return reply.status(201).send({services});
  } catch (error) {
    throw error;
  }
};

const createService = async (request, reply) => {
  try {
    const service = await create(request.body.service);
    return reply.status(201).send({service});
  } catch (error) {
    throw error;
  }
};

const updateService = async (request, reply) => {
  try {
    const id = request.params.id;
    await update(id, request.body.service);

    reply.status(204);
  } catch (error) {
    throw error;
  }
};

const deleteService = async (request, reply) => {
  try {
    const id = request.params.id;

    if (id <= 3) {
      let error = new Error();
      error.status = 403;
      error.message = "Não é possível deletar esse serviço";
      throw error;
    }

    let service = await deleteOne(id);

    if (service < 1) {
      throw { status: 404, message: "Serviço não encontrado" };
    }
    reply.status(204);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getService,
  getOneService,
  createService,
  updateService,
  deleteService,
};
