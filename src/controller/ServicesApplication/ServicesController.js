import setor_api from "../../api/setor_api.js";
import service_api from "../../api/service_api.js";
import permissions_api from "../../api/permissions_api.js";
import user_api from "../../api/user_api.js";
import { verifyPermission } from "../../utils/verifyPermission.js";

const SERVICE = 3;

const getAllServices = async (request, reply) => {
  try {
    const user = request.user;

    await verifyPermission(user, SERVICE, request.method);

    const [
      { data: { services } },
      { data: { permissions } },
      { data: { roles } },
      { data: { setores } },
      { data: { visibility } },
    ] = await Promise.all([
      service_api.get("/service"),
      permissions_api.get("/permission/service"),
      permissions_api.get(`/roles`),
      setor_api.get("/setor"),
      permissions_api.get(`/visibility`),
    ]);
    
    let role_id = roles.find((role) => role.id == user.role).id;

    if (!role_id) {
      throw { status: 500, message: "Role not found" };
    }

    services.forEach((service) => {
      service.permission = permissions?.filter(
        (permission) => permission.service_id === service.id
      );
      service.visibility = visibility?.filter(
        (visibility) => visibility.service_id === service.id
      );
    });

    reply.status(200).send({ services, roles, setores });
  } catch (error) {
    throw error;
  }
};

const getUserServices = async (request, reply) => {
  try {
    const userId = request.user.id;

    const {data} = await user_api.get(`/user/2`);
    const user = data.user;
    console.log(data)

    const [
      { data: { services } },
      { data: { permissions } },
      { data: { visibility } },
    ] = await Promise.all([
      service_api.get("/service"),
      permissions_api.get("/permission/service"),
      permissions_api.get(`/visibility/setor/${user.setor_id}`),
    ]);


    const roleId = user.role_id;

    if (!roleId) {
      throw { status: 500, message: "Role not found" };
    }

    const roleService = services.filter((service) => {
      const userPermission = permissions.find(
        (permission) =>
          permission.role_id === roleId && permission.service_id === service.id
      );
      return userPermission?.read;
    });

    const visibleServiceIds = new Set(
      visibility.filter((v) => v.visibility).map((v) => v.service_id)
    );

    const userServicesVisible = roleService.filter((service) =>
      visibleServiceIds.has(service.id)
    );

    reply.status(200).send({ services: userServicesVisible });
  } catch (error) {
    reply.status(error.status || 500).send({
      message: error.message || "Erro interno ao buscar serviços do usuário.",
    });
  }
};

const getService = async (request, reply) => {
  try {
    const { id } = request.params;
    const user = request.user;

    await verifyPermission(user, SERVICE, request.method);

    const response = await service_api.get(`/service/${id}`);
    const services = response.data.service;

    reply.status(200).send({ services });
  } catch (error) {
    throw error;
  }
};

const createService = async (request, reply) => {
  try {
    const { service } = request.body;
    const user = request.user;

    await verifyPermission(user, SERVICE, request.method);

    const response = await service_api.post(`/service`, { service });
    const serviceResult = response.data;

    await permissions_api.post(`/permission/service`, {
      service: { service_id: serviceResult.service.id },
    });

    const responseSetor = await setor_api.get("/setor");
    const setores = responseSetor.data;

    await permissions_api.post(`/visibility/service/${serviceResult.service.id}`, {
      setores: setores.setores,
    });

    reply.status(200).send({ ...serviceResult, message: "Tudo okay" });
  } catch (error) {
    throw error;
  }
};

const updateService = async (request, reply) => {
  try {
    const { service } = request.body;
    const { permission: permissions, visibility } = service;
    const { id } = request.params;
    const user = request.user;

    await verifyPermission(user, SERVICE, request.method);

    await Promise.all([
      service_api.put(`/service/${id}`, {
        service: {
          name: service.name,
          description: service.description,
          url: service.url,
        },
      }),
      permissions_api.put(`/visibility/service/${id}`, { visibility }),
      permissions_api.put(`/permission/service/${id}`, { permissions }),
    ]);

    reply.status(204).send();
  } catch (error) {
    throw error;
  }
};

const deleteService = async (request, reply) => {
  try {
    const { id } = request.params;
    const user = request.user;

    await verifyPermission(user, SERVICE, request.method);

    await service_api.delete(`/service/${id}`);
    await permissions_api.delete(`/permission/service/${id}`);
    await permissions_api.delete(`/visibility/service/${id}`);

    reply.status(204);
  } catch (error) {
    throw error;
  }
};

export {
  getAllServices,
  getService,
  createService,
  updateService,
  deleteService,
  getUserServices,
};
