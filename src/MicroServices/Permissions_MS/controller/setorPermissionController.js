const ServiceVisibility = require("../db/model/serviceVisibilityModel");

// CREATE: Criar um novo registro quando criar setor
const createSetorVisibility = async (request, reply) => {
  try {
    const services = request.body.services;
    const id = request.params.id;

    services.forEach(async (service) => {
      await ServiceVisibility.create({
        service_id: service.id,
        setor_id: id,
        active: false,
      });
    });

    reply.status(201).send({ message: "created successfully" });
  } catch (error) {
    throw error;
  }
};

// CREATE: Criar um novo registro quando criar serviço
const createServiceVisibility = async (request, reply) => {
  try {
    const id = request.params.id;
    const setores = request.body.setores;

    setores.forEach(async (setor) => {
      await ServiceVisibility.create({
        service_id: id,
        setor_id: setor.id,
        visibility: false,
      });
    });

    reply.status(201).send({ message: "created successfully" });
  } catch (error) {
    throw error;
  }
};

// READ: Obter todos os roles
const getServiceVisibility = async (request, reply) => {
  try {
    const visibility = await ServiceVisibility.findAll();

    reply.status(200).send({ visibility });
  } catch (error) {
    throw error;
  }
};

const getVisibilitySetor = async (request, reply) => {
  let id = request.params.id;
  try {
    const visibility = await ServiceVisibility.findAll({
      where: {
        setor_id: id,
      },
    });

    reply.status(200).send({ visibility });
  } catch (error) {
    throw error;
  }
};

const deleteServiceVisibility = async (request, reply) => {
  try {
    const service_id = request.params.id;
    const servicePermission = await ServiceVisibility.destroy({
      where: {
        service_id: service_id,
      },
    });
    if (!servicePermission) {
      return reply.status(404).send({ error: "Role not found" });
    }
    reply.status(204);
  } catch (error) {
    throw error;
  }
};

const deleteSetorVisibility = async (request, reply) => {
  try {
    const setor_id = request.params.id;
    const servicePermission = await ServiceVisibility.destroy({
      where: {
        setor_id: setor_id,
      },
    });
    if (!servicePermission) {
      return reply.status(404).send({ error: "Role not found" });
    }
    reply.status(204);
  } catch (error) {
    throw error;
  }
};

const updateServiceVisibility = async (request, reply) => {
  try {
    const id = request.params.id;
    const visibilities = request.body.visibility;

    console.log(request.body)

    visibilities.forEach(async (visibility) => {
    await ServiceVisibility.update(
        {
          visibility: visibility.visibility,
        },
        {
          where: {
            service_id: id,
            setor_id: visibility.setor_id,
          },
        }
      );
    });

    reply.status(204);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createSetorVisibility,
  createServiceVisibility,
  getServiceVisibility,
  deleteServiceVisibility,
  deleteSetorVisibility,
  updateServiceVisibility,
  getVisibilitySetor
};
