const service_api = require("../../service/service_api");
const role_api = require("../../service/permissions_api");
const { verifyPermission } = require("../../utils/verifyPermission");

const SERVICE = 5;
const createRoles = async (request, reply) => {
  try {
    let user = request.user
    await verifyPermission(user, SERVICE, request.method);

    let { name } = request.body.role;
    const servicesResponse = await service_api.get("/service");
    const services = servicesResponse.data.services;

    await role_api.post("/roles", {
      role: {
        name: name,
      },
      services: services,
    });
    console.log(services);
    reply.status(201).send("Created role");
  } catch (error) {
    throw error;
  }
};

const getRoles = async (request, reply) => {
  try {
    let user = request.user
    await verifyPermission(user, SERVICE, request.method);
    let responseRole = await role_api.get("/roles");
    let roles = responseRole.data.roles;

    console.log(roles)


    reply.status(200).send({roles});
  } catch (error) {
    throw error;
  }
};

const updateRoles = async (request, reply) => {
  try {
    let user = request.user
    await verifyPermission(user, SERVICE, request.method);

    let id = request.params.id;
    let { name } = request.body.role;
    const servicesResponse = await service_api.get("/service");
    const services = servicesResponse.data;

    await role_api.put(`/roles/${id}`, {
      role: {
        name: name,
      },
    });
    console.log(services);
    reply.status(201).send("updated role");
  } catch (error) {
    throw error;
  }
};

const deleteRoles = async (request, reply) => {
  try {
    let user = request.user
    await verifyPermission(user, SERVICE, request.method);

    let id = request.params.id;

    await role_api.delete(`/roles/${id}`);
    reply.status(201).send("updated role");
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createRoles,
  getRoles,
  updateRoles,
  deleteRoles,
};
