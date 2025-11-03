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
      {
        data: { services },
      },
      {
        data: { permissions },
      },
      {
        data: { roles },
      },
      {
        data: { setores },
      },
      {
        data: { visibility },
      },
    ] = await Promise.all([
      service_api.get("/service"),
      permissions_api.get("/permission/service"),
      permissions_api.get(`/roles`),
      setor_api.get("/setor"),
      permissions_api.get(`/visibility`),
    ]);

    let role_id = roles.find((role) => role.id == user.role).id;

    if (!role_id) {
      throw { code: 404, message: "Role not found", api: "Gatwei" };
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
    const response = error.response ? error.response.data : error;
    throw {
      code: error.status || response.code,
      message: response.message,
      ok: false,
      api: response.api,
    };
  }
};

const getUserServices = async (request, reply) => {
  try {
    const userId = request.user.id;

    const userResponse = await user_api.get(`/user/${userId}`);
    const user = userResponse.data.user;

    const [
      {
        data: { services },
      },
      {
        data: { permissions },
      },
      {
        data: { visibility },
      },
    ] = await Promise.all([
      service_api.get("/service"),
      permissions_api.get("/permission/service"),
      permissions_api.get(`/visibility/setor/${user.setor_id}`),
    ]);

    const roleId = user?.role_id;

    if (!roleId) {
      throw {
        code: 500,
        message: "Erro o validar role de usuário dentro da rota de serviço",
        ok: false,
        api: "Gatwei API",
      };
    }

    const UserPermissions = permissions.filter(
      (permission) =>
        permission.role_id === roleId &&
        permission.read &&
        services.find((service) => service.id === permission.service_id)
        && visibility.find((v) => v.service_id === permission.service_id && v.visibility)
    );

    const roleService = services.filter((service) => {
      const roleServicePermission = UserPermissions.find(
        (permission) => permission.service_id === service.id
      );

      service.permission = {
        role_id: roleServicePermission?.role_id,
        service_id: roleServicePermission?.service_id,
        read: roleServicePermission?.read,
        write: roleServicePermission?.write,
        edit: roleServicePermission?.edit,
        del: roleServicePermission?.del,
      };

      return roleServicePermission;
    });

    reply.status(200).send({ services: roleService });
  } catch (error) {
    const response = error.response ? error.response.data : error;
    throw {
      code: error.status || response.code,
      message: response.message,
      ok: false,
      api: response.api,
    };
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
    const response = error.response ? error.response.data : error;
    throw {
      code: error.status || response.code,
      message: response.message,
      ok: false,
      api: response.api,
    };
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

    await permissions_api.post(
      `/visibility/service/${serviceResult.service.id}`,
      {
        setores: setores.setores,
      }
    );

    reply.status(200).send({ ...serviceResult, message: "Tudo okay" });
  } catch (error) {
    const response = error.response ? error.response.data : error;
    throw {
      code: error.status || response.code,
      message: response.message,
      ok: false,
      api: response.api,
    };
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
    const response = error.response ? error.response.data : error;
    throw {
      code: error.status || response.code,
      message: response.message,
      ok: false,
      api: response.api,
    };
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
    const response = error.response ? error.response.data : error;
    throw {
      code: error.status || response.code,
      message: response.message,
      ok: false,
      api: response.api,
    };
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
