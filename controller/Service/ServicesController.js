const service_api = require("../../service/service_api");
const permissions_api = require("../../service/permissions_api");

const getAllServices = async (request, reply) => {
  try {
    let response = await service_api.get("/service");
    let services = response.data;

    reply.status(200).send(services);
  } catch (error) {
    throw error;
  }
};

const getService = async (request, reply) => {
  try {
    let id = request.params.id;
    let response = await service_api.get(`/service/${id}`);
    let services = response.data;

    reply.status(200).send(services);
  } catch (error) {
    throw error;
  }
};

const createService = async (request, reply) => {
  try {
    let service = request.body.service;

    let response = await service_api.post(`/service`, {
      service,
    });
    let serviceResult = response.data;

    let permissions = await permissions_api.post(`/permission/service`, {
      service: {
        service_id: serviceResult.service.id,
      },
    });

    reply
      .status(200)
      .send({ ...serviceResult, message: permissions.data.message });
  } catch (error) {
    throw error;
  }
};

const updateService = async (request, reply) => {
  try {
    try {
      let service = request.body.service;
      let permissions = request.body.service.permissions;
      let id = request.params.id;
      await service_api.put(`/service/${id}`, {
        service: {
          name: service.name,
          description: service.description,
          url: service.url,
        },
      });

      await service_api.put(`/permissions/service/${id}`, {permissions});
      console.log(id, { permissions });

      reply.status(204);
    } catch (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

const deleteService = async (request, reply) => {
  try {
    let id = request.params.id;
    await service_api.delete(`/service/${id}`);

    reply.status(204);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllServices,
  getService,
  createService,
  updateService,
  deleteService,
};
