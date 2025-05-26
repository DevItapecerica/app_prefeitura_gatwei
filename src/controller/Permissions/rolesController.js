import service_api from "../../api/service_api.js";
import role_api from "../../api/permissions_api.js";
import { verifyPermission } from "../../utils/verifyPermission.js";

const SERVICE = 5;

export const createRoles = async (request, reply) => {
  try {
    let user = request.user;
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
    reply.status(201).send("Created role");
  } catch (error) {
    throw error;
  }
};

export const getRoles = async (request, reply) => {
  try {
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);

    let responseRole = await role_api.get("/roles");
    let roles = responseRole.data.roles;

    reply.status(200).send({ roles });
  } catch (error) {
    throw error;
  }
};

export const updateRoles = async (request, reply) => {
  try {
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);

    let id = request.params.id;
    let { name } = request.body.role;

    await role_api.put(`/roles/${id}`, {
      role: {
        name: name,
      },
    });
    reply.status(201).send("Updated role");
  } catch (error) {
    throw error;
  }
};

export const deleteRoles = async (request, reply) => {
  try {
    let user = request.user;
    await verifyPermission(user, SERVICE, request.method);

    let id = request.params.id;

    await role_api.delete(`/roles/${id}`);
    await role_api.delete(`/permission/role/${id}`);
    reply.status(201).send("Deleted role");
  } catch (error) {
    throw error;
  }
};
