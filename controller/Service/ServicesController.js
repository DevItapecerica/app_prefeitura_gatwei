const service_api = require("../../service/service_api");
const permissions_api = require("../../service/permissions_api");
const { verifyPermission } = require("../../utils/verifyPermission");

const SERVICE = 3;

const getAllServices = async (request, reply) => {
  try {
    let user = request.user;
    let servicePermission = [];
    let authorized = await verifyPermission(user, SERVICE, request.method);

    if (!authorized) {
      throw {
        status: 401,
        message: "You do not have permission to access this resource.",
      };
    }

    let serviceResponse = await service_api.get("/service");
    let services = serviceResponse.data;
    let permissionsResponse = await permissions_api.get(`/permission/service`);
    let permissions = permissionsResponse.data;

    let roles = await permissions_api.get(`/roles`);
    console.log(roles.data.roles);
    console.log(user.role);

    let role_id = roles.data.roles.find((role) => role.id == user.role).id;


    if (!role_id) {
      throw { status: 500, message: "Role not found" };
    }

    services.forEach((service) => {
      permissions.forEach((permission) => {
        if (permission.service_id === service.id) {
          servicePermission = [...servicePermission, permission];
          service.permission = servicePermission;
        }
      });
      servicePermission = [];
    });

    reply.status(200).send({ services, roles: roles.data.roles });
  } catch (error) {
    throw error;
  }
};

const getUserServices = async (request, reply) => {
  try {
    let user = request.user;
    let authorized = await verifyPermission(user, SERVICE, request.method);

    if (!authorized) {
      throw {
        status: 401,
        message: "You do not have permission to access this resource.",
      };
    }

    //gerenciamento de api request's
    let serviceResponse = await service_api.get("/service");
    let services = serviceResponse.data;
    let permissionsResponse = await permissions_api.get(`/permission/service`);
    let permissions = permissionsResponse.data;

    let roles = await permissions_api.get(`/roles`);
    let userServices = [];

    let role_id = user.role;

    if (!role_id) {
      throw { status: 500, message: "Role not found" };
    }

    services.forEach((service) => {
      let userPermission = permissions.find(
        (permission) =>
          permission.role_id == role_id && permission.service_id === service.id
      );
    if (userPermission?.read) {
        userServices = [...userServices, service];
      }
    });

    console.log(userServices)

    reply.status(200).send({ services: userServices });
  } catch (error) {
    throw error;
  }
};

const getService = async (request, reply) => {
  try {
    let id = request.params.id;
    let user = request.user;

    let authorized = await verifyPermission(user, SERVICE, request.method);

    if (!authorized) {
      throw {
        status: 401,
        message: "You do not have permission to access this resource.",
      };
    }
    let response = await service_api.get(`/service/${id}`);
    let services = response.data;

    reply.status(200).send({services});
  } catch (error) {
    throw error;
  }
};

const createService = async (request, reply) => {
  try {
    let service = request.body.service;
    let user = request.user;

    let authorized = await verifyPermission(user, SERVICE, request.method);

    if (!authorized) {
      throw {
        status: 401,
        message: "You do not have permission to access this resource.",
      };
    }

    let response = await service_api.post(`/service`, {
      service,
    });
    
    let serviceResult = response.data;
console.log(serviceResult)
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
      let permissions = request.body.service.permission;
      let id = request.params.id;
      let user = request.user;

      let authorized = await verifyPermission(user, SERVICE, request.method);

      if (!authorized) {
        throw {
          status: 401,
          message: "You do not have permission to access this resource.",
        };
      }

      await service_api.put(`/service/${id}`, {
        service: {
          name: service.name,
          description: service.description,
          url: service.url,
        },
      });

      await permissions_api.put(`/permission/service/${id}`, { permissions });
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
    let user = request.user;

    let authorized = await verifyPermission(user, SERVICE, request.method);

    if (!authorized) {
      throw {
        status: 401,
        message: "You do not have permission to access this resource.",
      };
    }

    await service_api.delete(`/service/${id}`);
    await permissions_api.delete(`/permission/service/${id}`);

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
  getUserServices,
};
